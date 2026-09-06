"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Accordion from "./accordion"

export default function ProductTabs({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  return (
    <Accordion type="multiple">
      <Accordion.Item
        title="Application & configuration"
        headingSize="medium"
        value="configuration"
      >
        <dl className="epic-product-facts mb-6">
          {[
            ["application", "Application"],
            ["specification", "Configuration"],
            ["image_note", "Illustration"],
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
      </Accordion.Item>
      <Accordion.Item
        title="Delivery, installation & support"
        headingSize="medium"
        value="support"
      >
        <div className="text-sm text-ui-fg-subtle leading-7 py-6 space-y-4">
          <p>
            Delivery is planned around the product lead time and site readiness.
            Installation and training scope must be confirmed before a real
            engagement.
          </p>
          <p>
            {typeof product.metadata?.support === "string"
              ? product.metadata.support
              : "Warranty and support terms are confirmed in a written quotation."}
          </p>
          <p>
            Illustrative VND prices and demo shipping charges are not binding
            quotations. No real payment or delivery is arranged through this
            demonstration.
          </p>
          <LocalizedClientLink href="/demo-information" className="underline">
            Demo information & service terms
          </LocalizedClientLink>
        </div>
      </Accordion.Item>
    </Accordion>
  )
}
