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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('personne_id')->constrained('personnes')->onDelete('cascade'); // Le caissier
            $table->foreignId('categorie_id')->nullable()->constrained('categories')->onDelete('set null');
            
            $table->integer('montant'); 
            $table->enum('type', ['debit', 'credit']); 
            $table->string('description'); 
            $table->string('reference_piece')->nullable(); 
            $table->string('chemin_justificatif')->nullable();            
            $table->enum('statut', ['en_attente', 'validé', 'rejeté'])->default('en_attente'); 
            $table->foreignId('controle_par_id')->nullable()->constrained('personnes')->onDelete('set null'); 
            $table->text('motif_rejet')->nullable(); 
            $table->boolean('est_verrouille')->default(false); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
