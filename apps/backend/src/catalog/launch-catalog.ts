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
  launch_tier: LaunchTier
  sales_mode: SalesMode
  supplier_contact: string | null
  supplier_quote_date: string | null
  supplier_currency: string | null
  supplier_unit_cost: number | null
  estimated_freight: number | null
  estimated_import_cost: number | null
  landed_cost_vnd: number | null
  retail_price_vnd: number | null
  discount_owner: string | null
  price_valid_until: string | null
  stock_qty: number | null
  showroom_qty: number | null
  lead_time_days: number | null
  weight_kg: number | null
  dimensions_mm: string | null
  power_requirement: string | null
  network_requirement: string | null
  installation_required: boolean
  commissioning_scope: string
  delivery_class: DeliveryClass
  manufacturer_warranty_months: number | null
  epic_service_scope: string
  spare_parts_notes: string | null
  serial_tracking_required: boolean
  safety_notes: string
  hero_image: string | null
  gallery: readonly string[]
  datasheet_url: string | null
  manual_url: string | null
  demo_script: string | null

  /** Safety field: real launch records are not Medusa checkout products yet. */
  checkout_enabled: false

  /** Public reference only; never a substitute for quote-owned commercial fields. */
  public_reference_price: string | null
  public_source_url: string
}

const unconfirmedCommercialFields = {
  supplier_quote_date: null,
  supplier_currency: null,
  supplier_unit_cost: null,
  estimated_freight: null,
  estimated_import_cost: null,
  landed_cost_vnd: null,
  retail_price_vnd: null,
  discount_owner: null,
  price_valid_until: null,
  stock_qty: null,
  showroom_qty: null,
  lead_time_days: null,
  manufacturer_warranty_months: null,
  spare_parts_notes: null,
  hero_image: null,
  gallery: [] as const,
  datasheet_url: null,
  manual_url: null,
  demo_script: null,
} as const

/**
 * Approved SAN-188 launch candidates.
 *
 * These are shared operational catalog records, not Medusa checkout products.
 * Quote-owned commercial, stock, warranty, spare-parts, and media fields remain
 * null/empty until EPIC has durable supplier or rights evidence. Public list
 * prices are reference facts only and must never be treated as EPIC landed cost
 * or selling price.
 */
