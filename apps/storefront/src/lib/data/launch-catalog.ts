"use server"

import { sdk } from "@lib/config"

export type PublicAvailabilityStatus =
  | "in-stock"
  | "showroom-demo"
  | "quote-required"

export type PublicLaunchCatalogRecord = {
  sku: string
  brand: string
  model: string
  category: string
  launch_tier: "A" | "B"
  sales_mode: "stocked" | "showroom-only" | "made-to-order" | "project-quote"
  retail_price_vnd: number | null
  price_valid_until: string | null
  lead_time_days: number | null
  weight_kg: number | null
  dimensions_mm: string | null
  power_requirement: string | null
  network_requirement: string | null
  installation_required: boolean
  commissioning_scope: string
  delivery_class: "P1" | "P2" | "P3"
  manufacturer_warranty_months: number | null
  epic_service_scope: string
  serial_tracking_required: boolean
  safety_notes: string
  hero_image: string | null
  gallery: readonly string[]
  datasheet_url: string | null
  manual_url: string | null
  demo_script: string | null
  checkout_enabled: false
  public_reference_price: string | null
  public_source_url: string
  availability_status: PublicAvailabilityStatus
}

type LaunchCatalogResponse = {
  launch_catalog: PublicLaunchCatalogRecord[]
}

export const listLaunchCatalog = async (): Promise<
  readonly PublicLaunchCatalogRecord[]
> => {
  const { launch_catalog } = await sdk.client.fetch<LaunchCatalogResponse>(
    "/store/custom",
    {
      method: "GET",
      cache: "no-store",
    }
  )

  return launch_catalog
}
