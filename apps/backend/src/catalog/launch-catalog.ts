export type LaunchTier = "A" | "B"
export type SalesMode =
  | "stocked"
  | "showroom-only"
  | "made-to-order"
  | "project-quote"
export type DeliveryClass = "P1" | "P2" | "P3"

export type LaunchCatalogRecord = {
  sku: string
  brand: string
  model: string
  category: string
  launchTier: LaunchTier
  salesMode: SalesMode
  deliveryClass: DeliveryClass
  checkoutEnabled: false
  supplierContact: string | null
  supplierQuoteDate: string | null
  supplierCurrency: string | null
  supplierUnitCost: number | null
  estimatedFreight: number | null
  estimatedImportCost: number | null
  landedCostVnd: number | null
  retailPriceVnd: number | null
  discountOwner: string | null
  priceValidUntil: string | null
  stockQty: number | null
  showroomQty: number | null
  leadTimeDays: number | null
  weightKg: number | null
  dimensionsMm: string | null
  powerRequirement: string | null
  networkRequirement: string | null
  installationRequired: boolean
  commissioningScope: string
  manufacturerWarrantyMonths: number | null
  epicServiceScope: string
  sparePartsNotes: string | null
  serialTrackingRequired: boolean
  safetyNotes: string
  publicReferencePrice: string | null
  publicSourceUrl: string
}

/**
 * Approved SAN-188 launch candidates.
 *
 * These are operational catalog records, not Medusa checkout products. Commercial
 * fields stay null until EPIC receives an actual supplier quote and assigns
 * pricing/availability/service ownership. Public list prices are reference facts
 * only and must never be treated as EPIC landed cost or selling price.
 */
