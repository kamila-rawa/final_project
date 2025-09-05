<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class GalleryImageController extends Controller
{
    /**
     * Récupérer toutes les images actives pour le front-end
     */
    public function index(): JsonResponse
    {
        $images = GalleryImage::active()
            ->ordered()
            ->get()
            ->map(function ($image) {
                return [
                    'id' => $image->id,
                    'url' => $image->url,
                    'thumbnail_url' => $image->thumbnail_url,
                    'filename' => $image->filename
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $images
        ]);
    }

    /**
     * Récupérer toutes les images pour l'admin (avec inactives)
     */
    public function adminIndex(): JsonResponse
    {
        $images = GalleryImage::ordered()->get()->map(function ($image) {
            return [
                'id' => $image->id,
                'filename' => $image->filename,
                'original_name' => $image->original_name,
                'url' => $image->url,
                'thumbnail_url' => $image->thumbnail_url,
                'sort_order' => $image->sort_order,
                'is_active' => $image->is_active,
                'created_at' => $image->created_at->format('Y-m-d H:i')
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $images
        ]);
    }

    /**
     * Upload d'une nouvelle image (admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
            'sort_order' => 'nullable|integer|min:0'
        ]);

        $file = $request->file('image');
        $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

        // Créer le dossier s'il n'existe pas
        if (!Storage::exists('public/gallery')) {
            Storage::makeDirectory('public/gallery');
        }
        if (!Storage::exists('public/gallery/thumbs')) {
            Storage::makeDirectory('public/gallery/thumbs');
        }

        // Sauvegarder l'image originale
        $file->storeAs('public/gallery', $filename);

        // Créer le thumbnail (300x300)
        $thumbnailPath = storage_path('app/public/gallery/thumbs/');
        $thumbnailName = pathinfo($filename, PATHINFO_FILENAME) . '_thumb.' . pathinfo($filename, PATHINFO_EXTENSION);
        
        // Utiliser Intervention Image si disponible, sinon copier l'original
        if (class_exists(\Intervention\Image\Facades\Image::class)) {
            $img = Image::make($file);
            $img->fit(300, 300)->save($thumbnailPath . $thumbnailName, 80);
        } else {
            // Fallback: copier l'image originale comme thumbnail
            copy(storage_path('app/public/gallery/' . $filename), $thumbnailPath . $thumbnailName);
        }

        // Déterminer l'ordre d'affichage
        $sortOrder = $request->get('sort_order', GalleryImage::max('sort_order') + 1);

        $image = GalleryImage::create([
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'sort_order' => $sortOrder,
            'is_active' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Image uploadée avec succès',
            'data' => [
                'id' => $image->id,
                'filename' => $image->filename,
                'original_name' => $image->original_name,
                'url' => $image->url,
                'thumbnail_url' => $image->thumbnail_url,
                'sort_order' => $image->sort_order,
                'is_active' => $image->is_active,
                'created_at' => $image->created_at->format('Y-m-d H:i')
            ]
        ], 201);
    }

    /**
     * Mettre à jour une image (admin only) - seulement sort_order et is_active
     */
    public function update(Request $request, GalleryImage $galleryImage): JsonResponse
    {
        $validated = $request->validate([
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $galleryImage->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image mise à jour avec succès',
            'data' => [
                'id' => $galleryImage->id,
                'sort_order' => $galleryImage->sort_order,
                'is_active' => $galleryImage->is_active,
                'updated_at' => $galleryImage->updated_at->format('Y-m-d H:i')
            ]
        ]);
    }

    /**
     * Supprimer une image (admin only)
     */
    public function destroy(GalleryImage $galleryImage): JsonResponse
    {
        // L'événement de suppression du modèle se chargera de supprimer les fichiers
        $galleryImage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Image supprimée avec succès'
        ]);
    }

    /**
     * Réorganiser les images (admin only)
     */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'images' => 'required|array',
            'images.*.id' => 'required|integer|exists:gallery_images,id',
            'images.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($request->images as $imageData) {
            GalleryImage::where('id', $imageData['id'])
                ->update(['sort_order' => $imageData['sort_order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Ordre des images mis à jour avec succès'
        ]);
    }

    /**
     * Activer/désactiver une image (admin)
     */
    public function toggle(GalleryImage $galleryImage): JsonResponse
    {
        $galleryImage->update([
            'is_active' => !$galleryImage->is_active
        ]);

        return response()->json([
            'success' => true,
            'message' => $galleryImage->is_active ? 'Image activée' : 'Image désactivée',
            'data' => [
                'id' => $galleryImage->id,
                'is_active' => $galleryImage->is_active
            ]
        ]);
    }
}
