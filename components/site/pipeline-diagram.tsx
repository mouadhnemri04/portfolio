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
const OW = 120
const OH = 48

// One cube per data source, side by side on the top row
const SW = 62
const SH = 56
const sourceLogos = ["/logos/api.png", "/logos/erp.png", "/logos/database.png", "/logos/excel-hd.png", "/logos/pdf.png"]
const LOGO = 24
const sources = sourceLogos.map((logo, i) => ({ x: 52 + i * 74, y: 50, logo }))

const nodes = {
  bronze: { x: 128, y: 164, tone: "bronze" as Tone, layer: "L1" },
  silver: { x: 272, y: 282, tone: "silver" as Tone, layer: "L2" },
  gold: { x: 152, y: 400, tone: "gold" as Tone, layer: "L3" },
}

const outputs = [
  { x: 70, y: 516 },
  { x: 200, y: 516 },
  { x: 330, y: 516 },
]

// Shared look for every box in the diagram: depth face, tinted front, colored hairline
const RX = 10
const DEPTH = 5

function Box({ x, y, w, h, tone }: { x: number; y: number; w: number; h: number; tone: Tone }) {
  return (
    <>
      <rect
        x={x - w / 2 + DEPTH}
        y={y - h / 2 - DEPTH}
        width={w}
        height={h}
        rx={RX}
        className={cn("fill-card", stroke[tone])}
        strokeOpacity={0.25}
      />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={RX} className={cn("fill-card", stroke[tone])} strokeOpacity={0.55} />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={RX} className={fill[tone]} fillOpacity={0.08} />
    </>
  )
}

function curve(x1: number, y1: number, x2: number, y2: number) {
  const dy = (y2 - y1) / 2
  return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`
}

// stage = position in the flow, drives the reveal and particle timing
const edges: { d: string; tone: Tone; stage: number }[] = [
  ...sources.map((src) => ({
    d: curve(src.x, src.y + SH / 2, nodes.bronze.x, nodes.bronze.y - H / 2),
    tone: "bronze" as Tone,
    stage: 0,
  })),
  { d: curve(nodes.bronze.x, nodes.bronze.y + H / 2, nodes.silver.x, nodes.silver.y - H / 2), tone: "silver", stage: 1 },
  { d: curve(nodes.silver.x, nodes.silver.y + H / 2, nodes.gold.x, nodes.gold.y - H / 2), tone: "gold", stage: 2 },
  ...outputs.map((o) => ({
    d: curve(nodes.gold.x, nodes.gold.y + H / 2, o.x, o.y - OH / 2),
    tone: "cyan" as Tone,
    stage: 3,
  })),
]

export function PipelineDiagram() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const p = t.hero.pipeline

  const labels: Record<keyof typeof nodes, [string, string]> = {
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
              transition={{ duration: 0.9, delay: 0.3 + e.stage * 0.35, ease: "easeInOut" }}
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
                    begin={`${1.6 + e.stage * 0.35 + k * 0.8}s`}
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
                    begin={`${1.6 + e.stage * 0.35 + k * 0.8}s`}
                  />
                </circle>
              )),
            )
          : null}

        {sources.map((src, i) => (
          <motion.g
            key={`src-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
          >
            <Box x={src.x} y={src.y} w={SW} h={SH} tone="cyan" />
            <image
              href={src.logo}
              x={src.x - LOGO / 2}
              y={src.y - SH / 2 + 7}
              width={LOGO}
              height={LOGO}
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x={src.x}
              y={src.y + SH / 2 - 9}
              textAnchor="middle"
              className="fill-foreground font-sans"
              fontSize={12}
              fontWeight={600}
            >
              {p.sources[i]}
            </text>
          </motion.g>
        ))}

        {(Object.keys(nodes) as (keyof typeof nodes)[]).map((key, i) => {
          const n = nodes[key]
          const [label, sub] = labels[key]
          return (
            <motion.g
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.35 }}
            >
              <Box x={n.x} y={n.y} w={W} h={H} tone={n.tone} />
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
            <Box x={o.x} y={o.y} w={OW} h={OH} tone="cyan" />
            {/* "\n" in the label splits it over two centered lines */}
            <text textAnchor="middle" className="fill-foreground font-sans" fontSize={12} fontWeight={600}>
              {p.outputs[i].split("\n").map((line, li, all) => (
                <tspan key={li} x={o.x} y={o.y + 4 + (li - (all.length - 1) / 2) * 14}>
                  {line}
                </tspan>
              ))}
            </text>
          </motion.g>
        ))}
      </svg>
    </figure>
  )
}
