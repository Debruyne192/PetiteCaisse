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
            'age'=>'nullable|integer',
            'login'=>'required|string|max:50',
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()], 
            'adresse'=>'nullable|string|max:50',
            'role'=>'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);
     if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')
            ->store('personnes', 'public');
    }

    $validated['password'] = Hash::make($request->password);

    if(Auth()->check()){
            $personne=Personne::create($validated);
            return back()->with('success','Utilisateur ajouté avec succès');
        }
    elseif(!Auth()->check()){
        if($request->role ==="manager" || $request->role ==="comptable"){
            $managerCount = Personne::where('role','manager')->count();
            $comptableCount = Personne::where('role','comptable')->count();
            if($managerCount > 1 || $comptableCount > 1){
                return back()->withErrors([
                    'login' => 'Vous ne pouvez pas créer un compte pour ce rôle'
                ]);
                
            }
            $personne=Personne::create($validated);
            Auth::login($personne);
        }
        
    }
    
    
    return redirect()->route('personne.dashboard')->with('success','Soit le bienvenu');
    
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
    return redirect('/');
    }
    public function verifierUtilisateurDirect(Request $request)
{
    $request->validate([
        'login' => 'required|string',
    ]);
    
    $userExiste =Personne::where('login', $request->login)->exists();

    if ($userExiste) {
        return redirect()->back()->with('success', 'Utilisateur identifié.');
    }

    return redirect()->back()->withErrors([
        'login' => 'Cet identifiant n\'existe pas dans les registres de BELTEK.'
    ]);
}
    public function renitialiserMDP(Request $request)
    {
        $request->validate([
            'login'    => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'login.required'    => 'Le login est requis pour identifier l\'agent.',
            'password.required' => 'Le nouveau mot de passe est obligatoire.',
            'password.min'      => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed'=> 'Les deux mots de passe saisis ne sont pas identiques.',
        ]);

        $agent = Personne::where('login', $request->login)
                         ->first();

        if (!$agent) {
            return redirect()->back()->withErrors([
                'login' => 'Une erreur critique est survenue : Utilisateur introuvable.'
            ]);
        }

        $agent->password = Hash::make($request->password);

        $agent->save();

        return redirect()->back()->with('success', 'Votre nouveau mot de passe a été enregistré avec succès. Vous pouvez vous connecter.');
    }
}

