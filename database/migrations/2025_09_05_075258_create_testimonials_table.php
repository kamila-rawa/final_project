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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name')->nullable()->comment('Nom du client (optionnel)');
            $table->text('content_pl')->comment('Contenu du témoignage en polonais');
            $table->text('content_en')->comment('Contenu du témoignage en anglais');
            $table->tinyInteger('rating')->unsigned()->default(5)->comment('Note sur 5 étoiles');
            $table->boolean('is_active')->default(true)->comment('Statut de publication');
            $table->timestamps();
            
            // Index pour optimiser les requêtes
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
