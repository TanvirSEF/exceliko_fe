export const config = {
  apiUrl: process.env.API_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8000",
  publicApiUrl: process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim(),
  mediavineTagId: process.env.NEXT_PUBLIC_MEDIAVINE_TAG_ID?.trim(),
} as const

export const API_BASE_PATH = "/api/v1"
