import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { publicLaunchCatalog } from "../../../catalog/public-launch-catalog"

export async function GET(
  _req: MedusaRequest,
  res: MedusaResponse
) {
  res.json({ launch_catalog: publicLaunchCatalog })
}
