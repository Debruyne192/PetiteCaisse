import { Link, router, usePage } from "@inertiajs/react";
import { AppWindow } from "lucide-react";

export default function welcome() {
    return (
        /* min-h-screen combiné à flex-col assure que la page s'étire proprement sans zone blanche */
        /* Utilisation de l'attribut style pour l'image de fond afin de contourner les bugs de compilation Vite */
        <div 
            className="w-full min-h-screen bg-cover bg-center flex flex-col pb-10"
            style={{ backgroundImage: "url('/img/car.jpeg')" }}
        >
            {/* Barre de navigation */}
            {/* Remplacement de fixed + w-[100vw] par sticky + w-full pour éviter les superpositions brisées */}
            <div className="flex justify-between items-center sticky pl-4 pr-4 h-16 bg-gradient-to-r from-gray-500 to-cyan-500 w-full rounded-lg top-0 z-50 text-white shadow-md">
                <div className="flex gap-2 items-center hover:underline cursor-pointer">
                    <AppWindow size={20} />
                    <h1 className="font-bold text-lg">MonApp</h1>
                </div>
                <nav className="flex gap-2">
                    <Link className="px-2 hover:text-cyan-200">Accueil</Link>
                    <Link className="px-2 hover:text-cyan-200">About</Link>
                    <Link className="px-2 hover:text-cyan-200">Services</Link>
                    <Link className="px-2 hover:text-cyan-200">Portfolio</Link>
                    <Link className="px-2 hover:text-cyan-200">Contact</Link>
                </nav>
            </div>

            {/* Conteneur principal flexible centrant les éléments */}
            <div className="flex-1 flex flex-col items-center justify-start pt-10 px-4 w-full">
                
                {/* Section Bienvenue */}
                {/* Suppression du ml-15 et w-[80vw] brut au profit d'un max-w et mx-auto automatique */}
                <div className="w-full max-w-3xl bg-white/60 flex flex-col justify-center items-center shadow-lg shadow-cyan-500/50 rounded-xl p-8 mb-10 text-center">
                    <h1 className="uppercase text-blue-600 font-bold text-2xl tracking-wide">Bienvenue</h1>
                    <p className="mt-2 text-gray-800 font-medium">Veuillez entrer votre besoin pour continuer</p>
                    <ul className="flex flex-wrap justify-center gap-3 mt-6">
                        <li className="bg-blue-600 px-4 py-2 text-white border border-blue-600 rounded-lg hover:bg-transparent hover:text-blue-600 transition-colors">
                            <a href="#">Acheter</a>
                        </li>
                        <li className="bg-blue-600 px-4 py-2 text-white border border-blue-600 rounded-lg hover:bg-transparent hover:text-blue-600 transition-colors">
                            <a href="#">Louer</a>
                        </li>
                        <li className="bg-blue-600 px-4 py-2 text-white border border-blue-600 rounded-lg hover:bg-transparent hover:text-blue-600 transition-colors">
                            <a href="#">Vendre</a>
                        </li>
                        <li className="bg-blue-600 px-4 py-2 text-white border border-blue-600 rounded-lg hover:bg-transparent hover:text-blue-600 transition-colors">
                            <a href="/login">Se connecter</a>
                        </li>
                    </ul>
                </div>

                {/* Section des 3 images du bas */}
                <div className="flex flex-col justify-center items-center gap-6 w-full max-w-4xl">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <img src="/img/globe.jpg" className="h-40 w-40 object-cover rounded-lg hover:scale-95 transition-transform duration-200 shadow-md" alt="Photo globe" />
                        <img src="/img/ia.jpg" className="h-40 w-40 object-cover rounded-lg hover:scale-95 transition-transform duration-200 shadow-md" alt="Photo IA" />
                        <img src="/img/intelligent.jpg" className="h-40 w-40 object-cover rounded-lg hover:scale-95 transition-transform duration-200 shadow-md" alt="Photo intelligence" />
                    </div>
                    <p className="text-white bg-black/50 px-4 py-1 rounded-full text-sm mt-4 shadow-sm">
                        © 2026 MonAgence - Tous droits réservés
                    </p>
                </div>

            </div>
        </div>
    );
}
