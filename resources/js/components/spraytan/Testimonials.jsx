import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des témoignages via API Laravel
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/testimonials?lang=${i18n.language}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        const data = result.data || result;
        
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          // Fallback avec données de démonstration si pas de données API
          setTestimonials([
            {
              id: 1,
              client_name: 'Anna Kowalska',
              message: 'Fantastyczny rezultat! Moja opalenizna była idealnie naturalna i trwała ponad tydzień. Profesjonalna obsługa i wspaniały efekt.',
              rating: 5,
              created_at: '2024-09-01'
            },
            {
              id: 2,
              client_name: 'Beata Rajewska', 
              message: 'Polecam wszystkim! Szybko, profesjonalnie i z niesamowitym efektem. To najlepszy spray tan jaki miałam.',
              rating: 5,
              created_at: '2024-08-28'
            },
            {
              id: 3,
              client_name: 'Magdalena W.',
              message: 'Obsługa na najwyższym poziomie. Opalenizna wygląda bardzo naturalnie, a efekt utrzymuje się długo.',
              rating: 5,
              created_at: '2024-08-25'
            },
            {
              id: 4,
              client_name: 'Katarzyna N.',
              message: 'Niesamowity efekt! Opalenizna była równomierna i bardzo naturalna. Będę wracać na pewno.',
              rating: 5,
              created_at: '2024-08-20'
            },
            {
              id: 5,
              client_name: 'Agnieszka P.',
              message: 'Profesjonalne podejście i świetny rezultat. Polecam każdemu kto chce piękną opaleniznę.',
              rating: 5,
              created_at: '2024-08-15'
            }
          ]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Erreur témoignages:', err);
        // Garder données de fallback en cas d'erreur
        setTestimonials([
          {
            id: 1,
            client_name: 'Anna Kowalska',
            message: 'Fantastyczny rezultat! Moja opalenizna była idealnie naturalna i trwała ponad tydzień.',
            rating: 5,
            created_at: '2024-09-01'
          },
          {
            id: 2,
            client_name: 'Beata Rajewska',
            message: 'Polecam wszystkim! Szybko, profesjonalnie i z niesamowitym efektem.',
            rating: 5,
            created_at: '2024-08-28'
          },
          {
            id: 3,
            client_name: 'Magdalena W.',
            message: 'Obsługa na najwyższym poziomie. Opalenizna wygląda bardzo naturalnie.',
            rating: 5,
            created_at: '2024-08-25'
          },
          {
            id: 4,
            client_name: 'Katarzyna N.',
            message: 'Niesamowity efekt! Będę wracać na pewno.',
            rating: 5,
            created_at: '2024-08-20'
          },
          {
            id: 5,
            client_name: 'Agnieszka P.',
            message: 'Profesjonalne podejście i świetny rezultat.',
            rating: 5,
            created_at: '2024-08-15'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [i18n.language]);

  // Préparer les données pour l'affichage Tailwind
  const featuredTestimonial = testimonials[0] || {
    client_name: 'Anna Kowalska',
    message: 'Fantastyczny rezultat! Moja opalenizna była idealnie naturalna i trwała ponad tydzień. Profesjonalna obsługa i wspaniały efekt.',
    rating: 5,
    created_at: '2024-09-01'
  };

  // Organiser les témoignages en colonnes pour le layout Tailwind
  const organizeTestimonials = (data) => {
    const remaining = data.slice(1); // Exclure le premier (featured)
    const columns = [[], []];
    
    remaining.forEach((testimonial, index) => {
      columns[index % 2].push(testimonial);
    });
    
    return [columns];
  };

  const testimonialColumns = organizeTestimonials(testimonials);

  if (loading) {
    return (
      <div className="relative isolate mt-32 sm:mt-56 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base/7 font-semibold text-amber-600">
              {t('testimonials.title', 'Opinie klientów')}
            </h2>
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate mt-32 sm:mt-56 sm:pt-32">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden size-full [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-amber-200 sm:block"
      >
        <defs>
          <pattern
            x="50%"
            y={0}
            id="55d3d46d-692e-45f2-becd-d8bdc9344f45"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={0} className="overflow-visible fill-amber-50">
          <path
            d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      
      <div className="relative">
        {/* Effets visuels de fond - couleurs amber */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-gradient-to-tr from-amber-400 to-amber-600"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base/7 font-semibold text-amber-600">
              {t('testimonials.title', 'Opinie klientów')}
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">
              {t('testimonials.subtitle', 'Poznaj opinie naszych zadowolonych klientów')}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            
            {/* Témoignage featured (premier de la liste) - AVEC DATE */}
            <figure className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-12 text-xl/8 font-semibold tracking-tight text-gray-900">
                <p>{`"${featuredTestimonial.message}"`}</p>
              </blockquote>
              <figcaption className="flex items-center justify-between border-t border-gray-900/10 px-6 py-4">
                <div>
                  <div className="font-semibold">{featuredTestimonial.client_name}</div>
                  <div className="text-gray-600">
                    {featuredTestimonial.created_at ? new Date(featuredTestimonial.created_at).toLocaleDateString('pl-PL') : '01.09.2024'}
                  </div>
                </div>
                {/* Étoiles */}
                <div className="flex">
                  {[...Array(featuredTestimonial.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </figcaption>
            </figure>

            {/* Autres témoignages en colonnes - SANS AVATARS */}
            {testimonialColumns.map((columnGroup, columnGroupIdx) => (
              <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                {columnGroup.map((column, columnIdx) => (
                  <div
                    key={columnIdx}
                    className={classNames(
                      (columnGroupIdx === 0 && columnIdx === 0) ||
                        (columnGroupIdx === testimonialColumns.length - 1 && columnIdx === columnGroup.length - 1)
                        ? 'xl:row-span-2'
                        : 'xl:row-start-1',
                      'space-y-8',
                    )}
                  >
                    {column.map((testimonial) => (
                      <figure
                        key={testimonial.id}
                        className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                      >
                        <blockquote className="text-gray-900">
                          <p>{`"${testimonial.message}"`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{testimonial.client_name}</div>
                            <div className="text-gray-600">
                              {testimonial.created_at ? new Date(testimonial.created_at).toLocaleDateString('pl-PL') : 'Client satisfait'}
                            </div>
                          </div>
                          {/* Étoiles */}
                          <div className="flex">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <a 
              href="#contact" 
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              {t('testimonials.book_now', 'Zarezerwuj teraz')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}