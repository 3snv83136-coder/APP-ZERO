import { NextResponse } from "next/server"

/**
 * Route d'extraction — à implémenter selon votre besoin métier.
 * Exemple : extraire des données structurées depuis un texte via Claude.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { text } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: "Champ 'text' requis" }, { status: 400 })
    }

    // TODO: Brancher votre logique d'extraction (Claude, etc.)
    return NextResponse.json({
      message: "Route d'extraction — à implémenter",
      inputLength: text.length,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
