"use client"

import { useState } from "react"
import { ArrowUp, Check, Copy, Download, Mail, Phone } from "lucide-react"
import { useLocale } from "@/components/providers"
import { LinkedinIcon } from "@/components/site/brand-icons"
import { Eyebrow, Magnetic, Reveal, Section } from "@/components/site/primitives"
import { profile } from "@/lib/content"

export function Contact() {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const secondary =
    "card-modern inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium"

  return (
    <Section id="contact">
      <Reveal>
        <div className="card-modern relative isolate overflow-hidden rounded-[2rem] px-6 py-16 text-center md:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 mx-auto h-96 w-[min(800px,100%)] rounded-full"
            style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background-image:linear-gradient(var(--dot)_1px,transparent_1px),linear-gradient(90deg,var(--dot)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2 id="contact-title" className="text-fade text-balance pb-1 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
              {t.contact.title}
            </h2>
            <p className="text-pretty text-muted-foreground md:text-lg">{t.contact.sub}</p>

            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-teal px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-shadow hover:shadow-[0_0_40px_-4px_var(--primary)]"
                >
                  <Mail className="size-4" />
                  {t.contact.email}
                </a>
              </Magnetic>
              <button type="button" onClick={copy} className={secondary}>
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                <span className="font-mono text-xs">{profile.email}</span>
                <span className="sr-only">{copied ? t.contact.copied : t.contact.copy}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <a href={profile.phone.href} aria-label={`${t.contact.call} — ${profile.phone.display}`} className={secondary}>
                <Phone className="size-4" />
                <span className="font-mono text-xs">{profile.phone.display}</span>
              </a>
              <a href={profile.cv.en} download className={secondary}>
                <Download className="size-4" />
                {t.contact.cvEn}
              </a>
              <a href={profile.cv.fr} download className={secondary}>
                <Download className="size-4" />
                {t.contact.cvFr}
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="card-modern inline-flex size-12 items-center justify-center rounded-full">
                <LinkedinIcon />
              </a>
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? t.contact.copied : ""}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export function Footer() {
  const { t } = useLocale()
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 font-mono text-xs text-muted-foreground md:flex-row md:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name} · {t.footer.built}
      </p>
      <p className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
        {t.footer.lastRefresh}: 2026-10-13
      </p>
      <a href="#top" className="inline-flex items-center gap-1 hover:text-foreground">
        <ArrowUp className="size-3.5" />
        {t.footer.backToTop}
      </a>
    </footer>
  )
}