export const launchCatalog: readonly LaunchCatalogRecord[] = [
  {
    sku: "UNITREE-GO2-PRO",
    brand: "Unitree",
    model: "Go2 Pro",
    category: "Quadruped robotics",
    launchTier: "A",
    salesMode: "made-to-order",
    deliveryClass: "P2",
    checkoutEnabled: false,
    supplierContact: "sales_global@unitree.com",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 15,
    dimensionsMm: "~700 x 310 x 400 standing",
    powerRequirement: "Battery powered; charger specification to confirm with quote",
    networkRequirement: "Wireless connectivity; deployment requirements to confirm",
    installationRequired: false,
    commissioningScope: "Delivery plus operator onboarding and safety handoff",
    manufacturerWarrantyMonths: 12,
    epicServiceScope: "Local delivery, onboarding and first-line support scope to confirm",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Controlled demo and operator safety briefing required",
    publicReferencePrice: "USD 2,800 before freight/tax",
    publicSourceUrl: "https://www.unitree.com/go2/",
  },
  {
    sku: "DOBOT-MAGICIAN-E6",
    brand: "DOBOT",
    model: "Magician E6",
    category: "Education robotics",
    launchTier: "A",
    salesMode: "made-to-order",
    deliveryClass: "P1",
    checkoutEnabled: false,
    supplierContact: "sales@dobot-robots.com",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 7.2,
    dimensionsMm: null,
    powerRequirement: "100-240 VAC; approximately 130 W",
    networkRequirement: "Lab network/software requirements to confirm",
    installationRequired: true,
    commissioningScope: "Desktop setup, software installation and teaching/demo onboarding",
    manufacturerWarrantyMonths: null,
    epicServiceScope: "Lab setup and curriculum/demo support",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Use supervised teaching workspace and vendor safety guidance",
    publicReferencePrice: null,
    publicSourceUrl: "https://www.dobot-robots.com/products/education/magician-e6.html",
  },
  {
    sku: "ELEPHANT-MYCOBOT-280-M5STACK",
    brand: "Elephant Robotics",
    model: "myCobot 280 M5Stack",
    category: "Research robotics",
    launchTier: "A",
    salesMode: "made-to-order",
    deliveryClass: "P1",
    checkoutEnabled: false,
    supplierContact: "sales@elephantrobotics.com",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 0.85,
    dimensionsMm: null,
    powerRequirement: "Desktop power adapter; exact input specification per supplied package",
    networkRequirement: "Optional depending on development setup",
    installationRequired: false,
    commissioningScope: "Self-setup capable; optional gripper/accessory setup and remote onboarding",
    manufacturerWarrantyMonths: null,
    epicServiceScope: "Remote onboarding and accessory setup support",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Desktop/lab use with normal collaborative-robot precautions",
    publicReferencePrice: "USD 649 before freight/tax",
    publicSourceUrl: "https://shop.elephantrobotics.com/products/mycobot-worlds-smallest-and-lightest-six-axis-collaborative-robot",
  },
  {
    sku: "UNITREE-G1-EDU",
    brand: "Unitree",
    model: "G1 / G1 EDU",
    category: "Humanoid robotics",
    launchTier: "B",
    salesMode: "project-quote",
    deliveryClass: "P3",
    checkoutEnabled: false,
    supplierContact: "sales_global@unitree.com",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 35,
    dimensionsMm: "~1320 mm height",
    powerRequirement: "Battery powered; charging and operating requirements to confirm",
    networkRequirement: "Research/development networking to be scoped per deployment",
    installationRequired: true,
    commissioningScope: "Local delivery, setup and mandatory operator safety briefing",
    manufacturerWarrantyMonths: null,
    epicServiceScope: "Project onboarding and first-line coordination; detailed support by quote",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Humanoid deployment requires controlled environment and formal safety handoff",
    publicReferencePrice: "G1 public price from USD 13.5k; EDU quote-only",
    publicSourceUrl: "https://www.unitree.com/mobile/g1/",
  },
  {
    sku: "DOBOT-CR5",
    brand: "DOBOT",
    model: "CR5",
    category: "Industrial cobots",
    launchTier: "B",
    salesMode: "project-quote",
    deliveryClass: "P3",
    checkoutEnabled: false,
    supplierContact: "sales@dobot-robots.com",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 25,
    dimensionsMm: null,
    powerRequirement: "48 V DC; approximately 150 W",
    networkRequirement: "Application/plant network requirements scoped per project",
    installationRequired: true,
    commissioningScope: "Application review, mounting, end-effector integration, commissioning and acceptance",
    manufacturerWarrantyMonths: null,
    epicServiceScope: "Engineering-led installation and commissioning",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Requires application-specific risk review and commissioning acceptance",
    publicReferencePrice: null,
    publicSourceUrl: "https://www.dobot-robots.com/products/cr-series/cr5.html",
  },
  {
    sku: "UFACTORY-XARM6",
    brand: "UFACTORY",
    model: "xArm 6",
    category: "Industrial cobots",
    launchTier: "B",
    salesMode: "project-quote",
    deliveryClass: "P3",
    checkoutEnabled: false,
    supplierContact: "sales@ufactory.cc",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 12.5,
    dimensionsMm: null,
    powerRequirement: "24 V DC; typical approximately 200 W",
    networkRequirement: "Development/application network scoped per project",
    installationRequired: true,
    commissioningScope: "Mounting, gripper/application design and commissioning",
    manufacturerWarrantyMonths: null,
    epicServiceScope: "Engineering setup and commissioning recommended",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Application-specific mounting and safety review required before operation",
    publicReferencePrice: null,
    publicSourceUrl: "https://docs.xarm.ufactory.cc/8.technical_specifications.html",
  },
  {
    sku: "ELEPHANT-MYARM-M750",
    brand: "Elephant Robotics",
    model: "myArm M750",
    category: "Research robotics",
    launchTier: "B",
    salesMode: "made-to-order",
    deliveryClass: "P1",
    checkoutEnabled: false,
    supplierContact: "sales@elephantrobotics.com",
    supplierQuoteDate: null,
    supplierCurrency: null,
    supplierUnitCost: null,
    estimatedFreight: null,
    estimatedImportCost: null,
    landedCostVnd: null,
    retailPriceVnd: null,
    discountOwner: null,
    priceValidUntil: null,
    stockQty: null,
    showroomQty: null,
    leadTimeDays: null,
    weightKg: 3.2,
    dimensionsMm: null,
    powerRequirement: "24 V 5 A",
    networkRequirement: "Optional depending on Python/ROS lab setup",
    installationRequired: false,
    commissioningScope: "Desktop/lab setup; camera/gripper bundle onboarding optional",
    manufacturerWarrantyMonths: null,
    epicServiceScope: "Remote onboarding and optional lab accessory setup",
    sparePartsNotes: null,
    serialTrackingRequired: true,
    safetyNotes: "Desktop/lab use with supervised teleoperation and normal robot safety precautions",
    publicReferencePrice: "USD 1,999 before freight/tax",
    publicSourceUrl: "https://shop.elephantrobotics.com/products/myarm-m750",
  },
] as const
