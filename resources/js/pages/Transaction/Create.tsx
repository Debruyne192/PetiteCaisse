import React, { FormEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from "@/layouts/DashboardLayout";

interface Categorie {
    id: number;
    nom: string;
    slug: string;
}

interface CreerTransactionProps {
    categories: Categorie[];
}

export default function Create({ categories }: CreerTransactionProps) {
    // 1. Initialisation du hook de formulaire d'Inertia avec typage strict
    const { data, setData, post, processing, errors } = useForm({
        montant: '',
        type: 'debit', // Valeur par défaut : Débit (Dépense)
        description: '',
        reference_piece: '',
        chemin_justificatif: null as File | null, // Fichier binaire pour la photo du reçu
        categorie_id: ''
    });

    // 2. Traitement de la soumission asynchrone (POST)
    const soumettreFormulaire = (e: FormEvent) => {
        e.preventDefault();
        
        // Inertia convertit automatiquement l'objet en FormData dès qu'il détecte un fichier File
        post('/transaction');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <Head title="Saisir un mouvement - Petite Caisse" />

            <div className="bg-white p-8 rounded-xl shadow-sm max-w-xl w-full border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-800">Nouvelle Opération de Caisse</h2>
                    <Link href="/transaction" className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition">
                        ✕ Annuler
                    </Link>
                </div>

                <form onSubmit={soumettreFormulaire} className="space-y-5">
                    {/* --- SÉLECTION DU TYPE DE MOUVEMENT --- */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Type de Flux</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => { setData(prev => ({ ...prev, type: 'debit' })); }}
                                className={`p-3 rounded-lg font-bold text-sm border text-center transition ${
                                    data.type === 'debit' 
                                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                📉 Débit (Dépense)
                            </button>
                            <button
                                type="button"
                                onClick={() => { setData(prev => ({ ...prev, type: 'credit', categorie_id: '' })); }}
                                className={`p-3 rounded-lg font-bold text-sm border text-center transition ${
                                    data.type === 'credit' 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                📈 Crédit (Approvisionnement)
                            </button>
                        </div>
                    </div>

                    {/* --- CHAMP MONTANT --- */}
                    <div>
                        <label htmlFor="montant" className="block text-xs font-bold uppercase text-gray-500 mb-1">Montant (FCFA)</label>
                        <input
                            id="montant"
                            type="number"
                            min="1"
                            placeholder="Ex: 25000"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={data.montant}
                            onChange={e => setData('montant', e.target.value)}
                        />
                        {errors.montant && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.montant}</p>}
                    </div>

                    {/* --- CHAMP SÉLECTION DES CATÉGORIES (UNIQUEMENT POUR LES DÉBITS) --- */}
                    {data.type === 'debit' && (
                        <div>
                            <label htmlFor="categorie_id" className="block text-xs font-bold uppercase text-gray-500 mb-1">Catégorie de Frais</label>
                            <select
                                id="categorie_id"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                                value={data.categorie_id}
                                onChange={e => setData('categorie_id', e.target.value)}
                            >
                                <option value="">-- Sélectionnez une catégorie --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                ))}
                            </select>
                            {errors.categorie_id && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.categorie_id}</p>}
                        </div>
                    )}

                    {/* --- CHAMP DESCRIPTION (MOTIF) --- */}
                    <div>
                        <label htmlFor="description" className="block text-xs font-bold uppercase text-gray-500 mb-1">Motif / Description</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Ex: Achat de carburant pour la mission Bobo"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.description}</p>}
                    </div>

                    {/* --- CHAMP RÉFÉRENCE DE LA PIÈCE (REÇU OU CHÈQUE) --- */}
                    <div>
                        <label htmlFor="reference_piece" className="block text-xs font-bold uppercase text-gray-500 mb-1">
                            {data.type === 'debit' ? 'Référence du Reçu (Optionnel)' : 'Référence du Bon / Chèque'}
                        </label>
                        <input
                            id="reference_piece"
                            type="text"
                            placeholder={data.type === 'debit' ? 'Ex: CCS7391' : 'Ex: CHQ-8492'}
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={data.reference_piece}
                            onChange={e => setData('reference_piece', e.target.value)}
                        />
                        {errors.reference_piece && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.reference_piece}</p>}
                    </div>

                    {/* --- TÉLÉVERSEMENT DU JUSTIFICATIF (OBLIGATOIRE POUR LES DÉBITS) --- */}
                    {data.type === 'debit' && (
                        <div>
                            <label htmlFor="chemin_justificatif" className="block text-xs font-bold uppercase text-gray-500 mb-1">Preuve Numérique (Photo / Scan Reçu)</label>
                            <input
                                id="chemin_justificatif"
                                type="file"
                                accept="image/*,application/pdf"
                                className="w-full border border-gray-300 bg-gray-50 rounded-lg p-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
                                onChange={e => {
                                    const fichiers = e.target.files;
                                    if (fichiers && fichiers.length > 0) {
                                        setData('chemin_justificatif', fichiers[0]);
                                    }
                                }}
                            />
                            {errors.chemin_justificatif && <p className="text-xs text-rose-600 font-semibold mt-1">{errors.chemin_justificatif}</p>}
                        </div>
                    )}

                    {/* --- BOUTON DE SOUMISSION --- */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full text-white font-bold text-sm p-3 rounded-lg shadow-sm transition mt-6 ${
                            data.type === 'debit' 
                                ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                        } disabled:opacity-50`}
                    >
                        {processing ? 'Transmission en cours...' : 'Soumettre le Mouvement'}
                    </button>
                </form>
            </div>
        </div>
    );
}
Create.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

