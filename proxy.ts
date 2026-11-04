import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const REFRESH_COOKIE = "ei_refresh"
const PAGINATION_EXCLUDED = /^\/(?:blog|author|tags|search|dashboard|api|_next)(?:\/|$)/

function withIndexingPolicy(response: NextResponse) {
  if (process.env.ALLOW_INDEXING !== "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
  }
  return response
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (!pathname.startsWith("/dashboard")) {
    const page = Number(searchParams.get("page"))
    const isPaginated = Number.isInteger(page) && page >= 2
    if (!isPaginated || PAGINATION_EXCLUDED.test(pathname)) {
      return withIndexingPolicy(NextResponse.next())
    }

    const target = request.nextUrl.clone()
    target.pathname = `${pathname.replace(/\/+$/, "")}/page/${page}/`
    target.search = ""
    return withIndexingPolicy(NextResponse.rewrite(target))
  }

  if (!request.cookies.has(REFRESH_COOKIE)) {
    const loginUrl = new URL("/insider-studio", request.url)
    loginUrl.searchParams.set("next", pathname)
    return withIndexingPolicy(NextResponse.redirect(loginUrl))
  }

  const headers = new Headers(request.headers)
  return withIndexingPolicy(NextResponse.next({ request: { headers } }))
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
}
