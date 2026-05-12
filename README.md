# APP-ZERO — Modèle vierge Next.js 14

Template d'application Next.js 14 App Router prêt à être branché sur votre entreprise.

## Ce qui est inclus

- **Authentification** — NextAuth v5 avec credentials (bcrypt), utilisateurs via variables d'env
- **Base de données** — Client Supabase prêt à l'emploi
- **IA** — Wrappers OpenAI (Whisper) et Anthropic (Claude) avec logging
- **Emails** — Intégration Resend
- **PDF** — Génération via @react-pdf/renderer
- **PWA** — Service worker + manifest
- **UI** — Tailwind CSS, composants réutilisables
- **Déploiement** — Prêt pour Vercel (vercel.json inclus)

## Démarrage rapide

```bash
git clone https://github.com/3snv83136-coder/APP-ZERO.git mon-app
cd mon-app
npm install
cp .env.local.example .env.local
# → Éditer .env.local avec vos clés API
npm run dev
```

## Stack

Next.js 14 · TypeScript strict · Tailwind CSS · Supabase · NextAuth · Resend · OpenAI · Anthropic

## Personnalisation

1. Remplacer les placeholders `{{NOM_ENTREPRISE}}`, `{{SITE_WEB}}` dans les fichiers
2. Configurer `.env.local` avec vos propres clés
3. Créer vos tables Supabase avec `supabase/schema.sql`
4. Adapter les routes API dans `app/api/`
5. Construire vos pages dans `app/`

## Licence

MIT
