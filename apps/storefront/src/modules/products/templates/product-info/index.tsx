import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h1"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
        <p className="text-xs text-ui-fg-muted">
          Concept configuration · illustrative demo price · no real payment
        </p>
        <dl className="epic-product-facts">
          {[
            ["lead_time", "Lead time"],
            ["showroom_status", "Showroom"],
            ["installation", "Installation"],
            ["warranty", "Warranty"],
          ].map(([key, label]) => {
            const value = product.metadata?.[key]
            return typeof value === "string" ? (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ) : null
          })}
        </dl>
      </div>
    </div>
  )
}

export default ProductInfo
