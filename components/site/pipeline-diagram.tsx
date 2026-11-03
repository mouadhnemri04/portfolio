"use client"

import { motion, useReducedMotion } from "motion/react"
import { useLocale } from "@/components/providers"
import { cn } from "@/lib/utils"

type Tone = "cyan" | "bronze" | "silver" | "gold"

const stroke: Record<Tone, string> = {
  cyan: "stroke-primary",
  bronze: "stroke-bronze",
  silver: "stroke-silver",
  gold: "stroke-gold",
}
const fill: Record<Tone, string> = {
  cyan: "fill-primary",
  bronze: "fill-bronze",
  silver: "fill-silver",
  gold: "fill-gold",
}

const W = 184
const H = 60
const OW = 104
const OH = 44

const nodes = {
  sources: { x: 200, y: 46, tone: "cyan" as Tone, layer: "SRC" },
  bronze: { x: 128, y: 164, tone: "bronze" as Tone, layer: "L1" },
  silver: { x: 272, y: 282, tone: "silver" as Tone, layer: "L2" },
  gold: { x: 152, y: 400, tone: "gold" as Tone, layer: "L3" },
}

const outputs = [
  { x: 70, y: 516 },
  { x: 200, y: 516 },
  { x: 330, y: 516 },
]

function curve(x1: number, y1: number, x2: number, y2: number) {
  const dy = (y2 - y1) / 2
  return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`
}

const edges: { d: string; tone: Tone }[] = [
  { d: curve(nodes.sources.x, nodes.sources.y + H / 2, nodes.bronze.x, nodes.bronze.y - H / 2), tone: "bronze" },
  { d: curve(nodes.bronze.x, nodes.bronze.y + H / 2, nodes.silver.x, nodes.silver.y - H / 2), tone: "silver" },
  { d: curve(nodes.silver.x, nodes.silver.y + H / 2, nodes.gold.x, nodes.gold.y - H / 2), tone: "gold" },
  ...outputs.map((o) => ({
    d: curve(nodes.gold.x, nodes.gold.y + H / 2, o.x, o.y - OH / 2),
    tone: "cyan" as Tone,
  })),
]

export function PipelineDiagram() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const p = t.hero.pipeline

  const labels: Record<keyof typeof nodes, [string, string]> = {
    sources: p.sources,
    bronze: p.bronze,
    silver: p.silver,
    gold: p.gold,
  }

  return (
    <figure className="card-modern relative overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">medallion_pipeline.py</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-success">
          <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden="true" />
          live
        </span>
      </div>

      <svg
        viewBox="0 0 400 560"
        role="img"
        aria-label={t.hero.pipelineLabel}
        className="mx-auto block h-auto w-full max-w-md px-2 py-3"
      >
        <defs>
          <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map((e, i) => (
          <g key={i}>
            <path d={e.d} className="fill-none stroke-border" strokeWidth={6} strokeLinecap="round" />
            <motion.path
              id={`edge-${i}`}
              d={e.d}
              className={cn("fill-none", stroke[e.tone])}
              strokeWidth={1.5}
              strokeOpacity={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.3 + Math.min(i, 3) * 0.35, ease: "easeInOut" }}
            />
          </g>
        ))}

        {!reduce
          ? edges.flatMap((e, i) =>
              [0, 1, 2].map((k) => (
                <circle key={`${i}-${k}`} r={3} className={fill[e.tone]} filter="url(#glow)" opacity={0}>
                  <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${1.6 + Math.min(i, 3) * 0.35 + k * 0.8}s`}
                    rotate="auto"
                  >
                    <mpath href={`#edge-${i}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${1.6 + Math.min(i, 3) * 0.35 + k * 0.8}s`}
                  />
                </circle>
              )),
            )
          : null}

        {(Object.keys(nodes) as (keyof typeof nodes)[]).map((key, i) => {
          const n = nodes[key]
          const [label, sub] = labels[key]
          return (
            <motion.g
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.35 }}
            >
              <rect
                x={n.x - W / 2}
                y={n.y - H / 2}
                width={W}
                height={H}
                rx={14}
                className={cn("fill-card", stroke[n.tone])}
                strokeOpacity={0.45}
                strokeWidth={1}
              />
              <rect
                x={n.x - W / 2 + 12}
                y={n.y - 9}
                width={18}
                height={18}
                rx={5}
                className={fill[n.tone]}
                fillOpacity={0.18}
              />
              <circle cx={n.x - W / 2 + 21} cy={n.y} r={3.5} className={fill[n.tone]} />
              <text
                x={n.x - W / 2 + 40}
                y={n.y - 3}
                className="fill-foreground font-sans"
                fontSize={14}
                fontWeight={600}
              >
                {label}
              </text>
              <text
                x={n.x - W / 2 + 40}
                y={n.y + 14}
                className="fill-muted-foreground font-mono"
                fontSize={10}
              >
                {sub}
              </text>
              <text
                x={n.x + W / 2 - 12}
                y={n.y - 12}
                textAnchor="end"
                className={cn("font-mono", fill[n.tone])}
                fontSize={9}
                fillOpacity={0.9}
              >
                {n.layer}
              </text>
            </motion.g>
          )
        })}

        {outputs.map((o, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 + i * 0.12 }}
          >
            <rect
              x={o.x - OW / 2}
              y={o.y - OH / 2}
              width={OW}
              height={OH}
              rx={12}
              className="fill-primary stroke-primary"
              fillOpacity={0.08}
              strokeOpacity={0.5}
            />
            <text
              x={o.x}
              y={o.y + 4.5}
              textAnchor="middle"
              className="fill-foreground font-sans"
              fontSize={13}
              fontWeight={600}
            >
              {p.outputs[i]}
            </text>
          </motion.g>
        ))}
      </svg>
    </figure>
  )
}
