"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import { useTheme } from "next-themes"
import {
  ArrowUpRight,
  Copy,
  Download,
  Languages,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useLocale } from "@/components/providers"
import { LinkedinIcon } from "@/components/site/brand-icons"
import { locales, profile, sectionIds, type SectionId } from "@/lib/content"
import { cn } from "@/lib/utils"

// Black icons, inverted in dark mode to stay visible.
const sectionIcons: Record<SectionId, string> = {
  about: "/utilisateur.png",
  experience: "/portefeuille.png",
  education: "/diplome.svg",
  projects: "/fusee.png",
  skills: "/outils-dedition.png",
  certifications: "/prix.png",
  languages: "/langue.png",
  contact: "/contactez-nous.png",
}

function SectionIcon({ id, className }: { id: SectionId; className?: string }) {
  return (
    <Image
      src={sectionIcons[id]}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      className={cn("size-4 shrink-0 object-contain dark:invert", className)}
    />
  )
}

function downloadFile(href: string) {
  const a = document.createElement("a")
  a.href = href
  a.download = href.split("/").pop() ?? "cv.pdf"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
  return active
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-border/40">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left animate-shimmer bg-[length:24px_100%] bg-[linear-gradient(90deg,var(--primary),var(--teal))] shadow-[0_0_12px_var(--primary)]"
      />
    </div>
  )
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  )
}

export function Navbar() {
  const { t, locale, setLocale, toggleLocale } = useLocale()
  const { resolvedTheme, setTheme } = useTheme()
  const active = useActiveSection()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function run(action: () => void) {
    setPaletteOpen(false)
    action()
  }

  function goTo(id: SectionId) {
    document.getElementById(id)?.scrollIntoView({ block: "start" })
    setMenuOpen(false)
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-border bg-surface-strong py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/5 backdrop-blur-xl"
        >
          <a
            href="#top"
            className="mr-1 font-mono text-sm font-semibold tracking-tight"
            aria-label={`${profile.name} — home`}
          >
            MN<span className="text-primary">.</span>
          </a>

          <span className="hidden items-center gap-2 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-success sm:inline-flex lg:hidden">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-success" />
            </span>
            {t.nav.status}
          </span>

          {/* lg: icons only, the active section unfolds its label. xl+: icon + label for every section, tightened to fit */}
          <ul className="mx-auto hidden min-w-0 items-center gap-0.5 lg:flex">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  title={t.nav[id]}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative inline-flex h-9 items-center whitespace-nowrap rounded-full px-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-foreground/[0.04] hover:text-foreground xl:px-2 xl:text-[13px]",
                    active === id && "text-foreground hover:bg-transparent",
                  )}
                >
                  {active === id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <SectionIcon id={id} className="opacity-80 xl:size-3.5" />
                  <span
                    className={cn(
                      "overflow-hidden transition-[max-width,opacity,margin] duration-300 ease-out xl:ml-1 xl:max-w-none xl:opacity-100",
                      active === id ? "ml-1.5 max-w-36 opacity-100" : "ml-0 max-w-0 opacity-0",
                    )}
                  >
                    {t.nav[id]}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
            <div role="group" aria-label={t.nav.toggleLanguage} className="flex items-center font-mono text-xs text-muted-foreground">
              {locales.map((code, i) => (
                <span key={code} className="flex items-center">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  <button
                    type="button"
                    onClick={() => setLocale(code)}
                    aria-pressed={locale === code}
                    lang={code}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full px-1.5 uppercase transition-colors hover:text-foreground",
                      locale === code && "text-foreground",
                    )}
                  >
                    {code}
                  </button>
                </span>
              ))}
            </div>
            <ThemeToggle label={t.nav.toggleTheme} />
            <button
              type="button"
              onClick={() => downloadFile(profile.cv[locale])}
              aria-label={t.nav.downloadCv}
              title={t.nav.downloadCv}
              className="ml-1 hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
            >
              <Download className="size-3.5" />
              {/* Full label on tablets; on desktop the section links need the room */}
              <span className="lg:hidden">{t.nav.downloadCv}</span>
              <span className="hidden lg:inline">CV</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={t.nav.menu}
              className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground lg:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-surface-strong p-2 shadow-xl backdrop-blur-xl lg:hidden"
            >
              <ul className="grid grid-cols-2 gap-1">
                {sectionIds.map((id, i) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => goTo(id)}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-surface"
                    >
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <SectionIcon id={id} />
                      {t.nav[id]}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => downloadFile(profile.cv[locale])}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Download className="size-4" />
                {t.nav.downloadCv}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <div aria-live="polite" className="sr-only">
        {copied ? t.palette.emailCopied : ""}
      </div>

      <CommandDialog
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        title="Command palette"
        description={t.palette.placeholder}
      >
        <CommandInput placeholder={t.palette.placeholder} />
        <CommandList>
          <CommandEmpty>{t.palette.empty}</CommandEmpty>
          <CommandGroup heading={t.palette.navigate}>
            {sectionIds.map((id, i) => (
              <CommandItem key={id} value={`${t.nav[id]} ${id}`} onSelect={() => run(() => goTo(id))}>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SectionIcon id={id} />
                {t.nav[id]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t.palette.actions}>
            <CommandItem value="copy email" onSelect={() => run(copyEmail)}>
              <Copy />
              {t.palette.copyEmail}
              <CommandShortcut>{profile.email}</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="linkedin"
              onSelect={() => run(() => window.open(profile.links.linkedin, "_blank", "noopener"))}
            >
              <LinkedinIcon />
              {t.palette.openLinkedin}
              <CommandShortcut>
                <ArrowUpRight className="size-3.5" />
              </CommandShortcut>
            </CommandItem>
            <CommandItem value="download cv english" onSelect={() => run(() => downloadFile(profile.cv.en))}>
              <Download />
              {t.palette.downloadCvEn}
              <CommandShortcut>EN</CommandShortcut>
            </CommandItem>
            <CommandItem value="download cv french" onSelect={() => run(() => downloadFile(profile.cv.fr))}>
              <Download />
              {t.palette.downloadCvFr}
              <CommandShortcut>FR</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t.palette.preferences}>
            <CommandItem value="language langue sprache" onSelect={() => run(toggleLocale)}>
              <Languages />
              {t.palette.switchLanguage}
            </CommandItem>
            <CommandItem
              value="theme dark light"
              onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            >
              <Sun />
              {t.palette.switchTheme}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
