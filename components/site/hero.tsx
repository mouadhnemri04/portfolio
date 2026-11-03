"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, Download, Mail, Phone } from "lucide-react"
import { useLocale } from "@/components/providers"
import { LinkedinIcon } from "@/components/site/brand-icons"
import { PipelineDiagram } from "@/components/site/pipeline-diagram"
import { Eyebrow, Magnetic, RichText } from "@/components/site/primitives"
import { SkillLogo } from "@/components/site/skill-logo"
import { profile } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const { t, locale } = useLocale()

  const iconLinks = [
    { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail, external: false },
    { href: profile.phone.href, label: profile.phone.display, icon: Phone, external: false },
  ]

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[720px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp} className="relative mb-3 w-fit">
            {/* Rotating gradient ring echoing the "Nemri" text gradient */}
            <div className="relative overflow-hidden rounded-full p-[3px] shadow-[0_0_60px_-12px_var(--primary)]">
              <div
                aria-hidden="true"
                className="absolute inset-[-50%] animate-spin-slow bg-[conic-gradient(from_0deg,var(--primary),var(--teal),transparent_35%,transparent_60%,var(--primary))]"
              />
              <Image
                src="/photo/mouadh-nemri.jpg"
                alt={t.about.photoAlt}
                width={224}
                height={224}
                priority
                className="relative size-40 rounded-full border-4 border-background object-cover object-[50%_30%] md:size-56"
              />
            </div>
            <span className="absolute -bottom-4 left-0 inline-flex items-center md:left-1/2 md:-translate-x-1/2 gap-2 whitespace-nowrap rounded-full border border-success/30 bg-background/90 px-3.5 py-1.5 font-mono text-xs text-success shadow-lg backdrop-blur-md">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t.nav.status}
            </span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            id="hero-title"
            className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-fade">Mouadh</span> <span className="text-gradient animate-gradient-x">Nemri</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-pretty text-xl font-medium leading-snug tracking-tight md:text-2xl"
          >
            {t.hero.headline}
          </motion.p>
          <motion.p variants={fadeUp} className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            <RichText text={t.hero.sub} />
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-teal px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-shadow hover:shadow-[0_0_40px_-4px_var(--primary)]"
              >
                {t.hero.ctaProjects}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <a
              href={profile.cv[locale]}
              download
              className="card-modern inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium"
            >
              <Download className="size-4" />
              {t.hero.ctaCv}
            </a>
            <ul className="flex items-center gap-1" aria-label="Social links">
              {iconLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card-modern inline-flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <PipelineDiagram />
        </motion.div>
      </div>
      <TechMarquee />
    </section>
  )
}

function TechMarquee() {
  const { t } = useLocale()
  const tech = [...new Set([...t.skills.groups.flatMap((g) => g.items), ...profile.extraTech])]
  const items = [...tech, ...tech]
  return (
    <div className="mask-fade-x relative py-6" aria-label="Tech stack">
      <ul className="sr-only">
        {tech.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="card-modern inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs text-muted-foreground"
          >
            <SkillLogo item={name} size={20} iconClassName="text-primary" />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
