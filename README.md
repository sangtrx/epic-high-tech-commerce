# EPIC Technology · September 7 demo

A Vietnam high-tech distribution and showroom demo built on the real [Medusa DTC Starter](https://github.com/medusajs/dtc-starter). Next.js storefront, Medusa backend and Admin, inventory, cart, checkout, accounts and orders remain the starter's commerce architecture.

This fork is **demonstration software**. Products are fictional configurations, prices and inventory are illustrative, and the Vietnam region uses Medusa's manual test payment provider. No supplier agreements, real stock, confirmed showroom appointments, payments or production settlement are represented.

## Demo catalog

| Product | Application | Illustrative price |
| --- | --- | ---: |
| Serve One Delivery Robot | Hospitality and indoor service robotics | 185,000,000 VND |
| Teach One Learning Robot | Teaching and classroom robotics | 68,000,000 VND |
| STEM Lab Explorer Kit | Project-based electronics and robotics | 24,500,000 VND |
| Vision Edge Inspection System | Sample-based industrial AI inspection | 96,000,000 VND |

Each product has a buyable demo variant, category, collection, inventory and metadata for lead time, showroom status, installation, warranty, support and configuration. Values are in **whole Vietnamese đồng**, Medusa's major currency unit, with no cents conversion. Original SVG concept illustrations are bundled locally in `apps/storefront/public/epic`; final hardware is not represented by these drawings.

## Local run

Requires Node 20.19+ or 22.12+, pnpm 10.11.1 and a **fresh, dedicated PostgreSQL 15+ demo database**. Do not point the demo seed at an existing business database. No paid services or Stripe account are needed.

```sh
git clone https://github.com/sangtrx/epic-high-tech-commerce.git
cd epic-high-tech-commerce
corepack pnpm install --frozen-lockfile
```

1. Configure the backend locally using the variables below. Keep local configuration untracked and never commit credentials.
2. Run `corepack pnpm --filter @dtc/backend exec medusa db:migrate`. On a fresh database this automatically runs `src/migration-scripts/initial-data-seed.ts`, creating the EPIC catalog, Vietnam/VND region, manual payment, demo inventory and shipping. **Do not seed again after a successful migration.** Migration records prevent repeat execution. The explicit `corepack pnpm backend:seed` command is only for an empty catalog whose initial data migration was deliberately skipped; it refuses to overwrite products. A failed partial initialization should be investigated or retried on another fresh demo database, not run over a live catalog.
3. Create a local Admin user with `corepack pnpm --filter @dtc/backend exec medusa user --email admin@example.test --password '<your-local-demo-password>'`.
4. Start the backend: `corepack pnpm --filter @dtc/backend exec medusa develop --host 127.0.0.1`.
5. In Admin at `http://localhost:9000/app`, retrieve the **EPIC Demo Storefront** publishable API key from Settings → Publishable API Keys. Set it in the storefront's local configuration; do not use an admin token.
6. Start the storefront: `corepack pnpm --filter @dtc/storefront exec next dev --turbopack --hostname 127.0.0.1 -p 8000`.

Backend local configuration (`apps/backend/.env`, created by the operator):

| Variable | Local value / purpose |
| --- | --- |
| `DATABASE_URL` | Connection URL for your fresh demo PostgreSQL database |
| `JWT_SECRET`, `COOKIE_SECRET` | Locally generated random values |
| `STORE_CORS` | `http://localhost:8000` |
| `ADMIN_CORS` | `http://localhost:9000` |
| `AUTH_CORS` | `http://localhost:8000,http://localhost:9000` |
| `EPIC_STOREFRONT_URL` | `http://localhost:8000`; absolute image URL stored at seed time, also usable by Admin |

Storefront local configuration (`apps/storefront/.env.local`, created by the operator):

| Variable | Local value / purpose |
| --- | --- |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | The EPIC storefront publishable key from the demo backend |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `http://localhost:9000` |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:8000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | `vn` |

Leave optional Stripe/payment integration keys unset. The seeded Vietnam region exposes only `pp_system_default`.

## Walkthrough and URLs

- Storefront: `http://localhost:8000/vn`
- Catalog: `http://localhost:8000/vn/store`
- Product: `http://localhost:8000/vn/products/serve-one`
- Showroom and installation/support approach: `http://localhost:8000/vn/showroom`
- Demo terms: `http://localhost:8000/vn/demo-information`
- Cart: `http://localhost:8000/vn/cart`
- Account and order history: `http://localhost:8000/vn/account`
- Backend: `http://localhost:9000`; health: `/health`; Admin: `/app`

Open a product, add its Demo package to the cart and proceed through the existing Medusa checkout with fictional contact/address details in Vietnam. Choose a demo delivery option and **Demo payment · no charge**, then **Place demo order**. The resulting order is a real database record for the demonstration; it does not trigger real payment or delivery. Review it in Admin or the account's order history. Shipping is illustrative and does not include a commitment to free installation or transport.

## Checks

```sh
corepack pnpm --filter @dtc/backend lint
corepack pnpm --filter @dtc/backend exec tsc --noEmit
corepack pnpm --filter @dtc/backend build
corepack pnpm --filter @dtc/storefront lint
corepack pnpm --filter @dtc/storefront exec tsc --noEmit --incremental false
corepack pnpm --filter @dtc/storefront build
```

The storefront build requires a reachable, seeded backend and its publishable key because the starter discovers category, collection and product routes during page generation. Typechecking is run explicitly: upstream Next.js configuration skips type/lint checks inside `next build`. Do not treat an offline build failure as a successful full build.

## Upstream attribution

Forked from [`medusajs/dtc-starter`](https://github.com/medusajs/dtc-starter), verified at upstream commit `19e8a6fbefea5a385e9502409908bfbebbecf526` for this demo. The original [MIT LICENSE](LICENSE), copyright and package author credits are retained. Medusa and Next.js provide the commerce platform and storefront foundation. EPIC branding, demo catalog and concept illustrations are additions to this fork.
