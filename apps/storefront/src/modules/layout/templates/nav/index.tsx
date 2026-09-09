import Image from "next/image"
import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <div className="epic-announcement">
        EPIC TECHNOLOGY <span aria-hidden="true">/</span> Demo catalog & checkout ·
        No real payments
      </div>
      <header className="epic-nav-shell relative mx-auto border-b duration-200">
        <nav className="content-container epic-nav flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink
              href="/store"
              className="hidden small:block ml-8"
            >
              Technology
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/showroom"
              className="hidden medium:block ml-7"
            >
              Showroom
            </LocalizedClientLink>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="epic-brand-lockup inline-flex items-center gap-2.5"
              data-testid="nav-store-link"
              aria-label="EPIC Technology home"
            >
              <span className="relative block h-11 w-[48px] shrink-0 overflow-hidden">
                <Image
                  src="/epic/epic-technology-logo.svg"
                  width={140}
                  height={48}
                  className="h-11 w-auto max-w-none"
                  alt=""
                  priority
                />
              </span>
              <span className="epic-brand-name whitespace-nowrap">
                EPIC TECHNOLOGY
              </span>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-7 h-full">
              <LocalizedClientLink
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
