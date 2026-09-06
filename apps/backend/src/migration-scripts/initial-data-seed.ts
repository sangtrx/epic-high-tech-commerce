import { epicCatalog } from "../scripts/epic-catalog"

import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  MedusaError,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

// Absolute storefront URL also makes illustrations visible in Medusa Admin.
const assetBase = (
  process.env.EPIC_STOREFRONT_URL || "http://localhost:8000"
).replace(/\/$/, "")

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  )

  // This seed is for a fresh demo database only. Never overwrite a live catalog.
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id"],
  })
  if (existingProducts.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "EPIC seed requires an empty catalog. Use a fresh demo database; existing products were preserved."
    )
  }
  const countries = ["vn"]

  logger.info("Seeding store data...")
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "EPIC Demo Storefront",
          description: "EPIC Technology demonstration channel",
        },
      ],
    },
  })

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "EPIC Demo Storefront",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  })

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  })

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "EPIC Technology Demo",
          supported_currencies: [
            {
              currency_code: "vnd",
              is_default: true,
            },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  })

  logger.info("Seeding region data...")
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Vietnam · Demo",
          currency_code: "vnd",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  })
  const region = regionResult[0]
  logger.info("Finished seeding regions.")

  logger.info("Seeding tax regions...")
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  })
  logger.info("Finished seeding tax regions.")

  logger.info("Seeding stock location data...")
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "EPIC Vietnam demo inventory",
          address: {
            city: "Ho Chi Minh City",
            country_code: "VN",
            address_1: "",
          },
        },
      ],
    },
  })
  const stockLocation = stockLocationResult[0]

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  })

  logger.info("Seeding fulfillment data...")
  // This is created by a migration script in core.
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = shippingProfileResult[0]

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "EPIC Vietnam demo delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Vietnam · Demo",
        geo_zones: [{ country_code: "vn", type: "country" }],
      },
    ],
  })

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  })

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Scheduled delivery · demo",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Scheduled delivery",
          description:
            "Timing follows product lead time; installation scope confirmed separately.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "vnd",
            amount: 0,
          },
          {
            region_id: region.id,
            amount: 0,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Showroom handover · demo",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Showroom handover",
          description:
            "Appointment required; this demo does not reserve showroom stock.",
          code: "express",
        },
        prices: [
          {
            currency_code: "vnd",
            amount: 0,
          },
          {
            region_id: region.id,
            amount: 0,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  })
  logger.info("Finished seeding fulfillment data.")

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel.id],
    },
  })
  logger.info("Finished seeding stock location data.")

  logger.info("Seeding product data...")

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: epicCatalog.map((product) => ({
        name: product.category,
        handle: product.categoryHandle,
        is_active: true,
      })),
    },
  })
  const { result: collections } = await createCollectionsWorkflow(
    container
  ).run({
    input: {
      collections: [{ title: "The EPIC selection", handle: "epic-selection" }],
    },
  })

  await createProductsWorkflow(container).run({
    input: {
      products: epicCatalog.map((product) => ({
        title: product.title,
        subtitle: product.subtitle,
        handle: product.handle,
        description: product.description,
        status: ProductStatus.PUBLISHED,
        collection_id: collections[0].id,
        category_ids: [
          categoryResult.find(
            (category) => category.handle === product.categoryHandle
          )!.id,
        ],
        shipping_profile_id: shippingProfile.id,
        thumbnail: `${assetBase}/epic/${product.handle}.svg`,
        images: [{ url: `${assetBase}/epic/${product.handle}.svg` }],
        metadata: {
          demo: true,
          lead_time: product.leadTime,
          showroom_status: product.showroomStatus,
          installation: product.installation,
          warranty: product.warranty,
          support:
            "Vietnam-based onboarding and remote support proposed for the demo; service scope subject to written confirmation.",
          application: product.application,
          specification: product.specification,
          price_note:
            "Illustrative VND price for demo checkout only. Final configuration, tax, delivery and service fees require a quotation.",
          supplier_note:
            "Concept demo configuration. No supplier agreement, certification or live stock claim.",
          image_note: "EPIC concept illustration; final hardware may differ.",
        },
        options: [{ title: "Configuration", values: ["Demo package"] }],
        variants: [
          {
            title: "Demo package",
            sku: product.sku,
            manage_inventory: true,
            options: { Configuration: "Demo package" },
            prices: [{ amount: product.priceVnd, currency_code: "vnd" }],
          },
        ],
        sales_channels: [{ id: defaultSalesChannel.id }],
      })),
    },
  })
  logger.info("Finished seeding product data.")

  logger.info("Seeding inventory levels.")

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 8,
        inventory_item_id: item.id,
      })),
    },
  })

  logger.info("Finished seeding inventory levels data.")
}
