import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EpicServices from "@modules/home/components/epic-services"

export const metadata: Metadata = { title: "Showroom & services | EPIC Technology" }

export default function ShowroomPage() {
  return <>
    <section className="content-container epic-page-intro"><p className="epic-eyebrow">THE EPIC SHOWROOM / VIETNAM</p><h1>See the potential.<br />Understand the fit.</h1><p>A good demonstration starts with your use case. Explore how a service robot, learning system or vision bench could work in your environment.</p><LocalizedClientLink href="/store" className="epic-button">Choose a system to explore <span aria-hidden="true">↗</span></LocalizedClientLink></section>
    <EpicServices />
    <section className="content-container py-16"><div className="epic-info-panel"><h2 className="text-2xl mb-4">Prepare for a useful demonstration</h2><p>For robotics, bring a floor plan and a typical workflow. For education, outline learner ages, class sizes and curriculum goals. For industrial vision, prepare representative parts and inspection criteria.</p><p className="mt-4">This September 7 experience demonstrates the proposed showroom journey. Physical visits, hardware availability, service areas and appointments are not confirmed or booked through this site. Installation, delivery and warranty terms require a written quotation.</p><LocalizedClientLink href="/demo-information" className="underline mt-5 inline-block">Read the demo details</LocalizedClientLink></div></section>
  </>
}
