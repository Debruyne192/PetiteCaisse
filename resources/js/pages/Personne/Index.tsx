import DashboardLayout from "@/layouts/DashboardLayout";
import { router, useForm, usePage, Link } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { Plus, Trash, SquarePen, Search, X } from "lucide-react";

interface Personne {
    id: number;
    name: string;
    age: number;
    email: string;
    adresse: string;
    login: string;
    role: string;
    image: string | null;
}

interface IndexProps {
    personnes: Personne[];
}

interface PageProps {
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: any;
}

export default function Index({ personnes = [] }: IndexProps) {
    const { props } = usePage<PageProps>();
    const { flash } = props;
    
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'POST',
        name: '',
        age: '',
        adresse: '',
        email: '',
        login: '',
        password: '',
        password_confirmation: '',
        role: '',
        image: null as File | null,
    });

    const openCreateModal = () => {
        setIsEdit(false);
        setSelectedId(null);
        reset();
        setIsOpen(true);
    };

    const openEditModal = (perso: Personne) => {
        setIsEdit(true);
        setSelectedId(perso.id);
        setData({
            _method: 'PUT', 
            name: perso.name,
            age: String(perso.age),
            adresse: perso.adresse,
            email: perso.email,
            login: perso.login,
            password: '',
            password_confirmation: '',
            role: perso.role,
            image: null,
        });
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            router.delete(`/personne/${id}`);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
if (isEdit && selectedId) {
    router.post(`/personne/${selectedId}`, {
        ...data,
        _method: 'PUT' 
    }, {
        onSuccess: () => { setIsOpen(false); reset(); },
    });
} else {
    post('/personne', {
        onSuccess: () => { setIsOpen(false); reset(); },
    });
}

    };

    const filteredUsers = personnes.filter(perso =>
        perso.name.toLowerCase().includes(search.toLowerCase()) ||
        perso.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-4">
            
            {flash?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded m-6 font-bold">
                    ✅ {flash.success}
                </div>
            )}

            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">La liste des Utilisateurs</h1>
                    <p className="text-sm text-slate-500 mt-1">Gestion, suivi et modification des membres.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                    >
                        <Plus size={16} />
                        Ajouter un utilisateur
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="py-4 px-6">Photo</th>
                            <th className="py-4 px-6">Nom</th>
                            <th className="py-4 px-6">Age</th>
                            <th className="py-4 px-6">Adresse</th>
                            <th className="py-4 px-6">Login</th>
                            <th className="py-4 px-6">Rôle</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((perso) => (
                                <tr key={perso.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        {perso.image ? (
                                            <img src={`/storage/${perso.image}`} alt="Profil" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold uppercase text-xs">
                                                {perso.name.substring(0, 2)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 font-medium text-slate-900">{perso.name}</td>
                                    <td className="py-4 px-6">{perso.age} ans</td>
                                    <td className="py-4 px-6">{perso.adresse}</td>
                                    <td className="py-4 px-6 font-mono text-xs">{perso.login}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded capitalize ${
                                            perso.role === 'comptable' ? 'bg-purple-100 text-purple-800' :
                                            perso.role === 'caissier' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {perso.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => openEditModal(perso)} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <SquarePen size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(perso.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-slate-400">Aucun utilisateur trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                   </table>
            </div>

           
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/20 z-50 p-4">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-lg font-bold text-gray-800">
                                {isEdit ? "✏️ Modifier l'utilisateur" : "➕ Ajouter un utilisateur"}
                            </h2>
                            <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-700">Nom complet</label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required />
                                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-700">Âge</label>
                                <input type="number" value={data.age} onChange={(e) => setData('age', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required />
                                {errors.age && <span className="text-red-500 text-xs">{errors.age}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-700">Adresse Email</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-700">Identifiant (Login)</label>
                                <input type="text" value={data.login} onChange={(e) => setData('login', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required />
                                {errors.login && <span className="text-red-500 text-xs">{errors.login}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-700">Adresse Physique</label>
                                <input type="text" value={data.adresse} onChange={(e) => setData('adresse', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required />
                                {errors.adresse && <span className="text-red-500 text-xs">{errors.adresse}</span>}
                            </div>

                            {isEdit ? (
                                <div>
                                <label className="text-xs font-medium text-gray-700">Rôle de l'utilisateur</label>
                                <input type="text" value={data.role} onChange={(e) => setData('role', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />                                                  
                                </div>
                            ) : (
                                <div>
                                <label className="text-xs font-medium text-gray-700">Rôle de l'utilisateur</label>
                                <select value={data.role} onChange={(e) => setData('role', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white" required>
                                    <option value="">Choisir un rôle</option>
                                    <option value="manager">Manager</option>
                                    <option value="caissier">Caissier</option>
                                    <option value="comptable">Comptable</option>
                                </select>
                                {errors.role && <span className="text-red-500 text-xs">{errors.role}</span>}
                            </div>
                            )}
                            
                        </div>

                        {!isEdit && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Mot de passe</label>
                                    <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required={!isEdit} />
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Confirmation</label>
                                    <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" required={!isEdit} />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">Photo de profil</label>
                            <input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                            {errors.image && <span className="text-red-500 text-xs block mt-1">{errors.image}</span>}
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Annuler
                            </button>
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50">
                                {processing ? 'Enregistrement...' : (isEdit ? 'Mettre à jour' : 'Ajouter')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
