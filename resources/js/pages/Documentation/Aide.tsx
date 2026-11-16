import AccueilLayout from "@/layouts/AccueilLayout";
import { Head } from '@inertiajs/react';
import { BookOpen, ShieldAlert, BadgeHelp } 
from 'lucide-react';

export default function Aide() {
    return (
        <div className="md:w-[200%] sm:w-[130%] bg-[#111827] text-white py-20 px-6 relative overflow-hidden sm:-ml-16 md:-ml-50">
                       <div className="max-w-7xl mx-auto space-y-16">
            <Head title="Documentation & Aide" />

            <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold">Guide d'utilisation</h1>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">Comprendre le fonctionnement de la Petite Caisse.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               
                <div 
                    className="bg-[#1f2937]/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6 transform hover:scale-[1.02] hover:border-indigo-500/50 hover:bg-[#1f2937]/70 transition duration-300 shadow-xl"                
                >
                    <h3 
                        className="text-base sm:text-lg font-black tracking-wider uppercase text-white">
                        <span>📥</span> Espace Caissier
                    </h3>
                    <p 
                        className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                        Le caissier est responsable de la saisie quotidienne des flux financiers. Il enregistre les approvisionnements (Crédits) et les dépenses (Débits). Chaque dépense doit obligatoirement être accompagnée d'une référence de pièce et d'une photo claire du reçu de paiement.
                    </p>
                </div>

                <div className="bg-[#1f2937]/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6 transform hover:scale-[1.02] hover:border-indigo-500/50 hover:bg-[#1f2937]/70 transition duration-300 shadow-xl">
                    <h3 
                        className="text-base sm:text-lg font-black tracking-wider uppercase text-white">
                        <span>🛡️</span> Espace Manager
                    </h3>
                    <p 
                        className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                        Le manager arbitre les lignes en attente depuis son tableau de bord. Il accorde son Visa (Validation) ou refuse la transaction. En cas de rejet, la saisie d'un motif explicite est requise par le système pour notifier le caissier.
                    </p>
                </div>

                <div className="bg-[#1f2937]/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6 transform hover:scale-[1.02] hover:border-indigo-500/50 hover:bg-[#1f2937]/70 transition duration-300 shadow-xl">
                    <h3 
                        className="text-base sm:text-lg font-black tracking-wider uppercase text-white">
                        <span>🔒</span> Espace Comptable
                    </h3>
                    <p 
                        className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                        Le comptable supervise la balance financière globale et gère les comptes du personnel. En fin de période, si toutes les transactions ont été arbitrées, il procède à l'arrêté de caisse numérique pour figer définitivement les écritures de l'historique dans PostgreSQL.
                    </p>
                </div>
            </div>

          </div>
        </div>
    );
}

Aide.layout = (page: React.ReactNode) => <AccueilLayout children={page} />;
