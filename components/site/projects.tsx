"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowUpRight, BarChart3, ChevronLeft, ChevronRight, Images, Layers, Pause, Play } from "lucide-react"
import { useLocale } from "@/components/providers"
import { Chip, Reveal, Section, SectionHeader, SpotlightCard, tierBg, tierText } from "@/components/site/primitives"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Project } from "@/lib/content"
import { cn } from "@/lib/utils"

const SLIDE_MS = 3500
/** Dialog slides stay longer: the screenshots there are big and captioned */
const DIALOG_SLIDE_MS = 5000

/** Cover first, then every screenshot of the project (or of all its parts), without duplicates */
function coverImages(project: Project) {
  const sources = project.parts ?? [project]
  const srcs = [project.cover, ...sources.flatMap((p) => [p.cover, ...(p.gallery ?? []).map((g) => g.src)])]
  return [...new Set(srcs.filter((src): src is string => Boolean(src)))]
}

/** Card thumbnail that cross-fades through the project's screenshots while the card is on screen */
function CoverSlideshow({ images, offset, paused }: { images: string[]; offset: number; paused: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-80px" })
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const animate = images.length > 1 && inView && !reduce && !paused

  useEffect(() => {
    if (!animate) return
    let interval: number | undefined
    // Staggered start so neighbouring cards don't switch in sync
    const start = window.setTimeout(() => {
      setIndex((i) => (i + 1) % images.length)
      interval = window.setInterval(() => setIndex((i) => (i + 1) % images.length), SLIDE_MS)
    }, SLIDE_MS + offset)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [animate, images.length, offset])

  // Only the current image, the one fading out and the next one (preloaded) are mounted
  const prev = (index - 1 + images.length) % images.length
  const next = (index + 1) % images.length
  return (
    <div ref={ref} className="absolute inset-0">
      {images.map((src, i) =>
        i === index || i === prev || i === next ? (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cn(
              "object-cover object-top transition-[opacity,transform] duration-700 ease-out group-hover/spot:scale-[1.03]",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null,
      )}
      {images.length > 1 ? (
        <span aria-hidden="true" className="absolute bottom-2.5 left-3 flex items-center gap-1">
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)] transition-all duration-500",
                i === index ? "w-4 opacity-100" : "w-1.5 opacity-50",
              )}
            />
          ))}
        </span>
      ) : null}
    </div>
  )
}

