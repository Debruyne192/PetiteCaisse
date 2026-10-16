import AccueilLayout from '@/layouts/AccueilLayout';
import { Head } from '@inertiajs/react';
import { Phone, Mail, Clock, HelpCircle } from 'lucide-react';

export default function Support() {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
            <Head title="Assistance Technique" />

            <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <HelpCircle size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Centre d'assistance</h1>
                    <p className="text-sm text-slate-500">Besoin d'aide ou signalement d'un dysfonctionnement ?</p>
                </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
                Si vous rencontrez une erreur réseau (ex: réinitialisation du serveur d'actifs, anomalie d'authentification) ou si vous constatez un écart sur le solde numérique disponible, veuillez contacter la cellule de support informatique de l'établissement.
            </p>

            {/* Canaux de contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border border-slate-200 rounded-xl flex items-center gap-3">
                    <div className="text-indigo-600"><Mail size={20} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Par Email</p>
                        <p className="text-sm font-semibold text-slate-700 mt-0.5">support@petite-caisse.local</p>
                    </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl flex items-center gap-3">
                    <div className="text-emerald-600"><Phone size={20} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Ligne Interne</p>
                        <p className="text-sm font-semibold text-slate-700 mt-0.5">Poste technique : #5174</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-amber-800 text-xs">
                <Clock size={18} className="shrink-0 text-amber-600" />
                <div>
                    <p className="font-bold">Disponibilité du support comptable</p>
                    <p className="mt-0.5 text-amber-700/90 leading-relaxed">
                        Nos techniciens et administrateurs de la base de données PostgreSQL supervisent la plateforme du lundi au vendredi, de 08:00 à 17:30.
                    </p>
                </div>
            </div>
        </div>
    );
}

Support.layout = (page: React.ReactNode) => <AccueilLayout children={page} />;
