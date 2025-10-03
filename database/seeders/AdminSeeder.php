<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Supprimer l'admin existant s'il y en a un
        User::where('email', env('ADMIN_EMAIL'))->delete();

        // Créer l'admin depuis les variables d'environnement
        User::create([
            'name' => 'Admin',
            'email' => env('ADMIN_EMAIL', 'admin@likeagold.pl'),
            'password' => env('ADMIN_PASSWORD')
                ? env('ADMIN_PASSWORD')
                : Hash::make('password'), // Fallback si pas de hash dans .env
            'email_verified_at' => now(),
        ]);

        $this->command->info('Admin créé avec succès!');
        $this->command->info('Email: '.env('ADMIN_EMAIL'));
    }
}
