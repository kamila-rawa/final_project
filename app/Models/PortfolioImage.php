<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioImage extends Model
{
    protected $fillable = [
        'title_pl',
        'title_en',
        'description_pl', 
        'description_en',
        'image',
        'category',
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

    // Scope pour filtrer par catégorie
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    // Scope pour ordonner
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at', 'desc');
    }

    // Accessor pour l'URL de l'image
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    // Méthodes pour récupérer le contenu traduit
    public function getTranslatedTitle(string $language = 'pl')
    {
        return $language === 'en' ? $this->title_en : $this->title_pl;
    }

    public function getTranslatedDescription(string $language = 'pl')
    {
        return $language === 'en' ? $this->description_en : $this->description_pl;
    }

    public function getTranslatedAltText(string $language = 'pl')
    {
        return $language === 'en' ? $this->alt_text_en : $this->alt_text_pl;
    }

    // Obtenir les catégories disponibles
    public static function getCategories(): array
    {
        return [
            'products' => 'Products',
            'salon' => 'Salon', 
            'equipment' => 'Equipment',
            'other' => 'Other'
        ];
    }
}