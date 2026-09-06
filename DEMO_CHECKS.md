# September 7 demo verification

Verified on 2026-09-06 in a disposable clone of this fork, using a fresh temporary PostgreSQL database and a loopback-only Medusa process. No deployment or existing service restart.

- `corepack pnpm install --frozen-lockfile`: passed; lockfile unchanged.
- Backend `medusa build`: passed, including Admin compilation.
- Backend `medusa lint` and `tsc --noEmit`: passed.
- Storefront `tsc --noEmit --incremental false`: passed.
- Storefront `next lint --file ...` across changed/new TypeScript files: passed.
- Storefront `next build` against the seeded backend: passed; generated all four product/category routes and the EPIC collection. Earlier offline attempts compiled but could not collect page data until Medusa was running.
- Fresh `medusa db:migrate`: passed, including EPIC seed. Verified four published products, four categories, VND calculated prices, eight demo inventory units per variant and service metadata.
- Store API smoke check: created a cart with the STEM kit, selected demo shipping, created manual payment session and completed a 24,500,000 VND order. Retrying cart completion returned the same order ID.
- Explicit repeat seed: correctly refused a nonempty catalog; product count remained four.
- Backend `/health` and Admin `/app`: HTTP 200.
- Four bundled SVG product illustrations: valid XML with accessible titles.
- `git diff --check`: passed. Original MIT license, lockfile, backend configuration and cart/customer/order data primitives preserved.

Full storefront lint remains nonzero for pre-existing upstream issues: ten errors in `src/lib/data/cart.ts` and `src/modules/layout/components/language-select/index.tsx`, plus three hook-dependency warnings in shipping, shipping-address and product-actions. These files were verified unchanged against upstream `19e8a6fbefea5a385e9502409908bfbebbecf526`. No rule was disabled to hide them.

The runtime smoke check used the actual Medusa Store API; a browser-driven end-to-end account/checkout test was not run. Local setup and demo limitations are documented in README.md.
