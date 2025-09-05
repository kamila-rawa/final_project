<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'key',
        'value',
        'is_active'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope pour récupérer seulement les infos actives
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Méthodes statiques pour récupérer des infos spécifiques
     */
    public static function getPhone(): ?string
    {
        return self::where('key', 'phone')->where('is_active', true)->value('value');
    }

    public static function getEmail(): ?string
    {
        return self::where('key', 'email')->where('is_active', true)->value('value');
    }

    public static function getAddress(): ?string
    {
        return self::where('key', 'address')->where('is_active', true)->value('value');
    }

    public static function getHours(): ?string
    {
        return self::where('key', 'hours')->where('is_active', true)->value('value');
    }

    public static function getGoogleCoords(): ?string
    {
        return self::where('key', 'google_coords')->where('is_active', true)->value('value');
    }

    public static function getInstagram(): ?string
    {
        return self::where('key', 'instagram')->where('is_active', true)->value('value');
    }

    public static function getFacebook(): ?string
    {
        return self::where('key', 'facebook')->where('is_active', true)->value('value');
    }

    /**
     * Méthode pour récupérer toutes les infos de contact formatées
     */
    public static function getAllFormatted(): array
    {
        $contacts = self::active()->pluck('value', 'key')->toArray();
        
        // Parser les coordonnées Google si elles existent
        if (isset($contacts['google_coords'])) {
            $coords = explode(',', $contacts['google_coords']);
            $contacts['lat'] = (float) ($coords[0] ?? 0);
            $contacts['lng'] = (float) ($coords[1] ?? 0);
        }

        return $contacts;
    }
}