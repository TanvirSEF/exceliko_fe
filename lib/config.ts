export const config = {
  apiUrl: process.env.API_URL ?? "https://api.excelinsider.com",
  publicApiUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://api.excelinsider.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://excelinsider.com",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim(),
  mediavineTagId: process.env.NEXT_PUBLIC_MEDIAVINE_TAG_ID?.trim(),
} as const

export const API_BASE_PATH = "/api/v1"
