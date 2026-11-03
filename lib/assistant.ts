// Offline portfolio assistant: matches the question against keywords and the
// portfolio data, then builds a structured answer from lib/content.ts. No API, no network.
import { dictionaries, locales, profile, type Locale, type Project } from "@/lib/content"

type Intent =
  | "greeting"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "certifications"
  | "languages"
  | "contact"
  | "cv"
  | "location"

// ---- Structured answer format, rendered by components/site/chat-assistant.tsx ----

export type Topic = Intent | "project" | "skill"

export interface Card {
  title: string
  meta?: string
  text?: string
  badge?: string
  chips?: string[]
  /** Question sent when the card is clicked */
  ask?: string
}

export type Block =
  | { type: "title"; text: string; topic: Topic }
  | { type: "text"; text: string }
  | { type: "cards"; items: Card[] }
  | { type: "chips"; label?: string; items: string[] }
  | { type: "metrics"; items: { value: string; label: string }[] }
  | { type: "levels"; items: { label: string; level: string; score: number }[] }
  | { type: "links"; items: { label: string; href: string; kind: "email" | "phone" | "linkedin" | "download" | "anchor" }[] }
  | { type: "suggestions"; items: string[] }

export interface Answer {
  lang: Locale
  blocks: Block[]
}

// ---- Question matching ----

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\.(?=\s|$)/g, "")
    .trim()} `
}

const has = (q: string, word: string) => q.includes(` ${word}`)

// Keyword stems per intent (normalized, matched at the start of a word)
const intentKeywords: Record<Intent, string[]> = {
  greeting: ["bonjour", "salut", "hello", "hi ", "hey ", "hallo", "guten tag", "coucou", "bonsoir"],
  about: ["qui ", "who ", "wer ", "presente", "about", "profil", "parcours", "background", "a propos", "uber ihn", "ueber", "yourself", "toi", "describe", "decri", "beschreib"],
  skills: ["competence", "skill", "stack", "technolog", "outil", "tech ", "maitris", "fahigkeit", "kenntnis", "tool", "savoir", "sait ", "know", "langage de prog", "programm"],
  experience: ["experience", "travail", "travaill", "poste", "stage", "entreprise", "job", "emploi", "work", "intern", "compan", "erfahrung", "praktik", "arbeit", "firma", "beruf", "career", "carriere", "karriere"],
  projects: ["projet", "project", "projekt", "realis", "build", "built", "construit"],
  education: ["etude", "formation", "diplom", "ecole", "universit", "education", "degree", "school", "study", "studied", "ausbildung", "studium", "schule", "hochschule", "abschluss", "esprit", "ingenieur", "engineer degree"],
  certifications: ["certif", "zertifi"],
  languages: ["langue", "language", "sprache", "parle", "speak", "sprich", "anglais", "english", "francais", "french", "arabe", "arabic", "deutsch", "allemand", "german", "englisch", "franzosisch"],
  contact: ["contact", "email", "e mail", "mail", "telephone", "phone", "joindre", "reach", "kontakt", "linkedin", "appel", "call", "hire", "recrut", "embauch", "einstell", "anruf", "numero", "number"],
  cv: ["cv", "resume", "lebenslauf", "curriculum"],
  location: ["habite", "localis", "where", "based", "wohn", "ville", "city", "pays", "country", "land ", "stadt", "situe", "tunis", "tunesien", "vit "],
}

// Simple language guess from common words; falls back to the given language
const languageMarkers: Record<Locale, string[]> = {
  fr: ["est", "quels", "quelles", "quel", "quelle", "ses", "il", "le", "la", "les", "du", "des", "et", "comment", "ou", "sont", "a t il", "t il", "parle", "moi", "son", "sa", "qui", "peux", "tu", "vous", "bonjour", "salut", "competences", "experiences", "projets", "langues"],
  de: ["ist", "er", "seine", "seiner", "welche", "hat", "und", "die", "der", "das", "was", "wie", "wo", "sind", "mir", "uber", "ihn", "hallo", "kann", "spricht", "erfahrung", "projekte", "ausbildung", "zertifikate", "sprachen", "kontakt", "lebenslauf"],
  en: ["is", "his", "he", "does", "the", "which", "how", "where", "has", "what", "tell", "me", "about", "are", "can", "him", "hello", "who", "skills", "projects", "languages"],
}

function detectLanguage(q: string, fallback: Locale): Locale {
  let best = fallback
  let bestScore = 0
  for (const lang of locales) {
    const score = languageMarkers[lang].filter((w) => has(q, `${w} `)).length
    if (score > bestScore) {
      best = lang
      bestScore = score
    }
  }
  return best
}

// ---- Wording per language ----

const L = {
  en: {
    hello: `Hi! I'm ${profile.name}'s assistant. What would you like to know?`,
    fallback: "I'm not sure I understood. Pick a topic:",
    topics: ["Skills", "Experience", "Projects", "Education", "Certifications", "Languages", "Contact", "CV"],
    about: `About ${profile.name}`,
    skills: "Skills by area",
    experience: "Professional experience",
    latest: "Latest experience",
    projects: "Main projects",
    projectsHint: "Click a project for details.",
    experienceHint: "Click an experience for details.",
    education: "Education",
    certifications: "Certifications",
    inProgress: "In progress",
    earned: "Earned",
    languages: "Languages",
    contact: "Contact",
    cv: "Download the CV",
    location: "Location",
    locationText: `He is based in ${profile.location}.`,
    skillYes: (s: string, g: string) => `Yes, ${s} is part of his "${g}" skills.`,
    skillUsed: "Used in these projects:",
    skillOnlyProjects: (s: string) => `He used ${s} in these projects:`,
    stack: "Tech stack",
    viewOnSite: "View on the site",
    askProject: (t: string) => `Tell me about the project ${t}`,
    askCompany: (c: string) => `What did he do at ${c}?`,
  },
  fr: {
    hello: `Bonjour ! Je suis l'assistant de ${profile.name}. Que voulez-vous savoir ?`,
    fallback: "Je ne suis pas sûr d'avoir compris. Choisissez un sujet :",
    topics: ["Compétences", "Expériences", "Projets", "Formation", "Certifications", "Langues", "Contact", "CV"],
    about: `À propos de ${profile.name}`,
    skills: "Compétences par domaine",
    experience: "Expériences professionnelles",
    latest: "Dernière expérience",
    projects: "Principaux projets",
    projectsHint: "Cliquez sur un projet pour les détails.",
    experienceHint: "Cliquez sur une expérience pour les détails.",
    education: "Formation",
    certifications: "Certifications",
    inProgress: "En cours",
    earned: "Obtenue",
    languages: "Langues",
    contact: "Contact",
    cv: "Télécharger le CV",
    location: "Localisation",
    locationText: `Il est basé à ${profile.location}.`,
    skillYes: (s: string, g: string) => `Oui, ${s} fait partie de ses compétences « ${g} ».`,
    skillUsed: "Utilisé dans ces projets :",
    skillOnlyProjects: (s: string) => `Il a utilisé ${s} dans ces projets :`,
    stack: "Stack technique",
    viewOnSite: "Voir sur le site",
    askProject: (t: string) => `Parle-moi du projet ${t}`,
    askCompany: (c: string) => `Qu'a-t-il fait chez ${c} ?`,
  },
  de: {
    hello: `Hallo! Ich bin der Assistent von ${profile.name}. Was möchten Sie wissen?`,
    fallback: "Ich bin nicht sicher, ob ich das verstanden habe. Wählen Sie ein Thema:",
    topics: ["Skills", "Erfahrung", "Projekte", "Ausbildung", "Zertifikate", "Sprachen", "Kontakt", "Lebenslauf"],
    about: `Über ${profile.name}`,
    skills: "Skills nach Bereich",
    experience: "Berufserfahrung",
    latest: "Letzte Erfahrung",
    projects: "Wichtigste Projekte",
    projectsHint: "Klicken Sie auf ein Projekt für Details.",
    experienceHint: "Klicken Sie auf eine Station für Details.",
    education: "Ausbildung",
    certifications: "Zertifikate",
    inProgress: "In Bearbeitung",
    earned: "Erworben",
    languages: "Sprachen",
    contact: "Kontakt",
    cv: "Lebenslauf herunterladen",
    location: "Standort",
    locationText: `Er lebt in ${profile.location}.`,
    skillYes: (s: string, g: string) => `Ja, ${s} gehört zu seinen Skills im Bereich „${g}“.`,
    skillUsed: "Eingesetzt in diesen Projekten:",
    skillOnlyProjects: (s: string) => `Er hat ${s} in diesen Projekten eingesetzt:`,
    stack: "Tech-Stack",
    viewOnSite: "Auf der Seite ansehen",
    askProject: (t: string) => `Erzähl mir vom Projekt ${t}`,
    askCompany: (c: string) => `Was hat er bei ${c} gemacht?`,
  },
} satisfies Record<Locale, unknown>

