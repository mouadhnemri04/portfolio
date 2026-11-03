"use client"

import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react"
import { cn } from "@/lib/utils"
import type { Tier } from "@/lib/content"

export const tierText: Record<Tier, string> = {
  bronze: "text-bronze",
  silver: "text-silver",
  gold: "text-gold",
  cyan: "text-primary",
}

export const tierBg: Record<Tier, string> = {
  bronze: "bg-bronze",
  silver: "bg-silver",
  gold: "bg-gold",
  cyan: "bg-primary",
}

export const tierBorder: Record<Tier, string> = {
  bronze: "border-bronze/30 bg-bronze/10",
  silver: "border-silver/30 bg-silver/10",
  gold: "border-gold/30 bg-gold/10",
  cyan: "border-primary/30 bg-primary/10",
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
      {children}
    </p>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  id,
}: {
  eyebrow: string
  title: string
  sub?: string
  id: string
}) {
  return (
    <Reveal className="mb-10 flex max-w-2xl flex-col gap-3 md:mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-fade text-balance pb-1 text-3xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {sub ? <p className="text-pretty text-muted-foreground md:text-lg">{sub}</p> : null}
    </Reveal>
  )
}

export function Section({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24", className)}
    >
      {children}
    </section>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  as?: "div" | "article" | "li"
}) {
  const ref = useRef<HTMLElement>(null)

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  return (
    <Tag
      // @ts-expect-error — polymorphic ref across div/article/li is safe here
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "card-modern group/spot relative isolate overflow-hidden rounded-3xl transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_color-mix(in_oklab,var(--primary)_35%,transparent)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 50%)",
        }}
      />
      {children}
    </Tag>
  )
}

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale,
  className,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Formats with the locale's decimal separator (1.4 → 1,4 in French) */
  locale?: string
  className?: string
}) {
  const format = (n: number) =>
    locale
      ? n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {format(display)}
        {suffix}
      </span>
    </span>
  )
}

export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  )
}

export function TierTag({ tier, children }: { tier: Tier; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider",
        tierBorder[tier],
        tierText[tier],
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", tierBg[tier])} />
      {children}
    </span>
  )
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
      {children}
    </span>
  )
}

// Renders **bold** segments of a translated string
export function RichText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}
