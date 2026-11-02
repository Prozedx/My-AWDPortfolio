<?php

use App\Http\Controllers\GalleryItemController;
use App\Http\Controllers\ProfileController;
use App\Models\GalleryItem;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Portfolio', [
        'galleryItems' => GalleryItem::query()
            ->orderByDesc('date_taken')
            ->orderByDesc('id')
            ->get(),
    ]);
});

Route::middleware('auth')->resource('gallery', GalleryItemController::class)
    ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
    ->parameters(['gallery' => 'galleryItem']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
