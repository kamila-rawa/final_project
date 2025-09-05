<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
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
            'password' => 'required'
        ]);

        // Récupérer les credentials depuis config ou .env
        $adminEmail = config('admin.email', env('ADMIN_EMAIL'));
        $adminPassword = config('admin.password', env('ADMIN_PASSWORD'));

        if (!$adminEmail || !$adminPassword) {
            return response()->json([
                'success' => false,
                'message' => 'Configuration admin manquante'
            ], 500);
        }

        // Vérifier les credentials
        if ($request->email === $adminEmail && Hash::check($request->password, $adminPassword)) {
            
            // Créer la session admin
            session([
                'admin_authenticated' => true,
                'admin_email' => $adminEmail,
                'admin_login_time' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'data' => [
                    'admin_email' => $adminEmail,
                    'login_time' => now()->format('Y-m-d H:i:s')
                ]
            ]);
        }

        // Petit délai pour éviter les attaques par force brute
        sleep(1);

        return response()->json([
            'success' => false,
            'message' => 'Identifiants incorrects'
        ], 401);
    }

    /**
     * Déconnexion admin
     */
    public function logout(): JsonResponse
    {
        session()->forget(['admin_authenticated', 'admin_email', 'admin_login_time']);
        session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
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
                    'login_time' => session('admin_login_time')
                ]
            ]);
        }

        return response()->json([
            'success' => true,
            'authenticated' => false
        ]);
    }

    /**
     * Dashboard admin
     */
    public function dashboard()
    {
        $stats = [
            'testimonials_count' => \App\Models\Testimonial::count(),
            'active_testimonials' => \App\Models\Testimonial::active()->count(),
            'gallery_images' => \App\Models\GalleryImage::count(),
            'active_images' => \App\Models\GalleryImage::active()->count(),
            'contact_infos' => \App\Models\ContactInfo::active()->count()
        ];

        return inertia('Admin/Dashboard', compact('stats'));
    }
}
