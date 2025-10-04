<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioImage extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'category',
        'alt_text',
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

    // Scope pour ordonner - CORRECTION: ajout de 'asc' explicite
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order', 'asc')->orderBy('created_at', 'desc');
    }

    // Scope pour mélange aléatoire
    public function scopeRandomOrder($query)
    {
        return $query->inRandomOrder();
    }

    // Accessor pour l'URL de l'image
    public function getImageUrlAttribute()
    {
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

    // Obtenir les catégories disponibles
    public static function getCategories(): array
    {
        return [
            'opalanie' => 'Opalanie',
            'kosmetyki' => 'Kosmetyki',
            'smsy' => 'SMSy od klientek',
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
