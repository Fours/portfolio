import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="section container">
      <div className="about">
        <div className="about-heading">
          <SectionHeading index="01" label="about">
            Designer roots,
            <br />
            systems engineer.
          </SectionHeading>
        </div>
        <div className="about-body">
          <p>
            I started on the design side of the web — a degree in Multimedia Technologies, then years
            as a web and graphic designer — and grew into building the systems behind the screen.
          </p>
          <p>
            At LifeWay I spent fourteen years on Agile/Scrum teams building enterprise B2B e-commerce
            in Java and Spring, resilient event-driven services in Scala with clustered actor systems,
            REST APIs in Node and Play, and modern React front ends tied together with Kafka.
          </p>
          <p>
            I like working close to the business: gathering requirements with product owners,
            modeling domains with domain-driven design and event-storming, and shipping incremental
            value with code review, CI/CD and solid testing.
          </p>
        </div>
      </div>
    </section>
  )
}
