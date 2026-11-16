function normalizeUrl(value?: string): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  return trimmed ? trimmed.replace(/\/+$/, "") : undefined
}

export const config = {
  apiUrl:
    normalizeUrl(process.env.API_URL) ||
    normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ||
    "http://localhost:8000",
  publicApiUrl: normalizeUrl(process.env.NEXT_PUBLIC_API_URL) || "http://localhost:8000",
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  mediaHosts: process.env.NEXT_PUBLIC_MEDIA_HOSTS?.trim() || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim(),
  mediavineTagId: process.env.NEXT_PUBLIC_MEDIAVINE_TAG_ID?.trim(),
} as const

export const API_BASE_PATH = "/api/v1"
