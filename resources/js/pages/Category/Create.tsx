import { Link, router, usePage ,useForm} from "@inertiajs/react";
import { FormEvent } from "react";
import {
    Plus

} from "lucide-react";

export default function Create() {

        const {data , setData ,post , processing , errors} =useForm({
            'name':'',
            'slug':'',
        });
        function submit(e :FormEvent){
            e.preventDefault();
            post('/category');
        }

    return (
        <div>
            <form onSubmit={submit}>
                 <div>
                        <label htmlFor="nom">Entrer le nom de la categorie</label>
                        <input type="text"  placeholder="Entrer votre nom ici" id="nom"
                        value={data.name} onChange={(e) => setData('name',e.target.value)}
                        />
                    </div>
                    {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>}
                 <div>
                        <label htmlFor="description">Entrer la Description de la categorie</label>
                        <input type="text"  placeholder="Entrer la description ici" id="descriptionm"
                        value={data.slug} onChange={(e) => setData('slug',e.target.value)}
                        />
                    </div>
                    {errors.slug && <span className="text-red-500 text-sm mt-1 block">{errors.slug}</span>}
                <button disabled={processing}>
                        {processing ? "Enregistrement..." : "Ajouter"}
                    </button>
            </form>
                
                <Link href="/category">
                    Revenir au catalogue
                </Link>
        </div>
    );
}