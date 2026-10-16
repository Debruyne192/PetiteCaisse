<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;
use App\Concerns\HasTeams;


class Personne extends Authenticatable
{
    //
    use Notifiable;
    use HasTeams; //  AJOUTER CE TRAIT ICI
        protected $table = 'personnes'; // Optionnel si votre table respecte le pluriel automatique

    protected $fillable =[
        'name',
        'email',
        'age',
        'login',
        'password',
        'adresse',
        'role',
        'image',
    ];
    protected $hidden = ['password','remember_token'];

    protected $casts = [
        'password' => 'hashed', // Hache automatiquement les mots de passe
    ];

    /**
     * Obtenir les transactions enregistrées par ce caissier.
     */
    public function transactionsSaisies(): HasMany
    {
        return $this->hasMany(Transaction::class, 'personne_id');
    }

    /**
     * Obtenir les transactions validées ou rejetées par ce manager.
     */
    public function transactionsControlees(): HasMany
    {
        return $this->hasMany(Transaction::class, 'controle_par_id');
    }

    public function cloturesEffectuees(): HasMany
    {
        return $this->hasMany(Closure::class, 'cloture_par_id');
    }

    
}
