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
            $blueprint->id();
            $blueprint->string('name');
            $blueprint->string('email')->unique(); 
            $blueprint->integer('age')->nullable();
            $blueprint->string('login')->unique();
            $blueprint->string('password');
            $blueprint->string('adresse')->nullable();
            $blueprint->string('role');
            $blueprint->string('image')->nullable();
            $blueprint->rememberToken();
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
