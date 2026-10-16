import { useForm, Head } from '@inertiajs/react';

import { Spinner } from '@/components/ui/spinner';
import TextLink from '@/components/text-link';
import { FormEvent } from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";


type Props = {
    status?: string;
};

export default function login({ status }: Props) {
    // 💡 Utilisation du hook standard d'Inertia pour garder le contrôle total
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault(); // 💡 Bloque définitivement le rafraîchissement de la page
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <label htmlFor="login">Identifiant (Login)</label>
                        <input type="text"
                               id="login"
                               name="login"
                               value={data.login}
                               onChange={(e) => setData('login', e.target.value)}
                               required
                               autoFocus
                               placeholder="Votre identifiant"
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <label htmlFor="password">Mot de passe</label>
                        </div>
                        <input id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Mot de passe"  
                        />
                    </div>

                <button type="submit"
                        className="mt-4 w-full"
                        disabled={processing}>
                            {processing ? "Coonnexion..." : "Se connecter"}
                        </button>

                <div className="text-center text-sm text-muted-foreground">
                    Pas encore de compte ? <a href="/personne/create">Créer un compte</a>
                    
                </div>
                </div>
            </form>

            
        </>
    );
}

login.layout = {
    title: 'Connexion à votre compte',
    description: 'Entrez votre identifiant et votre mot de passe pour vous connecter',
};
