import { epicCatalog } from "../../scripts/epic-catalog"
import { launchCatalog } from "../launch-catalog"

const quoteOwnedFields = [
  "supplierQuoteDate",
  "supplierCurrency",
  "supplierUnitCost",
  "estimatedFreight",
  "estimatedImportCost",
  "landedCostVnd",
  "retailPriceVnd",
  "discountOwner",
  "priceValidUntil",
  "stockQty",
  "showroomQty",
  "leadTimeDays",
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
      expect(product.checkoutEnabled).toBe(false)

      for (const field of quoteOwnedFields) {
        expect(product[field]).toBeNull()
      }
    }
  })

  it("uses one operational schema for fulfillment and service decisions", () => {
    for (const product of launchCatalog) {
      expect(["stocked", "showroom-only", "made-to-order", "project-quote"]).toContain(
        product.salesMode
      )
      expect(["P1", "P2", "P3"]).toContain(product.deliveryClass)
      expect(product.commissioningScope.length).toBeGreaterThan(0)
      expect(product.epicServiceScope.length).toBeGreaterThan(0)
      expect(product.safetyNotes.length).toBeGreaterThan(0)
      expect(product.publicSourceUrl).toMatch(/^https:\/\//)
    }
  })

  it("never sends project-quote products through normal parcel fulfillment", () => {
    const projectQuoteProducts = launchCatalog.filter(
      (product) => product.salesMode === "project-quote"
    )

    expect(projectQuoteProducts.length).toBeGreaterThan(0)
    for (const product of projectQuoteProducts) {
      expect(product.deliveryClass).toBe("P3")
      expect(product.installationRequired).toBe(true)
    }
  })
})
