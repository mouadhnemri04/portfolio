"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Briefcase,
  Code,
  Download,
  FileDown,
  FolderKanban,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  User,
  X,
  type LucideIcon,
} from "lucide-react"
import { useLocale } from "@/components/providers"
import { LinkedinIcon } from "@/components/site/brand-icons"
import { RichText } from "@/components/site/primitives"
import { answer, type Block, type Topic } from "@/lib/assistant"
import { profile, type Locale } from "@/lib/content"
import { cn } from "@/lib/utils"

type ChatMessage = { role: "user"; content: string } | { role: "assistant"; blocks: Block[] }

const strings: Record<
  Locale,
  { open: string; close: string; title: string; sub: string; placeholder: string; send: string; suggestions: string[] }
> = {
  en: {
    open: "Ask the assistant",
    close: "Close assistant",
    title: "Assistant",
    sub: `Ask anything about ${profile.name}'s profile`,
    placeholder: "Ask a question…",
    send: "Send",
    suggestions: ["What are his main skills?", "Tell me about his latest experience", "Which certifications does he have?"],
  },
  fr: {
    open: "Poser une question à l'assistant",
    close: "Fermer l'assistant",
    title: "Assistant",
    sub: `Posez une question sur le profil de ${profile.name}`,
    placeholder: "Posez votre question…",
    send: "Envoyer",
    suggestions: ["Quelles sont ses compétences principales ?", "Parle-moi de sa dernière expérience", "Quelles certifications a-t-il ?"],
  },
  de: {
    open: "Assistenten fragen",
    close: "Assistent schließen",
    title: "Assistent",
    sub: `Fragen Sie alles über ${profile.name}s Profil`,
    placeholder: "Frage stellen…",
    send: "Senden",
    suggestions: ["Was sind seine wichtigsten Skills?", "Erzähl mir von seiner letzten Erfahrung", "Welche Zertifikate hat er?"],
  },
}

const topicIcons: Record<Topic, LucideIcon> = {
  greeting: Sparkles,
  about: User,
  skills: Code,
  skill: Code,
  experience: Briefcase,
  projects: FolderKanban,
  project: FolderKanban,
  education: GraduationCap,
  certifications: Award,
  languages: Languages,
  contact: Mail,
  cv: FileDown,
  location: MapPin,
}

const linkIcons = { email: Mail, phone: Phone, linkedin: LinkedinIcon, download: Download, anchor: ArrowRight }

const chip = "rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"

