import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

/**
 * Client Supabase server-side avec la service_role key.
 * NE JAMAIS importer ce fichier dans un composant client.
 * Utilisable uniquement depuis les routes API et Server Components.
 */
export function getSupabase(): SupabaseClient {
  if (cached) return cached
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY non configurée')
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

/** Renvoie null si Supabase n'est pas configuré (mode dégradé). */
export function getSupabaseOrNull(): SupabaseClient | null {
  if (cached) return cached
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  return getSupabase()
}

// =====================================================================
// Types génériques — à adapter selon votre schéma
// =====================================================================

export interface Client {
  id: string
  nom: string
  email: string | null
  telephone: string | null
  adresse: string | null
  code_postal: string | null
  ville: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Intervention {
  id: string
  reference: string | null
  client_id: string | null
  type: string | null
  description: string | null
  statut: string
  date_prevue: string | null
  date_realisee: string | null
  prix: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

// =====================================================================
// Helpers
// =====================================================================

/**
 * Upsert un client par nom+email (évite les doublons).
 */
export async function upsertClient(input: {
  nom?: string
  email?: string
  adresse?: string
  code_postal?: string
  ville?: string
}): Promise<string | null> {
  const sb = getSupabaseOrNull()
  if (!sb) return null

  const { nom, email } = input
  if (!nom && !email) return null

  // Cherche un client existant
  let q = sb.from('clients').select('id')
  if (email) q = q.eq('email', email)
  else if (nom) q = q.eq('nom', nom)
  const { data: existing } = await q.limit(1).maybeSingle()

  if (existing?.id) {
    await sb.from('clients').update(input).eq('id', existing.id)
    return existing.id
  }

  const { data: created } = await sb.from('clients').insert(input).select('id').single()
  return created?.id ?? null
}
