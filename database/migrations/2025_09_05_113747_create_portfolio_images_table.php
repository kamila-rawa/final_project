<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_images', function (Blueprint $table) {
            $table->id();
            $table->string('title_pl');
            $table->string('title_en');
            $table->text('description_pl')->nullable();
            $table->text('description_en')->nullable();
            $table->string('image'); // Nom du fichier uniquement, le chemin sera généré dynamiquement
            $table->enum('category', ['opalanie', 'kosmetyki', 'certyfikaty', 'smsy', 'inne'])->default('opalanie');
            $table->string('alt_text_pl')->nullable();
            $table->string('alt_text_en')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Index composé pour optimiser les requêtes par catégorie et ordre d'affichage
            $table->index(['is_active', 'category', 'display_order']);
            $table->index(['category', 'created_at']); // Pour l'affichage par catégorie
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_images');
    }
};
