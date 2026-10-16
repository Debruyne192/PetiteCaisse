import AccueilLayout from "@/layouts/AccueilLayout";
import { Head } from '@inertiajs/react';
import { BookOpen, ShieldAlert, BadgeHelp } 
from 'lucide-react';

export default function Aide() {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
            <Head title="Documentation & Aide" />

            <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Guide d'utilisation</h1>
                    <p className="text-sm text-slate-500">Comprendre le fonctionnement de la Petite Caisse.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                        <span>📥</span> Espace Caissier
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Le caissier est responsable de la saisie quotidienne des flux financiers. Il enregistre les approvisionnements (Crédits) et les dépenses (Débits). Chaque dépense doit obligatoirement être accompagnée d'une référence de pièce et d'une photo claire du reçu de paiement.
                    </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                        <span>🛡️</span> Espace Manager
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Le manager arbitre les lignes en attente depuis son tableau de bord. Il accorde son Visa (Validation) ou refuse la transaction. En cas de rejet, la saisie d'un motif explicite est requise par le système pour notifier le caissier.
                    </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                        <span>🔒</span> Espace Comptable
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Le comptable supervise la balance financière globale et gère les comptes du personnel. En fin de période, si toutes les transactions ont été arbitrées, il procède à l'arrêté de caisse numérique pour figer définitivement les écritures de l'historique dans PostgreSQL.
                    </p>
                </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldAlert size={14} />
                <span>Sécurité système : Toutes les actions sur les flux financiers sont tracées et horodatées.</span>
            </div>
        </div>
    );
}

Aide.layout = (page: React.ReactNode) => <AccueilLayout children={page} />;
