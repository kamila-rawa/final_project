<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeforeAfterImage extends Model
{
    protected $fillable = [
        'title_pl',
        'title_en', 
        'description_pl',
        'description_en',
        'before_image',
        'after_image',
        'alt_text_pl',
        'alt_text_en',
        'display_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer'
    ];

    // Scope pour les images actives
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope pour ordonner
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at', 'desc');
    }

    // Accessors pour les URLs
    public function getBeforeImageUrlAttribute()
    {
        return $this->before_image ? asset('storage/' . $this->before_image) : null;
    }

    public function getAfterImageUrlAttribute()
    {
        return $this->after_image ? asset('storage/' . $this->after_image) : null;
    }

    // Méthode pour récupérer le contenu dans la langue demandée
    public function getTranslatedTitle(string $language = 'pl')
    {
        return $language === 'en' ? $this->title_en : $this->title_pl;
    }

    public function getTranslatedDescription(string $language = 'pl')
    {
        return $language === 'en' ? $this->description_en : $this->description_pl;
    }
}