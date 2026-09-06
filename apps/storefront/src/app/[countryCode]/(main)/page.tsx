import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import EpicServices, { SolutionNavigation } from "@modules/home/components/epic-services"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "EPIC Technology | Advanced technology for Vietnam",
  description:
    "Explore robotics, STEM learning systems and industrial AI with EPIC Technology. Vietnam showroom and distribution demo.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <SolutionNavigation />
      <div className="epic-collection">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <EpicServices />
    </>
  )
}
