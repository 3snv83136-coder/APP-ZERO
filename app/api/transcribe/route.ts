import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY manquante" }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey })
    const formData = await req.formData()
    const audio = formData.get('audio') as File

    if (!audio) {
      return NextResponse.json({ error: "Fichier audio requis" }, { status: 400 })
    }

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: audio,
      language: "fr",
    })

    return NextResponse.json({ text: transcription.text })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur transcription" }, { status: 500 })
  }
}
