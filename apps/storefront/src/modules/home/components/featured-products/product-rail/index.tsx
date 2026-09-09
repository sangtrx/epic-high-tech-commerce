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
    <div className="content-container epic-product-rail">
      <div className="epic-product-rail-head">
        <div>
          <p className="epic-eyebrow">CURATED FOR POSSIBILITY</p>
          <Heading level="h2">{collection.title}</Heading>
          <p className="mt-3">
            Four starting points. One connected approach to technology.
          </p>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View collection
        </InteractiveLink>
      </div>
      <ul className="epic-product-grid grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-4">
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
