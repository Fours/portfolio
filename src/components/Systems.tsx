import {
  archEdges,
  archLabels,
  archNodes,
  archRegions,
  archViewBox,
  type ArchLabel,
  type ArchNode,
} from '../data/resume'
import SectionHeading from './SectionHeading'

function Label({ text, x, y, anchor = 'start' }: ArchLabel) {
  return (
    <text x={x} y={y} textAnchor={anchor}>
      {text}
    </text>
  )
}

function NodeText({ node, cx, cy }: { node: ArchNode; cx: number; cy: number }) {
  return (
    <>
      <text className="arch-title" x={cx} y={cy - 4} textAnchor="middle">
        {node.title}
      </text>
      <text className="arch-sub" x={cx} y={cy + 16} textAnchor="middle">
        {node.sub}
      </text>
    </>
  )
}

function Node({ node }: { node: ArchNode }) {
  const { x, y, w, h } = node
  const cls = node.accent ? 'arch-node is-accent' : 'arch-node'

  if (node.kind === 'store') {
    const rx = w / 2
    const ry = 10
    return (
      <g className={cls}>
        <path
          className="arch-shape"
          d={`M${x},${y + ry} a${rx},${ry} 0 0 1 ${w},0 v${h - 2 * ry} a${rx},${ry} 0 0 1 ${-w},0 Z`}
        />
        <path className="arch-shape" d={`M${x},${y + ry} a${rx},${ry} 0 0 0 ${w},0`} />
        <NodeText node={node} cx={x + rx} cy={y + h / 2 + 6} />
      </g>
    )
  }

  if (node.kind === 'bus') {
    const cy = y + h / 2
    return (
      <g className={`${cls} arch-bus`}>
        <rect className="arch-shape" x={x} y={y} width={w} height={h} rx={12} />
        <path
          className="arch-pulse"
          transform={`translate(${x + 20} ${cy - 12})`}
          d="M3 12h4l3-8 4 16 3-8h4"
        />
        <text className="arch-title" x={x + 56} y={cy + 5}>
          {node.title}
        </text>
        <text className="arch-sub" x={x + w - 20} y={cy + 5} textAnchor="end">
          {node.sub}
        </text>
      </g>
    )
  }

  return (
    <g className={cls}>
      {node.cluster &&
        [12, 6].map((d) => (
          <rect key={d} className="arch-shadow" x={x + d} y={y - d} width={w} height={h} rx={12} />
        ))}
      <rect className="arch-shape" x={x} y={y} width={w} height={h} rx={12} />
      <NodeText node={node} cx={x + w / 2} cy={y + h / 2} />
    </g>
  )
}

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

        <figure className="arch">
          <svg
            className="arch-svg"
            viewBox={`0 0 ${archViewBox.w} ${archViewBox.h}`}
            role="img"
            aria-labelledby="arch-title arch-desc"
          >
            <title id="arch-title">System design of an example event-driven platform</title>
            <desc id="arch-desc">
              React storefront and admin clients call an API gateway over REST. The gateway sends
              commands to an Orders service. Orders, Licensing and Learning services each own a
              database and collaborate through a Kafka event bus. An SSE gateway consumes events
              from Kafka and pushes live updates to the clients.
            </desc>
            <defs>
              <marker
                id="arch-arrow-request"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path className="arch-head-request" d="M0,1 L9,5 L0,9 z" />
              </marker>
              <marker
                id="arch-arrow-event"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path className="arch-head-event" d="M0,1 L9,5 L0,9 z" />
              </marker>
            </defs>

            {archRegions.map((r, i) => (
              <g key={i} className={`arch-region is-${r.kind}`}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={r.kind === 'cluster' ? 18 : 14} />
                {r.label && <Label {...r.label} />}
              </g>
            ))}

            <g className="arch-col-labels">
              {archLabels.map((l) => (
                <Label key={l.text} {...l} />
              ))}
            </g>

            {archEdges.map((e, i) => {
              const marker = `url(#arch-arrow-${e.kind})`
              const flowing = e.kind === 'event' && !e.twoWay
              return (
                <g key={i} className={`arch-edge is-${e.kind}${flowing ? ' is-flowing' : ''}`}>
                  <polyline
                    points={e.points.map((p) => p.join(',')).join(' ')}
                    markerEnd={marker}
                    markerStart={e.twoWay ? marker : undefined}
                  />
                  {e.label && <Label {...e.label} />}
                </g>
              )
            })}

            {archNodes.map((n) => (
              <Node key={n.id} node={n} />
            ))}
          </svg>

          <figcaption className="arch-legend">
            <span className="arch-key">
              <svg width="28" height="8" aria-hidden="true">
                <path className="arch-key-request" d="M0 4h28" />
              </svg>
              request / response
            </span>
            <span className="arch-key">
              <svg width="28" height="8" aria-hidden="true">
                <path className="arch-key-event" d="M0 4h28" />
              </svg>
              event stream
            </span>
            <span className="arch-key">
              <span className="arch-key-context" aria-hidden="true" />
              bounded context, owns its data
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
