
import {router , useForm ,usePage ,Link} from "@inertiajs/react";
import { FormEvent } from "react";

export default function Create(){

    const {data , setData ,post , processing , errors} =useForm({
        'name':'',
        'prenom':'',
        'age':'',
        'email':'',
        'login':'',
        'password':'',
        'phone':'',
        'adresse':'',
        'role':'',
        'image':'',
    });
    function submit(e :FormEvent){
        e.preventDefault();
        post('personne');
    }
    return (
        <div>
            <h1>Ajouter un utilisateur</h1>
            <div>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="name">Entrer votre nom</label>
                        <input type="text"  placeholder="Entrer votre nom ici" id="nom"
                        value={data.name} onChange={(e) => setData('name',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="prenom">Prenom</label>
                        <input type="text"  placeholder="Entrer votre prenom ici" id="prenom"
                        value={data.prenom} onChange={(e) => setData('prenom',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="age"></label>
                        <input type="number" id="age" placeholder="Entrer votre age ici"
                        value={data.age} onChange={(e) => setData('age',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="login">Login</label>
                        <input type="text" id="login" placeholder="Entrer votre login ici"
                        value={data.login} onChange={(e) => setData('login',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input type="password" id="password" placeholder="Entrer votre mot de passe ici"
                        value={data.password} onChange={(e) => setData('password',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Téléphone</label>
                        <input type="text" id="phone" placeholder="Entrer votre numero de téléphone ici" 
                        value={data.phone} onChange={(e) => setData('phone',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" id="adresse" placeholder="Entrer votre adresse ici"
                        value={data.adresse} onChange={(e) => setData('adresse',e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Rôle</label>
                        <select name="role" id="role"
                        value={data.role}
                        >
                            <option value="employe">Employé</option>
                            <option value="caissier">Caissier</option>
                            <option value="comptable">Comptable</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image"></label>
                        <input type="file" id="image"
                        value={data.image} onChange={(e) => setData('image', e.target.files)}

                        />
                    </div>
                    <button disabled={processing}>
                        {processing ? "Mis à jour..." : "Modifier"}
                    </button>
                </form>

                <Link href="personne.index">
                    Revenir au catalogue
                </Link>
            </div>
        </div>
    );
}