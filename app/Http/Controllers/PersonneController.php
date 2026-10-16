<?php

namespace App\Http\Controllers;

use App\Models\Personne;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PersonneController extends Controller
{
    
    public function index()
    {
        $personne = Personne::all();
        return Inertia::render('Personne/Index',['personnes'=>$personne]);
    }

   
    public function create()
    {
        return Inertia::render('Personne/Create');
    }
    public function login()
    {
        return Inertia::render('Personne/Login');
    }

    
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'name'=>'required|string|max:50',
            'email'=>'required|email|string|max:50',
            'age'=>'required|integer',
            'login'=>'required|string|max:50',
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()], 
            'adresse'=>'required|string|max:50',
            'role'=>'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);
     if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')
            ->store('personnes', 'public');
    }

    $validated['password'] = Hash::make($request->password);

    $personne=Personne::create($validated);
    /*
    if(Auth::user()->role === "manager"){
            return back()->with('success','Utilisateur ajouté avec succès');
        }
    */
    Auth::login($personne);
    
    return redirect()->route('personne.dashboard')->with('success','Utilisateur ajouté avec succès');
    
    }

   
    public function show(Personne $personne)
    {
        return Inertia::render('Personnes/Show',['personnes' => $personne]);
    }




public function connexion(Request $request)
{
    $credentials = $request->validate([
        'login' => 'required|string',
        'password' => 'required|string',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->route('personne.dashboard');
    }

    return back()->withErrors([
        'login' => 'L\'identifiant ou le mot de passe est incorrect.',
    ]);
}

    public function edit(Personne $personne)
    {
        return Inertia::render('Personne/Edit',['personne'=>$personne]);
    }

        public function update(Request $request,Personne $personne): RedirectResponse
    {

        if(Auth::user()->role !== "comptable"){
            return back()->with('danger','Accès refusé');
        }
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => ['required', 'email', 'max:50', Rule::unique('personnes')->ignore($personne->id)],
            'age'=>'required|integer',
            'adresse' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($personne->image) {
                Storage::disk('public')->delete($personne->image);
            }
            $validated['image'] = $request->file('image')->store('personnes', 'public');
        } else {
            unset($validated['image']);
        }

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $personne->update($validated);

        return back()->with('success', 'Profil mis à jour avec succès !');
    }

    public function destroy(Personne $personne)
    {
        if($personne){
            $personne->delete();
            return back()->with('success','Utilisateur supprimé avec succès');

        }   
        return back()->with('error','Utilisateur n\'existe pas');     
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    return redirect('/login');
    }
}
