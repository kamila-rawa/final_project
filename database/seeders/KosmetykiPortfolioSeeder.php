<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class KosmetykiPortfolioSeeder extends Seeder
{
    /**
     * Ajoute automatiquement toutes les images Kosmetyki du dossier public/photos/portfolio/kosmetyki
     */
    public function run(): void
    {
        $this->command->info('🔄 Ajout des images Kosmetyki au portfolio...');

        // Chemin vers le dossier Kosmetyki
        $kosmetykiPath = public_path('photos/portfolio/kosmetyki');

        // Vérifier si le dossier existe
        if (! File::exists($kosmetykiPath)) {
            $this->command->error("❌ Le dossier {$kosmetykiPath} n'existe pas!");

            return;
        }

        // Récupérer tous les fichiers images du dossier
        $files = File::files($kosmetykiPath);

        // Filtrer uniquement les images (jpg, jpeg, png)
        $imageFiles = array_filter($files, function ($file) {
            $extension = strtolower($file->getExtension());

            return in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        });

        if (empty($imageFiles)) {
            $this->command->warn('⚠️  Aucune image trouvée dans le dossier Kosmetyki');

            return;
        }

        // Supprimer les anciennes entrées Kosmetyki (optionnel)
        $deletedCount = PortfolioImage::where('category', 'kosmetyki')->delete();
        if ($deletedCount > 0) {
            $this->command->info("🗑️  {$deletedCount} anciennes images Kosmetyki supprimées");
        }

        // Ordre d'affichage
        $displayOrder = 1;
        $addedCount = 0;

        foreach ($imageFiles as $file) {
            $filename = $file->getFilename();

            try {
                // Créer l'entrée en base
                PortfolioImage::create([
                    'category' => 'kosmetyki',
                    'image' => $filename, // Juste le nom du fichier, le modèle gère le chemin complet
                    'title_pl' => 'Kosmetyki '.$displayOrder,
                    'title_en' => 'Cosmetics '.$displayOrder,
                    'alt_text_pl' => 'Profesjonalne kosmetyki do opalania natryskowego',
                    'alt_text_en' => 'Professional spray tanning cosmetics',
                    'description_pl' => 'Wysokiej jakości produkty do opalania natryskowego',
                    'description_en' => 'High quality spray tanning products',
                    'display_order' => $displayOrder,
                    'is_active' => true,
                ]);

                $addedCount++;
                $displayOrder++;

            } catch (\Exception $e) {
                $this->command->error("❌ Erreur lors de l'ajout de {$filename}: ".$e->getMessage());
            }
        }

        $this->command->info("✅ {$addedCount} images Kosmetyki ajoutées avec succès!");
        $this->command->info('📁 Catégorie: kosmetyki');
        $this->command->info('🖼️  Images disponibles sur le site');
    }
}
