<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            [
                'key' => 'phone',
                'value' => '+48 123 456 789',
                'is_active' => true
            ],
            [
                'key' => 'email',
                'value' => 'kontakt@likeagold.pl',
                'is_active' => true
            ],
            [
                'key' => 'address',
                'value' => 'ul. Przykładowa 123, 00-000 Warszawa, Polska',
                'is_active' => true
            ],
            [
                'key' => 'hours',
                'value' => 'Pon-Pt: 9:00-18:00, Sob: 10:00-16:00, Nie: zamknięte',
                'is_active' => true
            ],
            [
                'key' => 'google_coords',
                'value' => '52.2297,21.0122', // Coordonnées de Varsovie (exemple)
                'is_active' => true
            ],
            [
                'key' => 'instagram',
                'value' => '@likeagold_official',
                'is_active' => true
            ],
            [
                'key' => 'facebook',
                'value' => 'facebook.com/likeagold',
                'is_active' => true
            ]
        ];

        foreach ($contacts as $contact) {
            ContactInfo::updateOrCreate(
                ['key' => $contact['key']], 
                $contact
            );
        }
    }
}

