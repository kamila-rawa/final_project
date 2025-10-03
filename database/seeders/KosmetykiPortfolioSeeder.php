<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class KosmetykiPortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('📄 Ajout des images Kosmetyki au portfolio...');

        $kosmetykiPath = public_path('photos/portfolio/kosmetyki');

        if (! File::exists($kosmetykiPath)) {
            $this->command->error("❌ Le dossier {$kosmetykiPath} n'existe pas!");

            return;
        }

        $files = File::files($kosmetykiPath);

        $imageFiles = array_filter($files, function ($file) {
            $extension = strtolower($file->getExtension());

            return in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        });

        if (empty($imageFiles)) {
            $this->command->warn('⚠️  Aucune image trouvée dans le dossier Kosmetyki');

            return;
        }

        $deletedCount = PortfolioImage::where('category', 'kosmetyki')->delete();
        if ($deletedCount > 0) {
            $this->command->info("🗑️  {$deletedCount} anciennes images Kosmetyki supprimées");
        }

        $displayOrder = 1;
        $addedCount = 0;

        foreach ($imageFiles as $file) {
            $filename = $file->getFilename();

            try {
                PortfolioImage::create([
                    'category' => 'kosmetyki',
                    'image' => $filename,
                    'title' => null,
                    'description' => null,
                    'alt_text' => 'Profesjonalne kosmetyki do opalania natryskowego',
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
    }
}
