import DashboardLayout from '../../layouts/DashboardLayout';
import { useForm, Head } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Category {
    id: number;
    nom: string;
    slug: string;
}

interface EditProps {
    category: Category;
}

export default function Edit({ category }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        nom: category.nom || '',
        slug: category.slug || '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        put(`/category/${category.id}`);

    }

    return (
        
            
            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Modifier mes informations</h2>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Nom</label>
                        <input type="text" value={data.nom} onChange={(e) => setData('nom', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        {errors.nom && <div className="text-xs text-red-500 mt-1">{errors.nom}</div>}
                    </div>                    
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Description</label>
                        <input type="text" value={data.slug} onChange={(e) => setData('slug', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        {errors.slug && <div className="text-xs text-red-500 mt-1">{errors.slug}</div>}
                    </div>                    
                    <button type="submit" className="w-full mt-4" disabled={processing}>
                        {processing ? 'Mis à jour...' : 'Modifier'}

                    </button>
                </form>
            </div>
    );
}

