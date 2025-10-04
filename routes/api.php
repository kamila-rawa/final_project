<?php

use App\Http\Controllers\Api\PortfolioImageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques - Portfolio
Route::prefix('public')->group(function () {
    Route::get('/portfolio-images', [PortfolioImageController::class, 'index'])
        ->name('api.portfolio.public');

    Route::get('/portfolio-categories', [PortfolioImageController::class, 'categories'])
        ->name('api.portfolio.categories');
});

// Routes admin - Protection avec l'authentification Laravel standard
Route::middleware(['web', 'auth'])->prefix('admin')->group(function () {

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

// Health check
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'timestamp' => now()->toISOString(),
    ]);
})->name('api.health');
