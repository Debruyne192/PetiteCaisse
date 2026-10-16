<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Closure extends Model
{
    protected $fillable = [
        'cloture_par_id',
        'date_cloture',
        'solde_initial',
        'solde_final',
    ];

    protected $casts = [
        'date_cloture' => 'datetime', // Gère proprement l'objet Date en PHP
    ];

    /**
     * Obtenir le comptable ayant validé l'arrêté de caisse.
     */
    public function comptable(): BelongsTo
    {
        return $this->belongsTo(Personne::class, 'cloture_par_id');
    }
}
