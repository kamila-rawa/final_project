<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BeforeAfterImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BeforeAfterImageController extends Controller
{
    /**
     * Récupérer toutes les images before/after actives pour le public
     */
    public function index(Request $request): JsonResponse
    {
        $language = $request->get('lang', 'pl');
        
        $images = BeforeAfterImage::active()
            ->ordered()
            ->get()
            ->map(function ($image) use ($language) {
                return [
                    'id' => $image->id,
                    'title' => $image->getTranslatedTitle($language),
                    'description' => $image->getTranslatedDescription($language),
                    'before_image' => $image->before_image_url,
                    'after_image' => $image->after_image_url,
                    'alt_text' => $language === 'en' ? $image->alt_text_en : $image->alt_text_pl,
                ];
            });

        return response()->json($images);
    }

    /**
     * Version admin - récupérer toutes les images avec détails complets
     */
    public function adminIndex(Request $request): JsonResponse
    {
        $images = BeforeAfterImage::orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $images
        ]);
    }

    /**
     * Créer une nouvelle image before/after
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_pl' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_pl' => 'nullable|string',
            'description_en' => 'nullable|string',
            'before_image' => 'required|string',
            'after_image' => 'required|string',
            'alt_text_pl' => 'nullable|string|max:255',
            'alt_text_en' => 'nullable|string|max:255',
            'display_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $image = BeforeAfterImage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image créée avec succès',
            'data' => $image
        ], 201);
    }

    /**
     * Afficher une image spécifique
     */
    public function show(Request $request, BeforeAfterImage $beforeAfterImage): JsonResponse
    {
        $language = $request->get('lang', 'pl');

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $beforeAfterImage->id,
                'title' => $beforeAfterImage->getTranslatedTitle($language),
                'description' => $beforeAfterImage->getTranslatedDescription($language),
                'before_image' => $beforeAfterImage->before_image_url,
                'after_image' => $beforeAfterImage->after_image_url,
                'alt_text' => $language === 'en' ? $beforeAfterImage->alt_text_en : $beforeAfterImage->alt_text_pl,
            ]
        ]);
    }

    /**
     * Mettre à jour une image
     */
    public function update(Request $request, BeforeAfterImage $beforeAfterImage): JsonResponse
    {
        $validated = $request->validate([
            'title_pl' => 'string|max:255',
            'title_en' => 'string|max:255',
            'description_pl' => 'nullable|string',
            'description_en' => 'nullable|string',
            'before_image' => 'string',
            'after_image' => 'string',
            'alt_text_pl' => 'nullable|string|max:255',
            'alt_text_en' => 'nullable|string|max:255',
            'display_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $beforeAfterImage->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image mise à jour avec succès',
            'data' => $beforeAfterImage
        ]);
    }

    /**
     * Supprimer une image
     */
    public function destroy(BeforeAfterImage $beforeAfterImage): JsonResponse
    {
        $beforeAfterImage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Image supprimée avec succès'
        ]);
    }
}