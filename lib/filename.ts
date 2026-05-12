/**
 * Construit un nom de fichier sûr pour téléchargement.
 * Exemple : safeFilename('document', 'mon-titre') → "document-mon-titre.pdf"
 */
export function safeFilename(prefix: string, suffix: string, ext: string = 'pdf'): string {
  return `${prefix}-${suffix || 'document'}.${ext}`
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
