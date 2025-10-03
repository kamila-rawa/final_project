<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PortfolioImagesSeeder::class,
            // Ou utilisez les seeders automatiques par catégorie :
            // OpalaniePortfolioSeeder::class,
            // KosmetykiPortfolioSeeder::class,
            // SmsPortfolioSeeder::class,
        ]);
    }
}
