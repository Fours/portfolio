import { useEffect, useRef, type RefObject } from 'react'

// Animated neural-net backdrop for the hero. Nodes are scattered by a density
// field that frames the hero: a band along the top, a column on the right that
// dips down behind the photo, a thin fringe on the left, and a near-empty
// pocket behind the copy so the text stays readable.

type RGB = [number, number, number]

// Matches the site's ring palette (accent green, blue, purple, pink, orange, yellow).
const PALETTE: RGB[] = [
  [74, 222, 128],
  [96, 165, 250],
  [167, 139, 250],
  [244, 114, 182],
  [251, 146, 60],
  [250, 204, 21],
]

type Node = {
  hx: number
  hy: number
  x: number
  y: number
  r: number
  color: RGB
  alpha: number
  depth: number
  hub: boolean
  hollow: boolean
  ax: number
  ay: number
  fx: number
  fy: number
  px: number
  py: number
}

type Edge = {
  a: number
  b: number
  dashed: boolean
  dash: number
  speed: number
  alpha: number
}

type Pulse = {
  edge: number
  t: number
  speed: number
  forward: boolean
}

type Rect = { left: number; top: number; right: number; bottom: number }

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${a})`
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (e0: number, e1: number, v: number) => {
  const t = clamp01((v - e0) / (e1 - e0))
  return t * t * (3 - 2 * t)
}

// Deterministic PRNG so the layout is stable across resizes of the same size.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function relRect(el: HTMLElement | null, origin: DOMRect): Rect | null {
  if (!el) return null
  const r = el.getBoundingClientRect()
  return {
    left: r.left - origin.left,
    top: r.top - origin.top,
    right: r.right - origin.left,
    bottom: r.bottom - origin.top,
  }
}

function buildDensity(w: number, h: number, copy: Rect | null, photo: Rect | null) {
  const narrow = w < 760
  // Where the right-hand column is anchored: the photo if it sits beside the
  // copy, otherwise just the right edge of the screen.
  const besideCopy = photo && copy && photo.left > copy.right - 40
  const colLeft = besideCopy ? photo.left - 140 : w * 0.78
  const colBottom = besideCopy ? photo.bottom + 120 : copy ? copy.top + 40 : h * 0.3
  const topBand = narrow ? h * 0.14 : h * 0.24
  // Left fringe reaches about halfway into the margin beside the copy.
  const leftReach = narrow ? 40 : Math.max(110, (copy?.left ?? 0) * 0.55)

  return (x: number, y: number) => {
    // Top band, thickening a little toward the right.
    const top = Math.exp(-y / (topBand * (0.8 + 0.5 * (x / w))))
    // Right column that dips down behind the photo.
    const right = smooth(colLeft - 220, colLeft + 60, x) * (1 - smooth(colBottom - 160, colBottom, y))
    // Thin fringe down the left edge.
    const left = Math.exp(-x / leftReach) * (1 - smooth(h * 0.45, h * 0.8, y))
    // Halo around the photo, so it sits inside the net.
    let halo = 0
    if (photo) {
      const dx = Math.max(photo.left - x, 0, x - photo.right)
      const dy = Math.max(photo.top - y, 0, y - photo.bottom)
      halo = Math.exp(-Math.hypot(dx, dy) / (narrow ? 50 : 90))
    }
    let d = Math.max(top, right * 0.95, left * 0.8, halo * 0.9)

    // Quiet pocket behind the copy.
    if (copy) {
      const pad = 70
      const inX = smooth(copy.left - pad, copy.left + 30, x) * (1 - smooth(copy.right - 80, copy.right + pad, x))
      const inY = smooth(copy.top - pad, copy.top + 20, y) * (1 - smooth(copy.bottom - 20, copy.bottom + pad, y))
      d *= 1 - 0.94 * inX * inY
    }
    // Fade out at the bottom of the canvas.
    d *= 1 - smooth(h * 0.82, h, y)
    return d
  }
}

function generate(w: number, h: number, copy: Rect | null, photo: Rect | null) {
  const rand = mulberry32(Math.round(w) * 7919 + 17)
  const density = buildDensity(w, h, copy, photo)
  const minDist = w < 760 ? 32 : 40
  const maxNodes = Math.min(260, Math.round((w * h) / 4200))

  const nodes: Node[] = []
  for (let i = 0; i < 9000 && nodes.length < maxNodes; i++) {
    const x = rand() * w
    const y = rand() * h
    const d = density(x, y)
    if (rand() > d * 1.1) continue
    const spacing = minDist * (1.5 - 0.6 * d)
    if (nodes.some((n) => (n.hx - x) ** 2 + (n.hy - y) ** 2 < spacing * spacing)) continue

    // depth 0 = far (small, dim, slow), 1 = near (large, bright).
    const depth = rand() ** 1.2
    const hub = d > 0.35 && rand() < 0.1
    const fade = smooth(0.04, 0.55, d)
    nodes.push({
      hx: x,
      hy: y,
      x,
      y,
      r: hub ? 4.5 + rand() * 2 : 1.1 + depth * 2.6,
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
      alpha: fade * (hub ? 1 : 0.5 + 0.5 * depth),
      depth: hub ? 1 : depth,
      hub,
      hollow: hub && rand() < 0.65,
      ax: 5 + rand() * 14 * (0.5 + depth),
      ay: 5 + rand() * 14 * (0.5 + depth),
      fx: (0.00008 + rand() * 0.0002) * (0.6 + depth),
      fy: (0.00008 + rand() * 0.0002) * (0.6 + depth),
      px: rand() * Math.PI * 2,
      py: rand() * Math.PI * 2,
    })
  }

  // Connect each node to its nearest few neighbours. The topology is fixed, so
  // edges stay attached as the nodes drift.
  const edges: Edge[] = []
  const seen = new Set<string>()
  const maxLen = w < 760 ? 120 : 175
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: (m.hx - n.hx) ** 2 + (m.hy - n.hy) ** 2 }))
      .filter((o) => o.j !== i && o.d < maxLen * maxLen)
      .sort((p, q) => p.d - q.d)
      .slice(0, n.hub ? 5 + Math.floor(rand() * 2) : 2 + Math.floor(rand() * 2))
    near.forEach(({ j, d }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) return
      const m = nodes[j]
      // Mostly link nodes on a similar depth plane, like layers of a net.
      if (!n.hub && !m.hub && Math.abs(n.depth - m.depth) > 0.55) return
      // Fade edges whose midpoint falls in the quiet pocket behind the copy.
      const mid = density((n.hx + m.hx) / 2, (n.hy + m.hy) / 2)
      const pocket = smooth(0.02, 0.3, mid)
      if (pocket < 0.05) return
      seen.add(key)
      const dashed = rand() < 0.3
      edges.push({
        a: i,
        b: j,
        dashed,
        dash: 3 + Math.floor(rand() * 4),
        speed: (rand() < 0.5 ? -1 : 1) * (0.006 + rand() * 0.01),
        alpha: pocket * (0.95 - 0.4 * (Math.sqrt(d) / maxLen)) * (0.7 + 0.3 * Math.max(n.depth, m.depth)),
      })
    })
  })

  return { nodes, edges }
}

// Soft glow sprite per palette colour, so nodes don't need shadowBlur.
function makeGlows(dpr: number) {
  return PALETTE.map((c) => {
    const size = Math.round(64 * dpr)
    const cv = document.createElement('canvas')
    cv.width = cv.height = size
    const g = cv.getContext('2d')!
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, rgba(c, 0.55))
    grad.addColorStop(0.35, rgba(c, 0.18))
    grad.addColorStop(1, rgba(c, 0))
    g.fillStyle = grad
    g.fillRect(0, 0, size, size)
    return cv
  })
}

type Props = {
  copyRef: RefObject<HTMLElement>
  photoRef: RefObject<HTMLElement>
}

export default function NeuralNet({ copyRef, photoRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let nodes: Node[] = []
    let edges: Edge[] = []
    let glows: HTMLCanvasElement[] = []
    let pulses: Pulse[] = []
    let raf = 0
    let visible = true
    let last = 0
    let nextPulse = 0
    // Pointer parallax: near nodes shift more than far ones.
    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0
    const onPointer = (ev: PointerEvent) => {
      tx = (ev.clientX / window.innerWidth - 0.5) * 2
      ty = (ev.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const setup = () => {
      const box = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = box.width
      h = box.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ;({ nodes, edges } = generate(
        w,
        h,
        relRect(copyRef.current, box),
        relRect(photoRef.current, box),
      ))
      glows = makeGlows(dpr)
      pulses = []
    }

    const draw = (t: number) => {
      const dt = last ? Math.min(t - last, 50) : 16
      last = t
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04
      for (const n of nodes) {
        const par = 4 + n.depth * 14
        n.x = n.hx + Math.sin(t * n.fx + n.px) * n.ax - mx * par
        n.y = n.hy + Math.cos(t * n.fy + n.py) * n.ay - my * par
      }

      // Edges: gradient from one node's colour to the other's.
      ctx.lineCap = 'round'
      for (const e of edges) {
        const a = nodes[e.a]
        const b = nodes[e.b]
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        grad.addColorStop(0, rgba(a.color, a.alpha * e.alpha))
        grad.addColorStop(1, rgba(b.color, b.alpha * e.alpha))
        ctx.strokeStyle = grad
        const near = Math.max(a.depth, b.depth)
        if (e.dashed) {
          ctx.lineWidth = 0.8 + 0.6 * near
          ctx.setLineDash([e.dash, e.dash + 3])
          ctx.lineDashOffset = t * e.speed
        } else {
          ctx.lineWidth = 0.6 + 0.6 * near
          ctx.setLineDash([])
        }
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // Signals travelling along edges.
      if (!reduceMotion && edges.length) {
        if (t > nextPulse) {
          pulses.push({
            edge: Math.floor(Math.random() * edges.length),
            t: 0,
            speed: 0.0006 + Math.random() * 0.0006,
            forward: Math.random() < 0.5,
          })
          nextPulse = t + 120 + Math.random() * 260
        }
        pulses = pulses.filter((p) => (p.t += dt * p.speed) < 1)
        for (const p of pulses) {
          const e = edges[p.edge]
          const from = nodes[p.forward ? e.a : e.b]
          const to = nodes[p.forward ? e.b : e.a]
          const x = from.x + (to.x - from.x) * p.t
          const y = from.y + (to.y - from.y) * p.t
          const fade = Math.sin(p.t * Math.PI)
          const c = p.t < 0.5 ? from.color : to.color
          const glow = glows[PALETTE.indexOf(c)]
          ctx.globalAlpha = fade * Math.min(from.alpha, to.alpha)
          ctx.drawImage(glow, x - 10, y - 10, 20, 20)
          ctx.fillStyle = rgba(c, 1)
          ctx.beginPath()
          ctx.arc(x, y, 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      // Nodes: glow, then a solid core or a ring with a dot.
      for (const n of nodes) {
        const glow = glows[PALETTE.indexOf(n.color)]
        const g = n.r * (n.hub ? 9 : 6)
        ctx.globalAlpha = n.alpha * (n.hub ? 1 : 0.8)
        ctx.drawImage(glow, n.x - g / 2, n.y - g / 2, g, g)
        ctx.globalAlpha = n.alpha
        if (n.hollow) {
          ctx.fillStyle = '#0b1220'
          ctx.strokeStyle = rgba(n.color, 1)
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          ctx.fillStyle = rgba(n.color, 1)
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 0.35, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = rgba(n.color, 1)
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      canvas.classList.add('is-ready')
    }

    const loop = (t: number) => {
      draw(t)
      raf = visible ? requestAnimationFrame(loop) : 0
    }
    const start = () => {
      if (reduceMotion) {
        draw(0)
        return
      }
      if (!raf && visible && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(loop)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    let resizeTimer = 0
    let lastSize = ''
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        const box = canvas.getBoundingClientRect()
        const size = `${Math.round(box.width)}x${Math.round(box.height)}`
        if (size === lastSize) return
        lastSize = size
        setup()
        if (reduceMotion) draw(0)
      }, 120)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    setup()
    lastSize = `${Math.round(w)}x${Math.round(h)}`
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [copyRef, photoRef])

  return <canvas ref={canvasRef} className="neural-net" aria-hidden="true" />
}
