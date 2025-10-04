<?php

use App\Http\Controllers\Api\PortfolioImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Routes publiques
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/informacje-prawne', function () {
    return Inertia::render('LegalNotice');
})->name('legal.notice');

/*
|--------------------------------------------------------------------------
| Routes API Admin (déplacées depuis api.php pour avoir le CSRF)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('api/admin')->group(function () {

    // Gestion Portfolio
    Route::prefix('portfolio')->group(function () {
        Route::get('/', [PortfolioImageController::class, 'adminIndex'])
            ->name('api.admin.portfolio.index');

        Route::post('/', [PortfolioImageController::class, 'store'])
            ->name('api.admin.portfolio.store');

        Route::put('/{portfolioImage}', [PortfolioImageController::class, 'update'])
            ->name('api.admin.portfolio.update');

        Route::delete('/{portfolioImage}', [PortfolioImageController::class, 'destroy'])
            ->name('api.admin.portfolio.destroy');

        Route::post('/reorder', [PortfolioImageController::class, 'reorder'])
            ->name('api.admin.portfolio.reorder');
    });

    // Stats Dashboard
    Route::get('stats', function () {
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

/*
|--------------------------------------------------------------------------
| Dashboard protégé
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Authentification
|--------------------------------------------------------------------------
*/

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
