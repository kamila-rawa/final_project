<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;

class PortfolioImagesSeeder extends Seeder
{
    public function run(): void
    {
        // Images de la catégorie "opalanie" - Spray tan
        $opalanieImages = [
            // Première série
            ['image' => 'D25AAC68-2804-471B-BFC7-B527FFE1EA5.jpg', 'display_order' => 1],
            ['image' => 'IMG_5149.jpg', 'display_order' => 2],
            ['image' => 'LikeAGold-Aneta-4-2.JPEG', 'display_order' => 3],
            ['image' => 'LikeAGold-Aneta-9-2.JPEG', 'display_order' => 4],
            ['image' => 'LikeAGold-Aneta-15-2.JPEG', 'display_order' => 5],
            ['image' => 'LikeAGold-Aneta-17-2.JPEG', 'display_order' => 6],
            ['image' => 'LikeAGold-Aneta-20-2.JPEG', 'display_order' => 7],
            ['image' => 'LikeAGold-Aneta-23-2.JPEG', 'display_order' => 8],
            ['image' => 'LikeAGold-Aneta-25-2.JPEG', 'display_order' => 9],
            ['image' => 'LikeAGold-Aneta-27-2.JPEG', 'display_order' => 10],

            // Deuxième série
            ['image' => 'LikeAGold-Aneta-32-2.JPEG', 'display_order' => 11],
            ['image' => 'LikeAGold-Aneta-36-2.JPEG', 'display_order' => 12],
            ['image' => 'LikeAGold-Aneta-46-2.JPEG', 'display_order' => 13],
            ['image' => 'LikeAGold-Aneta-48-2.JPEG', 'display_order' => 14],
            ['image' => 'LikeAGold-Aneta-49-2.JPEG', 'display_order' => 15],
            ['image' => 'LikeAGold-Aneta-60-2.JPEG', 'display_order' => 16],
            ['image' => 'LikeAGold-Aneta-63-2.JPEG', 'display_order' => 17],
            ['image' => 'LikeAGold-Aneta-74-2.JPEG', 'display_order' => 18],
            ['image' => 'LikeAGold-Aneta-75-2.JPEG', 'display_order' => 19],
            ['image' => 'LikeAGold-Aneta-79-2.JPEG', 'display_order' => 20],

            // Troisième série
            ['image' => 'LikeAGold-Aneta-85-2.JPEG', 'display_order' => 21],
            ['image' => 'LikeAGold-Aneta-95-2.JPEG', 'display_order' => 22],
            ['image' => 'LikeAGold-Aneta-102.JPEG', 'display_order' => 23],
            ['image' => 'LikeAGold-Aneta-107-2.JPEG', 'display_order' => 24],
            ['image' => 'LikeAGold-Aneta-112-2.JPEG', 'display_order' => 25],
            ['image' => 'LikeAGold-Aneta-127-2.JPEG', 'display_order' => 26],
            ['image' => 'LikeAGold-Aneta-136-2.JPEG', 'display_order' => 27],
            ['image' => 'LikeAGold-Aneta-139-2.JPEG', 'display_order' => 28],
        ];

        foreach ($opalanieImages as $imageData) {
            PortfolioImage::create([
                'title' => null, // Optionnel
                'description' => null, // Optionnel
                'image' => $imageData['image'],
                'category' => 'opalanie',
                'alt_text' => 'Profesjonalne opalanie natryskowe - efekt '.$imageData['display_order'],
                'display_order' => $imageData['display_order'],
                'is_active' => true,
            ]);
        }

        // Catégorie "kosmetyki" - quelques exemples (à adapter si vous avez des images)
        $kosmetykiImages = [
            [
                'title' => 'Produkty Norvell',
                'description' => 'Wysokiej jakości kosmetyki do spray tan',
                'image' => 'norvell-products-1.jpg',
                'alt_text' => 'Kosmetyki Norvell do opalania',
                'display_order' => 1,
            ],
        ];

        foreach ($kosmetykiImages as $imageData) {
            // Vérifier si le fichier existe avant de créer l'entrée
            if (file_exists(public_path("photos/portfolio/kosmetyki/{$imageData['image']}"))) {
                PortfolioImage::create([
                    'title' => $imageData['title'],
                    'description' => $imageData['description'],
                    'image' => $imageData['image'],
                    'category' => 'kosmetyki',
                    'alt_text' => $imageData['alt_text'],
                    'display_order' => $imageData['display_order'],
                    'is_active' => true,
                ]);
            }
        }

        // Catégorie "smsy" - messages de clientes (à adapter si vous avez des images)
        $smsyImages = [
            [
                'title' => null,
                'description' => null,
                'image' => 'client-message-1.jpg',
                'alt_text' => 'Wiadomość od zadowolonej klientki',
                'display_order' => 1,
            ],
        ];

        foreach ($smsyImages as $imageData) {
            if (file_exists(public_path("photos/portfolio/smsy/{$imageData['image']}"))) {
                PortfolioImage::create([
                    'title' => $imageData['title'],
                    'description' => $imageData['description'],
                    'image' => $imageData['image'],
                    'category' => 'smsy',
                    'alt_text' => $imageData['alt_text'],
                    'display_order' => $imageData['display_order'],
                    'is_active' => true,
                ]);
            }
        }
    }
}
