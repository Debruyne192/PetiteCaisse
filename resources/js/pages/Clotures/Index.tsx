import DashboardLayout from "@/layouts/DashboardLayout";
import React, { FormEvent, useState, useEffect } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { X, CheckCircle2, AlertCircle, FileText } from "lucide-react";

interface HistoriqueCloture {
    id: number;
    cloture_par_id: number;
    date_cloture: string;
    solde_initial: number;
    solde_final: number;
    comptable?: {
        name: string;
        email: string;
    };
}

interface CloturesIndexProps {
    soldeInitial: number;
    totalCredits: number;
    totalDebits: number;
    soldeFinalTheorique: number;
    lignesEnAttente: number;
    historiqueClotures: HistoriqueCloture[];
}

interface PageProps {
    flash: {
        success: string | null;
        danger: string | null;
        error: string | null;
    };
    [key: string]: any;
}

export default function Index({ 
    soldeInitial, 
    totalCredits, 
    totalDebits, 
    soldeFinalTheorique, 
    lignesEnAttente, 
    historiqueClotures = []
}: CloturesIndexProps) {
    
    const { props } = usePage<PageProps>();
    const { flash } = props;
    
    const [visibleSuccess, setVisibleSuccess] = useState<string | null>(flash?.success);
    const [visibleDanger, setVisibleDanger] = useState<string | null>(flash?.danger || flash?.error);

    useEffect(() => {
        setVisibleSuccess(flash?.success);
        setVisibleDanger(flash?.danger || flash?.error);

        let successTimer: any;
        if (flash?.success) {
            successTimer = setTimeout(() => {
                setVisibleSuccess(null);
            }, 5000);
        }

        let dangerTimer: any;
        if (flash?.danger || flash?.error) {
            dangerTimer = setTimeout(() => {
                setVisibleDanger(null);
            }, 5000);
        }

        return () => {
            clearTimeout(successTimer);
            clearTimeout(dangerTimer);
        };
    }, [flash]);

    const { post, processing } = useForm({});

    const validerArreteDeCaisse = (e: FormEvent) => {
        e.preventDefault();
        if (lignesEnAttente === 0) {
            if (confirm("Confirmez-vous l'exécution du procès-verbal d'arrêté de caisse ? Cette action figera définitivement les lignes.")) {
                post('/clotures/executer');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <Head title="Arrêté de Caisse - Comptabilité" />

            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800">Procédure d'Arrêté de Caisse</h1>
                        <p className="text-sm text-gray-500 mt-1">Clôture de la période et verrouillage de l'historique financier.</p>
                    </div>
                    <Link href="/dashboard" className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition self-start sm:self-auto">
                        ◀ Retour au Tableau de bord
                    </Link>
                </div>

                {(visibleSuccess || visibleDanger) && (
                    <div className="mb-6 space-y-3">
                        {visibleSuccess && (
                            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3 text-emerald-800 font-semibold">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    <p className="text-sm">{visibleSuccess}</p>
                                </div>
                                <button onClick={() => setVisibleSuccess(null)} className="text-emerald-500 hover:text-emerald-700 bg-transparent border-0 cursor-pointer">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {visibleDanger && (
                            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3 text-rose-800 font-semibold">
                                    <AlertCircle size={18} className="text-rose-500" />
                                    <p className="text-sm">{visibleDanger}</p>
                                </div>
                                <button onClick={() => setVisibleDanger(null)} className="text-rose-500 hover:text-rose-700 bg-transparent border-0 cursor-pointer">
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {lignesEnAttente > 0 ? (
                    <div className="bg-red-50 border-l-8 border-red-600 p-6 rounded-xl shadow-sm mb-8">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚠️</span>
                            <div>
                                <h3 className="font-bold text-red-800 text-lg">Clôture système temporairement bloquée</h3>
                                <p className="text-sm text-red-700 mt-1">
                                    Il reste actuellement <span className="font-black">{lignesEnAttente} transaction(s)</span> au statut <span className="italic">"En attente"</span> dans la file de validation du manager. 
                                    Conformément aux règles de contrôle interne, toutes les lignes doivent être arbitrées avant de pouvoir figer la période.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-50 border-l-8 border-emerald-500 p-6 rounded-xl shadow-sm mb-8">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">✅</span>
                            <div>
                                <h3 className="font-bold text-emerald-800 text-lg">Indicateurs d'intégrité au vert</h3>
                                <p className="text-sm text-emerald-700 mt-1">
                                    Toutes les transactions de la période ont été arbitrées par la hiérarchie. Le système est prêt pour l'exécution du procès-verbal d'arrêté de caisse.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                    <h3 className="font-bold text-gray-700 border-b border-gray-100 pb-3 mb-4 uppercase text-xs tracking-wider">
                        Reconstitution de la balance comptable
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs font-bold text-gray-400 uppercase">Solde Initial (+)</p>
                            <p className="text-xl font-extrabold text-gray-700 mt-1">{soldeInitial.toLocaleString()} F</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs font-bold text-blue-400 uppercase">Approvisionnements (+)</p>
                            <p className="text-xl font-extrabold text-blue-600 mt-1">+{totalCredits.toLocaleString()} F</p>
                        </div>
                        <div className="p-3 bg-rose-50 rounded-lg">
                            <p className="text-xs font-bold text-rose-400 uppercase">Dépenses Validées (-)</p>
                            <p className="text-xl font-extrabold text-rose-600 mt-1">-{totalDebits.toLocaleString()} F</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <p className="text-xs font-bold text-emerald-500 uppercase">Solde Final Arrêté (=)</p>
                            <p className="text-xl font-black text-emerald-600 mt-1">{soldeFinalTheorique.toLocaleString()} F</p>
                        </div>
                    </div>
                    <form onSubmit={validerArreteDeCaisse} className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing || lignesEnAttente > 0}
                            className={`px-6 py-3 font-bold text-sm text-white rounded-lg shadow-md transition ${
                                lignesEnAttente > 0
                                    ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300'
                            } disabled:opacity-50`}
                        >
                            {processing ? 'Génération de l\'arrêté en cours...' : '🔐 Signer et Clôturer la période'}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-700">📜 Archives historiques des procès-verbaux</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-500 text-xs font-bold uppercase border-b border-gray-200 tracking-wider">
                                    <th className="p-4">Date de clôture</th>
                                    <th className="p-4">Comptable Signataire</th>
                                    <th className="p-4 text-right">Solde Initial</th>
                                    <th className="p-4 text-right">Solde Final Figé</th>
                                    <th className="p-4 text-center">Facture / PV</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
                                {historiqueClotures.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-6 text-center text-gray-400">
                                            Aucun historique d'arrêté disponible.
                                        </td>
                                    </tr>
                                ) : (
                                    historiqueClotures.map((cloture) => (
                                        <tr key={cloture.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-gray-500">
                                                {new Date(cloture.date_cloture).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="p-4 font-semibold text-gray-900">
                                                {cloture.comptable?.name || 'Comptable Système'}
                                            </td>
                                            <td className="p-4 text-right font-mono text-gray-600">
                                                {cloture.solde_initial.toLocaleString()} F
                                            </td>
                                            <td className="p-4 text-right font-black text-emerald-600">
                                                {cloture.solde_final.toLocaleString()} F
                                            </td>
                                            <td className="p-4 text-center">
                                                <a 
                                                    href={`/clotures/${cloture.id}/pdf`} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline"
                                                >
                                                    <FileText size={14} /> Télécharger
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