function BlockView({ block, onAsk, onNavigate }: { block: Block; onAsk: (q: string) => void; onNavigate: () => void }) {
  switch (block.type) {
    case "title": {
      const Icon = topicIcons[block.topic]
      return (
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-3.5" />
          </span>
          {block.text}
        </h3>
      )
    }
    case "text":
      return (
        <p className="text-sm leading-relaxed text-foreground/90">
          <RichText text={block.text} />
        </p>
      )
    case "chips":
      return (
        <div className="space-y-1.5">
          {block.label && (
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{block.label}</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {block.items.map((item) => (
              <span key={item} className={chip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )
    case "metrics":
      return (
        <div className="grid grid-cols-2 gap-2">
          {block.items.map((m) => (
            <div key={m.label} className="rounded-xl border border-primary/20 bg-primary/[0.06] px-3 py-2">
              <p className="text-base font-semibold text-primary">{m.value}</p>
              <p className="text-[11px] leading-tight text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      )
    case "levels":
      return (
        <div className="space-y-2.5">
          {block.items.map((l) => (
            <div key={l.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-medium">{l.label}</span>
                <span className="text-muted-foreground">{l.level}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-teal"
                  style={{ width: `${(l.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )
    case "links":
      return (
        <div className="flex flex-col gap-1.5">
          {block.items.map((link) => {
            const Icon = linkIcons[link.kind]
            const external = link.kind === "linkedin"
            return (
              <a
                key={link.href}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                download={link.kind === "download" ? "" : undefined}
                onClick={link.kind === "anchor" ? onNavigate : undefined}
                className="group flex items-center gap-2.5 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.06]"
              >
                <Icon className="size-4 shrink-0 text-primary" />
                <span className="min-w-0 flex-1 truncate">{link.label}</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )
          })}
        </div>
      )
    case "cards":
      return (
        <div className="flex flex-col gap-2">
          {block.items.map((card) => {
            const body = (
              <>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-snug">{card.title}</p>
                  {card.badge && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      {card.badge}
                    </span>
                  )}
                </div>
                {card.meta && <p className="mt-0.5 text-xs text-muted-foreground">{card.meta}</p>}
                {card.text && <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">{card.text}</p>}
                {card.chips && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {card.chips.map((c) => (
                      <span key={c} className={chip}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )
            const base = "rounded-xl border border-border bg-background/60 px-3 py-2.5 text-left"
            return card.ask ? (
              <button
                key={card.title}
                type="button"
                onClick={() => onAsk(card.ask!)}
                className={cn(base, "transition-colors hover:border-primary/40 hover:bg-primary/[0.06]")}
              >
                {body}
              </button>
            ) : (
              <div key={card.title} className={base}>
                {body}
              </div>
            )
          })}
        </div>
      )
    case "suggestions":
      return (
        <div className="flex flex-wrap gap-1.5">
          {block.items.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onAsk(q)}
              className="rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-xs text-primary transition-colors hover:bg-primary/[0.14]"
            >
              {q}
            </button>
          ))}
        </div>
      )
  }
}

export function ChatAssistant() {
  const { locale } = useLocale()
  const s = strings[locale]
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  // Language of the last answer, used when a question gives no language clue
  const [lastLang, setLastLang] = useState<Locale | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Scroll to the start of the newest message so long answers read from the top
    const list = listRef.current
    const last = list?.lastElementChild as HTMLElement | null
    if (list && last) list.scrollTo({ top: last.offsetTop - 12, behavior: "smooth" })
  }, [messages, thinking])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text: string) {
    const question = text.trim()
    if (!question || thinking) return
    const history: ChatMessage[] = [...messages, { role: "user", content: question }]
    setMessages(history)
    setInput("")
    setThinking(true)
    const reply = answer(question, lastLang ?? locale)
    await new Promise((r) => setTimeout(r, 400))
    setLastLang(reply.lang)
    setMessages([...history, { role: "assistant", blocks: reply.blocks }])
    setThinking(false)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={s.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="card-modern fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100dvh-8rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-background/95 backdrop-blur-xl md:right-6"
          >
            <header className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="truncate text-xs text-muted-foreground">{s.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={s.close}
                className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </header>

            <div ref={listRef} className="relative flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.length === 0 && (
                <div className="flex flex-col gap-2">
                  {s.suggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-2xl border border-primary/20 bg-primary/[0.06] px-3 py-2 text-left text-sm transition-colors hover:bg-primary/[0.12]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div
                    key={i}
                    className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-primary to-teal px-3.5 py-2 text-sm text-primary-foreground"
                  >
                    {m.content}
                  </div>
                ) : (
                  <div key={i} className="space-y-3 rounded-2xl rounded-bl-md bg-muted/60 p-3.5">
                    {m.blocks.map((block, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: j * 0.06 }}
                      >
                        <BlockView block={block} onAsk={send} onNavigate={() => setOpen(false)} />
                      </motion.div>
                    ))}
                  </div>
                ),
              )}
              {thinking && (
                <div className="w-fit rounded-2xl rounded-bl-md bg-muted/60 px-3.5 py-3" aria-label="…">
                  <span className="inline-flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-end gap-2 border-t border-border p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                maxLength={500}
                placeholder={s.placeholder}
                className="max-h-32 min-h-10 flex-1 resize-none rounded-2xl border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={thinking || !input.trim()}
                aria-label={s.send}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-primary to-teal text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? s.close : s.open}
        aria-expanded={open}
        className="fixed bottom-6 right-4 z-50 grid size-14 place-items-center rounded-full bg-gradient-to-r from-primary to-teal text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-shadow hover:shadow-[0_0_40px_-4px_var(--primary)] md:right-6"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>
    </>
  )
}
