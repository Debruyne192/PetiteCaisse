import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Briefcase, LogIn, UserPlus, Home } from 'lucide-react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function AccueilLayout({ children }: GuestLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    <Link href="/" className="flex items-center gap-2 font-black text-slate-800 text-lg tracking-wide hover:opacity-90 transition">
                        <div className="p-0.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100">
                            <img src="img/logo.avif" alt="Logo de l'entreprise" className="bg-gray-900 h-15 w-15 rounded-full "/>
                        </div>
                        <span>G-CAISSE WEB</span>
                    </Link>

                    <nav className="flex items-center gap-2 sm:gap-4">
                        <Link 
                            href="/" 
                            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                url === '/' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            <Home size={16} />
                            <span className="hidden sm:inline">Accueil</span>
                        </Link>

                        <Link 
                            href="/login" 
                            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                url === '/login' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            <LogIn size={16} />
                            <span className='hidden md:inline'>Connexion</span>
                        </Link>

                    </nav>

                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md mx-auto">
                    {children}
                </div>
            </main>

           <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    
                    <div>
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-700">Petite Caisse</span>. Tous droits réservés.
                    </div>

                    <div className="flex gap-4">
                        <Link href="/aide" className="hover:text-indigo-600 transition-colors">Documentation</Link>
                        <span className="text-slate-300">|</span>
                        <Link href="/support" className="hover:text-indigo-600 transition-colors">Assistance</Link>
                    </div>

                    <div className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-mono">
                        v2.1.0-prod
                    </div>
                </div>
            </footer>

        </div>
    );
}
