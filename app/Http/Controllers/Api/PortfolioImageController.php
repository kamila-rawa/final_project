<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioImageController extends Controller
{
    /**
     * Récupérer toutes les images du portfolio pour le public
     */
    public function index(Request $request): JsonResponse
    {
        $category = $request->get('category');

        $query = PortfolioImage::active()->ordered();

        // Pour "all", on utilise un ordre aléatoire
        if ($category === 'all' || ! $category) {
            $query->randomOrder();
        } elseif ($category && $category !== 'all') {
            $query->byCategory($category);
        }

        $images = $query->get()->map(function ($image) {
            return [
                'id' => $image->id,
                'title' => $image->title,
                'description' => $image->description,
                'image' => $image->image_url,
                'category' => $image->category,
                'alt_text' => $image->alt_text,
                'created_at' => $image->created_at,
            ];
        });

        return response()->json($images);
    }

    /**
     * Version admin - récupérer toutes les images avec détails complets
     */
    public function adminIndex(Request $request): JsonResponse
    {
        $images = PortfolioImage::orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $images,
        ]);
    }

    /**
     * Créer une nouvelle image portfolio
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'category' => 'required|in:opalanie,kosmetyki,smsy',
            'alt_text' => 'nullable|string|max:255',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $image = PortfolioImage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image portfolio créée avec succès',
            'data' => $image,
        ], 201);
    }

    /**
     * Afficher une image spécifique
     */
    public function show(Request $request, PortfolioImage $portfolioImage): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $portfolioImage->id,
                'title' => $portfolioImage->title,
                'description' => $portfolioImage->description,
                'image' => $portfolioImage->image_url,
                'category' => $portfolioImage->category,
                'alt_text' => $portfolioImage->alt_text,
            ],
        ]);
    }

    /**
     * Mettre à jour une image
     */
    public function update(Request $request, PortfolioImage $portfolioImage): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'string',
            'category' => 'in:opalanie,kosmetyki,smsy',
            'alt_text' => 'nullable|string|max:255',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $portfolioImage->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image portfolio mise à jour avec succès',
            'data' => $portfolioImage,
        ]);
    }

    /**
     * Supprimer une image
     */
    public function destroy(PortfolioImage $portfolioImage): JsonResponse
    {
        $portfolioImage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Image portfolio supprimée avec succès',
        ]);
    }

    /**
     * Récupérer les catégories disponibles
     */
    public function categories(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => PortfolioImage::getCategories(),
        ]);
    }
}
