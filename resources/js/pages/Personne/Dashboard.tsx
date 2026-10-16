import DashboardLayout from '../../layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from 'react';

interface DashboardProps {
    soldeRestant: number;
    totalCredits: number;
    totalDebits: number;
    countEnAttente : number;
    countValide : number; 
    countRejete : number;
}
interface PageProps {
    flash: {
        success: string | null;
        danger: string | null;
        error: string | null;
    };
    [key: string]: any;
}

export default function Dashboard({soldeRestant , totalCredits , totalDebits ,countEnAttente , countValide , countRejete}:DashboardProps) {
    const { props } = usePage<PageProps>();
    const { flash } = props;
    const { auth } = usePage<any>().props;

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


    return (
        <>
            <Head title="Tableau de bord" />
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

                {(visibleSuccess || visibleDanger) ? (
                    <div className="space-y-4">
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
                    <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Bienvenue, {auth.user.name} !
                    </h2>
                    <p className="text-gray-600">
                        Vous êtes connecté à l'application de gestion de la Petite Caisse avec le rôle d'accès : 
                        <strong className="text-slate-900 uppercase ml-1">{auth.user.role}</strong>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-8 border-emerald-500">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Solde Numérique Disponible</p>
                        <p className="text-2xl font-black text-emerald-600 mt-2">{soldeRestant.toLocaleString('fr-FR')} F</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-8 border-blue-500">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Approvisionnements</p>
                        <p className="text-2xl font-black text-blue-600 mt-2">+{totalCredits.toLocaleString('fr-FR')} F</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-8 border-rose-500">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Dépenses Validées</p>
                        <p className="text-2xl font-black text-rose-600 mt-2">-{totalDebits.toLocaleString('fr-FR')} F</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        Statut global des flux et pièces justificatives
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <div>
                                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">En attente de visa</p>
                                <p className="text-2xl font-black text-amber-600 mt-1">{countEnAttente}</p>
                            </div>
                            <span className="text-2xl">⏳</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div>
                                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Approuvées / Clôturées</p>
                                <p className="text-2xl font-black text-emerald-600 mt-1">{countValide}</p>
                            </div>
                            <span className="text-2xl">✅</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl border border-rose-100">
                            <div>
                                <p className="text-xs font-bold text-rose-700 uppercase tracking-wide">Mouvements Refusés</p>
                                <p className="text-2xl font-black text-rose-600 mt-1">{countRejete}</p>
                            </div>
                            <span className="text-2xl">❌</span>
                        </div>
                    </div>
                </div>

            </div>
                )}
                
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
