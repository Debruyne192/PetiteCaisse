
import DashboardLayout from "@/layouts/DashboardLayout";
import {router , useForm ,usePage ,Link} from "@inertiajs/react";
import { FormEvent } from "react";

export default function Create(){

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
        <div className="mt-2 gap-2 md:mt-[-13.75]">
            <div className="flex flex-col justify-center items-center gap-2">
                <img src="/img/images.png" 
                     alt="logo laravel"
                     className="h-20 w-20"
                     />
                <h1 className="font-bold text-2xl ">Créer un compte</h1>
                <p className="text-gray-600 text-center">Saisissez vos informations ci-dessous pour créer votre compte</p>
            </div>
            <div className="mt-4 flex flex-col justify-center items-center ">
                <form onSubmit={submit} className="flex flex-col justify-center items-center">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
                        <div>
                        <label htmlFor="name" className="block text-gray-700 font-bold ">Nom</label>
                        <input type="text"  placeholder="Votre nom ici" id="nom" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.name} onChange={(e) => setData('name',e.target.value)}
                        />
                    </div>
                    {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>}
                  <div>
                        <label htmlFor="age" className="block text-gray-700 font-bold">Âge</label>
                        <input type="number" id="age" placeholder="Votre age ici" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.age} onChange={(e) => setData('age',e.target.value)}
                        />
                    </div>
                    {errors.age && <span className="text-red-500 text-sm mt-1 block">{errors.age}</span>}
                    
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
                        <input type="email" id="email" placeholder="Votre email ici" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.email} onChange={(e) => setData('email',e.target.value)}
                        />
                    </div>
                    {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
                    <div>
                        <label htmlFor="login" className="block text-gray-700 font-bold">Login</label>
                        <input type="text" id="login" placeholder="Votre login ici" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.login} onChange={(e) => setData('login',e.target.value)}
                        />
                    </div>
                    {errors.login && <span className="text-red-500 text-sm mt-1 block">{errors.login}</span>}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-bold">Mot de passe</label>
                        <input type="password" id="password" placeholder="Votre mot de passe ici" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.password} onChange={(e) => setData('password',e.target.value)}
                        />
                    </div>
                    {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
                    <div className="mb-6">
                    <label className="text-gray-700 font-bold">Confirmer password</label>
                    <input 
                        type="password" 
                        value={data.password_confirmation} 
                        onChange={e => setData('password_confirmation', e.target.value)} 
                        className="w-full px-3 py-2 border rounded-lg text-left"
                        placeholder="Confirmer mot de passe" required
                    />
                </div>
                
                  <div>
                        <label htmlFor="adresse" className="block text-gray-700 font-bold">Adresse</label>
                        <input type="text" id="adresse" placeholder="Votre adresse ici" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.adresse} onChange={(e) => setData('adresse',e.target.value)}
                        />
                    </div>
                    {errors.adresse && <span className="text-red-500 text-sm mt-1 block">{errors.adresse}</span>}
                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-bold">Rôle</label>
                        <select name="role" id="role" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                        value={data.role} onChange={(e) => setData('role',e.target.value)}
                        >
                            <option value="">Choisir un rôle</option>
                            <option value="manager">Manager</option>
                            <option value="caissier">Caissier</option>
                            <option value="comptable">Comptable</option>
                        </select>
                    </div>
                    {errors.role && <span className="text-red-500 text-sm mt-1 block">{errors.role}</span>}
                    <div>
                        <label htmlFor="image" className="block text-gray-700 font-bold">Photo de profil</label>
                        <input type="file" id="image" required
                               className="w-full px-3 py-2 border rounded-lg text-left"
                         onChange={(e)=> e.target.files?.[0] || null} 
                                   
                        />
                    </div>
                    </div>
                    
                    <button disabled={processing}
                            className="w-full border border-black mt-4 h-10 text-white bg-black rounded-lg hover:text-black hover:bg-white md:w-100"
                    >
                        {processing ? "Enregistrement..." : "Ajouter"}
                    </button>
                </form>


                <p className="mt-4 mb-4 text-gray-600">
                    Avez-vous un compte ? <span> <Link href={"/login"} className="underline decoration-gray-600 text-black hover:decoration-black">
                    Se connecter
                </Link></span>
                </p>
                <Link href="/personne" className="font-bold hover:underline hover:decoration-gray-600">
                    Revenir au catalogue
                </Link>
            </div>
        </div>
        </>

    );
}

Create.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
