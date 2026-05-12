# PROMPT AI DOCS — APP-ZERO

## Contexte projet

**Repo :** `APP-ZERO` — template Next.js 14 App Router conçu pour être branché sur n'importe quelle entreprise.

## Stack

- Next.js 14 App Router, TypeScript strict, Tailwind CSS
- `@anthropic-ai/sdk` (Claude), `openai` (Whisper)
- NextAuth (auth), Resend (emails), Supabase (DB)
- Déploiement Vercel

## Structure du projet

```
app/
├── api/
│   ├── auth/[...nextauth]/  → NextAuth
│   ├── transcribe/          → Whisper (speech-to-text)
│   ├── extract/             → Claude (extraction structurée)
│   ├── generate/            → Claude (génération contenu)
│   └── publish/             → Proxy API externe
├── login/                   → Page de connexion
├── nouveau/                 → Formulaire exemple
├── layout.tsx               → Layout racine
├── page.tsx                 → Dashboard
└── globals.css              → Styles globaux

lib/
├── auth.ts                  → Configuration NextAuth
├── supabase.ts              → Client Supabase
├── anthropic.ts             → Wrapper Claude (template)
├── email-utils.ts           → Utilitaires Resend
└── ...

components/
├── VoiceRecorder.tsx        → Enregistreur vocal
├── Icons.tsx                → Icônes réutilisables
└── ...
```

## Règles non-négociables

1. TypeScript strict, pas de `any` non justifié
2. Server Components par défaut (App Router)
3. Pas de CSS inline, utiliser Tailwind
4. Secrets uniquement via variables d'environnement
5. Ne jamais commiter `.env.local`
