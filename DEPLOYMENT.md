# Guide de déploiement — APP-ZERO

## Prérequis

1. Compte GitHub avec le repo APP-ZERO
2. Compte Vercel (gratuit suffit)
3. Clés API : OpenAI, Anthropic
4. Compte Supabase (optionnel)
5. Compte Resend (optionnel)

## Étape 1 : Cloner et configurer

```bash
git clone https://github.com/3snv83136-coder/APP-ZERO.git mon-app
cd mon-app
npm install
cp .env.local.example .env.local
# → Éditer .env.local avec vos clés
```

## Étape 2 : Pousser sur votre GitHub

```bash
# Créer un nouveau repo sur GitHub (ex: mon-app)
git remote set-url origin https://github.com/VOTRE_USERNAME/mon-app.git
git branch -M main
git push -u origin main
```

## Étape 3 : Déployer sur Vercel

### Option A — Dashboard Vercel
1. https://vercel.com/dashboard → "Add New" → "Project"
2. Sélectionner votre repo GitHub
3. Vercel détecte automatiquement Next.js

### Option B — CLI
```bash
npx vercel --prod
```

## Étape 4 : Variables d'environnement

Dans Vercel Dashboard → Settings → Environment Variables, ajouter :

```
NEXTAUTH_SECRET          # openssl rand -base64 32
NEXTAUTH_URL             # https://mon-app.vercel.app
AUTH_USER_1              # admin:$2b$10$...
OPENAI_API_KEY           # sk-...
ANTHROPIC_API_KEY        # sk-ant-...
SUPABASE_URL             # https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY # eyJ...
RESEND_API_KEY           # re_...
RESEND_FROM              # Contact <contact@example.com>
```

Redéployer après avoir ajouté les variables.

## Étape 5 : Vérification

1. Ouvrir l'URL Vercel → doit rediriger vers `/login`
2. Se connecter avec les credentials configurés
3. Tester les fonctionnalités

## Dépannage

- **Build échoue** : vérifier `npm run build` en local
- **Variables d'env non chargées** : vérifier qu'elles sont en Production (pas Preview)
- **Login ne fonctionne pas** : vérifier NEXTAUTH_SECRET et NEXTAUTH_URL
