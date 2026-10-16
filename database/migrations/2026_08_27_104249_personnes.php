<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('personnes', function (Blueprint $blueprint) {
            $blueprint->id(); // Ajoute la clé primaire auto-incrémentée (id)
            $blueprint->string('name');
            $blueprint->string('email')->unique(); // Recommandé d'ajouter ->unique() pour les emails
            $blueprint->integer('age');
            $blueprint->string('login')->unique();
            $blueprint->string('password');
            $blueprint->string('adresse');
            $blueprint->string('role');
            $blueprint->string('image')->nullable(); //  CORRECTION : Ajout des parenthèses () pour le rendre nullable
            $blueprint->rememberToken(); // Recommandé pour la gestion des sessions d'authentification Laravel
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnes');
    }
};
