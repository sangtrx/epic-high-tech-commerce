import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const solutions = [
  {
    number: "01",
    title: "Service robotics",
    handle: "service-robotics",
    copy: "Thoughtful automation for hospitality and everyday operations.",
  },
  {
    number: "02",
    title: "Education robotics",
    handle: "education-robotics",
    copy: "Turn curiosity into coding, collaboration and discovery.",
  },
  {
    number: "03",
    title: "STEM lab systems",
    handle: "stem-lab",
    copy: "Build a space for hands-on, project-based learning.",
  },
  {
    number: "04",
    title: "Industrial AI & vision",
    handle: "industrial-vision",
    copy: "Explore inspection and intelligence at the edge.",
  },
]

export function SolutionNavigation() {
  return (
    <section
      className="content-container epic-solutions"
      aria-label="Explore by application"
    >
      {solutions.map((solution) => (
        <LocalizedClientLink
          key={solution.handle}
          href={`/categories/${solution.handle}`}
          className="epic-solution"
        >
          <span className="epic-eyebrow">{solution.number} / EXPLORE</span>
          <h2>
            {solution.title} <span aria-hidden="true">↗</span>
          </h2>
          <p>{solution.copy}</p>
        </LocalizedClientLink>
      ))}
    </section>
  )
}

export default function EpicServices() {
  return (
    <section className="epic-services">
      <div className="content-container epic-services-grid">
        <div>
          <p className="epic-eyebrow">BEYOND THE HARDWARE</p>
          <h2>
            From first demo
            <br />
            to everyday use.
          </h2>
          <p>
            Good technology needs the right environment, a confident team and a
            clear support plan. That is the EPIC approach.
          </p>
          <LocalizedClientLink href="/showroom" className="epic-text-link">
            Explore our service approach <span aria-hidden="true">→</span>
          </LocalizedClientLink>
        </div>
        <ol className="epic-service-steps">
          <li>
            <span>01</span>
            <div>
              <h3>See it in context</h3>
              <p>
                Review your application and explore a guided demonstration
                before choosing a configuration.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Plan the installation</h3>
              <p>
                Scope delivery, site readiness, commissioning and team training
                around your environment.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Keep moving forward</h3>
              <p>
                Agree warranty coverage, remote support and maintenance needs in
                a written service plan.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
