import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from "@/layouts/DashboardLayout";

interface Operation {
    id: number;
    montant: number;
    type: 'debit' | 'credit';
    description: string;
    reference_piece: string | null;
    chemin_justificatif: string | null;
    statut: 'en_attente' | 'validé' | 'rejeté';
    motif_rejet: string | null;
    created_at: string;
    categorie?: { nom: string };
    controleur?: { name: string };
}

interface Props {
    operations: Operation[];
}

export default function HistoriquePersonnel({ operations }: Props) {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title="Mon Journal de Caisse - G-Caisse" />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Mon Journal de Caisse</h1>
                        <p className="text-sm text-gray-500 mt-1">Historique complet de mes enregistrements et états de validation.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className=''>
                                <tr className="bg-gray-100 text-gray-600 text-xs font-bold uppercase border-b border-gray-200">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Type / Catégorie</th>
                                    <th className="p-4">Description / Preuve</th>
                                    <th className="p-4">Montant</th>
                                    <th className="p-4">Statut Validation</th>
                                    <th className="p-4">Visa Contrôleur</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
                                {operations.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">Vous n'avez enregistré aucun mouvement de caisse.</td>
                                    </tr>
                                ) : (
                                    operations.map((op) => (
                                        <tr key={op.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-gray-500">{new Date(op.created_at).toLocaleDateString('fr-BF')}</td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase text-white ${op.type === 'credit' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                                                    {op.type === 'credit' ? 'Crédit (Renflouement)' : op.categorie?.nom}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-semibold text-gray-800">{op.description}</p>
                                                {op.reference_piece && <span className="text-xs text-gray-400 block">Réf : {op.reference_piece}</span>}
                                                {op.chemin_justificatif && (
                                                    <a href={`/storage/${op.chemin_justificatif}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-bold hover:underline mt-1 inline-block">📄 Voir la pièce jointe</a>
                                                )}
                                                {op.statut === 'rejeté' && (
                                                    <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-2 rounded text-xs text-red-700">
                                                        <strong>Motif du rejet :</strong> {op.motif_rejet}
                                                    </div>
                                                )}
                                            </td>
                                            <td className={`p-4 font-extrabold text-base ${op.type === 'credit' ? 'text-blue-600' : 'text-gray-900'}`}>
                                                {op.type === 'credit' ? '+' : '-'} {op.montant.toLocaleString()} F
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    op.statut === 'validé' ? 'bg-emerald-100 text-emerald-800' :
                                                    op.statut === 'rejeté' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {op.statut === 'validé' ? 'Validé' : op.statut === 'rejeté' ? 'Rejeté' : 'En attente'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 font-medium italic">
                                                {op.statut === 'validé' && op.controleur ? `Signé par : ${op.controleur.name}` : '—'}
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
HistoriquePersonnel.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
