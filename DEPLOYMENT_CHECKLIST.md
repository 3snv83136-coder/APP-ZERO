# Checklist de déploiement

## Pré-déploiement

- [ ] Build local réussi : `npm run build`
- [ ] `.env.local.example` présent avec placeholders
- [ ] `.env.local` configuré (non commité)
- [ ] Routes API présentes : `/api/auth/[...nextauth]`, `/api/transcribe`, etc.

## Déploiement Vercel

- [ ] Repo poussé sur GitHub
- [ ] Projet Vercel créé et lié
- [ ] Variables d'environnement configurées (Production)
- [ ] Premier déploiement OK (statut "Ready")

## Tests post-déploiement

- [ ] URL accessible
- [ ] Redirection `/login` fonctionnelle
- [ ] Authentification OK avec credentials configurés
- [ ] Pages principales accessibles
- [ ] Routes API répondent correctement

## Critères de succès

- [ ] URL de déploiement accessible (pas de 403/404)
- [ ] Page login fonctionnelle
- [ ] Authentification opérationnelle
- [ ] Fonctionnalités principales testées
