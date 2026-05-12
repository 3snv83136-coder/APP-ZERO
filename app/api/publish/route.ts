import { NextResponse } from "next/server"

/**
 * Route de publication — proxy vers une API externe (ex: site vitrine).
 * À implémenter selon votre besoin.
 */
export async function POST(req: Request) {
  try {
    const apiUrl = process.env.API_URL
    const apiToken = process.env.API_PUBLISH_TOKEN

    if (!apiUrl || !apiToken) {
      return NextResponse.json({ error: "API_URL ou API_PUBLISH_TOKEN non configurés" }, { status: 500 })
    }

    const body = await req.json()

    const res = await fetch(`${apiUrl}/api/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: `API distante erreur ${res.status}: ${err}` }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