export function Projects() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  // Kept after closing so the content stays visible during the exit animation
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const project = selectedIndex === null ? null : t.projects.items[selectedIndex]
  // Grouped projects show one tab per part; the dialog body follows the active part
  const [part, setPart] = useState(0)
  const selected = project?.parts ? project.parts[part] : project
  const [slide, setSlide] = useState(0)
  const gallery = selected?.gallery ?? []
  const current = gallery[slide]
  const step = (delta: number) => setSlide((s) => (s + delta + gallery.length) % gallery.length)
  // Dialog slideshow: plays on its own, paused by the button or while the pointer is on the image
  const [playing, setPlaying] = useState(true)
  const [galleryHovered, setGalleryHovered] = useState(false)
  const reduceMotion = useReducedMotion()
  const autoplay = open && playing && !galleryHovered && !reduceMotion && gallery.length > 1
  const thumbsRef = useRef<HTMLDivElement>(null)

  // Restarts on every slide change, so a manual step also resets the countdown
  useEffect(() => {
    if (!autoplay) return
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % gallery.length), DIALOG_SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [autoplay, slide, gallery.length])

  // Keep the active thumbnail centred in the strip. Scrolls the strip only: scrollIntoView
  // would also scroll the dialog back up while the visitor is reading the details.
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[slide] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: "smooth" })
  }, [slide])

  // Hovering a card pauses its slideshow so the visitor can look at the current screenshot
  const [hovered, setHovered] = useState<number | null>(null)

  function openProject(index: number) {
    setSelectedIndex(index)
    setPart(0)
    setPlaying(true)
    setSlide(0)
    setOpen(true)
  }

  // #project-<slug> (e.g. from the Experience section) opens that project
  useEffect(() => {
    function openFromHash() {
      const slug = window.location.hash.match(/^#project-(.+)$/)?.[1]
      const index = slug ? t.projects.items.findIndex((p) => p.slug === slug) : -1
      if (index !== -1) openProject(index)
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [t.projects.items])

  return (
    <Section id="projects">
      <SectionHeader id="projects-title" eyebrow={t.projects.eyebrow} title={t.projects.title} sub={t.projects.sub} />
      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {t.projects.items.map((project, i) => (
          <li
            key={project.title}
            id={project.slug ? `project-${project.slug}` : undefined}
            className="flex scroll-mt-24"
            onPointerEnter={() => setHovered(i)}
            onPointerLeave={() => setHovered(null)}
          >
            <Reveal delay={(i % 2) * 0.06} className="flex w-full">
            <SpotlightCard as="article" className="flex w-full cursor-pointer flex-col gap-5 p-5 md:p-6">
              <div className="relative -mx-1 -mt-1 aspect-video overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border">
                {project.cover ? (
                  <CoverSlideshow images={coverImages(project)} offset={i * 900} paused={hovered === i} />
                ) : (
                  // No screenshots: a dotted panel that leads with the headline metric
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-transform duration-500 group-hover/spot:scale-[1.03]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 60%), radial-gradient(color-mix(in oklab, var(--foreground) 14%, transparent) 1px, transparent 1px)",
                      backgroundSize: "100% 100%, 16px 16px",
                    }}
                  >
                    <BarChart3 className={cn("size-8", tierText[project.tier])} aria-hidden="true" />
                    <span className={cn("font-mono text-4xl font-semibold tracking-tight md:text-5xl", tierText[project.tier])}>
                      {project.metrics[0]?.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {project.metrics[0]?.label}
                    </span>
                  </div>
                )}
                <span className="absolute top-2 right-2 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white ring-1 ring-white/15 backdrop-blur-md">
                  {`P_${String(i + 1).padStart(2, "0")}`}
                </span>
                {project.video ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover/spot:scale-110">
                      <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
                    </span>
                  </span>
                ) : null}
                {project.parts ? (
                  <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white ring-1 ring-white/15 backdrop-blur-md">
                    <Layers className="size-3" aria-hidden="true" />
                    {project.parts.length} {t.projects.parts}
                  </span>
                ) : project.video || project.gallery ? (
                  <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white ring-1 ring-white/15 backdrop-blur-md">
                    {project.video ? (
                      <>
                        <Play className="size-3" aria-hidden="true" />
                        {t.projects.demo} · {project.video.duration}
                      </>
                    ) : (
                      <>
                        <Images className="size-3" aria-hidden="true" />
                        {project.gallery?.length} {t.projects.screenshots}
                      </>
                    )}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold tracking-tight">
                  {/* Stretched button: the whole card opens the details dialog */}
                  <button
                    type="button"
                    onClick={() => openProject(i)}
                    className="text-left outline-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-primary"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </p>
              </div>
              <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <dt className="order-2 text-xs text-muted-foreground">{m.label}</dt>
                    <dd className={cn("order-1 font-mono text-lg font-semibold", tierText[project.tier])}>{m.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover/spot:underline">
                  {t.projects.viewDetails}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </span>
              </div>
            </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "max-h-[90dvh] gap-6 overflow-x-hidden overflow-y-auto p-4 sm:p-5 md:p-7",
            gallery.length || selected?.video ? "sm:max-w-4xl" : "sm:max-w-2xl",
          )}
        >
          {project && selected ? (
            <>
              <DialogHeader className="gap-3 pr-8">
                <DialogTitle className="text-xl leading-tight font-semibold tracking-tight md:text-2xl">
                  {project.title}
                </DialogTitle>
                {project.context || project.period ? (
                  <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                    {project.context ? <span>{project.context}</span> : null}
                    {project.period ? <span>{project.period}</span> : null}
                  </p>
                ) : null}
                {project.parts ? (
                  <div className="flex flex-col gap-2">
                    <p id="parts-hint" className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary sm:text-xs sm:tracking-[0.2em]">
                      {t.projects.partsHint}
                    </p>
                    <div role="tablist" aria-describedby="parts-hint" className="grid gap-2 sm:grid-cols-3">
                      {project.parts.map((p, pi) => {
                        const active = pi === part
                        return (
                          <button
                            key={p.title}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => {
                              setPart(pi)
                              setSlide(0)
                            }}
                            className={cn(
                              "flex cursor-pointer items-center gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-left text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              active
                                ? "border-primary bg-primary text-primary-foreground shadow-md"
                                : "border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10",
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px]",
                                active ? "bg-primary-foreground/20" : "bg-primary/15 text-primary",
                              )}
                            >
                              {String(pi + 1).padStart(2, "0")}
                            </span>
                            {p.partLabel ?? p.title}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
                <DialogDescription className="text-pretty text-sm leading-relaxed md:text-base">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <dl className="grid grid-cols-2 gap-3 rounded-xl border border-border p-4 sm:grid-cols-3">
                {selected.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <dt className="order-2 text-xs text-muted-foreground">{m.label}</dt>
                    <dd className={cn("order-1 font-mono text-lg font-semibold", tierText[selected.tier])}>{m.value}</dd>
                  </div>
                ))}
              </dl>

              {selected.video ? (
                <section className="flex flex-col gap-3">
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {t.projects.demo} · {selected.video.duration}
                  </h4>
                  <figure className="flex flex-col gap-2">
                    {/* key: reload the player when switching project */}
                    <video
                      key={selected.video.src}
                      src={selected.video.src}
                      poster={selected.video.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-video w-full rounded-xl border border-border bg-black"
                    >
                      <track kind="captions" />
                    </video>
                    <figcaption className="text-pretty text-sm text-muted-foreground">{selected.video.caption}</figcaption>
                  </figure>
                </section>
              ) : null}

              {current ? (
                <section className="flex flex-col gap-3">
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {t.projects.gallery} · {slide + 1}/{gallery.length}
                  </h4>
                  <figure className="flex flex-col gap-2">
                    <div
                      className="relative overflow-hidden rounded-xl border border-border bg-surface"
                      onPointerEnter={() => setGalleryHovered(true)}
                      onPointerLeave={() => setGalleryHovered(false)}
                    >
                      <a href={current.src} target="_blank" rel="noopener noreferrer">
                        <motion.div
                          key={current.src}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <Image
                            src={current.src}
                            alt={current.caption}
                            width={1160}
                            height={640}
                            sizes="(min-width: 896px) 832px, 100vw"
                            className="h-auto w-full"
                          />
                        </motion.div>
                      </a>
                      {gallery.length > 1 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setPlaying((p) => !p)}
                            aria-label={playing ? t.projects.pause : t.projects.play}
                            aria-pressed={!playing}
                            className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          >
                            {playing ? (
                              <Pause className="size-3.5 fill-current" aria-hidden="true" />
                            ) : (
                              <Play className="ml-0.5 size-3.5 fill-current" aria-hidden="true" />
                            )}
                          </button>
                          {/* Countdown to the next slide; keyed on the slide so it restarts with it */}
                          {autoplay ? (
                            <motion.span
                              key={`${current.src}-progress`}
                              aria-hidden="true"
                              className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: DIALOG_SLIDE_MS / 1000, ease: "linear" }}
                            />
                          ) : null}
                          <button
                            type="button"
                            onClick={() => step(-1)}
                            aria-label="Previous"
                            className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          >
                            <ChevronLeft className="size-5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => step(1)}
                            aria-label="Next"
                            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          >
                            <ChevronRight className="size-5" aria-hidden="true" />
                          </button>
                        </>
                      ) : null}
                    </div>
                    <figcaption className="text-pretty text-sm text-muted-foreground">{current.caption}</figcaption>
                  </figure>
                  {gallery.length > 1 ? (
                    <div ref={thumbsRef} className="relative flex gap-2 overflow-x-auto pb-1">
                      {gallery.map((g, gi) => (
                        <button
                          key={g.src}
                          type="button"
                          onClick={() => setSlide(gi)}
                          aria-label={g.caption}
                          aria-current={gi === slide}
                          className={cn(
                            "relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border-2 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            gi === slide ? "border-primary" : "border-transparent opacity-60 hover:opacity-100",
                          )}
                        >
                          <Image src={g.src} alt="" fill sizes="96px" className="object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}

              <section className="flex flex-col gap-3">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.projects.highlights}</h4>
                <ul className="flex flex-col gap-4">
                  {selected.details.map((d) => (
                    <li key={d.title} className="flex gap-3">
                      <span aria-hidden="true" className={cn("mt-2 size-1.5 shrink-0 rounded-full", tierBg[selected.tier])} />
                      <div className="flex min-w-0 flex-col gap-2">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground">{d.title} — </span>
                          {d.text}
                        </p>
                        {d.facts ? (
                          <dl className="grid gap-x-3 gap-y-1 rounded-lg border border-border bg-surface px-3 py-2 sm:grid-cols-[auto_1fr]">
                            {d.facts.map((f) => (
                              <div key={f.label} className="contents">
                                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:pt-0.5">
                                  {f.label}
                                </dt>
                                <dd className="break-words font-mono text-xs text-foreground">{f.value}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="flex flex-col gap-3">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.projects.stackLabel}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </section>

              {selected.href ? (
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {t.projects.viewCode}
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  )
}
