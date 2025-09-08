import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-white">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Colonne 1: À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-200">
              Spray Tan Pologne
            </h3>
            <p className="text-amber-100 text-sm leading-relaxed">
              Votre spécialiste du spray tan professionnel en Pologne. 
              Des résultats naturels et durables pour un teint parfait toute l'année.
            </p>
          </div>

          {/* Colonne 2: Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-200">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-amber-100 hover:text-amber-300 transition-colors text-sm">À propos</a></li>
              <li><a href="#testimonials" className="text-amber-100 hover:text-amber-300 transition-colors text-sm">Témoignages</a></li>
              <li><a href="#gallery" className="text-amber-100 hover:text-amber-300 transition-colors text-sm">Galerie</a></li>
              <li><a href="#portfolio" className="text-amber-100 hover:text-amber-300 transition-colors text-sm">Portfolio</a></li>
              <li><a href="#contact" className="text-amber-100 hover:text-amber-300 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Colonne 3: Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-200">
              Contact
            </h4>
            <div className="space-y-2 text-amber-100 text-sm">
              <p>📞 +48 123 456 789</p>
              <p>✉️ contact@spraytan-pologne.com</p>
              <p>📍 Warszawa, Polska</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-amber-800 bg-amber-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-amber-200 text-sm">
            <p>© {currentYear} Spray Tan Pologne. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/mentions-legales" className="hover:text-amber-300 transition-colors">Mentions légales</a>
              <a href="/rgpd" className="hover:text-amber-300 transition-colors">RGPD</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 z-40"
        aria-label="Retour en haut"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}