import React from 'react';
import { Head, Link , useForm ,usePage} from '@inertiajs/react';
import { FormEvent } from "react";
import {
    Menu,X
} from "lucide-react";

interface WelcomeProps {
    auth: {
        user: any;
    };
}

export default function accueil({ auth }: WelcomeProps) {
     const { data, setData, post, processing, errors, reset } = useForm({
            login: "",
            password: "",
            remember: false, 
        });
    
        function submit(e: FormEvent) {
            e.preventDefault();
            post("/login", {
                onFinish: () => reset("password"), 
            });
        }
        const { url } = usePage();
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        React.useEffect(() =>{
            setIsMenuOpen(false);
        }, [url]);
    return (
        
        <>
            <Head title="Bienvenue - G-Caisse Web" />

            <div className=" min-h-screen bg-slate-50 font-sans antialiased relative overflow-hidden text-slate-800">
                <div className="max-md:hidden absolute top-0 right-0 w-full lg:w-6/12 h-[152vh] bg-linear-to-br from-slate-900 to-indigo-950 rounded-b-[60px] lg:rounded-b-none lg:rounded-l-[100px] transition-all duration-500 z-0"></div>
                {!isMenuOpen && (
                <button 
                    className="absolute cursor-pointer right-6 top-6 z-50 md:hidden bg-slate-900/10 backdrop-blur-md p-2 rounded-xl text-white border border-white/10" 
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu size={22} />
                </button>
            )}
                {isMenuOpen && (
                <button 
                    className="fixed cursor-pointer right-0 top-4 z-50 md:hidden bg-slate-900/10 backdrop-blur-md p-2 rounded-xl text-white border border-white/10" 
                    onClick={() => setIsMenuOpen(false)}
                >
                    <X size={22} />
                </button>
            )}
                <nav className="relative w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center z-10">
                    <div className={` ${isMenuOpen ? "max-md:mt-30" : ""} flex items-center space-x-3`}>
                        <img 
                            src="img/logo.avif" 
                            alt="Photo du logo" 
                            className="bg-slate-900 h-12 w-12 rounded-full border-2 border-indigo-500/30 object-cover shadow-sm"
                        />
                        <span className="text-xl font-black tracking-tight text-indigo-600 lg:text-black">G-CAISSE WEB</span>
                    </div>

                    <div className={`${isMenuOpen ? "fixed max-md:w-50 top-4 right-0 max-md:bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl flex max-md:flex-col items-center md:space-x-20 max-md:space-y-1 shadow-2xl text-left animate-fade-in z-50" : "max-md:hidden flex gap-8"}`}>
                       <Link 
                            href="/" 
                            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                url === '/' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                            }`} onClick={() => setIsMenuOpen(false)}>
                            Accueil
                        </Link>
                        <Link 
                            href="/aide" 
                            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                url === '/aide' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                            }`} onClick={() => setIsMenuOpen(false)}>
                            Documentation
                        </Link>
                        <Link 
                            href="/support" 
                            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                url === '/support' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                            }`} onClick={() => setIsMenuOpen(false)}>
                            Assistance
                        </Link>
                        <Link 
                            href="/about" 
                            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                                url === '/about' ? 'bg-indigo-50 text-indigo-600' : 'text-white hover:bg-slate-100 hover:text-slate-900'
                            }`} onClick={() => setIsMenuOpen(false)}>
                            A propos
                        </Link>
                        {auth.user ? (
                            <Link 
                                href="/dashboard" 
                                className="-mr-18 px-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 transform hover:-translate-y-0.5"
                            onClick={() => setIsMenuOpen(false)}
                            >
                             Mon Tableau de Bord
                            </Link>
                        ) : ""
                        }
                    </div>
                </nav>

                <header className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] z-1 pb-16 lg:pb-0">
                    
                    <div className={` ${isMenuOpen ? "max-md:mt-35" : ""} space-y-6 max-w-xl text-center lg:text-left mt-6 lg:mt-0`}>
                        <span className="inline-block px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
                            🎓 Entreprise BELTEK - Univers des services numériques
                        </span>
                        
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                            Digitalisation, Suivi et <br />
                            Traçabilité Auditable de la <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Caisse Menu-frais</span>
                        </h1>
                        
                        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                            Dites adieu aux tableurs Excel fragiles. Sécurisez vos flux de trésorerie avec un système à double signature, un arrêté de caisse immuable et un archivage numérique des justificatifs binaires.
                        </p>
                        
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start">
                            <Link 
                                href="/showLogin" 
                                className="w-full sm:w-auto text-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                            >
                                Accéder au Système
                            </Link>
                        </div>
                    </div>

                    <div className="ml-30 relative flex justify-center items-center h-full min-h-112.5 lg:min-h-none">
    {(() => {
        const [showForgot, setShowForgot] = React.useState(1);

        const { post, data, setData, processing, errors, reset } = useForm({
            login: "",
            password: "",
            password_confirmation: "",
            _method: 'POST',
            name: '',
            age: '',
            adresse: '',
            email: '',
            role: '',
            image: null as File | null,
            remember: false,
        });

        function handleLoginSubmit(e: React.FormEvent) {
            e.preventDefault();
            post("/login", {
                onFinish: () => reset("password"),
            });
        }

        const handleVerifyIdentifier = (e: React.FormEvent) => {
            e.preventDefault();
            post("/verifierLogin", {
                onSuccess: () => {
                    setData("login", data.login);
                    setShowForgot(3);
                },
                onError: () => {
                    setShowForgot(2);
                }
            });
        };

        const handlePasswordSave = (e: React.FormEvent) => {
            e.preventDefault();
            post("/resetPassword", {
                onSuccess: () => {
                    reset();
                    setShowForgot(1);
                }
            });
        };

        const register=(e :FormEvent)=>{
            e.preventDefault();
            post('/personne',{
                onError: () => {
                    setShowForgot(4);
                }
            });
        }

        return (
            <div className="relative -ml-25 w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl flex flex-col justify-between transform hover:scale-[1.01] transition duration-300">
                
                {showForgot === 1 && (
                    <>
                        <div className="text-center lg:text-left space-y-1 mb-6">
                            <h2 className="text-xl font-bold text-white tracking-tight">Connexion</h2>
                            <p className="text-xs font-medium text-slate-400">Veuillez renseigner vos accès sécurisés de l'entreprise</p>
                        </div>

                        <form className="space-y-4 text-left" onSubmit={handleLoginSubmit}>
                            {errors.login && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 font-medium">
                                    ⚠️ {errors.login}
                                </div>
                            )}

                            <input type="hidden" value={data.login} />

                            <div className="space-y-1">
                                <label htmlFor="login" className="text-xs font-bold uppercase tracking-wider text-slate-400">Identifiant (login)</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm">👤</span>
                                    <input 
                                        type="text" 
                                        id="login"
                                        required
                                        placeholder="Beltek"
                                        value={data.login}
                                        onChange={(e) => setData("login", e.target.value)}
                                        className={`w-full bg-slate-950/60 border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium transition ${
                                            errors.login ? "border-red-500" : "border-slate-800"
                                        }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400">Mot de Passe</label>
                                    <button 
                                        type="button"
                                        onClick={() => { reset(); setShowForgot(2); }}
                                        className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition focus:outline-none"
                                    >
                                        Oublié ?
                                    </button>
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm">🔑</span>
                                    <input 
                                        type="password" 
                                        id="password"
                                        required
                                        placeholder="••••••••••••"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className={`w-full bg-slate-950/60 border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium transition ${
                                            errors.password ? "border-red-500" : "border-slate-800"
                                        }`}
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-red-400 text-[11px] block mt-1 font-medium">{errors.password}</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-2 pt-1">
                                <input 
                                    type="checkbox" 
                                    id="remember" 
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                    className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0 w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-xs font-medium text-slate-400 cursor-pointer select-none">Se souvenir de ma session</label>
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition duration-200 mt-2 text-sm disabled:opacity-50"
                            >
                                {processing ? "Vérification..." : "🔑 Ouvrir ma Session d'Audit"}
                            </button>
                            <div className="flex gap-2"> 
                                <p className="text-white">Avez-vous un compte ? </p>
                            <button 
                                        type="button"
                                        onClick={() => { reset(); setShowForgot(4); }}
                                        className="hover:underline hover:cursor-pointer font-bold text-indigo-400 hover:text-indigo-300 transition focus:outline-none"
                                    >
                                        Créer un compte
                            </button>
                            </div>
                        </form>
                    </>
                )}

                                {showForgot === 2 && (
                    
                    <>
                        <div className="text-center lg:text-left space-y-1 mb-6">
                            <h2 className="text-xl font-bold text-white tracking-tight">Récupération (Étape 1/2)</h2>
                            <p className="text-xs font-medium text-slate-400">Saisissez votre identifiant pour vérifier vos privilèges</p>
                        </div>

                        <form className="space-y-4 text-left" onSubmit={handleVerifyIdentifier}>
                            {errors.login && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 font-medium">
                                    ⚠️ {errors.login}
                                </div>
                            )}

                            <div className="space-y-1">
                                <label htmlFor="reset_login" className="text-xs font-bold uppercase tracking-wider text-slate-400">Identifiant de l'agent</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm">👤</span>
                                    <input 
                                        type="text" 
                                        id="reset_login"
                                        required
                                        placeholder="Saisir votre login"
                                        value={data.login}
                                        onChange={(e) => setData("login", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-medium transition"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition duration-200 mt-2 text-sm disabled:opacity-50"
                            >
                                {processing ? "Recherche en cours..." : "🔎 Analyser mon identifiant"}
                            </button>

                            <div className="text-center pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => { reset(); setShowForgot(1); }} 
                                    className="text-xs font-bold text-slate-400 hover:text-white transition focus:outline-none"
                                >
                                    ← Retourner à la connexion
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {showForgot === 3 && (
                    <>
                        <div className="text-center lg:text-left space-y-1 mb-6">
                            <h2 className="text-xl font-bold text-white">Rénitialisation du mot de passe</h2>
                            
                            <p className="text-xs font-medium text-emerald-400">Veuillez entrer votre nouveau mot de passe </p>
                        </div>

                        <form className="space-y-4 text-left" onSubmit={handlePasswordSave}>
                            <div className="space-y-1">
                                <label htmlFor="new_password" className="text-xs font-bold uppercase tracking-wider text-slate-400">Nouveau mot de passe</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm">🔒</span>
                                    <input 
                                        type="password" 
                                        id="new_password"
                                        required
                                        placeholder="••••••••••••"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password_confirmation" className="text-xs font-bold uppercase tracking-wider text-slate-400">Confirmer le mot de passe</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm">🔄</span>
                                    <input 
                                        type="password" 
                                        id="password_confirmation"
                                        required
                                        placeholder="••••••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-red-400 text-[11px] block mt-1 font-medium">{errors.password}</span>
                                )}
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition duration-200 mt-2 text-sm disabled:opacity-50"
                            >
                                {processing ? "Sauvegarde..." : "💾 Enregistrer mon nouveau mot de passe"}
                            </button>
                            <div className="text-center pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => { reset(); setShowForgot(1); }} 
                                    className="text-xs font-bold text-slate-400 hover:text-white transition focus:outline-none"
                                >
                                    ← Retourner à la connexion
                                </button>
                            </div>
                        </form>
                    </>
                )}
                {showForgot === 4 && (
                    <>
                        <div className="text-center lg:text-left space-y-1 mb-6">
                            {errors.login && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 font-medium">
                                    ⚠️ {errors.login}
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-white">S'inscrire</h2>
                            
                            <p className="text-xs font-medium text-emerald-400">Veuillez entrer vos informations</p>
                        </div>

                        <form className="space-y-4 text-left" onSubmit={register}>
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom complet: </label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="name"
                                        required
                                        placeholder="Ex:Pablo Gavi"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                                <label htmlFor="age" className="text-xs font-bold uppercase tracking-wider text-slate-400">Âge : </label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        id="age"
                                        placeholder="Ex:23 ans"
                                        value={data.age}
                                        onChange={(e) => setData("age", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">Adresse email : </label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="email"
                                        required
                                        placeholder="Ex:Beltek@gmail.com"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                                <label htmlFor="login" className="text-xs font-bold uppercase tracking-wider text-slate-400">Identifiant (Login) : </label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="login"
                                        required
                                        placeholder="Ex:Beltek"
                                        value={data.login}
                                        onChange={(e) => setData("login", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400">Rôle : </label>
                                <div className="relative">
                                    
                                    <select value={data.role} onChange={(e) => setData('role', e.target.value)} 
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-600 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition">
                                    <option className='text-white' value="">Choisir un rôle</option>
                                    <option className='text-white' value="manager">Manager</option>
                                    <option className='text-white' value="caissier">Caissier</option>
                                    <option className='text-white' value="comptable">Comptable</option>
                                </select>
                                </div>
                                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400">Nouveau mot de passe</label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        id="password"
                                        required
                                        placeholder="••••••••••••"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password_confirmation" className="text-xs font-bold uppercase tracking-wider text-slate-400">Confirmer le mot de passe</label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        id="password_confirmation"
                                        required
                                        placeholder="••••••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-5 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium transition"
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-red-400 text-[11px] block mt-1 font-medium">{errors.password}</span>
                                )}
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition duration-200 mt-2 text-sm disabled:opacity-50"
                            >
                                {processing ? "Sauvegarde..." : "💾 Enregistrer mon nouveau mot de passe"}
                            </button>
                            <div className="text-center pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => { reset(); setShowForgot(1); }} 
                                    className="text-xs font-bold text-slate-400 hover:text-white transition focus:outline-none"
                                >
                                    ← Retourner à la connexion
                                </button>
                            </div>
                        </form>
                    </>

                )}

            </div>
        );
    })()}
</div>



                        </header>

                <section className="relative bg-white border-y border-slate-100 py-20 z-1">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Une Solution Métier pour 3 Acteurs Clés</h2>
                            <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm sm:text-base">
                                Cloisonnement des privilèges et workflow de validation strict conforme au contrôle interne de l'entreprise.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition duration-300">
                                <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-xl font-bold mb-6">📉</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Agent Émetteur (Caissier)</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    Saisie instantanée des flux (Débits / Crédits). Téléversement obligatoire de la preuve numérique binaire (JPG, PNG, PDF) et suivi en direct du solde de sa boîte métallique.
                                </p>
                            </div>

                            <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition duration-300">
                                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl font-bold mb-6">🔎</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Contrôleur (Manager)</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    File d'attente d'audit en temps réel. Examen visuel des reçus photo et apposition du Visa de conformité. Obligation de renseigner un motif textuel en cas de rejet de la dépense.
                                </p>
                            </div>

                            <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition duration-300">
                                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl font-bold mb-6">🔒</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Administrateur (Comptable)</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    Supervision macro via graphiques analytiques, configuration exclusive de la table des catégories et exécution de l'arrêté de caisse mensuel fermant définitivement la période.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

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

                
            </div>
        </>
    );
}
