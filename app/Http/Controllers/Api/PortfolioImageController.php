<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
            $query = PortfolioImage::active()->inRandomOrder();
        } elseif ($category && $category !== 'all') {
            $query->byCategory($category);
        }

        $images = $query->get()->map(function ($image) {
            return [
                'id' => $image->id,
                'title' => $image->title,
                'description' => $image->description,
                'image' => asset('photos/portfolio/'.$image->category.'/'.$image->image),
                'image_url' => asset('photos/portfolio/'.$image->category.'/'.$image->image),
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
        $category = $request->get('category');

        $query = PortfolioImage::orderBy('category')
            ->orderBy('display_order')
            ->orderBy('created_at', 'desc');

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        $images = $query->get()->map(function ($image) {
            return [
                'id' => $image->id,
                'title' => $image->title,
                'description' => $image->description,
                'image' => $image->image,
                'image_url' => asset('photos/portfolio/'.$image->category.'/'.$image->image),
                'category' => $image->category,
                'alt_text' => $image->alt_text,
                'display_order' => $image->display_order,
                'is_active' => $image->is_active,
                'created_at' => $image->created_at,
                'updated_at' => $image->updated_at,
            ];
        });

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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'category' => 'required|in:opalanie,kosmetyki,smsy',
            'alt_text' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        // Upload de l'image
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $category = $validated['category'];

            // Créer un nom unique
            $filename = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();

            // Déplacer vers le dossier approprié
            $destinationPath = public_path('photos/portfolio/'.$category);

            if (! File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['image'] = $filename;
        }

        // Définir l'ordre si non fourni
        if (! isset($validated['display_order'])) {
            $maxOrder = PortfolioImage::where('category', $validated['category'])->max('display_order');
            $validated['display_order'] = $maxOrder ? $maxOrder + 1 : 1;
        }

        // Définir is_active par défaut
        if (! isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $image = PortfolioImage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image portfolio créée avec succès',
            'data' => [
                'id' => $image->id,
                'title' => $image->title,
                'description' => $image->description,
                'image' => $image->image,
                'image_url' => asset('photos/portfolio/'.$image->category.'/'.$image->image),
                'category' => $image->category,
                'alt_text' => $image->alt_text,
                'display_order' => $image->display_order,
                'is_active' => $image->is_active,
            ],
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
                'image' => $portfolioImage->image,
                'image_url' => asset('photos/portfolio/'.$portfolioImage->category.'/'.$portfolioImage->image),
                'category' => $portfolioImage->category,
                'alt_text' => $portfolioImage->alt_text,
                'display_order' => $portfolioImage->display_order,
                'is_active' => $portfolioImage->is_active,
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'category' => 'nullable|in:opalanie,kosmetyki,smsy',
            'alt_text' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        // Upload nouvelle image si fournie
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $category = $validated['category'] ?? $portfolioImage->category;

            // Supprimer l'ancienne image
            $oldImagePath = public_path('photos/portfolio/'.$portfolioImage->category.'/'.$portfolioImage->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }

            // Upload nouvelle image
            $filename = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $destinationPath = public_path('photos/portfolio/'.$category);

            if (! File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['image'] = $filename;
        }

        $portfolioImage->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Image portfolio mise à jour avec succès',
            'data' => [
                'id' => $portfolioImage->id,
                'title' => $portfolioImage->title,
                'description' => $portfolioImage->description,
                'image' => $portfolioImage->image,
                'image_url' => asset('photos/portfolio/'.$portfolioImage->category.'/'.$portfolioImage->image),
                'category' => $portfolioImage->category,
                'alt_text' => $portfolioImage->alt_text,
                'display_order' => $portfolioImage->display_order,
                'is_active' => $portfolioImage->is_active,
            ],
        ]);
    }

    /**
     * Supprimer une image
     */
    public function destroy(PortfolioImage $portfolioImage): JsonResponse
    {
        // Supprimer le fichier physique
        $imagePath = public_path('photos/portfolio/'.$portfolioImage->category.'/'.$portfolioImage->image);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

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
            'data' => [
                'opalanie' => 'Spray Tan',
                'kosmetyki' => 'Cosmetics & Certificates',
                'smsy' => 'Client Reviews',
            ],
        ]);
    }

    /**
     * Réorganiser l'ordre des images
     */
    public function reorder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:portfolio_images,id',
            'items.*.display_order' => 'required|integer',
        ]);

        foreach ($validated['items'] as $item) {
            PortfolioImage::where('id', $item['id'])->update([
                'display_order' => $item['display_order'],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Ordre des images mis à jour avec succès',
        ]);
    }
}
