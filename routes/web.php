<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/playground', function () {
    return Inertia::render('Playground', [
        'auth' => [
            'user' => [
                'name' => 'Ada Lovelace',
                'avatar' => 'https://i.pravatar.cc/100',
            ],
        ],
    ]);
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
