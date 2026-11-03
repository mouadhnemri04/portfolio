"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, BadgeCheck, Expand, Loader } from "lucide-react"
import { useLocale } from "@/components/providers"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Reveal, Section, SectionHeader, SpotlightCard, tierBg, tierBorder, tierText } from "@/components/site/primitives"
import { SkillLogo } from "@/components/site/skill-logo"
import { cn } from "@/lib/utils"

export function Skills() {
  const { t } = useLocale()
  // The largest group spans two rows on desktop so the 3-column grid fills without gaps
  const largest = Math.max(...t.skills.groups.map((g) => g.items.length))
  return (
    <Section id="skills">
      <SectionHeader id="skills-title" eyebrow={t.skills.eyebrow} title={t.skills.title} />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {t.skills.groups.map((group, i) => (
          <li key={group.title} className={cn("flex", group.items.length === largest && "lg:row-span-2")}>
            <Reveal delay={(i % 3) * 0.06} className="flex w-full">
            <SpotlightCard as="article" className="flex w-full flex-col gap-4 p-5 md:p-6">
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className={cn("size-2 rounded-full", tierBg[group.tier])} />
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
                <span className={cn("ml-auto rounded-full border px-2 py-0.5 font-mono text-[11px]", tierBorder[group.tier], tierText[group.tier])}>
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    title={item}
                    className="group/skill flex flex-col items-center gap-2 rounded-xl border border-border bg-background/40 px-1.5 pt-3 pb-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/70 hover:shadow-md hover:shadow-black/5"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover/skill:scale-110 dark:bg-white/95 dark:ring-white/20">
                      <SkillLogo item={item} size={36} iconClassName={tierText[group.tier]} />
                    </span>
                    <span className="text-xs leading-tight font-medium text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Certifications() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  // Kept after closing so the image stays visible during the exit animation
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selected = selectedIndex === null ? null : t.certifications.items[selectedIndex]

  return (
    <Section id="certifications">
      <SectionHeader id="certifications-title" eyebrow={t.certifications.eyebrow} title={t.certifications.title} />
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {t.certifications.items.map((cert, i) => {
          const earned = cert.status === "earned"
          return (
            <li key={cert.name} className="flex">
              <Reveal delay={(i % 3) * 0.06} className="flex w-full">
              <SpotlightCard as="article" className="flex w-full flex-col gap-4 p-4">
                {cert.image ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex(i)
                      setOpen(true)
                    }}
                    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src={cert.image}
                      alt={`${t.certifications.imageAlt} — ${cert.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.03]"
                    />
                    <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 font-mono text-[11px] text-white opacity-0 transition-opacity group-hover/img:opacity-100 group-focus-visible/img:opacity-100">
                      <Expand className="size-3" aria-hidden="true" />
                      {t.certifications.enlarge}
                    </span>
                  </button>
                ) : null}
                <div className="flex w-full items-start gap-4 px-1">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl border",
                    earned ? "border-gold/30 bg-gold/10 text-gold" : "border-border bg-surface text-muted-foreground",
                  )}
                >
                  {earned ? <BadgeCheck className="size-5" aria-hidden="true" /> : <Loader className="size-5" aria-hidden="true" />}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="text-pretty font-medium leading-snug">{cert.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {cert.issuer}
                    {cert.code ? ` · ${cert.code}` : ""} · {cert.year}
                  </p>
                  {cert.credentialId ? (
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {t.certifications.credentialId}: {cert.credentialId}
                    </p>
                  ) : null}
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {t.certifications.viewCredential}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">— {cert.name}</span>
                    </a>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px]",
                    earned ? "border-success/30 bg-success/10 text-success" : "border-border text-muted-foreground",
                  )}
                >
                  {earned ? t.certifications.earned : t.certifications.inProgress}
                </span>
                </div>
              </SpotlightCard>
              </Reveal>
            </li>
          )
        })}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] gap-4 overflow-y-auto p-4 sm:max-w-4xl md:p-5">
          {selected?.image ? (
            <>
              <DialogHeader className="gap-1 pr-8">
                <DialogTitle className="text-base leading-snug font-semibold md:text-lg">{selected.name}</DialogTitle>
                <DialogDescription className="font-mono text-xs">
                  {selected.issuer}
                  {selected.code ? ` · ${selected.code}` : ""} · {selected.year}
                </DialogDescription>
              </DialogHeader>
              <Image
                src={selected.image}
                alt={`${t.certifications.imageAlt} — ${selected.name}`}
                width={1600}
                height={1200}
                sizes="(min-width: 896px) 896px, 100vw"
                className="h-auto w-full rounded-lg border border-border"
              />
              {selected.href ? (
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {t.certifications.viewCredential}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  )
}

export function Languages() {
  const { t } = useLocale()
  return (
    <Section id="languages">
      <SectionHeader id="languages-title" eyebrow={t.languages.eyebrow} title={t.languages.title} />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {t.languages.items.map((lang, i) => (
          <li key={lang.name} className="flex">
            <Reveal delay={(i % 4) * 0.06} className="flex w-full">
            <SpotlightCard as="article" className="flex w-full flex-col gap-4 p-5 md:p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold tracking-tight">{lang.name}</h3>
                <span className="font-mono text-xs text-muted-foreground">{lang.level}</span>
              </div>
              <div
                role="img"
                aria-label={`${lang.name} — ${lang.level}`}
                className="flex gap-1"
              >
                {Array.from({ length: 5 }, (_, n) => (
                  <span
                    key={n}
                    aria-hidden="true"
                    className={cn("h-1.5 flex-1 rounded-full", n < lang.score ? "bg-gradient-to-r from-primary to-teal shadow-[0_0_8px_var(--glow)]" : "bg-border")}
                  />
                ))}
              </div>
            </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
