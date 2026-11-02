<?php

namespace App\Http\Controllers;

use App\Http\Requests\GalleryItemRequest;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Gallery/Index', [
            'galleryItems' => GalleryItem::query()
                ->orderByDesc('date_taken')
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Gallery/Create');
    }

    public function store(GalleryItemRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['image_path'] = $request->file('image')->store('gallery', 'public');
        unset($validated['image']);

        GalleryItem::create($validated);

        return to_route('gallery.index')->with('success', 'Gallery item created.');
    }

    public function edit(GalleryItem $galleryItem): Response
    {
        return Inertia::render('Gallery/Edit', [
            'galleryItem' => $galleryItem,
        ]);
    }

    public function update(GalleryItemRequest $request, GalleryItem $galleryItem): RedirectResponse
    {
        $validated = $request->validated();
        $image = $request->file('image');
        unset($validated['image']);

        if ($image) {
            $oldImagePath = $galleryItem->image_path;
            $validated['image_path'] = $image->store('gallery', 'public');
        }

        $galleryItem->update($validated);

        if ($image) {
            Storage::disk('public')->delete($oldImagePath);
        }

        return to_route('gallery.index')->with('success', 'Gallery item updated.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        $imagePath = $galleryItem->image_path;
        $galleryItem->delete();
        Storage::disk('public')->delete($imagePath);

        return to_route('gallery.index')->with('success', 'Gallery item deleted.');
    }
}
