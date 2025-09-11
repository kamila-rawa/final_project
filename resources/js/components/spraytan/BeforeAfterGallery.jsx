import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BeforeAfterGallery() {
  const { t, i18n } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Récupération des images via API Laravel
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/before-after-images?lang=${i18n.language}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement de la galerie');
        }
        
        const data = await response.json();
        
        // Gérer le format de réponse (array direct ou dans result.data)
        const imageArray = Array.isArray(data) ? data : (data.data || []);
        setImages(imageArray);
        
      } catch (err) {
        setError(err.message);
        console.error('Erreur galerie before/after:', err);
        // Données de fallback pour tests
        setImages([
          {
            id: 1,
            title: 'Transformation 1',
            description: 'Résultat naturel spray tan',
            before_image: 'https://images.unsplash.com/photo-1594736797933-d0de07ba79a3?w=400',
            after_image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
            alt_text: 'Avant après spray tan'
          },
          {
            id: 2,
            title: 'Transformation 2', 
            description: 'Bronzage uniforme et naturel',
            before_image: 'https://images.unsplash.com/photo-1594736797933-d0de07ba79a3?w=400',
            after_image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
            alt_text: 'Spray tan professionnel'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [i18n.language]);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Gestion des touches clavier pour la navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t('gallery.title', 'Galeria Przed/Po')}
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
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            {t('gallery.title', 'Galeria Przed/Po')}
          </h2>
          <div className="text-center text-red-600">
            <p>{t('gallery.error', 'Błąd podczas ładowania galerii')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-4">
            {t('gallery.title', 'Galeria Przed/Po')}
          </h2>
          <p className="text-center text-amber-700 mb-12 max-w-2xl mx-auto">
            {t('gallery.subtitle', 'Zobacz niesamowite transformacje dzięki profesjonalnemu spray tan')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => openModal(image, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(image, index)}
                aria-label={`${t('gallery.view_image', 'Zobacz zdjęcie')} ${index + 1}`}
              >
                <div className="relative">
                  {/* Image principale (après) */}
                  <img
                    src={image.after_image}
                    alt={image.alt_text || image.description || `Spray tan rezultat ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Overlay avec informations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium">
                        {t('gallery.click_to_compare', 'Kliknij aby zobaczyć przed/po')}
                      </p>
                      {image.description && (
                        <p className="text-xs opacity-90 mt-1">{image.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Badge "Przed/Po" */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {t('gallery.before_after', 'Przed/Po')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucune image */}
          {images.length === 0 && !loading && (
            <div className="text-center text-amber-600">
              <p>{t('gallery.no_images', 'Brak dostępnych zdjęć')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal pour affichage avant/après */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery.modal_title', 'Porównanie przed/po')}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* En-tête du modal */}
            <div className="flex justify-between items-center mb-4 text-white">
              <h3 className="text-xl font-semibold">
                {t('gallery.comparison', 'Porównanie')} ({currentIndex + 1}/{images.length})
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-amber-300 transition-colors p-2"
                aria-label={t('gallery.close', 'Zamknij')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Comparaison avant/après */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <img
                  src={selectedImage.before_image}
                  alt={`${t('gallery.before', 'Przed')} - ${selectedImage.description || ''}`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t('gallery.before', 'Przed')}
                </div>
              </div>
              <div className="relative">
                <img
                  src={selectedImage.after_image}
                  alt={`${t('gallery.after', 'Po')} - ${selectedImage.description || ''}`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t('gallery.after', 'Po')}
                </div>
              </div>
            </div>

            {/* Description */}
            {selectedImage.description && (
              <p className="text-white text-center mb-4">{selectedImage.description}</p>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center text-white">
              <button
                onClick={prevImage}
                className="flex items-center space-x-2 hover:text-amber-300 transition-colors p-2"
                aria-label={t('gallery.previous', 'Poprzednie zdjęcie')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{t('gallery.previous', 'Poprzednie')}</span>
              </button>

              <div className="text-center">
                <p className="text-sm opacity-75">
                  {t('gallery.navigation_hint', 'Użyj strzałek lub ESC aby zamknąć')}
                </p>
              </div>

              <button
                onClick={nextImage}
                className="flex items-center space-x-2 hover:text-amber-300 transition-colors p-2"
                aria-label={t('gallery.next', 'Następne zdjęcie')}
              >
                <span>{t('gallery.next', 'Następne')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}