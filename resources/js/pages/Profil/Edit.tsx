import DashboardLayout from '../../layouts/DashboardLayout';
import { useForm, Head ,usePage ,router } from '@inertiajs/react';
import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash, SquarePen, Search, X, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";


type Props = {
    user: {
        name: string;
        email: string;
        age: number;
        adresse: string;
        role: string;
        image: string | null;
    };
};
interface PageProps {
    flash: {
        success: string | null;
        danger: string | null;
        error: string | null;
    };
    [key: string]: any;
}

export default function Edit({ user }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        adresse: user.adresse || '',
        role: user.role || '',
        image: null as File | null,
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/mon-profil');
    }
    const { props } = usePage<PageProps>();
    const { flash } = props;

    return (
        <>
            <Head title="Modifier mon profil" />
            
            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Modifier mes informations</h2>
                {(flash.success || flash.danger) && (
    <div className="px-6 pt-4">
        {flash.success && (
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 text-emerald-800 font-semibold">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <p className="text-sm">{flash.success}</p>
                </div>
                <button onClick={() => { flash.success = null; router.reload(); }} className="text-emerald-500 hover:text-emerald-700">
                    <X size={16} />
                </button>
            </div>
        )}

        {flash.danger && (
            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 text-rose-800 font-semibold">
                    <AlertCircle size={18} className="text-rose-500" />
                    <p className="text-sm">{flash.danger}</p>
                </div>
                <button onClick={() => { flash.danger = null; router.reload(); }} className="text-rose-500 hover:text-rose-700">
                    <X size={16} />
                </button>
            </div>
        )}
    </div>
)}
                <form onSubmit={submit} className="space-y-5">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        {user.image ? (
                            <img src={`/storage/${user.image}`} alt="Profil" className="w-16 h-16 rounded-full object-cover border-2 border-slate-300" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-600 uppercase text-lg">
                                {user.name[0]}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="image" className="cursor-pointer bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                                Changer la photo de profil
                            </Label>
                            <input 
                                type="file" 
                                id="image" 
                                className="hidden" 
                                onChange={(e) => setData('image', e.target.files?.[0] || null)} 
                            />
                            <p className="text-xs text-gray-500 mt-1">Formats acceptés : JPG, PNG (Max 2 Mo)</p>
                            <InputError message={errors.image} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nom complet</Label>
                            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            <InputError message={errors.name} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">Adresse Email</Label>
                            <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <Label htmlFor="age">Votre âge</Label>
                            <Input type='number' id="age" value={data.age} onChange={e => setData('age', e.target.value)} required />
                            <InputError message={errors.age} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div>
                            <Label htmlFor="adresse">Adresse</Label>
                            <Input id="adresse" value={data.adresse} onChange={e => setData('adresse', e.target.value)} required />
                            <InputError message={errors.adresse} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={processing}>
                        {processing ? 'Enregistrement...' : 'Sauvegarder les modifications'}
                    </Button>
                </form>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
