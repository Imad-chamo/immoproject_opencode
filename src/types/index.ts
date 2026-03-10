export type Role = "CLIENT" | "INSPECTOR" | "ADMIN"
export type Badge = "STARTER" | "PRO" | "EXPERT"
export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING"
export type OrderStatus = "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "QUALITY_CHECK" | "DELIVERED" | "CANCELLED"
export type Formula = "ESSENTIEL" | "STANDARD" | "PREMIUM"
export type PaymentMethod = "CARD" | "WAFACASH" | "WIRE" | "WESTERN_UNION"
export type PaymentStatus = "PENDING" | "CONFIRMED" | "FAILED"
export type ReportStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "DELIVERED"
export type SubscriptionPlan = "STARTER" | "PRO" | "EXPERT"

export const PRICING = {
  ESSENTIEL: { clientPrice: 1200, inspectorShare: 600 },
  STANDARD: { clientPrice: 2500, inspectorShare: 1200 },
  PREMIUM: { clientPrice: 5000, inspectorShare: 2500 },
}

export const SUBSCRIPTION_PRICES = {
  STARTER: 300,
  PRO: 600,
  EXPERT: 1000,
}

export const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "El Jadida",
  "Azrou",
  "Essaouira",
  "Nador",
  "Beni Mellal",
  "Khouribga",
  "Laayoune",
  "Dakhla",
]
