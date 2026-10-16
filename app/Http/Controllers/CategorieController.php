<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategorieController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Category/Index', [
            'categories' => Category::latest()->get()
        ]);
    }

    
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'manager') {
                abort(403, "Action non autorisée. Seul le comptable général gère les catégories.");
            }
        $donneesValidees = $request->validate([
            'nom' => 'required|string|min:3|max:100|unique:categories,nom',
        ], [
            'nom.unique' => 'Ce type de dépense existe déjà dans le système.'
        ]);

        Category::create([
            'nom'  => $request->nom,
            'slug' => Str::slug($request->nom), // Génère ex: "fournitures-de-bureau" à partir de "Fournitures de bureau"
        ]);

        return redirect()->back()->with('success','La nouvelle catégorie de dépense a été ajoutée avec succès.'
        );
    }

    public function edit(Category $category){
        return Inertia::render('Category/Edit',['category' => $category]);
    }

    
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'nom' => 'required|string|min:3|max:100|unique:categories,nom,' . $category->id,
        ]);

        $category->update([
            'nom'  => $request->nom,
            'slug' => Str::slug($request->nom),
        ]);

        return redirect()->back()->with('success','La catégorie a été modifiée avec succès.'
        );
    }

    public function destroy(Category $category)
    {
        if ($category->transactions()->count() > 0) {
            return back()->with('danger','Impossible de supprimer cette catégorie car elle contient déjà des transactions archivées.');
        }

        $category->delete();

        return back()->with('success','La catégorie a été supprimée définitivement.'
        );
    }
}
