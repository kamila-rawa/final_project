import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function PortfolioGallery() {
  const { t, i18n } = useTranslation();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Récupération du portfolio via API Laravel
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/portfolio-images?lang=${i18n.language}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du portfolio');
        }
        
        const data = await response.json();
        
        // Gérer le format de réponse (array direct ou dans result.data)
        const portfolioArray = Array.isArray(data) ? data : (data.data || []);
        setPortfolioItems(portfolioArray);
        
      } catch (err) {
        setError(err.message);
        console.error('Erreur portfolio:', err);
        // Données de fallback pour tests
        setPortfolioItems([
          {
            id: 1,
            title: 'Spray Tan Naturalny',
            description: 'Efekt naturalnego opalenia',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
            category: 'salon',
            alt_text: 'Naturalny spray tan'
          },
          {
            id: 2,
            title: 'Profesjonalny Sprzęt',
            description: 'Nowoczesne urządzenia spray tan',
            image: 'https://images.unsplash.com/photo-1594736797933-d0de07ba79a3?w=400',
            category: 'equipment',
            alt_text: 'Sprzęt do spray tan'
          },
          {
            id: 3,
            title: 'Produkty Premium',
            description: 'Wysokiej jakości kosmetyki',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
            category: 'products',
            alt_text: 'Produkty spray tan'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [i18n.language]);

  // Extraction des catégories uniques
  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];

  // Filtrage des éléments par catégorie
  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Gestion de la touche Escape
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage]);

  if (loading) {
    return (
      <section id="portfolio" className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t('portfolio.title', 'Nasze Portfolio')}
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t('portfolio.title', 'Nasze Portfolio')}
          </h2>
          <div className="text-center text-red-600">
            <p>{t('portfolio.error', 'Błąd podczas ładowania portfolio')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-4">
            {t('portfolio.title', 'Nasze Portfolio')}
          </h2>
          <p className="text-center text-amber-700 mb-12 max-w-2xl mx-auto">
            {t('portfolio.subtitle', 'Zobacz nasze realizacje i zainspiruj się naszymi pracami')}
          </p>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                    : 'bg-white text-amber-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
                aria-pressed={selectedCategory === category}
              >
                {t(`portfolio.category.${category}`, 
                  category === 'all' ? 'Wszystkie' : 
                  category === 'salon' ? 'Salon' :
                  category === 'products' ? 'Produkty' :
                  category === 'equipment' ? 'Sprzęt' :
                  category === 'other' ? 'Inne' : category
                )}
              </button>
            ))}
          </div>

          {/* Grille du portfolio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
                aria-label={`${t('portfolio.view_image', 'Zobacz zdjęcie')} ${item.title || index + 1}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || item.image_url}
                    alt={item.alt_text || item.title || `Portfolio obraz ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay avec informations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      {item.title && (
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="text-sm opacity-90">{item.description}</p>
                      )}
                      
                      {/* Icône d'agrandissement */}
                      <div className="absolute top-4 right-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Badge catégorie */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {t(`portfolio.category.${item.category}`, 
                      item.category === 'salon' ? 'Salon' :
                      item.category === 'products' ? 'Produkty' :
                      item.category === 'equipment' ? 'Sprzęt' :
                      item.category === 'other' ? 'Inne' : item.category
                    )}
                  </div>
                </div>

                {/* Informations en bas de carte */}
                <div className="p-4">
                  {item.title && (
                    <h3 className="font-semibold text-amber-900 mb-1 truncate">{item.title}</h3>
                  )}
                  {item.client_type && (
                    <p className="text-sm text-amber-600">{item.client_type}</p>
                  )}
                  {item.created_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.created_at).toLocaleDateString(
                        i18n.language === 'pl' ? 'pl-PL' : 'en-GB'
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun élément */}
          {filteredItems.length === 0 && !loading && (
            <div className="text-center text-amber-600 py-12">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>{t('portfolio.no_items', 'Brak elementów w tej kategorii')}</p>
            </div>
          )}

          {/* Call-to-Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              {t('portfolio.cta_title', 'Gotowa na swoją transformację?')}
            </h3>
            <p className="text-amber-700 mb-6 max-w-xl mx-auto">
              {t('portfolio.cta_description', 'Skontaktuj się z nami, aby dowiedzieć się, jak możemy pomóc Ci uzyskać idealny spray tan')}
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('portfolio.contact_us', 'Skontaktuj się z nami')}
            </a>
          </div>
        </div>
      </section>

      {/* Modal pour affichage agrandi */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={t('portfolio.modal_title', 'Powiększony obraz')}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* En-tête du modal */}
            <div className="flex justify-between items-center mb-4 text-white">
              <div>
                {selectedImage.title && (
                  <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                )}
                <p className="text-sm opacity-75">
                  {t(`portfolio.category.${selectedImage.category}`, selectedImage.category)}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-amber-300 transition-colors p-2"
                aria-label={t('portfolio.close', 'Zamknij')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image principale */}
            <div className="relative">
              <img
                src={selectedImage.image || selectedImage.image_url}
                alt={selectedImage.title || 'Portfolio image'}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {/* Informations détaillées */}
            <div className="mt-4 text-white">
              {selectedImage.description && (
                <p className="text-center mb-4">{selectedImage.description}</p>
              )}
              
              <div className="flex justify-center space-x-6 text-sm opacity-75">
                {selectedImage.client_type && (
                  <span>{t('portfolio.client_type', 'Typ klienta')}: {selectedImage.client_type}</span>
                )}
                {selectedImage.created_at && (
                  <span>
                    {new Date(selectedImage.created_at).toLocaleDateString(
                      i18n.language === 'pl' ? 'pl-PL' : 'en-GB'
                    )}
                  </span>
                )}
              </div>

              <div className="text-center mt-4">
                <p className="text-xs opacity-50">
                  {t('portfolio.modal_hint', 'Naciśnij ESC aby zamknąć')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}