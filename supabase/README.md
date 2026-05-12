# Supabase — APP-ZERO

Ce dossier contient le schéma de base de données Supabase.

## Structure

- `schema.sql` — Schéma SQL à exécuter dans le SQL Editor de Supabase
- `migrations/` — Migrations versionnées (à créer selon vos besoins)

## Démarrage

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Copier l'URL et la service_role key dans `.env.local`
3. Exécuter `schema.sql` dans le SQL Editor
4. Les tables `clients` et `interventions` sont créées

## Personnalisation

- Ajouter vos propres tables dans `schema.sql`
- Utiliser les migrations pour les changements incrémentaux
- Adapter les types dans `lib/supabase.ts`
