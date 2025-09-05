<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactInfoController extends Controller
{
    /**
     * Récupérer toutes les infos de contact actives pour le front-end
     */
    public function index(): JsonResponse
    {
        $contacts = ContactInfo::getAllFormatted();

        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }

    /**
     * Récupérer toutes les infos pour l'admin (avec inactives)
     */
    public function adminIndex(): JsonResponse
    {
        $contacts = ContactInfo::orderBy('key')->get()->map(function ($contact) {
            return [
                'id' => $contact->id,
                'key' => $contact->key,
                'value' => $contact->value,
                'is_active' => $contact->is_active,
                'updated_at' => $contact->updated_at->format('Y-m-d H:i')
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }

    /**
     * Mettre à jour une info de contact (admin only)
     */
    public function update(Request $request, ContactInfo $contactInfo): JsonResponse
    {
        $validated = $request->validate([
            'value' => 'required|string|max:500',
            'is_active' => 'boolean'
        ]);

        $contactInfo->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Information mise à jour avec succès',
            'data' => [
                'id' => $contactInfo->id,
                'key' => $contactInfo->key,
                'value' => $contactInfo->value,
                'is_active' => $contactInfo->is_active,
                'updated_at' => $contactInfo->updated_at->format('Y-m-d H:i')
            ]
        ]);
    }

    /**
     * Créer une nouvelle info de contact (admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:contact_infos,key|max:50',
            'value' => 'required|string|max:500',
            'is_active' => 'boolean'
        ]);

        $contact = ContactInfo::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Information créée avec succès',
            'data' => [
                'id' => $contact->id,
                'key' => $contact->key,
                'value' => $contact->value,
                'is_active' => $contact->is_active,
                'created_at' => $contact->created_at->format('Y-m-d H:i')
            ]
        ], 201);
    }

    /**
     * Supprimer une info de contact (admin only)
     */
    public function destroy(ContactInfo $contactInfo): JsonResponse
    {
        // Empêcher la suppression des infos critiques
        $criticalKeys = ['phone', 'email', 'address'];
        
        if (in_array($contactInfo->key, $criticalKeys)) {
            return response()->json([
                'success' => false,
                'message' => 'Cette information est critique et ne peut pas être supprimée'
            ], 422);
        }

        $contactInfo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Information supprimée avec succès'
        ]);
    }

    /**
     * Récupérer une info spécifique par sa clé
     */
    public function getByKey(string $key): JsonResponse
    {
        $contact = ContactInfo::where('key', $key)->where('is_active', true)->first();

        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Information non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'key' => $contact->key,
                'value' => $contact->value
            ]
        ]);
    }
}
