# Like a Gold – Spray Tan

Projet de site vitrine administrable pour l'activité "Like a Gold" (spray tan), réalisé avec Laravel 12 + Inertia.js + React (JSX).

## 🚀 Stack technique

- **Laravel 12** (API & back-office)
- **Inertia.js** (liaison front/back)
- **React** (JSX, pas TSX)
- **TailwindCSS** (mise en page)
- **Pest** (tests)
- **ESLint, Prettier** (qualité de code)

## 📁 Organisation des branches

- `main` : branche de production (toujours stable)
- `dev` : branche de développement (work in progress)

## ⚡ Installation rapide

```bash
git clone https://github.com/kamila-rawa/final_project.git
cd final_project

cp .env.example .env
composer install
npm install

php artisan key:generate
php artisan migrate

npm run dev
php artisan serve
```

## 🛠️ Scripts utiles

- `npm run dev` : lance le build front en mode dev
- `php artisan serve` : lance le serveur Laravel
- `./vendor/bin/pest` : lance tous les tests

## 📦 Fonctionnalités principales

- Gestion dynamique : témoignages, galerie photo, FAQ, infos générales
- Interface d’administration sécurisée (CRUD)
- Intégration Google Maps, accessibilité, RGPD

## 📋 À faire / Roadmap

- [ ] Modélisation base de données
- [ ] Première version back-office
- [ ] Intégration design/front
- [ ] Déploiement

---

**Contact :**
- Développeuse : Kamila Rawa
- [Lien vers le projet GitHub](https://github.com/kamila-rawa/final_project)

---

> *Ce projet est réalisé dans le cadre de ma formation/d’un exercice pro. Toute contribution ou retour est bienvenu !*
