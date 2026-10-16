import { Link, router, usePage, Head, useForm } from "@inertiajs/react";
import React, { FormEvent, useState ,useEffect} from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";
import { Plus, SquarePen, Trash, X, CheckCircle2,  Check, Ban, Eye ,AlertTriangle,AlertCircle} from "lucide-react";

interface Categorie {
    id: number;
    nom: string;
    slug: string;
}

interface Caissier {
    id: number;
    name: string;
    email: string;
    role: 'caissier' | 'manager' | 'comptable';
}

interface Transaction {
    id: number;
    personne_id: number;
    categorie_id: number | null;
    montant: number;
    type: 'debit' | 'credit';
    description: string;
    reference_piece: string | null;
    chemin_justificatif: string | null;
    statut: 'en_attente' | 'validé' | 'rejeté';
    controle_par_id: number | null;
    motif_rejet: string | null;
    est_verrouille: boolean;
    created_at: string;
    updated_at: string;
    caissier?: Caissier;
    categorie?: Categorie;
}

export interface IndexProps {
    soldeRestant: number;
    totalCredits: number;
    totalDebits: number;
    transactions: Transaction[];
    categories: Categorie[];
}

interface PageProps {
    auth: { user: any };
    flash: {
        success: string | null;
        error: string | null;
        danger: string | null;
    };
}

