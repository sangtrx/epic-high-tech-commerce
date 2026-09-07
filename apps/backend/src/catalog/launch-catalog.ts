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

const unconfirmedCommercialAndRightsFields = {
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
} as const

/**
 * Approved SAN-188 launch candidates.
 *
 * These are shared operational catalog records, not Medusa checkout products.
 * Quote-owned commercial, stock, warranty and spare-parts fields remain null
 * until EPIC has durable supplier evidence. Vendor-rights-dependent media remain
 * null/empty until reuse permission exists. Demo scripts are original EPIC copy.
 * Public list prices are reference facts only and must never be treated as EPIC
 * landed cost or selling price.
 */
export const launchCatalog: readonly LaunchCatalogRecord[] = [
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Start with the customer's environment and the job they want a mobile robot to support. In a clear, controlled demo area, show basic movement and explain that this Tier A candidate is handled through local delivery plus operator onboarding rather than ordinary parcel checkout. Walk through the safety handoff, then identify the charger, networking and operating details that EPIC will confirm in a written quote. Close by agreeing on the customer's real floor conditions and evaluation criteria before discussing availability or purchase.",
    checkout_enabled: false,
    public_reference_price: "USD 2,800 before freight/tax",
    public_source_url: "https://www.unitree.com/go2/",
  },
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Frame the demo as a teaching workflow rather than a robot trick. At a supervised desktop station, explain the six-axis learning setup, then run a simple repeatable mock task that a lecturer can use to discuss motion, programming and automation concepts. Show where EPIC's setup, software installation and teaching support fit into the deployment. Finish by asking about learner level, class size and lab constraints, because network, software, accessories, availability and warranty details must be confirmed in the written quote.",
    checkout_enabled: false,
    public_reference_price: null,
    public_source_url: "https://www.dobot-robots.com/products/education/magician-e6.html",
  },
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Position this as the compact entry point for a coding or research lab. Show the small desktop footprint, explain the self-setup path, and demonstrate a simple controlled motion or accessory-ready workflow without implying that any optional gripper is included. Connect the conversation to the customer's development environment and the remote onboarding EPIC can provide. Close by separating the public reference price from an EPIC selling price and by confirming that package contents, lead time, warranty and any accessory bundle are quote-owned details.",
    checkout_enabled: false,
    public_reference_price: "USD 649 before freight/tax",
    public_source_url: "https://shop.elephantrobotics.com/products/mycobot-worlds-smallest-and-lightest-six-axis-collaborative-robot",
  },
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Begin with the research objective and make clear that G1 EDU is a project-quote system, not a normal checkout product. Keep the demonstration in a controlled area and use it to discuss the customer's intended development, teleoperation or embodied-AI workflow rather than promising a finished application. Explain that EPIC would scope local delivery, setup and a formal operator safety handoff before deployment. End by listing the items that still require written confirmation: EDU configuration, charging, networking, lead time, warranty, service scope and commercial terms.",
    checkout_enabled: false,
    public_reference_price: "G1 public price from USD 13.5k; EDU quote-only",
    public_source_url: "https://www.unitree.com/mobile/g1/",
  },
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Start with a representative industrial task and explain that the robot arm is only one part of a working cell. Use a safe mock station to show the motion concept, then walk through the real EPIC project sequence: application review, mounting, end-effector selection, integration, commissioning and acceptance. Highlight that plant networking and safety requirements are scoped around the actual application. Close by stating that CR5 remains project-quote only; final configuration, lead time, warranty, spares and price come from the engineering scope and supplier quote.",
    checkout_enabled: false,
    public_reference_price: null,
    public_source_url: "https://www.dobot-robots.com/products/cr-series/cr5.html",
  },
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Anchor the demo in the customer's research or light-industrial use case. Show a controlled motion sequence, then explain why the production decision depends on mounting, gripper or end-effector choice, application design and commissioning rather than the arm alone. Discuss the development or plant network only at the level needed for the proposed workflow. Finish by confirming that xArm 6 is handled as a project quote with engineered delivery; bundle contents, stock, lead time, warranty, spares and final commercial terms remain subject to written supplier confirmation.",
    checkout_enabled: false,
    public_reference_price: null,
    public_source_url: "https://docs.xarm.ufactory.cc/8.technical_specifications.html",
  },
  {
    ...unconfirmedCommercialAndRightsFields,
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
    demo_script:
      "Present myArm M750 as a made-to-order research platform for supervised lab work. Start with the customer's teleoperation or robotics-learning objective, show a simple desktop motion workflow, and explain how a Python or ROS lab setup can be scoped around that objective. Treat camera and gripper bundles as optional until the quote confirms the exact package. Close with EPIC's remote onboarding path and make clear that the public reference price is not an EPIC selling price; availability, lead time, warranty and bundle details still require written confirmation.",
    checkout_enabled: false,
    public_reference_price: "USD 1,999 before freight/tax",
    public_source_url: "https://shop.elephantrobotics.com/products/myarm-m750",
  },
] as const
