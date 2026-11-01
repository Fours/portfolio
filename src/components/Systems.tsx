import { systemLayers } from '../data/resume'
import { FlowArrow, PulseIcon } from './Icons'
import SectionHeading from './SectionHeading'

export default function Systems() {
  return (
    <section id="systems" className="section band">
      <div className="container stack-48">
        <div className="section-intro">
          <SectionHeading index="02" label="systems">
            The shape of what I build
          </SectionHeading>
          <p className="section-lede">
            Commerce, online learning and digital licensing platforms, end to end: client to data
            store, joined by events.
          </p>
        </div>

        <div className="layers">
          {systemLayers.map((layer, i) => (
            <div key={layer.name} className="layer">
              <div className="layer-label">
                <span>{layer.name}</span>
                {i < systemLayers.length - 1 && <FlowArrow />}
              </div>
              {layer.nodes.map((node, j) => (
                <div key={node.title} className={j === 0 ? 'node node-accent' : 'node'}>
                  <div className="node-title">{node.title}</div>
                  <div className="node-sub">{node.sub}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="node event-bus">
          <div className="event-bus-name">
            <PulseIcon />
            <span>Kafka event stream</span>
          </div>
          <span className="event-bus-desc">
            flexible, event-driven collaboration between microservices
          </span>
        </div>
      </div>
    </section>
  )
}
