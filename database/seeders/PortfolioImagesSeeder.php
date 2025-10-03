<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;

class PortfolioImagesSeeder extends Seeder
{
    public function run(): void
    {
        // Images de la catégorie "opalanie" - Spray tan avec les bonnes extensions
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
                'title_pl' => 'Profesjonalny Spray Tan',
                'title_en' => 'Professional Spray Tan',
                'description_pl' => 'Naturalny efekt opalenizny dla perfekcyjnego wyglądu',
                'description_en' => 'Natural tanning effect for a perfect look',
                'image' => $imageData['image'], // Tylko nazwa pliku z właściwą ekstensją
                'category' => 'opalanie',
                'alt_text_pl' => 'Profesjonalne opalanie natryskowe - efekt '.$imageData['display_order'],
                'alt_text_en' => 'Professional spray tan - result '.$imageData['display_order'],
                'display_order' => $imageData['display_order'],
                'is_active' => true,
            ]);
        }

        // Catégorie "kosmetyki" - quelques exemples (à adapter si vous avez des images)
        $kosmetykiImages = [
            [
                'title_pl' => 'Produkty Norvell',
                'title_en' => 'Norvell Products',
                'description_pl' => 'Wysokiej jakości kosmetyki do spray tan',
                'description_en' => 'High quality spray tan cosmetics',
                'image' => 'norvell-products-1.jpg',
                'alt_text_pl' => 'Kosmetyki Norvell do opalania',
                'alt_text_en' => 'Norvell tanning cosmetics',
                'display_order' => 1,
            ],
        ];

        foreach ($kosmetykiImages as $imageData) {
            // Vérifier si le fichier existe avant de créer l'entrée
            if (file_exists(public_path("photos/portfolio/kosmetyki/{$imageData['image']}"))) {
                PortfolioImage::create([
                    'title_pl' => $imageData['title_pl'],
                    'title_en' => $imageData['title_en'],
                    'description_pl' => $imageData['description_pl'],
                    'description_en' => $imageData['description_en'],
                    'image' => $imageData['image'],
                    'category' => 'kosmetyki',
                    'alt_text_pl' => $imageData['alt_text_pl'],
                    'alt_text_en' => $imageData['alt_text_en'],
                    'display_order' => $imageData['display_order'],
                    'is_active' => true,
                ]);
            }
        }

        // Catégorie "certyfikaty" - exemple (à adapter si vous avez des images)
        $certyfikatyImages = [
            [
                'title_pl' => 'Certyfikat Spray Tan',
                'title_en' => 'Spray Tan Certificate',
                'description_pl' => 'Certyfikat ukończenia kursu spray tan',
                'description_en' => 'Spray tan course completion certificate',
                'image' => 'certificate-spray-tan.jpg',
                'alt_text_pl' => 'Certyfikat specjalisty spray tan',
                'alt_text_en' => 'Spray tan specialist certificate',
                'display_order' => 1,
            ],
        ];

        foreach ($certyfikatyImages as $imageData) {
            if (file_exists(public_path("photos/portfolio/certyfikaty/{$imageData['image']}"))) {
                PortfolioImage::create([
                    'title_pl' => $imageData['title_pl'],
                    'title_en' => $imageData['title_en'],
                    'description_pl' => $imageData['description_pl'],
                    'description_en' => $imageData['description_en'],
                    'image' => $imageData['image'],
                    'category' => 'certyfikaty',
                    'alt_text_pl' => $imageData['alt_text_pl'],
                    'alt_text_en' => $imageData['alt_text_en'],
                    'display_order' => $imageData['display_order'],
                    'is_active' => true,
                ]);
            }
        }
    }
}
