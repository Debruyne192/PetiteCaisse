import { Link } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, User, List, BarChart3, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    // État pour gérer l'ouverture du menu mobile
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Liens fixes de navigation
    const menuLinks = [
        { href: '/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
        { href: '/mon-profil', label: 'Mon Profil', icon: <User size={18} /> },
        { href: '/category', label: 'Catégories', icon: <List size={18} /> },
        { href: '/rapports', label: 'Rapports', icon: <BarChart3 size={18} /> },
        { href: '/settings', label: 'Configuration', icon: <Settings size={18} /> },
    ];

    const confirmLogout = (e: React.MouseEvent) => {
        if (!confirm("Voulez-vous vraiment vous déconnecter de votre espace ?")) {
            e.preventDefault();
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            
            {/* Volet de fermeture au clic en dehors du menu sur Mobile */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* SIDEBAR RESPONSIVE */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col justify-between shadow-lg z-50 transform transition-transform duration-300 ease-in-out
                lg:static lg:translate-x-0 
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div>
                    {/* En-tête Sidebar */}
                    <div className="p-5 text-xl font-bold border-b border-slate-800 tracking-wide flex items-center justify-between">
                        <span>💼 Application</span>
                        <button 
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-1 text-slate-400 hover:text-white rounded-md"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Liens de navigation */}
                    <nav className="p-4 space-y-1">
                        {menuLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bouton de Déconnexion au pied */}
                <div className="p-4 border-t border-slate-800 bg-slate-950">
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button" 
                        onClick={confirmLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-lg transition text-left"
                    >
                        <LogOut size={18} /> 
                        Se déconnecter
                    </Link>
                </div>
            </aside>

            {/* CONTENU PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Header supérieur permanent */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        {/* Bouton burger visible uniquement sur mobile */}
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-bold text-gray-800">Espace Privé</h1>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Date : {new Date().toLocaleDateString('fr-FR')}</span>
                </header>

                {/* Conteneur de vos pages (Children) */}
                <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