const firstSentence = (text: string) => text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text

// ---- Entity indexes (built once) ----

const en = dictionaries.en

// Skill names: from skill groups and every project stack. "Power BI (Desktop & Service)" -> "power bi"
const skillNames = new Map<string, string>()
for (const name of [...en.skills.groups.flatMap((g) => g.items), ...en.projects.items.flatMap((p) => p.stack)]) {
  const key = normalize(name.replace(/\(.*?\)/g, "")).trim()
  if (key && !skillNames.has(key)) skillNames.set(key, name)
}

// Words that only appear in one project title (any language) identify that project
const GENERIC = new Set(["solution", "solutions", "platform", "plateforme", "plattform", "analysis", "analyse", "data", "intelligent", "intelligente", "project", "projet", "projekt", "dashboard", "dashboards", "interactive", "interactifs", "interaktive", "tableaux", "bord", "integration", "datenintegration", "donnees", "und", "des", "les", "zur", "for", "and", "the"])
const projectWords: string[][] = en.projects.items.map(() => [])
for (const lang of locales) {
  dictionaries[lang].projects.items.forEach((p, i) => {
    for (const w of normalize(`${p.title} ${p.slug ?? ""}`).trim().split(" ")) {
      if (w.length >= 4 && !GENERIC.has(w) && !skillNames.has(w)) projectWords[i].push(w)
    }
  })
}
const projectWordIndex = new Map<string, number>()
const duplicated = new Set<string>()
projectWords.forEach((words, i) =>
  new Set(words).forEach((w) => {
    if (projectWordIndex.has(w) && projectWordIndex.get(w) !== i) duplicated.add(w)
    projectWordIndex.set(w, i)
  }),
)
duplicated.forEach((w) => projectWordIndex.delete(w))

