<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'client_name' => 'Anna K.',
                'rating' => 5,
                'content_pl' => 'Wspaniały efekt! Równomierna opalenizna bez smug. Bardzo profesjonalna obsługa i miła atmosfera. Polecam każdemu, kto szuka bezpiecznej alternatywy dla solarium.',
                'content_en' => 'Amazing result! Even tan without streaks. Very professional service and nice atmosphere. I recommend it to anyone looking for a safe alternative to tanning beds.',
                'is_active' => true
            ],
            [
                'client_name' => 'Maria S.',
                'rating' => 5,
                'content_pl' => 'Jestem zachwycona! Opalenizna wygląda naturalnie i utrzymała się przez cały tydzień. Będę wracać regularnie. Świetna jakość obsługi!',
                'content_en' => 'I am delighted! The tan looks natural and lasted the whole week. I will come back regularly. Excellent service quality!',
                'is_active' => true
            ],
            [
                'client_name' => 'Katarzyna L.',
                'rating' => 4,
                'content_pl' => 'Bardzo dobra jakość spray tan. Proces szybki i komfortowy. Jedyna uwaga - chciałabym trochę ciemniejszy odcień, ale ogólnie jestem zadowolona.',
                'content_en' => 'Very good quality spray tan. Fast and comfortable process. Only comment - I would like a slightly darker shade, but overall I am satisfied.',
                'is_active' => true
            ],
            [
                'client_name' => 'Joanna M.',
                'rating' => 5,
                'content_pl' => 'Fantastyczne doświadczenie! Czuję się pewniej i piękniej. Opalenizna równomierna, bez pomarańczowego odcienia. Na pewno wrócę!',
                'content_en' => 'Fantastic experience! I feel more confident and beautiful. Even tan, no orange tint. I will definitely come back!',
                'is_active' => true
            ],
            [
                'client_name' => 'Magdalena W.',
                'rating' => 5,
                'content_pl' => 'Idealne przygotowanie na wakacje! Szybko, profesjonalnie i efektownie. Wreszcie mogę nosić sukienki bez kompleksów.',
                'content_en' => 'Perfect preparation for vacation! Fast, professional and impressive. Finally I can wear dresses without complexes.',
                'is_active' => true
            ],
            [
                'client_name' => 'Agnieszka T.',
                'rating' => 4,
                'content_pl' => 'Świetna alternatywa dla solarium. Bezpiecznie i skutecznie. Obsługa bardzo miła i doradza jak dbać o opaleniznę.',
                'content_en' => 'Great alternative to tanning beds. Safe and effective. Staff very nice and advises how to care for the tan.',
                'is_active' => true
            ],
            [
                'client_name' => 'Beata R.',
                'rating' => 5,
                'content_pl' => 'Polecam z całego serca! Efekt przekroczył moje oczekiwania. Profesjonalne podejście i dbałość o detale. Dziękuję!',
                'content_en' => 'I recommend it wholeheartedly! The effect exceeded my expectations. Professional approach and attention to detail. Thank you!',
                'is_active' => true
            ]
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
