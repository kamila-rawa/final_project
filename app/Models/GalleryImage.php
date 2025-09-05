<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class GalleryImage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'filename',
        'original_name',
        'alt_text_pl',
        'alt_text_en',
        'sort_order',
        'is_active'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Les images de galerie sont décoratives - alt text vide pour l'accessibilité
     */
    public function getAltText(): string
    {
        return ''; // Images décoratives = alt vide selon WCAG 2.1
    }

    /**
     * Scope pour récupérer seulement les images actives
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope pour ordonner par ordre d'affichage
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at');
    }

    /**
     * Accesseur pour obtenir l'URL complète de l'image
     */
    public function getUrlAttribute(): string
    {
        return Storage::url('gallery/' . $this->filename);
    }

    /**
     * Accesseur pour obtenir l'URL du thumbnail
     */
    public function getThumbnailUrlAttribute(): string
    {
        $pathInfo = pathinfo($this->filename);
        $thumbnailName = $pathInfo['filename'] . '_thumb.' . $pathInfo['extension'];
        return Storage::url('gallery/thumbs/' . $thumbnailName);
    }

    /**
     * Boot method pour gérer la suppression des fichiers
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($image) {
            // Supprimer le fichier principal
            Storage::delete('gallery/' . $image->filename);
            
            // Supprimer le thumbnail s'il existe
            $pathInfo = pathinfo($image->filename);
            $thumbnailName = $pathInfo['filename'] . '_thumb.' . $pathInfo['extension'];
            Storage::delete('gallery/thumbs/' . $thumbnailName);
        });
    }
}