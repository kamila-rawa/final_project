<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SmsPortfolioSeeder extends Seeder
{
    /**
     * Ajoute automatiquement toutes les images SMS du dossier public/photos/portfolio/smsy
     */
    public function run(): void
    {
        $this->command->info('🔄 Ajout des images SMS au portfolio...');

        // Chemin vers le dossier SMS
        $smsPath = public_path('photos/portfolio/smsy');

        // Vérifier si le dossier existe
        if (! File::exists($smsPath)) {
            $this->command->error("❌ Le dossier {$smsPath} n'existe pas!");

            return;
        }

        // Récupérer tous les fichiers images du dossier
        $files = File::files($smsPath);

        // Filtrer uniquement les images (jpg, jpeg, png)
        $imageFiles = array_filter($files, function ($file) {
            $extension = strtolower($file->getExtension());

            return in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        });

        if (empty($imageFiles)) {
            $this->command->warn('⚠️  Aucune image trouvée dans le dossier SMS');

            return;
        }

        // Supprimer les anciennes entrées SMS (optionnel)
        $deletedCount = PortfolioImage::where('category', 'smsy')->delete();
        if ($deletedCount > 0) {
            $this->command->info("🗑️  {$deletedCount} anciennes images SMS supprimées");
        }

        // Ordre d'affichage
        $displayOrder = 1;
        $addedCount = 0;

        foreach ($imageFiles as $file) {
            $filename = $file->getFilename();

            try {
                // Créer l'entrée en base
                PortfolioImage::create([
                    'category' => 'smsy',
                    'image' => $filename, // Juste le nom du fichier, le modèle gère le chemin complet
                    'title_pl' => 'SMS od klientki '.$displayOrder,
                    'title_en' => 'Client SMS '.$displayOrder,
                    'alt_text_pl' => 'Pozytywna wiadomość od zadowolonej klientki',
                    'alt_text_en' => 'Positive message from satisfied client',
                    'description_pl' => 'Opinia klientki Like a Gold',
                    'description_en' => 'Like a Gold client review',
                    'display_order' => $displayOrder,
                    'is_active' => true,
                ]);

                $addedCount++;
                $displayOrder++;

            } catch (\Exception $e) {
                $this->command->error("❌ Erreur lors de l'ajout de {$filename}: ".$e->getMessage());
            }
        }

        $this->command->info("✅ {$addedCount} images SMS ajoutées avec succès!");
        $this->command->info('📁 Catégorie: smsy');
        $this->command->info('🖼️  Images disponibles sur le site');
    }
}
