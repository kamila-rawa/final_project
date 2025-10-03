<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class OpalaniePortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🔄 Ajout des images Opalanie au portfolio...');

        $opalaniePath = public_path('photos/portfolio/opalanie');

        if (! File::exists($opalaniePath)) {
            $this->command->error("❌ Le dossier {$opalaniePath} n'existe pas!");

            return;
        }

        $files = File::files($opalaniePath);

        $imageFiles = array_filter($files, function ($file) {
            $extension = strtolower($file->getExtension());

            return in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        });

        if (empty($imageFiles)) {
            $this->command->warn('⚠️  Aucune image trouvée dans le dossier Opalanie');

            return;
        }

        $deletedCount = PortfolioImage::where('category', 'opalanie')->delete();
        if ($deletedCount > 0) {
            $this->command->info("🗑️  {$deletedCount} anciennes images Opalanie supprimées");
        }

        $displayOrder = 1;
        $addedCount = 0;

        foreach ($imageFiles as $file) {
            $filename = $file->getFilename();

            try {
                PortfolioImage::create([
                    'category' => 'opalanie',
                    'image' => $filename,
                    'title_pl' => 'Profesjonalny Spray Tan '.$displayOrder,
                    'title_en' => 'Professional Spray Tan '.$displayOrder,
                    'alt_text_pl' => 'Profesjonalne opalanie natryskowe - efekt '.$displayOrder,
                    'alt_text_en' => 'Professional spray tan - result '.$displayOrder,
                    'description_pl' => 'Naturalny efekt opalenizny dla perfekcyjnego wyglądu',
                    'description_en' => 'Natural tanning effect for a perfect look',
                    'display_order' => $displayOrder,
                    'is_active' => true,
                ]);

                $addedCount++;
                $displayOrder++;

            } catch (\Exception $e) {
                $this->command->error("❌ Erreur lors de l'ajout de {$filename}: ".$e->getMessage());
            }
        }

        $this->command->info("✅ {$addedCount} images Opalanie ajoutées avec succès!");
        $this->command->info('📁 Catégorie: opalanie');
        $this->command->info('🖼️  Images disponibles sur le site');
    }
}
