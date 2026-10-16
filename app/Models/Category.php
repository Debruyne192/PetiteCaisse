<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    //
    protected $fillable = [
        'nom',
        'slug',
    ];

    /**
     * Obtenir toutes les transactions classées dans cette catégorie.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'categorie_id');
    }
}
