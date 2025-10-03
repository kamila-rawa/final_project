<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ContactInfoSeeder::class,
            TestimonialSeeder::class,
            PortfolioImagesSeeder::class,
            // GalleryImageSeeder peut être ajouté plus tard
        ]);
    }
}
