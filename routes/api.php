<?php

// routes/api.php

use App\Http\Controllers\Api\PortfolioImageController;
use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;

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

    // Galerie Portfolio publique
    Route::get('/portfolio-images', [PortfolioImageController::class, 'index'])
        ->name('api.portfolio.public');

    Route::get('/portfolio-categories', [PortfolioImageController::class, 'categories'])
        ->name('api.portfolio.categories');
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
    // GESTION GALERIE PORTFOLIO
    // ========================================
    Route::prefix('portfolio')->group(function () {
        Route::get('/', [PortfolioImageController::class, 'adminIndex'])
            ->name('api.admin.portfolio.index');

        Route::post('/', [PortfolioImageController::class, 'store'])
            ->name('api.admin.portfolio.store');

        Route::put('/{portfolioImage}', [PortfolioImageController::class, 'update'])
            ->name('api.admin.portfolio.update');

        Route::delete('/{portfolioImage}', [PortfolioImageController::class, 'destroy'])
            ->name('api.admin.portfolio.destroy');
    });

    // ========================================
    // DASHBOARD STATS
    // ========================================
    Route::get('/stats', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'portfolio' => [
                    'total' => \App\Models\PortfolioImage::count(),
                    'active' => \App\Models\PortfolioImage::where('is_active', true)->count(),
                ],
            ],
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
        'version' => '1.0.0',
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
            'admin_configured' => ! empty(env('ADMIN_EMAIL')),
        ],
    ]);
})->name('api.config');
