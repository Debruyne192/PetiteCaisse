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
        //
        schema::create('posts',function(Blueprint $table){
            $table->id('id');
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->integer('likes')->default(0);
            $table->foreignId('user_id')->contrained()->onDelete('cascade');
            $table->timestamps();
        });

        schema::create('post_likes',function(Blueprint $table){
            $table->id('id');
           $table->foreignId('user_id')->contrained()->onDelete('cascade');
           $table->foreignId('post_id')->contrained()->onDelete('cascade');
           $table->unique('user_id','post_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        schema::dropIfExists('posts');
        schema::dropIfExists('post_likes');
    }
};
