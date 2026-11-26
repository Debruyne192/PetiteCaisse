import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import React from 'react';
import { Briefcase, LogIn, UserPlus, Home ,Menu,X} from 'lucide-react';
import "./Sidebar.css";

interface GuestLayoutProps {
    children: ReactNode;
    
}

export default function AccueilLayout({ children }: GuestLayoutProps) {
    const { url } = usePage();
    const [isMenu, setIsMenu] = React.useState(false);
    React.useEffect(() => {
        setIsMenu(false);
    },[url]);
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
                {!isMenu && (
                <button 
                    className="absolute cursor-pointer right-6 top-6 z-50 md:hidden bg-slate-900/10 backdrop-blur-md p-2 rounded-xl text-white border border-white/10" 
                    onClick={() => setIsMenu(true)}
                >
                    <Menu size={22} />
                </button>
            )}
            {isMenu && (
                <button 
                    className="fixed cursor-pointer right-0 top-4 z-50 md:hidden bg-slate-900/10 backdrop-blur-md p-2 rounded-xl text-white border border-white/10" 
                    onClick={() => setIsMenu(false)}
                >
                    <X size={22} />
                </button>
            )}
                <nav className="relative  w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center z-10">
                    
                    <div className={` ${isMenu ? "max-md:mt-30" : ""} flex items-center space-x-3`}>
                        <img 
                            src="img/logo.avif" 
                            alt="Photo du logo" 
                            className="bg-slate-900 h-12 w-12 rounded-full border-2 border-indigo-500/30 object-cover shadow-sm"
                        />
                        <span className="text-xl font-black tracking-tight text-black">G-CAISSE WEB</span>
                    </div>

                    <div className={`${isMenu ? "fixed top-4 right-1 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl flex max-md:flex-col items-center max-md:space-y-1 shadow-2xl animate-fade-in z-50 p-5" : "max-md:hidden gap-8 flex flex-row bg-slate-900/95 backdrop-blur-xl border border-slate-800 -mr-18 rounded-lg p-5"}`}>
                                           <Link 
                                                href="/" 
                                                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                                    url === '/' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                                                }`} onClick={() => setIsMenu(false)}>
                                                Accueil
                                            </Link>
                                            <Link 
                                                href="/aide" 
                                                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                                    url === '/aide' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                                                }`} onClick={() => setIsMenu(false)}>
                                                Documentation
                                            </Link>
                                            <Link 
                                                href="/support" 
                                                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                                    url === '/support' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                                                }`} onClick={() => setIsMenu(false)}>
                                                Assistance
                                            </Link>
                                            <Link 
                                                href="/about" 
                                                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                                    url === '/about' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                                                }`} onClick={() => setIsMenu(false)}>
                                                A propos
                                            </Link>
                                            
                                                <Link 
                                                    href="/dashboard" 
                                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 transform hover:-translate-y-0.5"
                                                onClick={() => setIsMenu(false)}
                                                >
                                                 Mon Tableau de Bord
                                                </Link>
                                            
                                        </div>

                
            </nav>

            <main className={` ${isMenu ? "max-md:mt-45" : ""} flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8`}>
                <div className="w-full max-w-md mx-auto">
                    {children}
                </div>
            </main>

                <section className="relative bg-slate-900 text-white py-20 z-1">
                    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
                        <div className="space-y-1">
                            <p className="text-5xl font-black text-emerald-400 tracking-tight">100%</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Immuable après Arrêté</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-5xl font-black text-sky-400 tracking-tight">0%</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Risque de Trou de Caisse</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl font-black text-purple-400 tracking-tight">Binaire</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Archivage des Preuves</p>
                        </div>
                    </div>
                </section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">

                </div>
            <footer className="relative bg-white border-t border-slate-100 py-8 px-6 text-center text-xs font-bold text-slate-400 z-1">
                    <p>© {new Date().getFullYear()} G-Caisse Web — Entreprise Beltek.</p>
                </footer>

        </div>
    );
}
