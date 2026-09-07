import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { launchCatalog } from "../../../catalog/launch-catalog"

export async function GET(
  _req: MedusaRequest,
  res: MedusaResponse
) {
  res.json({ launch_catalog: launchCatalog })
}
