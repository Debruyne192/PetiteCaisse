import { Link, usePage } from "@inertiajs/react";

import {
    LayoutDashboard,
    Package,
    UserRound,
    Info,
    Phone,
    Menu,
} from "lucide-react";

import { ReactNode } from "react";

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

export default function Sidebar({
    children,
}: {
    children?: ReactNode;
}) {
    const { url, props } = usePage();

    // 👇 On passe d'abord par unknown pour éviter
    // le conflit de types entre Inertia et notre User
    const auth = props.auth as unknown as {
        user: User | null;
    };

    const user = auth?.user;
    const role = user?.role;

    const MenuItem: MenuItemType[] = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            roles: ["manager", "comptable", "caissier"],
        },
        {
            path: "/products",
            name: "Produits",
            icon: <Package size={20} />,
            roles: ["admin", "agentCommercial"],
        },
        {
            path: "/users",
            name: "Utilisateurs",
            icon: <UserRound size={20} />,
            roles: ["admin"],
        },
        {
            path: "/about",
            name: "À propos",
            icon: <Info size={20} />,
            roles: ["admin", "agentCommercial", "client"],
        },
        {
            path: "/contact",
            name: "Contact",
            icon: <Phone size={20} />,
            roles: ["admin", "agentCommercial", "client"],
        },
    ];

    const visibleMenus = MenuItem.filter((item) =>
        role ? item.roles.includes(role) : false
    );

    return (
        <div className="app-container">

            <aside className="sidebar">

                <div className="top-section">
                    <h1 className="logo">MON LOGO</h1>

                    <div className="bars">
                        <Menu size={22} />
                    </div>
                </div>

                {user && (
                    <div className="user-profile">

                        <div className="user-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="user-info">
                            <span className="user-name">
                                {user.name}
                            </span>

                            <span className="user-role">
                                {user.role}
                            </span>
                        </div>

                    </div>
                )}

                <nav className="sidebar-links">

                    {visibleMenus.map((item) => {

                        const isActive =
                            item.path === "/dashboard"
                                ? url === item.path
                                : url === item.path ||
                                  url.startsWith(`${item.path}/`);

                        return (
                            <Link
                                href={item.path}
                                key={item.path}
                                className={`link ${
                                    isActive ? "active" : ""
                                }`}
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
                    <div className="sidebar-footer">

                        <span className="role-label">
                            Rôle connecté
                        </span>

                        <span className="role-badge">
                            {user.role}
                        </span>

                    </div>
                )}

            </aside>

            <main className="main-content">
                {children}
            </main>

        </div>
    );
}