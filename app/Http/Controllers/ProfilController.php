<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProfilController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profil/Edit', [
            'user' => $request->user()
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => ['required', 'email', 'max:50', Rule::unique('personnes')->ignore($user->id)],
            'age'=>'required|integer',
            'adresse' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
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

        $user->update($validated);

        return redirect()->intended(route('personne.dashboard'))->with('success', 'Profil mis à jour avec succès !');
    }
}
