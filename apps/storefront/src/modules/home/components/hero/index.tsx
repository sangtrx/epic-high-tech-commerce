import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Hero() {
  return (
    <section className="epic-hero">
      <div className="content-container epic-hero-grid">
        <div className="epic-hero-copy">
          <p className="epic-eyebrow">EPIC TECHNOLOGY / VIETNAM</p>
          <h1>
            Advanced technology.
            <br />
            <span>Real-world possibility.</span>
          </h1>
          <p className="epic-hero-description">
            Robotics, intelligent classrooms and industrial vision. Explore a
            considered selection of technology for the way Vietnam works, learns
            and moves.
          </p>
          <div className="epic-hero-actions">
            <LocalizedClientLink href="/store" className="epic-button">
              Explore the collection <span aria-hidden="true">↗</span>
            </LocalizedClientLink>
            <LocalizedClientLink href="/showroom" className="epic-text-link">
              Discover the showroom <span aria-hidden="true">→</span>
            </LocalizedClientLink>
          </div>
          <p className="epic-hero-note">
            Selection. Demonstration. Installation. Ongoing support.
          </p>
        </div>
        <LocalizedClientLink
          href="/products/serve-one"
          className="epic-hero-visual"
          aria-label="Explore Serve One Delivery Robot"
        >
          <div className="epic-visual-top">
            <span>IN FOCUS / 01</span>
            <span>SERVICE ROBOTICS</span>
          </div>
          <Image
            src="/epic/serve-one.svg"
            alt="Concept illustration of a three-tray indoor delivery robot"
            width={720}
            height={760}
            priority
            className="epic-hero-robot"
          />
          <div className="epic-visual-bottom">
            <div>
              <span className="epic-eyebrow">MEET SERVE ONE</span>
              <h2>A new member of the team.</h2>
            </div>
            <span className="epic-circle-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <span className="epic-image-caption">
            Concept illustration · demo configuration
          </span>
        </LocalizedClientLink>
      </div>
    </section>
  )
}
