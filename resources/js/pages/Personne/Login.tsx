import { useForm, Head, Link, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { Layout } from "lucide-react";
import AccueilLayout from "@/layouts/AccueilLayout";


interface PageProps{
    flash:{
        error : string | null;
    };
    [key : string ] : any;
}
export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false, // Optionnel : pour rester connecté
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        // Envoie les données vers la route de connexion
        post("/login", {
            onFinish: () => reset("password"), // Efface le mot de passe en cas d'échec
        });
    }

    const {props} = usePage<PageProps>();
    const {flash} = props;

    return (
        <>
        <div className="md:-ml-50 md:w-[200%]  mt-0 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <Head title="Connexion" />
            
            <div className="flex flex-col justify-center items-center">
                <img src="img/images.png" alt="react logo" className="h-20 w-20 mb-5"/>
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Connexion à l'application
                </h1>
                <p className="text-center mb-5 text-gray-600">Entrez votre identifiant et votre mot de passe pour vous connecter</p>

            </div>
            {errors.login && (
    <span className="text-red-500 text-sm mt-1 block">
        {errors.login}
    </span>
)}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
                        Identifiant (Login)
                    </label>
                    <input
                        type="text"
                        id="login"
                        placeholder="Entrer votre login"
                        value={data.login}
                        onChange={(e) => setData("login", e.target.value)}
                        className={` w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.login ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                    />
                    {errors.login && (
                        <span className="text-red-500 text-sm mt-1 block">
                            {errors.login}
                        </span>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Entrer votre mot de passe"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm mt-1 block">
                            {errors.password}
                        </span>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Se souvenir de moi
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
                >
                    {processing ? "Connexion en cours..." : "Se connecter"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                Nouveau sur la plateforme ?{" "}
                <Link href="/personne/create" className="text-blue-600 hover:underline">
                    Créer un compte
                </Link>
            </div>
        </div>
        </>
    );
}
Login.layout = (page: React.ReactNode) => <AccueilLayout children={page} />;

/* 
login.layout = {
    title: 'Connexion à votre compte',
    description: 'Entrez votre identifiant et votre mot de passe pour vous connecter',
};
import React, { FormEvent , useState} from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    // Gestion du formulaire avec le hook standard d'Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault();
        post(('login'), {
            onFinish: () => reset('password'), // Réinitialise le mot de passe en cas d'échec
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Connexion" />

            <div className="sm:mx-auto w-full max-w-md">
                <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
                    <Lock className="text-white" size={24} />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Connexion à votre espace
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Ou{' '}
                    <Link href={('register')} className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                        créez un compte gratuitement
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto w-full max-w-md p-4 sm:p-0">
                <div className="bg-white py-8 px-6 shadow-sm border border-slate-100 rounded-2xl sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                Adresse Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nom@exemple.com"
                                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Mot de passe
                                </label>
                                <Link 
                                    href={('password.request')} 
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                                >
                                    Oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    required
                                />
                                <p>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</p>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                      <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                                    Se souvenir de moi
                                </label>
                            </div>
                        </div>

            
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-400">Sécurisé par Laravel</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
*/