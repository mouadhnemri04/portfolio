"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "next-themes"
import { MotionConfig } from "motion/react"
import { dictionaries, locales, type Dictionary, type Locale } from "@/lib/content"

interface LocaleContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = "mn-locale"

function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (locales.includes(stored as Locale)) setLocaleState(stored as Locale)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleLocale = useCallback(() => {
    // Cycles EN → FR → DE → EN; each palette label names the next language
    setLocale(locales[(locales.indexOf(locale) + 1) % locales.length])
  }, [locale, setLocale])

  const value = useMemo(
    () => ({ locale, t: dictionaries[locale], setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <LocaleProvider>{children}</LocaleProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
