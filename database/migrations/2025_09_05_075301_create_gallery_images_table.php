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
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->string('filename')->comment('Nom du fichier sur le serveur');
            $table->string('original_name')->comment('Nom original du fichier');
            $table->string('alt_text_pl')->nullable()->comment('Texte alternatif en polonais');
            $table->string('alt_text_en')->nullable()->comment('Texte alternatif en anglais');
            $table->integer('sort_order')->default(0)->comment('Ordre d\'affichage');
            $table->boolean('is_active')->default(true)->comment('Statut de publication');
            $table->timestamps();
            
            // Index composites pour optimiser les requêtes
            $table->index(['is_active', 'sort_order']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_images');
    }
};

