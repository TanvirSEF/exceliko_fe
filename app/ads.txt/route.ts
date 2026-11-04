import { NextResponse } from "next/server"

import { config } from "@/lib/config"

export const revalidate = 86400

export async function GET() {
  if (!config.mediavineTagId) {
    return new NextResponse(null, { status: 404 })
  }

  const url = `https://adstxt.mediavine.com/sites/${config.mediavineTagId}/ads.txt`

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: {
        "User-Agent": "Exceliko-AdsTxt-Fetcher/1.0",
      },
    })

    if (res.ok) {
      const text = await res.text()
      if (text.includes("mediavine.com")) {
        return new NextResponse(text, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
          },
        })
      }
    }
  } catch {
    return new NextResponse(null, { status: 502 })
  }

  return new NextResponse(null, { status: 502 })
}
