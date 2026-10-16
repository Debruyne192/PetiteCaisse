<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Category;
use App\Models\Personne;
use App\Models\Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $derniereCloture = Closure::latest()->first();
        $soldeInitial = $derniereCloture ? $derniereCloture->solde_final : 0;
        $dateDepart = $derniereCloture ? $derniereCloture->created_at : '1970-01-01 00:00:00';

        $sommeApprovisionnements = Transaction::where('type', 'credit')
                                            ->where('created_at', '>', $dateDepart)
                                            ->sum('montant');

        $sommeDepensesValides = Transaction::where('type', 'debit')
                                         ->where('statut', 'validé')
                                         ->where('created_at', '>', $dateDepart)
                                         ->sum('montant');

        $soldeEnDirect = $soldeInitial + $sommeApprovisionnements - $sommeDepensesValides;

        $roleActuel = Auth::user()->role;
        
        if ($roleActuel === 'manager') {
            $transactions = Transaction::with(['caissier', 'categorie'])
                                        ->where('statut', 'en_attente')
                                        ->latest()
                                        ->get();
        } else {
            $transactions = Transaction::with(['caissier', 'categorie', 'controleur'])
                                        ->where('created_at', '>', $dateDepart)
                                        ->latest()
                                        ->get();
        }

        return Inertia::render('Transaction/Dashboard', [
            'soldeRestant' => $soldeEnDirect,
            'totalCredits' => $sommeApprovisionnements,
            'totalDebits'  => $sommeDepensesValides,
            'transactions' => $transactions,
            'categories'   => Category::all()
        ]);
    }

    public function dashboard(){
        $totalCredits = Transaction::where('statut', 'validé')
            ->where('type', 'credit')
            ->sum('montant');
        $totalDebits = Transaction::where('statut', 'validé')
            ->where('type', 'debit')
            ->sum('montant');
        $soldeRestant = $totalCredits - $totalDebits;

        $countEnAttente = Transaction::where('statut', 'en_attente')->count();
        $countValide = Transaction::where('statut', 'validé')->count();
        $countRejete = Transaction::where('statut', 'rejeté')->count();

        return Inertia::render('Personne/Dashboard', [
            'soldeRestant' => $soldeRestant,
            'totalCredits' => $totalCredits,
            'totalDebits'  => $totalDebits,
            'countEnAttente' => $countEnAttente,
            'countValide'    => $countValide,
            'countRejete'    => $countRejete,
        ]);
    }

public function create()
{
    if (Auth::user()->role !== 'caissier') {
        abort(403, "Accès interdit. Seul le caissier peut initier un nouveau flux.");
    }

    $listeCategories = Category::select('id', 'nom', 'slug')->orderBy('nom', 'asc')->get();

    return Inertia::render('Transaction/Create', [
        'categories' => $listeCategories
    ]);
}

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'caissier') {
            abort(403, "Action non autorisée pour votre profil.");
        }

        $regles = [
            'montant'         => 'required|integer|min:1',
            'type'            => 'required|in:debit,credit',
            'description'     => 'required|string|max:255',
            'reference_piece' => 'nullable|string|max:100',
        ];

        if ($request->type === 'debit') {
            $regles['categorie_id']        = 'required|exists:categories,id';
            $regles['chemin_justificatif'] = 'required|file|mimes:jpg,jpeg,png,pdf|max:2048'; // 2 Mo max
        }

        $donneesValidees = $request->validate($regles);

        $cheminFichier = null;
        if ($request->hasFile('chemin_justificatif')) {
            // Laravel stocke le fichier avec un nom unique dans "storage/app/public/justificatifs"
            $cheminFichier = $request->file('chemin_justificatif')->store('justificatifs', 'public');
        }

        Transaction::create([
            'personne_id'         => Auth::id(), // ID du caissier connecté
            'categorie_id'        => $request->type === 'debit' ? $request->categorie_id : null,
            'montant'             => $request->montant,
            'type'                => $request->type,
            'description'         => $request->description,
            'reference_piece'     => $request->reference_piece,
            'chemin_justificatif' => $cheminFichier,
            'statut'              => $request->type === 'credit' ? 'validé' : 'en_attente',
            'est_verrouille'      => false,
        ]);

        return redirect()->route('personne.dashboard')->with('success','L\'opération de caisse a été enregistrée avec succès.'
        );
    }

    
    public function valider(Transaction $transaction)
    {
        if (Auth::user()->role !== 'manager') {
            abort(403, "Seul un manager peut apposer un visa.");
        }

        if ($transaction->statut !== 'en_attente' || $transaction->est_verrouille) {
            abort(422, "Cette transaction ne peut plus être modifiée.");
        }

        $transaction->update([
            'statut'          => 'validé',
            'controle_par_id' => Auth::id() 
        ]);

        return redirect()->back()->with('success',"La dépense de {$transaction->montant} FCFA a reçu le Visa Contrôle avec succès."
        );
    }

 
    public function rejeter(Request $request, Transaction $transaction)
    {
        if (Auth::user()->role !== 'manager') {
            abort(403, "Action réservée aux managers.");
        }

        $request->validate([
            'motif_rejet' => 'required|string|min:5|max:500'
        ]);

        if ($transaction->statut !== 'en_attente' || $transaction->est_verrouille) {
            abort(422, "Transaction non modifiable.");
        }

        $transaction->update([
            'statut'          => 'rejeté',
            'motif_rejet'     => $request->motif_rejet,
            'controle_par_id' => Auth::id()
        ]);

        return redirect()->back()->with('danger',"La dépense a été rejetée. Le caissier a été notifié du motif de non-conformité."
        );
    }
public function monHistorique()
{
    if (Auth::user()->role !== 'caissier') {
        abort(403, "Accès refusé. Cette section est réservée aux caissiers.");
    }

    $mesOperations = Transaction::with(['categorie', 'controleur'])
                                ->where('personne_id', Auth::id())
                                ->latest()
                                ->get();

    return Inertia::render('Transaction/HistoriquePersonnel', [
        'operations' => $mesOperations
    ]);
}

}
