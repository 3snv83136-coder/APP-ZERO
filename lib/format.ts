/**
 * Helpers de formatage.
 */

/** "2026-04-29" → "29/04/2026". Renvoie "—" si null. */
export function fmtDateFR(iso: string | null | undefined): string {
  if (!iso) return '—'
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso
}

/** "2026-04-29" → "29/04/2026". Pas de fallback. */
export function fmtDateISOtoFR(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso
}

/** Formatte un montant en euros. Renvoie "—" si non-numérique. */
export function fmtEUR(n: number | null | undefined): string {
  if (typeof n !== 'number' || !Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
}
