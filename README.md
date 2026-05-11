# Abdoulaye Lankoandé — Portfolio Personnel

Site web personnel premium pour Abdoulaye Lankoandé, Spécialiste en engagement des jeunes et santé communautaire au Burkina Faso.

## Technologies

| Couche | Technologie |
|--------|-------------|
| Framework | TanStack Start (React 19, SSR) |
| Routage | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styles | Tailwind CSS 4 |
| UI | Radix UI + composants personnalisés |
| Langue | TypeScript 5.7 (strict) |
| Déploiement | Netlify |

## Démarrage local

```bash
npm install
npm run dev      # Serveur de développement sur http://localhost:3000
npm run build    # Build de production
```

Ou avec Netlify CLI (pour émuler l'environnement Netlify) :

```bash
netlify dev      # Serveur sur http://localhost:8888
```

## Structure du projet

```
src/routes/index.tsx   # Page principale du portfolio (toutes les sections)
src/styles.css         # Thème, animations, design tokens
public/
  abdoulaye-profile.jpg  # Photo de profil
```

## Sections du site

1. **Hero** — Photo circulaire avec orbite animée, gradient bleu profond, CTA
2. **Mission** — Présentation des engagements et valeurs
3. **Parcours** — Timeline verticale interactive (diplômes, certifications, formations)
4. **Qualités** — Mindmap dynamique circulaire
5. **Langues** — Barres de progression + diagrammes circulaires animés
6. **Expertise** — Cards interactives des domaines de compétence
7. **Contact** — Formulaire + coordonnées

## Fonctionnalités

- Mode sombre/clair avec persistance localStorage
- Animations scroll-reveal (Intersection Observer)
- Bouton WhatsApp flottant
- Bouton retour en haut
- Navigation responsive avec menu mobile
- SEO optimisé (meta, Open Graph)
- Google Fonts : Poppins + Inter
