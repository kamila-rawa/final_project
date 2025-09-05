<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FAQ extends Model
{
    protected $table = 'faqs';
    
    protected $fillable = [
        'question_pl',
        'question_en',
        'answer_pl',
        'answer_en',
        'display_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer'
    ];

    // Scope pour les FAQ actives
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope pour ordonner
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('created_at', 'desc');
    }

    // Méthodes pour récupérer le contenu traduit
    public function getTranslatedQuestion(string $language = 'pl')
    {
        return $language === 'en' ? $this->question_en : $this->question_pl;
    }

    public function getTranslatedAnswer(string $language = 'pl')
    {
        return $language === 'en' ? $this->answer_en : $this->answer_pl;
    }

    // Méthode pour formater pour l'API
    public function toApiArray(string $language = 'pl'): array
    {
        return [
            'id' => $this->id,
            'question' => $this->getTranslatedQuestion($language),
            'answer' => $this->getTranslatedAnswer($language),
            'display_order' => $this->display_order,
        ];
    }
}