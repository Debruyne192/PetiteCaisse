<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Closure as ArreteCaisse; //  Utilisation d'un alias unique pour tuer le bug !
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ClosureController extends Controller
{
    public function index()
    {
        $derniereCloture = ArreteCaisse::latest()->first();
        $soldeInitial = $derniereCloture ? $derniereCloture->solde_final : 0;
        $dateDepart = $derniereCloture ? $derniereCloture->created_at : '1970-01-01 00:00:00';

        $lignesEnAttente = Transaction::where('statut', 'en_attente')->count();
        $totalCredits = Transaction::where('type', 'credit')->where('created_at', '>', $dateDepart)->sum('montant');
        $totalDebits = Transaction::where('type', 'debit')->where('statut', 'validé')->where('created_at', '>', $dateDepart)->sum('montant');
        $soldeFinalTheorique = $soldeInitial + $totalCredits - $totalDebits;

        return Inertia::render('Clotures/Index', [
            'soldeInitial'        => $soldeInitial,
            'totalCredits'        => $totalCredits,
            'totalDebits'         => $totalDebits,
            'soldeFinalTheorique' => $soldeFinalTheorique,
            'lignesEnAttente'     => $lignesEnAttente,
            'historiqueClotures'  => ArreteCaisse::with('comptable')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $lignesEnAttente = Transaction::where('statut', 'en_attente')->count();
        if ($lignesEnAttente > 0) {
            return redirect()->back()->with('alert', ['type' => 'danger', 'message' => "Clôture impossible."]);
        }

        DB::transaction(function () {
            $derniereCloture = ArreteCaisse::latest()->first();
            $soldeInitial = $derniereCloture ? $derniereCloture->solde_final : 0;
            $dateDepart = $derniereCloture ? $derniereCloture->created_at : '1970-01-01 00:00:00';

            $totalCredits = Transaction::where('type', 'credit')->where('created_at', '>', $dateDepart)->sum('montant');
            $totalDebits  = Transaction::where('type', 'debit')->where('statut', 'validé')->where('created_at', '>', $dateDepart)->sum('montant');
            $soldeFinalCalcule = $soldeInitial + $totalCredits - $totalDebits;

            Transaction::where('est_verrouille', false)->update(['est_verrouille' => true]);

            ArreteCaisse::create([
                'cloture_par_id' => Auth::id(),
                'date_cloture'   => now(),
                'solde_initial'  => $soldeInitial,
                'solde_final'    => $soldeFinalCalcule
            ]);
        });

        return back()->with('success',"L'arrêté de caisse a été validé.");
    }

    public function telechargerPDF($id)
    {
        $cloture = ArreteCaisse::with('comptable')->findOrFail($id);

        $transactions = Transaction::with(['caissier', 'categorie'])
                                    ->where('created_at', '<=', $cloture->date_cloture)
                                    ->where('est_verrouille', true)
                                    ->orderBy('created_at', 'asc')
                                    ->get();

        $pdf = Pdf::loadView('pdf.arrete_caisse', [
            'cloture'      => $cloture,
            'transactions' => $transactions
        ]);

        $nomFichier = 'PV_ARRETE_CAISSE_' . $cloture->date_cloture->format('d_m_Y') . '.pdf';
        return $pdf->download($nomFichier);
    }
}
