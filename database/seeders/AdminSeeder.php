<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Email admin par défaut
        $adminEmail = env('ADMIN_EMAIL', '6kamilarawa6@gmail.com');

        // Supprimer l'admin existant s'il y en a un
        User::where('email', $adminEmail)->delete();

        // Créer l'admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => $adminEmail,
            'password' => Hash::make(env('ADMIN_PASSWORD', 'Admin123!')),
            'email_verified_at' => now(),
        ]);

        $this->command->info('✅ Admin créé avec succès!');
        $this->command->info('📧 Email: '.$admin->email);
        $this->command->warn('🔐 Mot de passe: '.env('ADMIN_PASSWORD', 'Admin123! (par défaut)'));
        $this->command->info('');
        $this->command->info('⚠️  IMPORTANT: Changez le mot de passe après la première connexion!');
        $this->command->info('');
        $this->command->info('Pour tester la connexion:');
        $this->command->info('  - URL: '.url('/admin/login'));
        $this->command->info('  - Email: '.$admin->email);
    }
}
