import { Resend } from "resend"

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function escapeHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Adresse expéditeur effective :
 * - RESEND_FROM_EMAIL si défini (domaine vérifié)
 * - sinon onboarding@resend.dev en mode test
 */
export function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL
    || 'onboarding@resend.dev'
  )
}

/** Destinataire effectif : si RESEND_TEST_EMAIL est défini il prime sur le client. */
export function getResendRecipient(clientEmail: string): string {
  return process.env.RESEND_TEST_EMAIL || clientEmail
}

export type ResendCtx = {
  resend: Resend
  fromEmail: string
  recipient: string
}

/**
 * Initialise Resend ou renvoie une erreur structurée.
 */
export function initResend(clientEmail: string): ResendCtx | { error: string; status: number } {
  if (!clientEmail || typeof clientEmail !== 'string' || !EMAIL_RE.test(clientEmail)) {
    return { error: 'Email client invalide', status: 400 }
  }
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    return { error: 'RESEND_API_KEY manquante', status: 500 }
  }
  return {
    resend: new Resend(resendKey),
    fromEmail: getResendFromEmail(),
    recipient: getResendRecipient(clientEmail),
  }
}
