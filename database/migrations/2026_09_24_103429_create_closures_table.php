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
        Schema::create('closures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cloture_par_id')->constrained('personnes'); // Le comptable
            $table->dateTime('date_cloture');
            $table->integer('solde_initial'); // Solde de départ du mois
            $table->integer('solde_final'); // Solde validé lors de l'arrêté de caisse
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('closures');
    }
};
