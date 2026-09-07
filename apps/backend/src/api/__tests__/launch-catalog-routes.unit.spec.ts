import { GET as getAdminLaunchCatalog } from "../admin/custom/route"
import { GET as getStoreLaunchCatalog } from "../store/custom/route"
import { launchCatalog } from "../../catalog/launch-catalog"
import { publicLaunchCatalog } from "../../catalog/public-launch-catalog"

const privateStoreFields = [
  "supplier_contact",
  "supplier_quote_date",
  "supplier_currency",
  "supplier_unit_cost",
  "estimated_freight",
  "estimated_import_cost",
  "landed_cost_vnd",
  "discount_owner",
  "stock_qty",
  "showroom_qty",
  "spare_parts_notes",
] as const

describe("SAN-188 launch catalog API consumers", () => {
  it("serves a public projection of the shared launch record to the storefront", async () => {
    const json = jest.fn()
    const response = { json } as unknown as Parameters<typeof getStoreLaunchCatalog>[1]

    await getStoreLaunchCatalog(
      {} as Parameters<typeof getStoreLaunchCatalog>[0],
      response
    )

    expect(json).toHaveBeenCalledWith({ launch_catalog: publicLaunchCatalog })
    expect(publicLaunchCatalog).toHaveLength(launchCatalog.length)
    expect(publicLaunchCatalog.map((product) => product.sku)).toEqual(
      launchCatalog.map((product) => product.sku)
    )

    for (const product of publicLaunchCatalog) {
      expect(product.checkout_enabled).toBe(false)
      expect(["in-stock", "showroom-demo", "quote-required"]).toContain(
        product.availability_status
      )

      for (const privateField of privateStoreFields) {
        expect(Object.keys(product)).not.toContain(privateField)
      }
    }
  })

  it("serves the canonical full record to authenticated admin consumers", async () => {
    const json = jest.fn()
    const response = { json } as unknown as Parameters<typeof getAdminLaunchCatalog>[1]

    await getAdminLaunchCatalog(
      {} as Parameters<typeof getAdminLaunchCatalog>[0],
      response
    )

    expect(json).toHaveBeenCalledWith({ launch_catalog: launchCatalog })
  })
})
