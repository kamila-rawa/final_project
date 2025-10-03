<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'client_name',
        'content_pl',
        'content_en',
        'rating',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_active' => 'boolean',
        'rating' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Récupère le contenu selon la langue demandée
     */
    public function getContent(string $locale = 'pl'): string
    {
        return $locale === 'en' ? $this->content_en : $this->content_pl;
    }

    /**
     * Scope pour récupérer seulement les témoignages actifs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope pour récupérer des témoignages aléatoires
     */
    public function scopeRandom($query, int $limit = 5)
    {
        return $query->inRandomOrder()->limit($limit);
    }

    /**
     * Scope pour ordonner par date de création décroissante
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Accesseur pour formater la note avec des étoiles
     */
    public function getStarsAttribute(): string
    {
        return str_repeat('⭐', $this->rating);
    }

    /**
     * Accesseur pour obtenir un nom d'affichage
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->client_name ?? 'Client anonyme';
    }
}
