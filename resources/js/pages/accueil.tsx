import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Accueil() {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Head title="Bienvenue - G-Caisse Web" />

            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center justify-between space-x-2">
                        <img src="img/logo.avif" alt="photo du logo" className="bg-gray-900 h-15 w-15 rounded-full "/>
                        <span className="text-xl font-black tracking-tight text-blue-600">G-CAISSE WEB</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/portofolio" className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition">
                            Portofolio
                        </Link>
                        {auth.user ? (
                            <Link href="/dashboard" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition shadow-sm">
                                📊 Mon Tableau de Bord
                            </Link>
                        ) : (
                            <Link href="/login" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-lg transition shadow-sm">
                                🔑 Connexion Espace Sécurisé
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <header className="bg-linear-to-b from-white to-gray-50 py-20 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        Université Aube Nouvelle — Projet de Fin d'Études
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                        Digitalisation, Suivi et Traçabilité Auditable de la <span className="text-emerald-600">Petite Caisse</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-medium">
                        Dites adieu aux tableurs Excel fragiles. Sécurisez vos flux de trésorerie avec un système à double signature, arrêté de caisse immuable et archivage numérique des justificatifs.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="/showLogin" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md transition transform hover:-translate-y-0.5">
                            Accéder au Système
                        </Link>
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900">Une Solution Métier pour 3 Acteurs Clés</h2>
                    <p className="text-gray-500 mt-2">Cloisonnement des privilèges et workflow de validation strict conforme au contrôle interne.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-xl mb-6">📉</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Agent Émetteur (Caissier)</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Saisie instantanée des flux (Débits / Crédits). Téléversement obligatoire de la preuve numérique binaire (JPG, PNG, PDF) et suivi en direct du solde de sa boîte métallique.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xl mb-6">🔎</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Contrôleur (Manager)</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            File d'attente d'audit en temps réel. Examen visuel des reçus photo et apposition du Visa de conformité. Obligation de renseigner un motif textuel en cas de rejet de la dépense.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl mb-6">🔒</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Administrateur (Comptable)</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Supervision macro via graphiques analytiques, configuration exclusive de la table des catégories et exécution de l'arrêté de caisse mensuel fermant définitivement la période.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 text-white py-16 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="text-4xl font-black text-emerald-400">100%</p>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mt-2">Immuable après Arrêté</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-blue-400">0%</p>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mt-2">Risque de Trou de Caisse</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-purple-400">Binaire</p>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mt-2">Archivage des Preuves</p>
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-gray-100 py-8 px-6 text-center text-xs font-semibold text-gray-400">
                <p>© {new Date().getFullYear()} G-Caisse Web — Projet de Soutenance de Fin d'Études — Université Aube Nouvelle.</p>
            </footer>
        </div>
    );
}
