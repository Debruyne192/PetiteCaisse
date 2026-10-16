import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Package,
    UserRound,
    Info,
    Phone,
    Calendar,
    Landmark,
    Menu,
    X,
    UserPen,
    Power,
    House,
    Badge
} from "lucide-react";
import { ReactNode, useState } from "react";
import "./Sidebar.css";

type User = {
    id: number;
    name: string;
    login: string;
    email: string;
    role: string;
    telephone?: string | null;
    image?: string | null;
};

type MenuItemType = {
    path: string;
    name: string;
    icon: ReactNode;
    roles: string[];
};

export default function DashboardLayout({
    children,
}: {
    children?: ReactNode;
}) {
    const { url, props } = usePage();

    // 💡 ÉTAT POUR GÉRER L'OUVERTURE COULISSANTE SUR MOBILE
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const auth = props.auth as unknown as {
        user: User | null;
    };

    const user = auth?.user;
    const role = user?.role;

    const MenuItem: MenuItemType[] = [
        {
            path: "/dashboard",
            name: "Mon Tableau de bord",
            icon: <House size={20} />,
            roles: ["manager", "comptable", "caissier", "employe"],
        },
        {
            path: "/mon-journal-caisse",
            name: "Mon Historique",
            icon: <Landmark size={20} />,
            roles: ["caissier"],
        },
        {
            path: "/transaction",
            name: "Effectuer une opération",
            icon: <Package size={20} />,
            roles: ["caissier"],
        },
        
        {
            path: "/personne",
            name: "Utilisateurs",
            icon: <UserRound size={20} />,
            roles: ["comptable"],
        },
        {
            path: "/category",
            name: "catégorie dépenses",
            icon: <Badge size={20} />,
            roles: ["caissier","manager","comptable"],
        },
       
        {
            path: "/clotures",
            name: "Clôturer la journée ou mois",
            icon: <Info size={20} />,
            roles: ["comptable"],
        },
        {
            path: "/transaction",
            name: "Visualiser les dépenses",
            icon: <Calendar size={20} />,
            roles: ["manager"],
        },
        {
            path: "/mon-profil",
            name: "Mon profil",
            icon: <UserPen size={20} />,
            roles: ["manager", "caissier", "comptable", "employe"],
        },
    ];

    const visibleMenus = MenuItem.filter((item) =>
        role ? item.roles.includes(role) : false
    );

    return (
        <div className="app-container">
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside className={`sidebar max-sm:bg-amber-700 ${isMobileOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-closed'}`}>
                <div className="absolute bars  cursor-pointer right-1.5 top-6.5" onClick={() => setIsMobileOpen(false)}>
                        <X size={22} className="md:hidden "/>
                </div>

                {user && (
                    <div className="user-profile">
                        <div className="user-avatar">
                            {user.image ? (
                                <img 
                                    src={`/storage/${user.image}`} 
                                    alt={`Photo de ${user.name}`} 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-inner"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white uppercase text-xs">
                                    {user.name.substring(0, 2)}
                                </div>
                            )}
                        </div>

                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <span className="user-role">{user.role}</span>
                        </div>
                    </div>
                )}

                <nav className="sidebar-links">
                    {visibleMenus.map((item) => {
                        const isActive =
                            item.path === "/dashboard"
                                ? url === item.path
                                : url === item.path || url.startsWith(`${item.path}/`);

                        return (
                            <Link
                                href={item.path}
                                key={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={`link ${isActive ? "active" : ""}`}
                            >
                                <div className="link-icon">
                                    {item.icon}
                                </div>
                                <span className="link-text">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {user && (
                    <div className="p-4 border-t border-slate-800 bg-slate-950 gap-2 mt-auto">
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button" 
                            className="flex items-center w-full mb-2 px-2 py-1 text-sm font-medium hover:text-red-300 rounded transition gap-4 text-white bg-transparent border-0 text-left cursor-pointer"
                            onClick={(e) => {
                                if (!confirm("Voulez-vous vraiment vous déconnecter de votre espace Petite Caisse ?")) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <div>
                                <Power size={20} />
                            </div>
                            <span className="link-text">Se déconnecter</span>
                        </Link>
                    </div>
                )}
            </aside>

            <main className="main-content max-sm:ml-0">
                <div className="sm:hidden p-4 bg-white border-b sticky top-0 flex items-center justify-between z-30 shadow-sm">
                    <button onClick={() => setIsMobileOpen(true)} className="p-1 rounded text-gray-700 bg-transparent border-0 cursor-pointer">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-xs text-gray-700 uppercase tracking-wider">Espace {user?.role}</span>
                </div>

                <div className="p-4 sm:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
