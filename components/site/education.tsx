"use client"

import Image from "next/image"
import { GraduationCap, MapPin } from "lucide-react"
import { useLocale } from "@/components/providers"
import { Chip, Reveal, Section, SectionHeader, SpotlightCard, tierBg, tierBorder, tierText } from "@/components/site/primitives"
import { cn } from "@/lib/utils"

export function Education() {
  const { t } = useLocale()
  return (
    <Section id="education">
      <SectionHeader id="education-title" eyebrow={t.education.eyebrow} title={t.education.title} sub={t.education.sub} />
      {/* Same rail as the Experience timeline, so both sections read as one history */}
      <ol className="relative flex flex-col gap-4 pl-6 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:bg-gradient-to-b before:from-primary/70 before:via-border before:to-transparent md:gap-5 md:pl-10">
        {t.education.items.map((item, i) => (
          <li key={item.school} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 -left-[29px] size-2.5 -translate-y-1/2 rounded-full shadow-[0_0_12px_2px_var(--glow)] ring-4 ring-background md:-left-[45px]",
                tierBg[item.tier],
              )}
            />
            <Reveal delay={i * 0.06}>
              <SpotlightCard as="article" className="flex items-start gap-4 p-4 md:gap-6 md:p-6">
                {item.logo ? (
                  // White tile: the school logo is drawn for a light background, like the company logos
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover/spot:scale-105 md:h-16 md:w-24">
                    <Image src={item.logo} alt={`${item.school.split(" — ")[0]} logo`} fill sizes="96px" className="object-contain p-2" />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover/spot:scale-105 md:size-16",
                      tierBorder[item.tier],
                      tierText[item.tier],
                    )}
                  >
                    <GraduationCap className="size-7 md:size-8" aria-hidden="true" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-fit rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                      <MapPin className="size-3" aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{item.degree}</h3>
                  <p className="text-sm text-foreground/85">{item.field}</p>
                  <p className="text-sm text-muted-foreground">{item.school}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className={cn("mr-1 font-mono text-xs uppercase tracking-wider", tierText[item.tier])}>
                      {t.education.focusLabel}
                    </span>
                    {item.focus.map((topic) => (
                      <Chip key={topic}>{topic}</Chip>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