export default function Dashboard({ soldeRestant, totalCredits, totalDebits, transactions = [], categories = [] }: IndexProps) {
    const { auth, flash } = usePage<any>().props as PageProps;
    const acteur = auth.user;

    const [idTransactionRejet, setIdTransactionRejet] = useState<number | null>(null);
    const formRejet = useForm({ motif_rejet: '' });

    const executerRejet = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        formRejet.put(`/transaction/${id}/rejeter`, {
            onSuccess: () => {
                setIdTransactionRejet(null);
                formRejet.reset();
            }
        });
    };

    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

    const formTransaction = useForm({
        _method: 'POST', // Permet de tricher en PUT lors du traitement du justificatif
        categorie_id: '',
        montant: '',
        type: 'debit',
        description: '',
        reference_piece: '',
        chemin_justificatif: null as File | null,
    });

    const openCreateModal = () => {
        setIsEditMode(false);
        setSelectedTransactionId(null);
        formTransaction.reset();
        setIsTransactionModalOpen(true);
    };

    const openEditModal = (t: Transaction) => {
        setIsEditMode(true);
        setSelectedTransactionId(t.id);
        formTransaction.setData({
            _method: 'PUT',
            categorie_id: t.categorie_id ? String(t.categorie_id) : '',
            montant: String(t.montant),
            type: t.type,
            description: t.description,
            reference_piece: t.reference_piece || '',
            chemin_justificatif: null,
        });
        setIsTransactionModalOpen(true);
    };
    const [visibleSuccess, setVisibleSuccess] = useState<string | null>(flash?.success);
        const [visibleDanger, setVisibleDanger] = useState<string | null>(flash?.danger || flash?.error);
    
      useEffect(() => {
            setVisibleSuccess(flash?.success);
            setVisibleDanger(flash?.danger || flash?.error);
    
            // 💡 CORRECTION : Utilisation de "number" ou "any" pour éviter le conflit NodeJS
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
    
            // Nettoyage des minuteurs
            return () => {
                clearTimeout(successTimer);
                clearTimeout(dangerTimer);
            };
        }, [flash]);

    const handleTransactionSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditMode && selectedTransactionId) {
            router.post(`/transaction/${selectedTransactionId}`, formTransaction.data as any, {
                onSuccess: () => { setIsTransactionModalOpen(false); formTransaction.reset(); }
            });
        } else {
            formTransaction.post('/transaction', {
                onSuccess: () => { setIsTransactionModalOpen(false); formTransaction.reset(); }
            });
        }
    };

    const validerTransaction = (id: number) => {
        if (confirm("Voulez-vous accorder votre Visa (Validation) pour cette dépense ?")) {
            router.put(`/transaction/${id}/valider`);
        }
    };

    return (

        <div className="flex-1 p-8 bg-gray-50 min-h-screen">
            <Head title="Suivi de la Petite Caisse" />            
            {(visibleSuccess || visibleDanger) ? (
                    <div className="space-y-4">
                        {/* Cas Succès */}
                        {visibleSuccess && (
                            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center justify-between shadow-sm transition-all duration-300">
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
                            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl flex items-center justify-between shadow-sm transition-all duration-300">
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
                ) : (
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Suivi de la Petite Caisse</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-emerald-500">
                    <p className="text-sm font-semibold text-gray-500 uppercase">Solde Disponible (FCFA)</p>
                    <p className="text-3xl font-black text-emerald-600 mt-2">{soldeRestant.toLocaleString()} F</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-blue-500">
                    <p className="text-sm font-semibold text-gray-500 uppercase">Total Approvisionnements</p>
                    <p className="text-3xl font-black text-blue-600 mt-2">+{totalCredits.toLocaleString()} F</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-rose-500">
                    <p className="text-sm font-semibold text-gray-500 uppercase">Total Dépenses Validées</p>
                    <p className="text-3xl font-black text-rose-600 mt-2">-{totalDebits.toLocaleString()} F</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-700">
                        {acteur?.role === 'manager' ? "📥 File d'attente des validations (Visa)" : "📋 Grand livre des mouvements récents"}
                    </h3>
                    {acteur?.role === 'caissier' && (
                        <button onClick={openCreateModal} className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2 px-4 font-medium flex items-center gap-2 text-sm shadow-sm transition-all">
                            <Plus size={16} /> Ajouter un flux
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1e293b] text-white text-xs font-bold uppercase border-b border-gray-200 tracking-wider">
                                <th className="border-1 border-gray-600 p-4">Date</th>
                                <th className="border-1 border-gray-600 p-4">Caissier</th>
                                <th className="border-1 border-gray-600 p-4">Type / Catégorie</th>
                                <th className="border-1 border-gray-600 p-4">Description / Référence</th>
                                <th className="border-1 border-gray-600 p-4">Montant</th>
                                <th className="border-1 border-gray-600 p-4">Statut</th>
                                <th className="border-1 border-gray-600 p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                                        <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">
                                Aucune opération enregistrée sur cette période.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 text-gray-500">
                                    {new Date(t.created_at).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="p-4 font-semibold text-gray-900">
                                    {t.caissier?.name || 'Système'}
                                </td>
                                <td className="p-4">
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase text-white ${
                                        t.type === 'credit' ? 'bg-blue-500' : 'bg-purple-500'
                                    }`}>
                                        {t.type === 'credit' ? 'Crédit' : t.categorie?.nom}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <p className="font-medium text-gray-800">{t.description}</p>
                                    {t.reference_piece && (
                                        <span className="text-xs text-gray-400">Réf: {t.reference_piece}</span>
                                    )}
                                    {t.statut === 'rejeté' && (
                                        <p className="text-xs text-red-500 font-semibold mt-1">
                                            ❌ Motif : {t.motif_rejet}
                                        </p>
                                    )}
                                </td>
                                <td className={`p-4 font-bold text-base ${
                                    t.type === 'credit' ? 'text-blue-600' : 'text-gray-900'
                                }`}>
                                    {t.type === 'credit' ? '+' : '-'} {t.montant.toLocaleString()} F
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        t.statut === 'validé' ? 'bg-emerald-100 text-emerald-700' :
                                        t.statut === 'rejeté' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {t.statut === 'validé' ? 'Validé' : t.statut === 'rejeté' ? 'Rejeté' : 'En attente'}
                                    </span>
                                </td>
                                <td className="p-4 text-center space-x-2">
                                    {t.chemin_justificatif && (
                                        <a 
                                            href={`/storage/${t.chemin_justificatif}`} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition"
                                        >
                                            <Eye size={14} /> Reçu
                                        </a>
                                    )}

                                    {/* Actions Caissier (Modification si l'opération est en attente) */}
                                    {acteur?.role === 'caissier' && t.statut === 'en_attente' && (
                                        <button 
                                            onClick={() => openEditModal(t)} 
                                            className="p-1 text-blue-600 hover:bg-blue-50 rounded inline-flex"
                                        >
                                            <SquarePen size={16} />
                                        </button>
                                    )}

                                    {/* Actions Visa Manager */}
                                    {acteur?.role === 'manager' && t.statut === 'en_attente' && (
                                        <div className="inline-flex space-x-1">
                                            <button 
                                                onClick={() => validerTransaction(t.id)} 
                                                className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600" 
                                                title="Valider"
                                            >
                                                <Check size={14} />
                                            </button>
                                            <button 
                                                onClick={() => setIdTransactionRejet(t.id)} 
                                                className="bg-rose-500 text-white p-1 rounded hover:bg-rose-600" 
                                                title="Rejeter"
                                            >
                                                <Ban size={14} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>

    {isTransactionModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30 z-50 p-4">
            <form onSubmit={handleTransactionSubmit} className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-bold text-gray-800">
                        {isEditMode ? "✏️ Modifier le mouvement" : "📥 Enregistrer un flux de caisse"}
                    </h2>
                    <button 
                        type="button" 
                        onClick={() => setIsTransactionModalOpen(false)} 
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-600">Type de flux</label>
                        <select 
                            value={formTransaction.data.type} 
                            onChange={e => formTransaction.setData('type', e.target.value as any)} 
                            className="w-full mt-1 border rounded-lg p-2 text-sm bg-white" 
                            required
                        >
                            <option value="debit">Dépense (Débit)</option>
                            <option value="credit">Approvisionnement (Crédit)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-600">Montant (FCFA)</label>
                        <input 
                            type="number" 
                            value={formTransaction.data.montant} 
                            onChange={e => formTransaction.setData('montant', e.target.value)} 
                            className="w-full mt-1 border rounded-lg p-2 text-sm" 
                            required 
                        />
                        {formTransaction.errors.montant && (
                            <p className="text-red-500 text-xs mt-1">{formTransaction.errors.montant}</p>
                        )}
                    </div>
                </div>

                {formTransaction.data.type === 'debit' && (
                    <div>
                        <label className="text-xs font-semibold text-gray-600">Catégorie de la dépense</label>
                        <select 
                            value={formTransaction.data.categorie_id} 
                            onChange={e => formTransaction.setData('categorie_id', e.target.value)} 
                            className="w-full mt-1 border rounded-lg p-2 text-sm bg-white" 
                            required={formTransaction.data.type === 'debit'}
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                        </select>
                        {formTransaction.errors.categorie_id && (
                            <p className="text-red-500 text-xs mt-1">{formTransaction.errors.categorie_id}</p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                                                <div>
                                <label className="text-xs font-semibold text-gray-600">Numéro de pièce / Référence</label>
                                <input 
                                    type="text" 
                                    value={formTransaction.data.reference_piece} 
                                    onChange={e => formTransaction.setData('reference_piece', e.target.value)} 
                                    className="w-full mt-1 border rounded-lg p-2 text-sm" 
                                    placeholder="Ex: FACT-2026-001" 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600">Description / Libellé de l'opération</label>
                                <textarea 
                                    value={formTransaction.data.description} 
                                    onChange={e => formTransaction.setData('description', e.target.value)} 
                                    className="w-full mt-1 border rounded-lg p-2 text-sm h-20" 
                                    placeholder="Décrire le motif précis..." 
                                    required 
                                />
                                {formTransaction.errors.description && (
                                    <p className="text-red-500 text-xs mt-1">{formTransaction.errors.description}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-600 block mb-1">
                                Pièce justificative (Reçu / Facture)
                            </label>
                            <input 
                                type="file" 
                                accept="image/*,application/pdf" 
                                onChange={e => formTransaction.setData('chemin_justificatif', e.target.files?.[0] || null)} 
                                className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 w-full" 
                            />
                            {formTransaction.errors.chemin_justificatif && (
                                <p className="text-red-500 text-xs mt-1">{formTransaction.errors.chemin_justificatif}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <button 
                                type="button" 
                                onClick={() => setIsTransactionModalOpen(false)} 
                                className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                disabled={formTransaction.processing} 
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {formTransaction.processing ? 'Traitement...' : (isEditMode ? 'Mettre à jour' : 'Enregistrer')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {idTransactionRejet && (
                <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30 z-50 p-4">
                    <form onSubmit={(e) => executerRejet(e, idTransactionRejet)} className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Spécifier le motif du rejet</h3>
                        <div>
                            <label className="text-xs font-medium text-gray-600">Pourquoi refusez-vous cette transaction ?</label>
                            <textarea 
                                value={formRejet.data.motif_rejet} 
                                onChange={e => formRejet.setData('motif_rejet', e.target.value)} 
                                className="w-full mt-1 border rounded-lg p-2 text-sm h-24" 
                                placeholder="Ex: Justificatif illisible..." 
                                required 
                            />
                            {formRejet.errors.motif_rejet && (
                                <p className="text-red-500 text-xs mt-1">{formRejet.errors.motif_rejet}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button 
                                type="button" 
                                onClick={() => setIdTransactionRejet(null)} 
                                className="px-3 py-1.5 border rounded-lg text-xs text-gray-600 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                disabled={formRejet.processing} 
                                className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs hover:bg-rose-700"
                            >
                                Confirmer le rejet
                            </button>
                        </div>
                    </form>
                </div>
            )}
                    </div>
                )}
            
        </div>
    );
}

Dashboard.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
