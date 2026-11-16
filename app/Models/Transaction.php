<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'personne_id',
        'categorie_id',
        'montant',
        'type',
        'description',
        'reference_piece',
        'chemin_justificatif',
        'statut',
        'controle_par_id',
        'motif_rejet',
        'est_verrouille',
    ];

    protected $casts = [
        'est_verrouille' => 'boolean',
    ];

    public function caissier(): BelongsTo
    {
        return $this->belongsTo(Personne::class, 'personne_id');
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }

    public function controleur(): BelongsTo
    {
        return $this->belongsTo(Personne::class, 'controle_par_id');
    }
}
