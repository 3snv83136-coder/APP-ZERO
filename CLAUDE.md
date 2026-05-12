# Projet {{NOM_ENTREPRISE}}

## Identité

- **Nom commercial** : {{NOM_ENTREPRISE}}
- **Site** : {{SITE_WEB}}
- **Métier** : {{DESCRIPTION_METIER}}
- **Zone** : {{ZONE_GEOGRAPHIQUE}}
- **Propriétaire** : {{PROPRIETAIRE}}

## Règles ABSOLUES (jamais violer)

1. **Téléphone** : toujours lire depuis `Parametre.TEL_PRINCIPAL`, JAMAIS hardcodé
2. **Prix** : toujours lire depuis la table `Tarif`, JAMAIS hardcodé ni inventé
3. **Nom commercial** : toujours utiliser le nom complet, jamais d'abréviation en façade client

## Stack

Next.js 14 App Router, TypeScript strict, Tailwind CSS, Supabase, Vercel, Resend, @react-pdf/renderer.

## Style code

- TypeScript strict, jamais de `any`
- Server Components par défaut, Client Components seulement si interactif
- Tailwind utility classes, jamais de CSS inline sauf cas exceptionnel
- Erreurs gérées avec try/catch, jamais ignorées silencieusement
