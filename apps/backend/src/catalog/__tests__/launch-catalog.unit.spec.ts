import { epicCatalog } from "../../scripts/epic-catalog"
import { launchCatalog } from "../launch-catalog"

const quoteOwnedFields = [
  "supplier_quote_date",
  "supplier_currency",
  "supplier_unit_cost",
  "estimated_freight",
  "estimated_import_cost",
  "landed_cost_vnd",
  "retail_price_vnd",
  "discount_owner",
  "price_valid_until",
  "stock_qty",
  "showroom_qty",
  "lead_time_days",
  "manufacturer_warranty_months",
  "spare_parts_notes",
] as const

const sharedSchemaFields = [
  "sku",
  "brand",
  "model",
  "category",
  "launch_tier",
  "sales_mode",
  "supplier_contact",
  "supplier_quote_date",
  "supplier_currency",
  "supplier_unit_cost",
  "estimated_freight",
  "estimated_import_cost",
  "landed_cost_vnd",
  "retail_price_vnd",
  "discount_owner",
  "price_valid_until",
  "stock_qty",
  "showroom_qty",
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
  "spare_parts_notes",
  "serial_tracking_required",
  "safety_notes",
  "hero_image",
  "gallery",
  "datasheet_url",
  "manual_url",
  "demo_script",
] as const

describe("SAN-188 launch catalog", () => {
  it("keeps a finite seven-SKU launch set separate from fictional demo checkout", () => {
    expect(launchCatalog).toHaveLength(7)

    const launchSkus = new Set(launchCatalog.map((product) => product.sku))
    expect(launchSkus.size).toBe(7)

    for (const demoProduct of epicCatalog) {
      expect(launchSkus.has(demoProduct.sku)).toBe(false)
    }
  })

  it("keeps every real launch SKU non-purchasable until commercial ownership exists", () => {
    for (const product of launchCatalog) {
      expect(product.checkout_enabled).toBe(false)

      for (const field of quoteOwnedFields) {
        expect(product[field]).toBeNull()
      }
    }
  })

  it("implements the same shared schema for every launch record", () => {
    for (const product of launchCatalog) {
      for (const field of sharedSchemaFields) {
        expect(Object.prototype.hasOwnProperty.call(product, field)).toBe(true)
      }

      expect(["stocked", "showroom-only", "made-to-order", "project-quote"]).toContain(
        product.sales_mode
      )
      expect(["P1", "P2", "P3"]).toContain(product.delivery_class)
      expect(product.commissioning_scope.length).toBeGreaterThan(0)
      expect(product.epic_service_scope.length).toBeGreaterThan(0)
      expect(product.safety_notes.length).toBeGreaterThan(0)
      expect(product.public_source_url).toMatch(/^https:\/\//)
    }
  })

  it("keeps unapproved media and supplier-rights fields empty", () => {
    for (const product of launchCatalog) {
      expect(product.hero_image).toBeNull()
      expect(product.gallery).toEqual([])
      expect(product.datasheet_url).toBeNull()
      expect(product.manual_url).toBeNull()
      expect(product.demo_script).toBeNull()
    }
  })

  it("never sends project-quote products through normal parcel fulfillment", () => {
    const projectQuoteProducts = launchCatalog.filter(
      (product) => product.sales_mode === "project-quote"
    )

    expect(projectQuoteProducts.length).toBeGreaterThan(0)
    for (const product of projectQuoteProducts) {
      expect(product.delivery_class).toBe("P3")
      expect(product.installation_required).toBe(true)
    }
  })
})
