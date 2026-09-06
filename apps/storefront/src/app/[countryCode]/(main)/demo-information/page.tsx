import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = { title: "Demo information | EPIC Technology" }

export default function DemoInformationPage() {
  return <article className="content-container epic-page-intro max-w-4xl">
    <p className="epic-eyebrow">SEPTEMBER 7 SHOWCASE</p><h1>A real commerce flow.<br />A demonstration catalog.</h1>
    <div className="epic-policy-copy">
      <h2>Products, prices and service</h2><p>Products are fictional EPIC demo configurations illustrated with original concept artwork. Prices in Vietnamese đồng, inventory quantities, lead times and warranty proposals are illustrative. They are not binding quotations, live availability, supplier agreements or confirmed showroom appointments. Tax and delivery totals shown in the demo are not tax advice or final commercial terms.</p>
      <h2>Checkout and orders</h2><p>The seeded Vietnam region uses manual test payment. No card details or bank transfers are required. Placing a demo order creates a record in Medusa so the cart, checkout and order experience can be explored. It does not charge you, arrange delivery or settle a real purchase. Do not send money for a demo order.</p>
      <h2>Accounts and demo data</h2><p>Accounts, addresses and orders are stored by the demo backend. Use fictional names, test email addresses and sample addresses only. Do not enter personal, payment or confidential business information. This is a local demonstration, with no published production privacy or sales terms.</p>
      <h2>Delivery, installation and support</h2><p>Delivery planning follows the product lead time. A real engagement would confirm site readiness, training, installation scope, warranty exclusions and support coverage in writing. Demo shipping options and zero delivery charges do not promise free installation or transport.</p>
    </div><LocalizedClientLink href="/store" className="epic-button">Explore the demo catalog <span aria-hidden="true">→</span></LocalizedClientLink>
  </article>
}
