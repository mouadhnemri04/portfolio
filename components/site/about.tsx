"use client"

import { useLocale } from "@/components/providers"
import { Reveal, Section, SectionHeader, SpotlightCard } from "@/components/site/primitives"

export function About() {
  const { t } = useLocale()
  return (
    <Section id="about">
      <SectionHeader id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <Reveal className="flex flex-col gap-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          {t.about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-foreground" : undefined}>
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <SpotlightCard className="font-mono text-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-xs text-muted-foreground">~/{t.about.specTitle}</span>
              <span className="text-[11px] text-muted-foreground">{t.about.spec.length} rows</span>
            </div>
            <dl className="divide-y divide-border">
              {t.about.spec.map((row, i) => (
                <div key={row.key} className="grid grid-cols-[1.75rem_7.5rem_1fr] items-baseline gap-x-2 gap-y-0.5 px-4 py-2.5">
                  <span aria-hidden="true" className="text-xs text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="text-primary">{row.key}:</dt>
                  <dd className="break-words text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  )
}
