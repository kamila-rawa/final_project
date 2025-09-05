<?php
// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ContactInfoController;
use App\Http\Controllers\Api\GalleryImageController;
use App\Http\Controllers\Auth\AdminAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes publiques pour le front-end et routes admin sécurisées
| Toutes les routes sont préfixées par /api
|
*/

// ============================================================================
// ROUTES PUBLIQUES - Accessibles sans authentification
// ============================================================================

Route::prefix('public')->group(function () {
    
    // Témoignages publics
    Route::get('/testimonials', [TestimonialController::class, 'index'])
         ->name('api.testimonials.public');
    
    Route::get('/testimonials/random', [TestimonialController::class, 'random'])
         ->name('api.testimonials.random');

    // Infos de contact publiques
    Route::get('/contacts', [ContactInfoController::class, 'index'])
         ->name('api.contacts.public');
    
    Route::get('/contacts/{key}', [ContactInfoController::class, 'getByKey'])
         ->name('api.contacts.bykey');

    // Galerie publique
    Route::get('/gallery', [GalleryImageController::class, 'index'])
         ->name('api.gallery.public');
});

// ============================================================================
// AUTHENTIFICATION ADMIN
// ============================================================================

Route::prefix('auth')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login'])
         ->name('api.auth.login');
    
    Route::post('/logout', [AdminAuthController::class, 'logout'])
         ->name('api.auth.logout');
    
    Route::get('/status', [AdminAuthController::class, 'status'])
         ->name('api.auth.status');
});

// ============================================================================
// ROUTES ADMIN - Nécessitent authentification
// ============================================================================

Route::middleware(['admin.auth'])->prefix('admin')->group(function () {
    
    // ========================================
    // GESTION DES TÉMOIGNAGES
    // ========================================
    Route::prefix('testimonials')->group(function () {
        Route::get('/', [TestimonialController::class, 'adminIndex'])
             ->name('api.admin.testimonials.index');
        
        Route::post('/', [TestimonialController::class, 'store'])
             ->name('api.admin.testimonials.store');
        
        Route::get('/{testimonial}', [TestimonialController::class, 'show'])
             ->name('api.admin.testimonials.show');
        
        Route::put('/{testimonial}', [TestimonialController::class, 'update'])
             ->name('api.admin.testimonials.update');
        
        Route::delete('/{testimonial}', [TestimonialController::class, 'destroy'])
             ->name('api.admin.testimonials.destroy');
        
        Route::patch('/{testimonial}/toggle', [TestimonialController::class, 'toggle'])
             ->name('api.admin.testimonials.toggle');
    });

    // ========================================
    // GESTION DES INFOS DE CONTACT
    // ========================================
    Route::prefix('contacts')->group(function () {
        Route::get('/', [ContactInfoController::class, 'adminIndex'])
             ->name('api.admin.contacts.index');
        
        Route::post('/', [ContactInfoController::class, 'store'])
             ->name('api.admin.contacts.store');
        
        Route::put('/{contactInfo}', [ContactInfoController::class, 'update'])
             ->name('api.admin.contacts.update');
        
        Route::delete('/{contactInfo}', [ContactInfoController::class, 'destroy'])
             ->name('api.admin.contacts.destroy');
    });

    // ========================================
    // GESTION DE LA GALERIE
    // ========================================
    Route::prefix('gallery')->group(function () {
        Route::get('/', [GalleryImageController::class, 'adminIndex'])
             ->name('api.admin.gallery.index');
        
        Route::post('/', [GalleryImageController::class, 'store'])
             ->name('api.admin.gallery.store');
        
        Route::put('/{galleryImage}', [GalleryImageController::class, 'update'])
             ->name('api.admin.gallery.update');
        
        Route::delete('/{galleryImage}', [GalleryImageController::class, 'destroy'])
             ->name('api.admin.gallery.destroy');
        
        Route::patch('/{galleryImage}/toggle', [GalleryImageController::class, 'toggle'])
             ->name('api.admin.gallery.toggle');
        
        Route::post('/reorder', [GalleryImageController::class, 'reorder'])
             ->name('api.admin.gallery.reorder');
    });

    // ========================================
    // DASHBOARD STATS
    // ========================================
    Route::get('/stats', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'testimonials' => [
                    'total' => \App\Models\Testimonial::count(),
                    'active' => \App\Models\Testimonial::where('is_active', true)->count(),
                    'recent' => \App\Models\Testimonial::where('created_at', '>=', now()->subDays(30))->count()
                ],
                'gallery' => [
                    'total' => \App\Models\GalleryImage::count(),
                    'active' => \App\Models\GalleryImage::where('is_active', true)->count()
                ],
                'contacts' => [
                    'total' => \App\Models\ContactInfo::count(),
                    'active' => \App\Models\ContactInfo::where('is_active', true)->count()
                ]
            ]
        ]);
    })->name('api.admin.stats');
});

// ============================================================================
// ROUTES UTILITAIRES
// ============================================================================

// Health check de l'API
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
})->name('api.health');

// Test de configuration
Route::get('/config', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'locale' => app()->getLocale(),
            'available_locales' => ['pl', 'en'],
            'timezone' => config('app.timezone'),
            'admin_configured' => !empty(env('ADMIN_EMAIL'))
        ]
    ]);
})->name('api.config');