import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TeamInvitationAlert from '@/components/team-invitation-alert';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import type { TeamInvitationContext } from '@/types';
import { FormEvent } from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";
import {router , useForm ,usePage ,Link} from "@inertiajs/react";

type Props = {
    passwordRules: string;
    teamInvitation?: TeamInvitationContext | null;
};

export default function Register({ passwordRules, teamInvitation }: Props) {
        const {data , setData ,post , processing , errors} =useForm({
        'name':'',
        'age':'',
        'email':'',
        'login':'',
        'password':'',
        'adresse':'',
        'role':'',
        'image':null as File | null,
        'password_confirmation':'',
    });
    function submit(e :FormEvent){
        e.preventDefault();
        post('/personne');
    }
    return (
        <>
            <Head title="Register" />
            <Form
                onSubmit={submit}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {teamInvitation && (
                            <TeamInvitationAlert
                                invitation={teamInvitation}
                                action="Register"
                            />
                        )}

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                        <div className="grid gap-6">
                        <label htmlFor="age">Âge</label>
                        <input type="number"
                                required
                                autoFocus
                                tabIndex={2}
                                autoComplete="age"
                                name="age"
                                placeholder="Entrer votre age"
                        />
                    </div>
                    <InputError message={errors.age} className="mt-2" />
                   
                    <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>
                    <div className="grid gap-6">
                        <label htmlFor="login">Login</label>
                        <input type="text" 
                                id="login"
                                required
                                autoFocus
                                tabIndex={4}
                                autoComplete="login"
                                name="login"
                                placeholder="Entrer votre login ici"
                        />
                    </div>
                    <InputError message={errors.login} className="mt-2" />
                    
                    <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                   
                
                  <div className="grid gap-6">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" 
                               id="adresse" 
                               placeholder="Entrer votre adresse ici"
                                required
                                autoFocus
                                tabIndex={7}
                                autoComplete="adresse"
                                name="adresse"
                        />
                    </div>
                    <InputError message={errors.adresse} className="mt-2" />
                    <div className="grid gap-6">
                        <label htmlFor="role">Rôle</label>
                        <select 
                                id="role"
                                required
                                autoFocus
                                tabIndex={8}
                                autoComplete="role"
                                name="role"
                        >
                            <option value="">Choisir un rôle</option>
                            <option value="manager">Manager</option>
                            <option value="caissier">Caissier</option>
                            <option value="comptable">Comptable</option>
                        </select>
                    </div>
                    <InputError message={errors.adresse} className="mt-2" />
                    <div className="grid gap-6">
                        <label htmlFor="image"></label>
                        <input type="file" 
                               id="image"
                                required
                                autoFocus
                                tabIndex={9}
                                autoComplete="login"
                                name="login"
                         onChange={(e)=> e.target.files?.[0] || null} 
                        />
                    </div>
                    <InputError message={errors.image} className="mt-2" />

                        
                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={10}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink
                                href={
                                    teamInvitation
                                        ? login.url({
                                              query: {
                                                  invitation:
                                                      teamInvitation.code,
                                              },
                                          })
                                        : login()
                                }
                                data-test="team-invitation-login-link"
                                tabIndex={11}
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
