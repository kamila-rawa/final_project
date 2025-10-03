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
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
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

    // Scope pour mélange aléatoire (pour affichage "wszystkie")
    public function scopeRandomOrder($query)
    {
        return $query->inRandomOrder();
    }

    // Accessor pour l'URL de l'image
    public function getImageUrlAttribute()
    {
        // Structure: public/photos/portfolio/{category}/{image}
        if ($this->image) {
            // Si c'est déjà un chemin complet, le retourner tel quel
            if (str_starts_with($this->image, '/photos/') || str_starts_with($this->image, 'http')) {
                return $this->image;
            }

            // Sinon, construire le chemin avec la catégorie
            return "/photos/portfolio/{$this->category}/{$this->image}";
        }

        return null;
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

    // Obtenir les nouvelles catégories disponibles
    public static function getCategories(): array
    {
        return [
            'opalanie' => 'Opalanie',
            'kosmetyki' => 'Kosmetyki',
            'certyfikaty' => 'Certyfikaty',
            'smsy' => 'SMSy od klientek',
            'inne' => 'Inne',
        ];
    }

    // Obtenir le nom de la catégorie en polonais
    public function getCategoryNameAttribute(): string
    {
        $categories = self::getCategories();

        return $categories[$this->category] ?? $this->category;
    }

    // Valider si une catégorie existe
    public static function isValidCategory(string $category): bool
    {
        return array_key_exists($category, self::getCategories());
    }
}
