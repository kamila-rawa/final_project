import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function PortfolioGallery() {
  const { t, i18n } = useTranslation();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndices, setCurrentIndices] = useState({
    opalanie: 0,
    kosmetyki: 0,
    smsy: 0
  });

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
        const portfolioArray = Array.isArray(data) ? data : (data.data || []);
        setPortfolioItems(portfolioArray);
        
      } catch (err) {
        setError(err.message);
        console.error('Erreur portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [i18n.language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndices(prev => ({
        opalanie: getNextIndex('opalanie', prev.opalanie),
        kosmetyki: getNextIndex('kosmetyki', prev.kosmetyki),
        smsy: getNextIndex('smsy', prev.smsy)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [portfolioItems]);

  const getNextIndex = (category, currentIndex) => {
    const categoryItems = portfolioItems.filter(item => item.category === category);
    if (categoryItems.length === 0) return 0;
    return (currentIndex + 1) % Math.ceil(categoryItems.length / 3);
  };

  const getCategoryImages = (category, startIndex = 0) => {
    const categoryItems = portfolioItems.filter(item => item.category === category);
    const realStartIndex = startIndex * 3;
    return categoryItems.slice(realStartIndex, realStartIndex + 3);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openCategoryGallery = (category) => {
    setSelectedCategory(category);
  };

  const closeCategoryGallery = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        if (selectedCategory) {
          closeCategoryGallery();
        } else if (selectedImage) {
          closeModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedCategory]);

  const CategorySection = ({ category, title, index }) => {
    const images = getCategoryImages(category, currentIndices[category]);
    const totalSets = Math.ceil(portfolioItems.filter(item => item.category === category).length / 3);
    
    if (images.length === 0) return null;

    // Opalanie = rectangulaire, autres = carré
    const isOpalanie = category === 'opalanie';

    return (
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <button
            onClick={() => openCategoryGallery(category)}
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-amber-500 text-gray-700 rounded-full font-medium text-base hover:bg-amber-500 hover:text-white transition-all duration-300"
            title={`Voir toute la galerie ${title}`}
          >
            {title}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex-1 h-px bg-amber-200 ml-6"></div>
          {totalSets > 1 && (
            <div className="ml-4 flex space-x-2">
              {[...Array(totalSets)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndices[category] ? 'bg-amber-500' : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((item, imgIndex) => (
            <div
              key={`${item.id}-${currentIndices[category]}`}
              className={`group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isOpalanie ? '' : 'aspect-square'
              }`}
              onClick={() => openModal(item)}
              style={{
                animation: `fadeInScale 0.5s ease-out ${imgIndex * 0.15}s both`
              }}
            >
              <div className={`relative ${isOpalanie ? 'overflow-hidden bg-white' : 'w-full h-full overflow-hidden'}`}>
                <img
                  src={item.image || item.image_url}
                  alt={item.alt_text || item.title || `${title} image ${imgIndex + 1}`}
                  className={`${
                    isOpalanie 
                      ? 'w-full h-auto object-cover' 
                      : 'w-full h-full object-cover'
                  } group-hover:scale-110 transition-transform duration-700`}
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {item.description && (
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="portfolio-gallery" className="pt-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
            {i18n.language === 'en' ? 'Portfolio' : 'Portfolio'}
          </h2>
          <p className="text-center text-amber-700 mb-16 max-w-2xl mx-auto">
            {i18n.language === 'en' 
              ? 'Discover my work and get inspired by the results' 
              : 'Odkryj moje realizacje i zainspiruj się efektami mojej pracy'}
          </p>
          <div className="flex justify-center min-h-[400px] items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-amber-50 to-amber-100 pt-16 pb-16">
          <div className="container mx-auto px-4 text-center opacity-0">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              {i18n.language === 'en' ? 'Ready for your transformation?' : 'Gotowa na swoją transformację?'}
            </h3>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio-gallery" className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-12">
            {i18n.language === 'en' ? 'Portfolio' : 'Portfolio'}
          </h2>
          <div className="text-center text-red-600">
            <p>{i18n.language === 'en' ? 'Error loading portfolio' : 'Błąd podczas ładowania portfolio'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio-gallery" className="pt-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
            {i18n.language === 'en' ? 'Portfolio' : 'Portfolio'}
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            {i18n.language === 'en' 
              ? 'Discover my work and get inspired by the results' 
              : 'Odkryj moje realizacje i zainspiruj się efektami mojej pracy'}
          </p>

          <div className="max-w-6xl mx-auto">
            <CategorySection 
              category="opalanie" 
              title={i18n.language === 'en' ? 'Spray Tan' : 'Opalanie'}
              index={0}
            />

            <CategorySection 
              category="kosmetyki" 
              title={i18n.language === 'en' ? 'Cosmetics & Certificates' : 'Kosmetyki & Certyfikaty'}
              index={1}
            />

            <CategorySection 
              category="smsy" 
              title={i18n.language === 'en' ? 'Client Reviews' : 'Od klientek'}
              index={2}
            />
          </div>
        </div>
        
      // Remplacez la section CTA finale (ligne ~258-278) par ce code :

        <div className="bg-gradient-to-b from-amber-50 to-amber-100 pt-16 pb-16">
          <div className="container mx-auto px-4">
            {/* CTA dans le style Testimonials */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {i18n.language === 'en' ? 'Ready for your transformation?' : 'Gotowa na swoją transformację?'}
                </h3>
                <p className="text-gray-700 mb-6">
                  {i18n.language === 'en' 
                    ? 'Contact me to find out how I can help you achieve the perfect tan' 
                    : 'Skontaktuj się ze mną, aby dowiedzieć się, jak mogę pomóc Ci uzyskać idealną opaleniznę'}
                </p>
                <button
                  onClick={() => {
                    const ctaElement = document.getElementById('cta');
                    if (ctaElement) {
                      ctaElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  {i18n.language === 'en' ? 'Contact me' : 'Skontaktuj się ze mną'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedCategory && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
          onClick={closeCategoryGallery}
        >
          <div className="min-h-screen p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 text-white sticky top-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-2xl font-bold">
                {selectedCategory === 'opalanie' && (i18n.language === 'en' ? 'Spray Tan Gallery' : 'Galeria Opalanie')}
                {selectedCategory === 'kosmetyki' && (i18n.language === 'en' ? 'Cosmetics Gallery' : 'Galeria Kosmetyki')}
                {selectedCategory === 'smsy' && (i18n.language === 'en' ? 'Client Reviews Gallery' : 'Galeria Od klientek')}
              </h2>
              <button
                onClick={closeCategoryGallery}
                className="text-white hover:text-amber-300 transition-colors p-2"
                aria-label={i18n.language === 'en' ? 'Close gallery' : 'Zamknij galerię'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {portfolioItems
                .filter(item => item.category === selectedCategory)
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(item);
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image || item.image_url}
                        alt={item.alt_text || item.title || `Image ${index + 1}`}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {portfolioItems.filter(item => item.category === selectedCategory).length === 0 && (
              <div className="text-center text-white py-16">
                <p>Aucune image dans cette catégorie pour le moment</p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Powiększony obraz"
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 text-white">
              <div>
                {selectedImage.title && (
                  <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                )}
                <p className="text-sm opacity-75">{selectedImage.category}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-amber-300 transition-colors p-2"
                aria-label="Zamknij"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <img
                src={selectedImage.image || selectedImage.image_url}
                alt={selectedImage.title || 'Portfolio image'}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {selectedImage.description && (
              <div className="mt-4 text-white text-center">
                <p>{selectedImage.description}</p>
              </div>
            )}

            <div className="text-center mt-4">
              <p className="text-xs text-white opacity-50">
                Naciśnij ESC aby zamknąć
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}