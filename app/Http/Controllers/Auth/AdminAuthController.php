<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AdminAuthController extends Controller
{
    /**
     * Afficher la page de login admin
     */
    public function showLogin()
    {
        if (session('admin_authenticated')) {
            return redirect()->route('admin.dashboard');
        }

        return inertia('Admin/Login');
    }

    /**
     * Connexion admin via API
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Chercher l'admin dans la table users
        $admin = User::where('email', $request->email)->first();

        if (! $admin) {
            // Petit délai pour éviter les attaques par force brute
            sleep(1);

            return response()->json([
                'success' => false,
                'message' => 'Identifiants incorrects',
            ], 401);
        }

        // Vérifier le mot de passe
        if (Hash::check($request->password, $admin->password)) {

            // Créer la session admin
            session([
                'admin_authenticated' => true,
                'admin_email' => $admin->email,
                'admin_name' => $admin->name,
                'admin_id' => $admin->id,
                'admin_login_time' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'data' => [
                    'admin_email' => $admin->email,
                    'admin_name' => $admin->name,
                    'login_time' => now()->format('Y-m-d H:i:s'),
                ],
            ]);
        }

        // Petit délai pour éviter les attaques par force brute
        sleep(1);

        return response()->json([
            'success' => false,
            'message' => 'Identifiants incorrects',
        ], 401);
    }

    /**
     * Déconnexion admin
     */
    public function logout(): JsonResponse
    {
        session()->forget(['admin_authenticated', 'admin_email', 'admin_name', 'admin_id', 'admin_login_time']);
        session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie',
        ]);
    }

    /**
     * Vérifier le statut de connexion
     */
    public function status(): JsonResponse
    {
        if (session('admin_authenticated')) {
            return response()->json([
                'success' => true,
                'authenticated' => true,
                'data' => [
                    'admin_email' => session('admin_email'),
                    'admin_name' => session('admin_name'),
                    'login_time' => session('admin_login_time'),
                ],
            ]);
        }

        return response()->json([
            'success' => true,
            'authenticated' => false,
        ]);
    }

    /**
     * Dashboard admin
     */
    public function dashboard()
    {
        // Vérifier si les modèles existent avant de compter
        $stats = [];

        if (class_exists('\App\Models\Testimonial')) {
            $stats['testimonials_count'] = \App\Models\Testimonial::count();
            $stats['active_testimonials'] = \App\Models\Testimonial::active()->count();
        }

        if (class_exists('\App\Models\GalleryImage')) {
            $stats['gallery_images'] = \App\Models\GalleryImage::count();
            $stats['active_images'] = \App\Models\GalleryImage::active()->count();
        }

        if (class_exists('\App\Models\ContactInfo')) {
            $stats['contact_infos'] = \App\Models\ContactInfo::active()->count();
        }

        // Statistiques des images portfolio (votre modèle actuel)
        if (class_exists('\App\Models\PortfolioImage')) {
            $stats['portfolio_images'] = \App\Models\PortfolioImage::count();
            $stats['active_portfolio'] = \App\Models\PortfolioImage::where('is_active', true)->count();
            $stats['opalanie_count'] = \App\Models\PortfolioImage::where('category', 'opalanie')->count();
            $stats['kosmetyki_count'] = \App\Models\PortfolioImage::where('category', 'kosmetyki')->count();
            $stats['smsy_count'] = \App\Models\PortfolioImage::where('category', 'smsy')->count();
        }

        return inertia('Admin/Dashboard', compact('stats'));
    }
}
