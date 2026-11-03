"use client"

import { useLocale } from "@/components/providers"
import { CountUp, Reveal, RichText, Section, SectionHeader } from "@/components/site/primitives"

export function About() {
  const { t, locale } = useLocale()
  const h = t.about.highlights
  return (
    <Section id="about">
      <SectionHeader id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />
      <Reveal className="flex max-w-3xl flex-col gap-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t.about.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "text-foreground" : undefined}>
            <RichText text={p} />
          </p>
        ))}
      </Reveal>

      <Reveal className="mt-16 flex flex-col gap-3 md:mt-20">
        <h3 className="text-fade text-balance text-2xl font-semibold tracking-[-0.03em] md:text-4xl">{h.title}</h3>
        <p className="text-pretty text-muted-foreground md:text-lg">{h.sub}</p>
      </Reveal>

      {/* 1px gaps over a border-colored background draw the grid lines between cells */}
      <Reveal delay={0.1} className="mt-8 md:mt-10">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border min-[420px]:grid-cols-2 lg:grid-cols-4">
          {h.items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 bg-card p-6 md:p-8">
              <dd className="order-1 text-4xl font-semibold tracking-tight md:text-5xl">
                <CountUp
                  value={item.value}
                  decimals={item.decimals}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  locale={locale}
                  className="text-gradient font-sans"
                />
              </dd>
              <dt className="order-2 mt-2 flex flex-col gap-2 text-pretty text-sm leading-snug text-foreground/80 md:text-base">
                {item.label}
                <span className="font-mono text-[11px] leading-relaxed text-muted-foreground">{item.source}</span>
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
