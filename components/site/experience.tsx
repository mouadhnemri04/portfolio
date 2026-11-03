"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useLocale } from "@/components/providers"
import { Reveal, Section, SectionHeader, SpotlightCard, tierBg, tierText } from "@/components/site/primitives"
import { cn } from "@/lib/utils"

export function Experience() {
  const { t } = useLocale()
  return (
    <Section id="experience">
      <SectionHeader id="experience-title" eyebrow={t.experience.eyebrow} title={t.experience.title} sub={t.experience.sub} />
      {/* Timeline: a vertical rail with one dot per internship, most recent first */}
      <ol className="relative flex flex-col gap-4 pl-6 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:bg-gradient-to-b before:from-primary/70 before:via-border before:to-transparent md:gap-5 md:pl-10">
        {t.experience.items.map((job, i) => {
          const href = job.projectSlug ? `#project-${job.projectSlug}` : undefined
          return (
            <li key={job.company} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 -left-[29px] size-2.5 -translate-y-1/2 rounded-full shadow-[0_0_12px_2px_var(--glow)] ring-4 ring-background md:-left-[45px]",
                  tierBg[job.tier],
                )}
              />
              <Reveal delay={i * 0.06}>
                <SpotlightCard as="article" className="flex items-center gap-4 p-4 md:gap-6 md:p-6">
                  {job.logo ? (
                    // White tile: the company logos are drawn for a light background
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover/spot:scale-105 md:h-16 md:w-24">
                      <Image src={job.logo} alt={`${job.company} logo`} fill sizes="96px" className="object-contain p-2" />
                    </div>
                  ) : null}
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="w-fit rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">{job.period}</span>
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {href ? (
                        <a
                          href={href}
                          onClick={() => {
                            // Same hash twice fires no hashchange: re-announce it so the dialog reopens
                            if (window.location.hash === href) window.dispatchEvent(new HashChangeEvent("hashchange"))
                          }}
                          className="group/role inline-flex items-start gap-1 outline-none hover:text-primary focus-visible:text-primary focus-visible:underline"
                        >
                          {job.role}
                          <ArrowUpRight
                            className="mt-1 size-4 shrink-0 transition-transform group-hover/role:-translate-y-0.5 group-hover/role:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        job.role
                      )}
                    </h3>
                    {job.project ? (
                      <p className="text-sm text-muted-foreground">
                        <span className={cn("font-mono text-xs uppercase tracking-wider", tierText[job.tier])}>
                          {t.experience.projectLabel}
                        </span>{" "}
                        — {job.project}
                      </p>
                    ) : null}
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
