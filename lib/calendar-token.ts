import { createHash } from "crypto"

/**
 * Token déterministe pour l'abonnement iCalendar.
 * Dérivé de NEXTAUTH_SECRET (ou de CALENDAR_TOKEN si fourni explicitement) via SHA-256.
 * Si aucun secret n'est configuré, retourne null.
 */
export function getCalendarToken(): string | null {
  const explicit = (process.env.CALENDAR_TOKEN || '').trim()
  if (explicit) return explicit
  const secret = (process.env.NEXTAUTH_SECRET || '').trim()
  if (!secret) return null
  return createHash('sha256').update(secret + ':calendar:v1').digest('hex').slice(0, 32)
}
