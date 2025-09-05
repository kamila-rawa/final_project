<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TestimonialController extends Controller
{
    /**
     * Afficher tous les témoignages actifs pour le front-end public
     */
    public function index(Request $request): JsonResponse
    {
        $locale = $request->get('locale', 'pl');
        
        $testimonials = Testimonial::active()
            ->latest()
            ->get()
            ->map(function ($testimonial) use ($locale) {
                return [
                    'id' => $testimonial->id,
                    'client_name' => $testimonial->display_name,
                    'content' => $testimonial->getContent($locale),
                    'rating' => $testimonial->rating,
                    'stars' => $testimonial->stars,
                    'created_at' => $testimonial->created_at->format('Y-m-d')
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    /**
     * Récupérer des témoignages aléatoires pour affichage front
     */
    public function random(Request $request): JsonResponse
    {
        $locale = $request->get('locale', 'pl');
        $limit = min($request->get('limit', 5), 10); // Max 10 témoignages

        $testimonials = Testimonial::active()
            ->random($limit)
            ->get()
            ->map(function ($testimonial) use ($locale) {
                return [
                    'id' => $testimonial->id,
                    'client_name' => $testimonial->display_name,
                    'content' => $testimonial->getContent($locale),
                    'rating' => $testimonial->rating,
                    'stars' => $testimonial->stars
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    /**
     * Afficher tous les témoignages pour l'admin (avec inactifs)
     */
    public function adminIndex(): JsonResponse
    {
        $testimonials = Testimonial::latest()->get()->map(function ($testimonial) {
            return [
                'id' => $testimonial->id,
                'client_name' => $testimonial->client_name,
                'content_pl' => $testimonial->content_pl,
                'content_en' => $testimonial->content_en,
                'rating' => $testimonial->rating,
                'is_active' => $testimonial->is_active,
                'created_at' => $testimonial->created_at->format('Y-m-d H:i')
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    /**
     * Créer un nouveau témoignage (admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'nullable|string|max:100',
            'content_pl' => 'required|string|min:10|max:500',
            'content_en' => 'required|string|min:10|max:500',
            'rating' => 'required|integer|between:1,5',
            'is_active' => 'boolean'
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Témoignage créé avec succès',
            'data' => [
                'id' => $testimonial->id,
                'client_name' => $testimonial->client_name,
                'content_pl' => $testimonial->content_pl,
                'content_en' => $testimonial->content_en,
                'rating' => $testimonial->rating,
                'is_active' => $testimonial->is_active,
                'created_at' => $testimonial->created_at->format('Y-m-d H:i')
            ]
        ], 201);
    }

    /**
     * Afficher un témoignage spécifique (admin)
     */
    public function show(Testimonial $testimonial): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $testimonial->id,
                'client_name' => $testimonial->client_name,
                'content_pl' => $testimonial->content_pl,
                'content_en' => $testimonial->content_en,
                'rating' => $testimonial->rating,
                'is_active' => $testimonial->is_active,
                'created_at' => $testimonial->created_at->format('Y-m-d H:i'),
                'updated_at' => $testimonial->updated_at->format('Y-m-d H:i')
            ]
        ]);
    }

    /**
     * Mettre à jour un témoignage (admin only)
     */
    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'nullable|string|max:100',
            'content_pl' => 'required|string|min:10|max:500',
            'content_en' => 'required|string|min:10|max:500',
            'rating' => 'required|integer|between:1,5',
            'is_active' => 'boolean'
        ]);

        $testimonial->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Témoignage mis à jour avec succès',
            'data' => [
                'id' => $testimonial->id,
                'client_name' => $testimonial->client_name,
                'content_pl' => $testimonial->content_pl,
                'content_en' => $testimonial->content_en,
                'rating' => $testimonial->rating,
                'is_active' => $testimonial->is_active,
                'updated_at' => $testimonial->updated_at->format('Y-m-d H:i')
            ]
        ]);
    }

    /**
     * Supprimer un témoignage (admin only)
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Témoignage supprimé avec succès'
        ]);
    }

    /**
     * Activer/désactiver un témoignage (admin)
     */
    public function toggle(Testimonial $testimonial): JsonResponse
    {
        $testimonial->update([
            'is_active' => !$testimonial->is_active
        ]);

        return response()->json([
            'success' => true,
            'message' => $testimonial->is_active ? 'Témoignage activé' : 'Témoignage désactivé',
            'data' => [
                'id' => $testimonial->id,
                'is_active' => $testimonial->is_active
            ]
        ]);
    }
}