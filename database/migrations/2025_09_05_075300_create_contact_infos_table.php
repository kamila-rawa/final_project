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
        Schema::create('contact_infos', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique()->comment('Clé unique (phone, email, address, etc.)');
            $table->text('value')->comment('Valeur (identique pour toutes les langues)');
            $table->boolean('is_active')->default(true)->comment('Statut actif');
            $table->timestamps();
            
            // Index composites pour optimiser les requêtes
            $table->index(['key', 'is_active']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_infos');
    }
};