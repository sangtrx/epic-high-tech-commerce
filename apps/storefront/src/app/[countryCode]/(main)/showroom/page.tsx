import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EpicServices from "@modules/home/components/epic-services"
import {
  listLaunchCatalog,
  PublicLaunchCatalogRecord,
} from "@lib/data/launch-catalog"

export const metadata: Metadata = {
  title: "Showroom & services | EPIC Technology",
}

export const dynamic = "force-dynamic"

const salesModeLabels: Record<PublicLaunchCatalogRecord["sales_mode"], string> = {
  stocked: "Stocked",
  "showroom-only": "Showroom only",
  "made-to-order": "Made to order",
  "project-quote": "Project quote",
}

const availabilityLabels: Record<
  PublicLaunchCatalogRecord["availability_status"],
  string
> = {
  "in-stock": "In stock",
  "showroom-demo": "Showroom demo",
  "quote-required": "Availability by quote",
}

const deliveryLabels: Record<
  PublicLaunchCatalogRecord["delivery_class"],
  string
> = {
  P1: "P1 parcel / self-setup",
  P2: "P2 local delivery + onboarding",
  P3: "P3 engineered delivery + commissioning",
}

const formatRetailPrice = (price: number | null) => {
  if (price === null) {
    return "Quote required"
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

const formatWarranty = (months: number | null) =>
  months === null ? "To confirm by written quote" : `${months} months`

export default async function ShowroomPage() {
  const launchCatalog = await listLaunchCatalog()

  return (
    <>
      <section className="content-container epic-page-intro">
        <p className="epic-eyebrow">THE EPIC SHOWROOM / VIETNAM</p>
        <h1>
          See the potential.
          <br />
          Understand the fit.
        </h1>
        <p>
          A good demonstration starts with your use case. Explore how a service
          robot, learning system or vision bench could work in your environment.
        </p>
        <LocalizedClientLink href="/store" className="epic-button">
          Explore commerce demo <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </section>

      <section className="content-container py-16">
        <div className="mb-8 max-w-3xl">
          <p className="epic-eyebrow">LAUNCH CATALOG</p>
          <h2 className="text-3xl mb-3">Seven systems, one operating record.</h2>
          <p>
            These launch candidates are rendered from the same catalog record used
            by EPIC operations. Real checkout stays disabled until supplier-owned
            pricing, availability and service terms are confirmed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {launchCatalog.map((product) => (
            <article key={product.sku} className="epic-info-panel">
              <p className="epic-eyebrow">
                TIER {product.launch_tier} / {product.category}
              </p>
              <h3 className="text-2xl mb-2">
                {product.brand} {product.model}
              </h3>
              <p className="text-sm opacity-70 mb-6">SKU {product.sku}</p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="opacity-60">Sales mode</dt>
                  <dd>{salesModeLabels[product.sales_mode]}</dd>
                </div>
                <div>
                  <dt className="opacity-60">Availability</dt>
                  <dd>{availabilityLabels[product.availability_status]}</dd>
                </div>
                <div>
                  <dt className="opacity-60">EPIC price</dt>
                  <dd>{formatRetailPrice(product.retail_price_vnd)}</dd>
                </div>
                <div>
                  <dt className="opacity-60">Lead time</dt>
                  <dd>
                    {product.lead_time_days === null
                      ? "To confirm by quote"
                      : `${product.lead_time_days} days`}
                  </dd>
                </div>
                <div>
                  <dt className="opacity-60">Delivery</dt>
                  <dd>{deliveryLabels[product.delivery_class]}</dd>
                </div>
                <div>
                  <dt className="opacity-60">Installation</dt>
                  <dd>{product.installation_required ? "Required" : "Not required"}</dd>
                </div>
                <div>
                  <dt className="opacity-60">Manufacturer warranty</dt>
                  <dd>{formatWarranty(product.manufacturer_warranty_months)}</dd>
                </div>
                <div>
                  <dt className="opacity-60">Checkout</dt>
                  <dd>{product.checkout_enabled ? "Enabled" : "Disabled pending quote"}</dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-ui-border-base pt-5 text-sm space-y-3">
                <p>
                  <span className="opacity-60">Commissioning: </span>
                  {product.commissioning_scope}
                </p>
                <p>
                  <span className="opacity-60">EPIC service: </span>
                  {product.epic_service_scope}
                </p>
                <p>
                  <span className="opacity-60">Safety: </span>
                  {product.safety_notes}
                </p>
                {product.public_reference_price && (
                  <p>
                    <span className="opacity-60">Public reference only: </span>
                    {product.public_reference_price}. Not an EPIC landed cost or
                    selling price.
                  </p>
                )}
              </div>

              {product.demo_script && (
                <div className="mt-5 border-t border-ui-border-base pt-5 text-sm">
                  <p className="epic-eyebrow mb-2">30–60 SEC DEMO SCRIPT</p>
                  <p>{product.demo_script}</p>
                </div>
              )}

              <a
                href={product.public_source_url}
                target="_blank"
                rel="noreferrer"
                className="underline mt-5 inline-block"
              >
                Manufacturer reference
              </a>
            </article>
          ))}
        </div>
      </section>

      <EpicServices />

      <section className="content-container py-16">
        <div className="epic-info-panel">
          <h2 className="text-2xl mb-4">Prepare for a useful demonstration</h2>
          <p>
            For robotics, bring a floor plan and a typical workflow. For education,
            outline learner ages, class sizes and curriculum goals. For industrial
            vision, prepare representative parts and inspection criteria.
          </p>
          <p className="mt-4">
            This showroom experience demonstrates the proposed customer journey.
            Physical visits, hardware availability, service areas and appointments
            are not confirmed or booked through this site. Installation, delivery
            and warranty terms require a written quotation.
          </p>
          <LocalizedClientLink
            href="/demo-information"
            className="underline mt-5 inline-block"
          >
            Read the demo details
          </LocalizedClientLink>
        </div>
      </section>
    </>
  )
}