export const launchCatalog: readonly LaunchCatalogRecord[] = [
  {
    ...unconfirmedCommercialFields,
    sku: "UNITREE-GO2-PRO",
    brand: "Unitree",
    model: "Go2 Pro",
    category: "Quadruped robotics",
    launch_tier: "A",
    sales_mode: "made-to-order",
    supplier_contact: "sales_global@unitree.com",
    weight_kg: 15,
    dimensions_mm: "~700 x 310 x 400 standing",
    power_requirement: "Battery powered; charger specification to confirm with quote",
    network_requirement: "Wireless connectivity; deployment requirements to confirm",
    installation_required: false,
    commissioning_scope: "Delivery plus operator onboarding and safety handoff",
    delivery_class: "P2",
    epic_service_scope: "Local delivery, onboarding and first-line support scope to confirm",
    serial_tracking_required: true,
    safety_notes: "Controlled demo and operator safety briefing required",
    checkout_enabled: false,
    public_reference_price: "USD 2,800 before freight/tax",
    public_source_url: "https://www.unitree.com/go2/",
  },
  {
    ...unconfirmedCommercialFields,
    sku: "DOBOT-MAGICIAN-E6",
    brand: "DOBOT",
    model: "Magician E6",
    category: "Education robotics",
    launch_tier: "A",
    sales_mode: "made-to-order",
    supplier_contact: "sales@dobot-robots.com",
    weight_kg: 7.2,
    dimensions_mm: null,
    power_requirement: "100-240 VAC; approximately 130 W",
    network_requirement: "Lab network/software requirements to confirm",
    installation_required: true,
    commissioning_scope: "Desktop setup, software installation and teaching/demo onboarding",
    delivery_class: "P1",
    epic_service_scope: "Lab setup and curriculum/demo support",
    serial_tracking_required: true,
    safety_notes: "Use supervised teaching workspace and vendor safety guidance",
    checkout_enabled: false,
    public_reference_price: null,
    public_source_url: "https://www.dobot-robots.com/products/education/magician-e6.html",
  },
  {
    ...unconfirmedCommercialFields,
    sku: "ELEPHANT-MYCOBOT-280-M5STACK",
    brand: "Elephant Robotics",
    model: "myCobot 280 M5Stack",
    category: "Research robotics",
    launch_tier: "A",
    sales_mode: "made-to-order",
    supplier_contact: "sales@elephantrobotics.com",
    weight_kg: 0.85,
    dimensions_mm: null,
    power_requirement: "Desktop power adapter; exact input specification per supplied package",
    network_requirement: "Optional depending on development setup",
    installation_required: false,
    commissioning_scope: "Self-setup capable; optional gripper/accessory setup and remote onboarding",
    delivery_class: "P1",
    epic_service_scope: "Remote onboarding and accessory setup support",
    serial_tracking_required: true,
    safety_notes: "Desktop/lab use with normal collaborative-robot precautions",
    checkout_enabled: false,
    public_reference_price: "USD 649 before freight/tax",
    public_source_url: "https://shop.elephantrobotics.com/products/mycobot-worlds-smallest-and-lightest-six-axis-collaborative-robot",
  },
  {
    ...unconfirmedCommercialFields,
    sku: "UNITREE-G1-EDU",
    brand: "Unitree",
    model: "G1 / G1 EDU",
    category: "Humanoid robotics",
    launch_tier: "B",
    sales_mode: "project-quote",
    supplier_contact: "sales_global@unitree.com",
    weight_kg: 35,
    dimensions_mm: "~1320 mm height",
    power_requirement: "Battery powered; charging and operating requirements to confirm",
    network_requirement: "Research/development networking to be scoped per deployment",
    installation_required: true,
    commissioning_scope: "Local delivery, setup and mandatory operator safety briefing",
    delivery_class: "P3",
    epic_service_scope: "Project onboarding and first-line coordination; detailed support by quote",
    serial_tracking_required: true,
    safety_notes: "Humanoid deployment requires controlled environment and formal safety handoff",
    checkout_enabled: false,
    public_reference_price: "G1 public price from USD 13.5k; EDU quote-only",
    public_source_url: "https://www.unitree.com/mobile/g1/",
  },
  {
    ...unconfirmedCommercialFields,
    sku: "DOBOT-CR5",
    brand: "DOBOT",
    model: "CR5",
    category: "Industrial cobots",
    launch_tier: "B",
    sales_mode: "project-quote",
    supplier_contact: "sales@dobot-robots.com",
    weight_kg: 25,
    dimensions_mm: null,
    power_requirement: "48 V DC; approximately 150 W",
    network_requirement: "Application/plant network requirements scoped per project",
    installation_required: true,
    commissioning_scope: "Application review, mounting, end-effector integration, commissioning and acceptance",
    delivery_class: "P3",
    epic_service_scope: "Engineering-led installation and commissioning",
    serial_tracking_required: true,
    safety_notes: "Requires application-specific risk review and commissioning acceptance",
    checkout_enabled: false,
    public_reference_price: null,
    public_source_url: "https://www.dobot-robots.com/products/cr-series/cr5.html",
  },
  {
    ...unconfirmedCommercialFields,
    sku: "UFACTORY-XARM6",
    brand: "UFACTORY",
    model: "xArm 6",
    category: "Industrial cobots",
    launch_tier: "B",
    sales_mode: "project-quote",
    supplier_contact: "sales@ufactory.cc",
    weight_kg: 12.5,
    dimensions_mm: null,
    power_requirement: "24 V DC; typical approximately 200 W",
    network_requirement: "Development/application network scoped per project",
    installation_required: true,
    commissioning_scope: "Mounting, gripper/application design and commissioning",
    delivery_class: "P3",
    epic_service_scope: "Engineering setup and commissioning recommended",
    serial_tracking_required: true,
    safety_notes: "Application-specific mounting and safety review required before operation",
    checkout_enabled: false,
    public_reference_price: null,
    public_source_url: "https://docs.xarm.ufactory.cc/8.technical_specifications.html",
  },
  {
    ...unconfirmedCommercialFields,
    sku: "ELEPHANT-MYARM-M750",
    brand: "Elephant Robotics",
    model: "myArm M750",
    category: "Research robotics",
    launch_tier: "B",
    sales_mode: "made-to-order",
    supplier_contact: "sales@elephantrobotics.com",
    weight_kg: 3.2,
    dimensions_mm: null,
    power_requirement: "24 V 5 A",
    network_requirement: "Optional depending on Python/ROS lab setup",
    installation_required: false,
    commissioning_scope: "Desktop/lab setup; camera/gripper bundle onboarding optional",
    delivery_class: "P1",
    epic_service_scope: "Remote onboarding and optional lab accessory setup",
    serial_tracking_required: true,
    safety_notes: "Desktop/lab use with supervised teleoperation and normal robot safety precautions",
    checkout_enabled: false,
    public_reference_price: "USD 1,999 before freight/tax",
    public_source_url: "https://shop.elephantrobotics.com/products/myarm-m750",
  },
] as const
