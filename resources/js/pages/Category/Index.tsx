import DashboardLayout from "@/layouts/DashboardLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { FormEvent, useState, useEffect } from "react";
import { Plus, Trash, SquarePen, Search, X, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import "./../../layouts/style.css";

interface Category {
    id: number;
    nom: string;
    slug: string;
}

type User = {
    id : number,
    name : string,
    role : string ,
}
interface PageProps {
    flash: {
        success: string | null;
        danger: string | null;
        error: string | null;
    };
    [key: string]: any;
}

interface IndexProps {
    categories: Category[];
}

export default function Index({ categories = [] }: IndexProps) {
    const { props } = usePage<PageProps>();
    const { flash } = props;
    const auth = props.auth as unknown as {
        user: User | null;
    };
    
    const user = auth?.user;
    const role = user?.role;
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        slug: ''
    });

    

    const openCreateModal = () => {
        setIsEdit(false);
        setSelectedId(null);
        reset();
        setIsOpen(true);
    };

    const openEditModal = (category: Category) => {
        setIsEdit(true);
        setSelectedId(category.id);
        setData({
            nom: category.nom,
            slug: category.slug
        });
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            router.delete(`/category/${id}`);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit && selectedId) {
            router.put(`/category/${selectedId}`, data, {
                onSuccess: () => { setIsOpen(false); reset(); },
            });
        } else {
            post('/category', {
                onSuccess: () => { setIsOpen(false); reset(); },
            });
        }
    };

    const filteredCategories = categories.filter(category =>
        category.nom.toLowerCase().includes(search.toLowerCase()) ||
        category.slug.toLowerCase().includes(search.toLowerCase())
    );
    const [visibleSuccess, setVisibleSuccess] = useState<string | null>(flash?.success);
    const [visibleDanger, setVisibleDanger] = useState<string | null>(flash?.danger || flash?.error);

  useEffect(() => {
        setVisibleSuccess(flash?.success);
        setVisibleDanger(flash?.danger);

        let successTimer: any;
        if (flash?.success) {
            successTimer = setTimeout(() => {
                setVisibleSuccess(null);
            }, 5000);
        }

        let dangerTimer: any;
        if (flash?.danger || flash?.error) {
            dangerTimer = setTimeout(() => {
                setVisibleDanger(null);
            }, 5000);
        }

        return () => {
            clearTimeout(successTimer);
            clearTimeout(dangerTimer);
        };
    }, [flash]);

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-4">            
            {(visibleSuccess || visibleDanger) ? (
                    <div className="space-y-4">
                        {visibleSuccess && (
                            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center justify-between shadow-sm transition-all duration-300">
                                <div className="flex items-center gap-3 text-emerald-800 font-semibold">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    <p className="text-sm">{visibleSuccess}</p>
                                </div>
                                <button onClick={() => setVisibleSuccess(null)} className="text-emerald-500 hover:text-emerald-700 bg-transparent border-0 cursor-pointer">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {visibleDanger && (
                            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl flex items-center justify-between shadow-sm transition-all duration-300">
                                <div className="flex items-center gap-3 text-rose-800 font-semibold">
                                    <AlertCircle size={18} className="text-rose-500" />
                                    <p className="text-sm">{visibleDanger}</p>
                                </div>
                                <button onClick={() => setVisibleDanger(null)} className="text-rose-500 hover:text-rose-700 bg-transparent border-0 cursor-pointer">
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">La liste des catégories</h1>
                    <p className="text-sm text-slate-500 mt-1">Gestion et suivi des catégories d'articles.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher une catégorie..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>
                    {user?.role === "manager" ? (
                        <button
                            onClick={openCreateModal}
                            className="flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                        >
                            <Plus size={16} />
                            Ajouter une catégorie
                        </button>
                    ) : ""}
                </div>
            </div>

            <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-[#1e293b] border border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="border border-[#ddd] p-[12px 16px] text-white text-[0.85rem] uppercase py-4 px-6 text-center">Nom</th>
                            <th className="border border-[#ddd] p-[12px 16px] text-white text-[0.85rem] uppercase py-4 px-6 text-center">Slug</th>
                            {user?.role === "manager" ? (
                               <th className="border border-[#ddd] p-[12px 16px] text-white text-[0.85rem] uppercase py-4 px-6 text-center">Actions</th>
                            ) : ""}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((cate) => (
                                <tr key={cate.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900">{cate.nom}</td>
                                    <td className="py-4 px-6 font-mono text-xs text-slate-600">{cate.slug}</td>
                                    {user?.role === "manager" ? (
                                        <td className="py-4 px-6 flex items-center justify-center">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => openEditModal(cate)} 
                                                className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
                                            >
                                                <SquarePen size={16} />
                                                Modifier
                                            </button>
                                                                                        <button 
                                                onClick={() => handleDelete(cate.id)} 
                                                className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors font-medium"
                                            >
                                                <Trash size={16} />
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                    ) : ""}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-8 text-slate-400">Aucune catégorie trouvée.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/40 z-50 p-4">
                    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-4 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
                        
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">
                                {isEdit ? "⚙️ Modifier la catégorie" : "📁 Nouvelle catégorie"}
                            </h3>
                            <button 
                                type="button" 
                                onClick={() => setIsOpen(false)} 
                                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="nom" className="block text-xs font-bold uppercase text-slate-500 mb-1">
                                    Nom de la catégorie
                                </label>
                                <input
                                    id="nom"
                                    type="text"
                                    placeholder="Ex: Fournitures de bureau, Carburant..."
                                    value={data.nom}
                                    onChange={(e) => setData("nom", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required
                                />
                                {errors.nom && (
                                    <p className="text-xs text-red-600 font-semibold mt-1">❌ {errors.nom}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="slug" className="block text-xs font-bold uppercase text-slate-500 mb-1">
                                    Slug (Identifiant URL)
                                </label>
                                <input
                                    id="slug"
                                    type="text"
                                    placeholder="Généré automatiquement par le serveur..."
                                    value={data.slug}
                                    onChange={(e) => setData("slug", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg text-sm font-mono focus:outline-none cursor-not-allowed"
                                    disabled={!isEdit} // Optionnel : désactivé en création car géré par Laravel
                                />
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                            >
                                {processing ? "Envoi en cours..." : isEdit ? "Enregistrer les modifications" : "Créer la catégorie"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
                    </div>
                )}
            
        </div>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;
