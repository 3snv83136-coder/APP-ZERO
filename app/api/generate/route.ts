import { NextResponse } from "next/server"

/**
 * Route de génération — à implémenter selon votre besoin métier.
 * Exemple : générer un rapport ou du contenu SEO via Claude.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt, type } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: "Champ 'prompt' requis" }, { status: 400 })
    }

    // TODO: Brancher votre logique de génération (Claude, etc.)
    return NextResponse.json({
      message: "Route de génération — à implémenter",
      type: type || 'default',
      inputLength: prompt.length,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export const maxDuration = 300
