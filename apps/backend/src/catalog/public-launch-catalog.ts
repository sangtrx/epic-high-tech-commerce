import { launchCatalog, LaunchCatalogRecord } from "./launch-catalog"

export type PublicAvailabilityStatus =
  | "in-stock"
  | "showroom-demo"
  | "quote-required"

export const publicLaunchCatalogFields = [
  "sku",
  "brand",
  "model",
  "category",
  "launch_tier",
  "sales_mode",
  "retail_price_vnd",
  "price_valid_until",
  "lead_time_days",
  "weight_kg",
  "dimensions_mm",
  "power_requirement",
  "network_requirement",
  "installation_required",
  "commissioning_scope",
  "delivery_class",
  "manufacturer_warranty_months",
  "epic_service_scope",
  "serial_tracking_required",
  "safety_notes",
  "hero_image",
  "gallery",
  "datasheet_url",
  "manual_url",
  "demo_script",
  "checkout_enabled",
  "public_reference_price",
  "public_source_url",
] as const satisfies readonly (keyof LaunchCatalogRecord)[]

type PublicLaunchCatalogFields = (typeof publicLaunchCatalogFields)[number]

export type PublicLaunchCatalogRecord = Pick<
  LaunchCatalogRecord,
  PublicLaunchCatalogFields
> & {
  availability_status: PublicAvailabilityStatus
}

const getAvailabilityStatus = (
  product: LaunchCatalogRecord
): PublicAvailabilityStatus => {
  if (product.stock_qty !== null && product.stock_qty > 0) {
    return "in-stock"
  }

  if (product.showroom_qty !== null && product.showroom_qty > 0) {
    return "showroom-demo"
  }

  return "quote-required"
}

const toPublicLaunchCatalogRecord = (
  product: LaunchCatalogRecord
): PublicLaunchCatalogRecord => ({
  ...(Object.fromEntries(
    publicLaunchCatalogFields.map((field) => [field, product[field]])
  ) as Pick<LaunchCatalogRecord, PublicLaunchCatalogFields>),
  availability_status: getAvailabilityStatus(product),
})

export const publicLaunchCatalog: readonly PublicLaunchCatalogRecord[] =
  launchCatalog.map(toPublicLaunchCatalogRecord)
