<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FAQController extends Controller
{
    /**
     * Récupérer toutes les FAQ actives pour le public
     */
    public function index(Request $request): JsonResponse
    {
        $language = $request->get('lang', 'pl');

        $faqs = FAQ::active()
            ->ordered()
            ->get()
            ->map(function ($faq) use ($language) {
                return $faq->toApiArray($language);
            });

        return response()->json($faqs);
    }

    /**
     * Version admin - récupérer toutes les FAQ avec détails complets
     */
    public function adminIndex(Request $request): JsonResponse
    {
        $faqs = FAQ::orderBy('display_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $faqs
        ]);
    }

    /**
     * Créer une nouvelle FAQ
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question_pl' => 'required|string|max:500',
            'question_en' => 'required|string|max:500',
            'answer_pl' => 'required|string',
            'answer_en' => 'required|string',
            'display_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $faq = FAQ::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'FAQ créée avec succès',
            'data' => $faq
        ], 201);
    }

    /**
     * Afficher une FAQ spécifique
     */
    public function show(Request $request, FAQ $faq): JsonResponse
    {
        $language = $request->get('lang', 'pl');

        return response()->json([
            'success' => true,
            'data' => $faq->toApiArray($language)
        ]);
    }

    /**
     * Mettre à jour une FAQ
     */
    public function update(Request $request, FAQ $faq): JsonResponse
    {
        $validated = $request->validate([
            'question_pl' => 'string|max:500',
            'question_en' => 'string|max:500',
            'answer_pl' => 'string',
            'answer_en' => 'string',
            'display_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $faq->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'FAQ mise à jour avec succès',
            'data' => $faq
        ]);
    }

    /**
     * Supprimer une FAQ
     */
    public function destroy(FAQ $faq): JsonResponse
    {
        $faq->delete();

        return response()->json([
            'success' => true,
            'message' => 'FAQ supprimée avec succès'
        ]);
    }
}