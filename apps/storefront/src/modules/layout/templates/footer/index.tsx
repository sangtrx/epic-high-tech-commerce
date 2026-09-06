import Image from "next/image"

import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const categories = await listCategories()
  return (
    <footer className="epic-footer">
      <div className="content-container">
        <div className="epic-footer-grid">
          <div>
            <LocalizedClientLink
              href="/"
              className="inline-flex bg-white px-3 py-2"
              aria-label="EPIC Technology home"
            >
              <Image
                src="/epic/epic-technology-logo.svg"
                width={200}
                height={68}
                className="h-12 w-auto"
                alt="EPIC Technology"
              />
            </LocalizedClientLink>
            <p className="max-w-xs mt-6 text-sm leading-6 text-[#aeb7b2]">
              Advanced technology, thoughtfully introduced.
              <br />A distribution and showroom concept for Vietnam.
            </p>
          </div>
          <div>
            <h2>Explore technology</h2>
            <ul>
              {categories
                ?.filter((c) => !c.parent_category)
                .map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink href={`/categories/${c.handle}`}>
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2>Your EPIC experience</h2>
            <ul>
              <li>
                <LocalizedClientLink href="/showroom">
                  Showroom & services
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account">
                  Account & orders
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/cart">
                  Your cart
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/demo-information">
                  Demo information
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="epic-footer-bottom">
          <p>© {new Date().getFullYear()} EPIC Technology · Demo experience</p>
          <p>
            Built on{" "}
            <a
              href="https://github.com/medusajs/dtc-starter"
              target="_blank"
              rel="noreferrer"
            >
              Medusa DTC Starter
            </a>{" "}
            · MIT licensed
          </p>
        </div>
      </div>
    </footer>
  )
}