// Company names -> experience index
const companyWords = new Map<string, number>()
en.experience.items.forEach((e, i) => {
  for (const w of normalize(e.company).trim().split(" ")) {
    if (w.length >= 4 && !["solutions", "holding", "tunisia", "tunisie", "tunesien"].includes(w)) companyWords.set(w, i)
  }
})

// ---- Answer builders ----

// Short name used in follow-up questions: "Comparini", "excellia", or the title before " — "
function projectKey(p: Project) {
  return p.title.match(/\(([^)]+)\)/)?.[1] ?? p.slug ?? p.title.split(" — ")[0]
}

function projectBlocks(p: Project, lang: Locale): Block[] {
  const s = L[lang]
  const blocks: Block[] = [{ type: "title", text: p.title, topic: "project" }]
  const meta = [p.context, p.period].filter(Boolean).join(" · ")
  if (meta) blocks.push({ type: "chips", items: [meta] })
  blocks.push({ type: "text", text: p.description })
  if (p.metrics.length) blocks.push({ type: "metrics", items: p.metrics })
  if (p.parts?.length) {
    blocks.push({
      type: "cards",
      items: p.parts.map((part) => ({ title: part.partLabel ?? part.title, text: firstSentence(part.description) })),
    })
  }
  if (p.stack.length) blocks.push({ type: "chips", label: s.stack, items: p.stack })
  if (p.slug) blocks.push({ type: "links", items: [{ label: s.viewOnSite, href: `#project-${p.slug}`, kind: "anchor" }] })
  return blocks
}

function experienceBlocks(index: number, lang: Locale, title?: string): Block[] {
  const t = dictionaries[lang]
  const e = t.experience.items[index]
  const blocks: Block[] = []
  if (title) blocks.push({ type: "title", text: title, topic: "experience" })
  blocks.push({ type: "cards", items: [{ title: e.role, meta: `${e.company} · ${e.period}`, text: e.project }] })
  const project = t.projects.items.find((p) => p.slug && p.slug === e.projectSlug)
  if (project) blocks.push(...projectBlocks(project, lang))
  return blocks
}

function skillBlocks(key: string, lang: Locale): Block[] {
  const s = L[lang]
  const t = dictionaries[lang]
  const name = skillNames.get(key)!
  const matches = (item: string) => normalize(item.replace(/\(.*?\)/g, "")).trim() === key
  const groupIndex = en.skills.groups.findIndex((g) => g.items.some(matches))
  const projects = t.projects.items.filter((_, i) => en.projects.items[i].stack.some(matches))
  const blocks: Block[] = [{ type: "title", text: name, topic: "skill" }]
  if (groupIndex >= 0) blocks.push({ type: "text", text: s.skillYes(name, t.skills.groups[groupIndex].title) })
  if (projects.length) {
    blocks.push({ type: "text", text: groupIndex >= 0 ? s.skillUsed : s.skillOnlyProjects(name) })
    blocks.push({
      type: "cards",
      items: projects.map((p) => ({ title: p.title, meta: p.period, ask: s.askProject(projectKey(p)) })),
    })
  }
  return blocks
}

