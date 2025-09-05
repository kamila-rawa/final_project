<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('before_after_images', function (Blueprint $table) {
            $table->id();
            $table->string('title_pl');
            $table->string('title_en');
            $table->text('description_pl')->nullable();
            $table->text('description_en')->nullable();
            $table->string('before_image');
            $table->string('after_image');
            $table->string('alt_text_pl')->nullable();
            $table->string('alt_text_en')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['is_active', 'display_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('before_after_images');
    }
};
