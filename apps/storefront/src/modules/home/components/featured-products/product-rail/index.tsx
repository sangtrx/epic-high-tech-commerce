import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price,+metadata",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-20">
      <div className="flex justify-between mb-8">
        <div>
          <p className="epic-eyebrow mb-3">CURATED FOR POSSIBILITY</p>
          <Heading level="h2" className="text-3xl font-medium tracking-tight">
            {collection.title}
          </Heading>
          <p className="text-sm text-ui-fg-subtle mt-3">
            Four starting points. One connected approach to technology.
          </p>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View collection
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-4 gap-6">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