function intentBlocks(intent: Intent, lang: Locale): Block[] {
  const s = L[lang]
  const t = dictionaries[lang]
  switch (intent) {
    case "greeting":
      return [
        { type: "text", text: s.hello },
        { type: "suggestions", items: s.topics },
      ]
    case "about":
      return [
        { type: "title", text: s.about, topic: "about" },
        ...t.about.paragraphs.map((text): Block => ({ type: "text", text })),
        { type: "chips", items: t.about.spec.map((x) => x.value) },
      ]
    case "skills":
      return [
        { type: "title", text: s.skills, topic: "skills" },
        ...t.skills.groups.map((g): Block => ({ type: "chips", label: g.title, items: g.items })),
      ]
    case "experience":
      return [
        { type: "title", text: s.experience, topic: "experience" },
        {
          type: "cards",
          items: t.experience.items.map((e) => ({
            title: e.role,
            meta: `${e.company} · ${e.period}`,
            text: e.project,
            ask: s.askCompany(e.company),
          })),
        },
        { type: "text", text: s.experienceHint },
      ]
    case "projects":
      return [
        { type: "title", text: s.projects, topic: "projects" },
        {
          type: "cards",
          items: t.projects.items.map((p) => ({
            title: p.title,
            meta: p.period,
            text: firstSentence(p.description),
            chips: p.stack.slice(0, 4),
            ask: s.askProject(projectKey(p)),
          })),
        },
        { type: "text", text: s.projectsHint },
      ]
    case "education":
      return [
        { type: "title", text: s.education, topic: "education" },
        {
          type: "cards",
          items: t.education.items.map((e) => ({
            title: e.degree,
            meta: `${e.school} · ${e.period}`,
            text: `${e.field} — ${e.location}`,
            chips: e.focus,
          })),
        },
      ]
    case "certifications":
      return [
        { type: "title", text: s.certifications, topic: "certifications" },
        {
          type: "cards",
          items: t.certifications.items.map((c) => ({
            title: c.code ? `${c.name} (${c.code})` : c.name,
            meta: `${c.issuer} · ${c.year}`,
            badge: c.status === "in-progress" ? s.inProgress : s.earned,
          })),
        },
      ]
    case "languages":
      return [
        { type: "title", text: s.languages, topic: "languages" },
        { type: "levels", items: t.languages.items.map((l) => ({ label: l.name, level: l.level, score: l.score })) },
      ]
    case "contact":
      return [
        { type: "title", text: s.contact, topic: "contact" },
        {
          type: "links",
          items: [
            { label: profile.email, href: `mailto:${profile.email}`, kind: "email" },
            { label: profile.phone.display, href: profile.phone.href, kind: "phone" },
            { label: "LinkedIn", href: profile.links.linkedin, kind: "linkedin" },
          ],
        },
      ]
    case "cv":
      return [
        { type: "title", text: s.cv, topic: "cv" },
        {
          type: "links",
          items: [
            { label: t.contact.cvEn, href: profile.cv.en, kind: "download" },
            { label: t.contact.cvFr, href: profile.cv.fr, kind: "download" },
          ],
        },
      ]
    case "location":
      return [
        { type: "title", text: s.location, topic: "location" },
        { type: "text", text: s.locationText },
      ]
  }
}

/** `fallbackLocale`: language used when the question gives no clue (previous answer or site language) */
export function answer(question: string, fallbackLocale: Locale): Answer {
  const q = normalize(question)
  const lang = detectLanguage(q, fallbackLocale)
  const reply = (blocks: Block[]): Answer => ({ lang, blocks })

  // 1. A specific company, project or skill named in the question
  for (const [word, index] of companyWords) if (has(q, word)) return reply(experienceBlocks(index, lang))

  for (const [word, index] of projectWordIndex) {
    if (has(q, word)) return reply(projectBlocks(dictionaries[lang].projects.items[index], lang))
  }

  const skills = [...skillNames.keys()].filter((k) => q.includes(` ${k} `))
  // Keep "sql server" and drop the shorter "sql" it contains
  const specific = skills.filter((k) => !skills.some((other) => other !== k && other.includes(k)))
  if (specific.length) return reply(specific.slice(0, 3).flatMap((k) => skillBlocks(k, lang)))

  // 2. A general topic
  const intents = (Object.keys(intentKeywords) as Intent[]).filter((intent) =>
    intentKeywords[intent].some((kw) => has(q, kw)),
  )
  const topics = intents.filter((i) => i !== "greeting")
  const latest = ["dernier", "derniere", "latest", "last", "recent", "current", "actuel", "letzte", "aktuell", "neueste"]
  if (topics[0] === "experience" && latest.some((w) => has(q, w))) return reply(experienceBlocks(0, lang, L[lang].latest))
  if (topics.length) return reply(topics.slice(0, 2).flatMap((i) => intentBlocks(i, lang)))
  if (intents.includes("greeting")) return reply(intentBlocks("greeting", lang))

  return reply([
    { type: "text", text: L[lang].fallback },
    { type: "suggestions", items: L[lang].topics },
  ])
}
