<?php

namespace Database\Seeders;

use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SmsPortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Ajout des images SMS au portfolio...');

        $smsPath = public_path('photos/portfolio/smsy');

        if (! File::exists($smsPath)) {
            $this->command->error("Le dossier {$smsPath} n'existe pas!");

            return;
        }

        $files = File::files($smsPath);

        $imageFiles = array_filter($files, function ($file) {
            $extension = strtolower($file->getExtension());

            return in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        });

        if (empty($imageFiles)) {
            $this->command->warn('Aucune image trouvée dans le dossier SMS');

            return;
        }

        $deletedCount = PortfolioImage::where('category', 'smsy')->delete();
        if ($deletedCount > 0) {
            $this->command->info("{$deletedCount} anciennes images SMS supprimées");
        }

        $displayOrder = 1;
        $addedCount = 0;

        foreach ($imageFiles as $file) {
            $filename = $file->getFilename();

            try {
                PortfolioImage::create([
                    'category' => 'smsy',
                    'image' => $filename,
                    'title' => null,
                    'description' => null,
                    'alt_text' => 'Pozytywna wiadomość od zadowolonej klientki',
                    'display_order' => $displayOrder,
                    'is_active' => true,
                ]);

                $addedCount++;
                $displayOrder++;

            } catch (\Exception $e) {
                $this->command->error("Erreur lors de l'ajout de {$filename}: ".$e->getMessage());
            }
        }

        $this->command->info("{$addedCount} images SMS ajoutées avec succès!");
    }
}
