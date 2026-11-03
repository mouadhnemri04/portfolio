export type Locale = "en" | "fr" | "de"

export const locales: readonly Locale[] = ["en", "fr", "de"]

export type Tier = "bronze" | "silver" | "gold" | "cyan"

export const profile = {
  name: "Mouadh Nemri",
  email: "mouadhnemri04@gmail.com",
  phone: { display: "+216 23 702 602", href: "tel:+21623702602" },
  location: "Tunis, Tunisia",
  siteUrl: "https://mouadhnemri.vercel.app",
  links: {
    linkedin: "https://www.linkedin.com/in/mouadhnemri/",
  },
  cv: {
    en: "/cv/Mouadh-Nemri-CV-EN.pdf",
    fr: "/cv/Mouadh-Nemri-CV-FR.pdf",
    // No German CV yet: German visitors get the English one
    de: "/cv/Mouadh-Nemri-CV-EN.pdf",
  },
  // Shown in the hero marquee after every skill listed in the Skills section
  extraTech: ["Jupyter", "Scikit-learn"],
} as const

// Logo per skill item (names are shared between locales). Items without one get a generic icon.
export const skillLogos: Record<string, string> = {
  Python: "/logos/python.png",
  R: "/logos/r.svg",
  PySpark: "/logos/spark.png",
  "Power BI (Desktop & Service)": "/logos/power-bi.png",
  "Microsoft Fabric": "/logos/fabric.png",
  Talend: "/logos/talend.png",
  SSIS: "/logos/sql-server.png",
  SSAS: "/logos/sql-server.png",
  Excel: "/logos/excel.png",
  "Dynamics 365": "/logos/dynamics-365.svg",
  Spark: "/logos/spark.png",
  MySQL: "/logos/mysql.svg",
  PostgreSQL: "/logos/postgresql.png",
  "SQL Server": "/logos/sql-server.png",
  Oracle: "/logos/oracle.svg",
  "Power Apps": "/logos/power-apps.png",
  "Power Automate": "/logos/power-automate.png",
  Jira: "/logos/jira.svg",
  Jupyter: "/logos/jupyter.png",
  "Scikit-learn": "/logos/scikit-learn.svg",
}

export const sectionIds = [
  "about",
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
  "languages",
  "contact",
] as const

export type SectionId = (typeof sectionIds)[number]

export interface Project {
  title: string
  tier: Tier
  description: string
  metrics: { value: string; label: string }[]
  stack: string[]
  href?: string
  context?: string
  period?: string
  details: { title: string; text: string; facts?: { label: string; value: string }[] }[]
  gallery?: { src: string; caption: string }[]
  video?: { src: string; poster: string; caption: string; duration: string }
  cover?: string
  /** Anchor used to link to this project (#project-<slug>) */
  slug?: string
  /** Short tab label when this project is a part of a grouped project */
  partLabel?: string
  /** Sub-projects shown as tabs in the details dialog */
  parts?: Project[]
}

export interface Experience {
  role: string
  company: string
  logo?: string
  period: string
  tier: Tier
  project?: string
  /** Slug of the matching entry in projects.items; makes the role a link to it */
  projectSlug?: string
}

export interface Education {
  school: string
  logo?: string
  degree: string
  field: string
  period: string
  location: string
  tier: Tier
  focus: string[]
}

export interface SkillGroup {
  title: string
  tier: Tier
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  status: "earned" | "in-progress"
  code?: string
  credentialId?: string
  href?: string
  image?: string
}

export interface Language {
  name: string
  level: string
  /** Proficiency on a 1–5 scale, drives the level bar */
  score: number
}

export interface Dictionary {
  meta: { title: string; description: string }
  nav: Record<SectionId, string> & {
    downloadCv: string
    status: string
    menu: string
    search: string
    toggleTheme: string
    toggleLanguage: string
  }
  palette: {
    placeholder: string
    empty: string
    navigate: string
    actions: string
    preferences: string
    copyEmail: string
    emailCopied: string
    openLinkedin: string
    downloadCvEn: string
    downloadCvFr: string
    switchLanguage: string
    switchTheme: string
  }
  hero: {
    eyebrow: string
    headline: string
    sub: string
    ctaProjects: string
    ctaCv: string
    pipelineLabel: string
    pipeline: {
      sources: [string, string]
      bronze: [string, string]
      silver: [string, string]
      gold: [string, string]
      outputs: [string, string, string]
    }
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    specTitle: string
    photoAlt: string
    spec: { key: string; value: string }[]
  }
  projects: {
    eyebrow: string
    title: string
    sub: string
    viewCode: string
    viewDetails: string
    highlights: string
    stackLabel: string
    gallery: string
    screenshots: string
    demo: string
    close: string
    parts: string
    partsHint: string
    play: string
    pause: string
    items: Project[]
  }
  experience: { eyebrow: string; title: string; sub: string; projectLabel: string; items: Experience[] }
  education: { eyebrow: string; title: string; sub: string; focusLabel: string; items: Education[] }
  skills: { eyebrow: string; title: string; groups: SkillGroup[] }
  certifications: {
    eyebrow: string
    title: string
    earned: string
    inProgress: string
    viewCredential: string
    credentialId: string
    enlarge: string
    imageAlt: string
    items: Certification[]
  }
  languages: { eyebrow: string; title: string; items: Language[] }
  contact: {
    eyebrow: string
    title: string
    sub: string
    email: string
    call: string
    copy: string
    copied: string
    cvEn: string
    cvFr: string
  }
  footer: { built: string; lastRefresh: string; backToTop: string }
}

const en: Dictionary = {
  meta: {
    title: "Mouadh Nemri — Data Engineer · BI & Analytics",
    description:
      "Data Engineer & BI Engineer building end-to-end data platforms on the Microsoft stack: Python pipelines, Medallion architecture, dimensional modeling, Power BI & Microsoft Fabric.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    certifications: "Certifications",
    languages: "Languages",
    contact: "Contact",
    downloadCv: "Download CV",
    status: "Open to opportunities",
    menu: "Menu",
    search: "Search",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Switch language",
  },
  palette: {
    placeholder: "Type a command or search…",
    empty: "No results found.",
    navigate: "Navigate",
    actions: "Actions",
    preferences: "Preferences",
    copyEmail: "Copy email",
    emailCopied: "Email copied to clipboard",
    openLinkedin: "Open LinkedIn",
    downloadCvEn: "Download CV (English)",
    downloadCvFr: "Download CV (French)",
    switchLanguage: "Passer en français",
    switchTheme: "Toggle light / dark theme",
  },
  hero: {
    eyebrow: "DATA ENGINEER · BI & ANALYTICS",
    headline: "I build end-to-end data platforms — from raw APIs to decisions.",
    sub: "Computer Engineer (ESPRIT) specialized in Business Intelligence & Data Engineering on the Microsoft stack: Python pipelines, Medallion architecture, dimensional modeling, Power BI & Microsoft Fabric — plus ML and generative AI on top.",
    ctaProjects: "View projects",
    ctaCv: "Download CV",
    pipelineLabel:
      "Animated diagram of a data pipeline: API sources flow into a Bronze raw layer, then a Silver cleaned layer, then a Gold BI-ready layer, which feeds Power BI, machine learning and an AI agent.",
    pipeline: {
      sources: ["API Sources", "REST · JSON · CSV"],
      bronze: ["Bronze", "raw · append-only"],
      silver: ["Silver", "cleaned · conformed"],
      gold: ["Gold", "star schema · BI-ready"],
      outputs: ["Power BI", "ML", "AI Agent"],
    },
  },
  about: {
    eyebrow: "// 01 — ABOUT",
    title: "Data plumbing, done like product design.",
    paragraphs: [
      "I'm a Computer Engineer from ESPRIT, specialized in Business Intelligence and Data Engineering. I like the unglamorous parts — flaky APIs, messy CSVs, inconsistent keys — because that's where trust in data is won or lost.",
      "My default stack is Microsoft: Python for ingestion, a Medallion architecture for structure, dimensional models for clarity, and Power BI or Microsoft Fabric for the last mile. On top of that I layer ML models and LLM-powered agents, so the platform doesn't just report — it predicts and answers.",
      "I care about the people at the end of the pipeline. Every KPI I ship starts with a conversation with the person who will make a decision with it.",
    ],
    specTitle: "profile.yaml",
    photoAlt: "Portrait of Mouadh Nemri",
    spec: [
      { key: "name", value: "Mouadh Nemri" },
      { key: "role", value: "Data Engineer · BI Engineer" },
      { key: "education", value: "Computer Engineering — ESPRIT" },
      { key: "specialty", value: "Business Intelligence & Data Engineering" },
      { key: "stack", value: "Python · SQL · PySpark · Power BI · Fabric" },
      { key: "also", value: "Machine Learning · Deep Learning · RAG" },
      { key: "languages", value: "Arabic · French · English · German" },
      { key: "based_in", value: "Tunis, Tunisia" },
      { key: "status", value: "open_to_opportunities: true" },
    ],
  },
  experience: {
    eyebrow: "// 02 — EXPERIENCE",
    title: "Where I shipped it.",
    sub: "Three internships, from CRM development to end-to-end data platforms.",
    projectLabel: "Project",
    items: [
      {
        role: "Data Engineer — Project Analytics & Performance Management",
        company: "EXCELLIA Solutions",
        projectSlug: "excellia",
        logo: "/logos/excellia-trimmed.png",
        period: "Feb. 2026 – Aug. 2026",
        tier: "gold",
        project: "Performance steering platform (Data Engineering, BI, Machine Learning, AI)",
      },
      {
        role: "Business Intelligence & Data Engineer",
        company: "Meninx Holding",
        projectSlug: "cosmitto",
        logo: "/logos/cosmitto co.png",
        period: "Jul. 2025 – Sep. 2025",
        tier: "silver",
        project: "Cosmitto data warehouse and decision dashboards",
      },
      {
        role: "Salesforce Developer",
        company: "TALAN Tunisia",
        logo: "/logos/talan-logo.png",
        period: "Jul. 2024 – Sep. 2024",
        tier: "bronze",
      },
    ],
  },
  education: {
    eyebrow: "// 03 — EDUCATION",
    title: "Where I learned it.",
    sub: "A five-year engineering degree, specialized in ERP, Business Intelligence & Data.",
    focusLabel: "Focus",
    items: [
      {
        school: "ESPRIT — Private Higher School of Engineering and Technology",
        logo: "/logos/Logo_ESPRIT_Ariana.jpg",
        degree: "Engineering Degree (5-year, Bac+5)",
        field: "Computer Engineering — ERP-BI & Data specialization",
        period: "Sep. 2021 – Sep. 2026",
        location: "Tunis, Tunisia",
        tier: "gold",
        focus: ["Business Intelligence", "Data Warehousing", "Data Engineering", "ERP", "Machine Learning"],
      },
    ],
  },
  projects: {
    eyebrow: "// 04 — PROJECTS",
    title: "Selected builds.",
    sub: "End-to-end data projects, from raw sources to decisions.",
    viewCode: "View code",
    viewDetails: "View details",
    highlights: "What I built",
    stackLabel: "Tech stack",
    gallery: "Dashboards",
    screenshots: "screenshots",
    demo: "Video demo",
    close: "Close",
    parts: "parts",
    partsHint: "Explore the 3 parts — click to switch",
    play: "Play slideshow",
    pause: "Pause slideshow",
    items: [
      {
        title: "Performance Platform — EXCELLIA Solutions",
        slug: "excellia",
        tier: "gold",
        context: "EXCELLIA Solutions · Data Engineer",
        period: "Feb. 2026 – Aug. 2026",
        description:
          "EXCELLIA Solutions — a project and resource performance platform in 3 parts: a Medallion data foundation with Power BI reporting, 6 machine learning models, and a generative AI agent for the semantic model.",
        metrics: [
          { value: "25,000+", label: "rows processed" },
          { value: "6", label: "ML models" },
          { value: "9 · 51", label: "projects · people" },
        ],
        stack: ["Python", "Jira REST API", "Power BI", "DAX", "Power Apps", "Power Automate", "Machine Learning", "Generative AI"],
        cover: "/projects/excellia/dashboard-global-anon.png",
        details: [],
        parts: [
          {
            title: "Performance Platform — BI & Data Engineering",
            partLabel: "BI & Data Engineering",
            tier: "gold",
            context: "EXCELLIA Solutions · Data Engineer",
            period: "Feb. 2026 – Aug. 2026",
            description:
              "EXCELLIA Solutions — the data foundation of a project and resource performance platform: Jira API ingestion into a Bronze / Silver / Gold Medallion architecture, a constellation data warehouse (3 fact tables, 7 dimensions) and a Power BI dashboard adopted by 3 managers.",
            metrics: [
              { value: "25,000+", label: "rows processed" },
              { value: "30", label: "DAX measures" },
              { value: "9 · 51", label: "projects · people" },
            ],
            stack: ["Python", "Jira REST API", "Excel", "Power BI", "DAX", "Power BI Service", "Power Apps", "Power Automate"],
            cover: "/projects/excellia/dashboard-global-anon.png",
            gallery: [
              { src: "/projects/excellia/menu-principal-anon.png", caption: "Main menu — navigation to the global dashboard, projects and resources" },
              { src: "/projects/excellia/dashboard-global-anon.png", caption: "Global dashboard — estimated budget, time spent, resources, resolution rate and active projects; actual vs estimated time, tickets, resolution rate and resources per project" },
              { src: "/projects/excellia/menu-lateral-anon.png", caption: "Side menu — collapsible panel with navigation (project management, tree view, forecasts) and filters by project, person, status, priority, ticket type and date" },
              { src: "/projects/excellia/projet-anon.png", caption: "Project dashboard — tickets by priority, type, status and resolution, DEV & TEST performance" },
              { src: "/projects/excellia/ressource-anon-v2.png", caption: "Resource sheet — individual KPIs and per-project detail, with a Power Apps form embedded in the report" },
              { src: "/projects/excellia/prevision-anon.png", caption: "Forecasts — resolution rate and ticket volume per project, actual vs predicted" },
            ],
            details: [
              {
                title: "Bronze layer — raw ingestion",
                text: "Python extraction of tickets from the Jira REST API across 9 projects (sub-tasks excluded), through a 24-column Excel file, with automatic retry and pagination; tickets are updated incrementally. 25,000+ rows processed, −40% manual collection time.",
                facts: [
                  { label: "Database", value: "Bronze" },
                  { label: "Role", value: "Raw ingestion" },
                ],
              },
              {
                title: "Silver layer — cleaning & consolidation",
                text: "Column names normalized (no accents), duplicates removed, dates converted with a YYYYMMDD date key, missing values handled, status labels and people names standardized, and equivalent project labels merged.",
                facts: [
                  { label: "Database", value: "Silver" },
                  { label: "Role", value: "Cleaning and consolidation" },
                ],
              },
              {
                title: "Gold layer — dimensional model",
                text: "A data warehouse in a constellation schema: 7 dimensions shared by 3 fact tables. Dimensions are loaded append-only, with no deletes, to preserve key integrity.",
                facts: [
                  { label: "Database", value: "Project" },
                  { label: "Fact tables", value: "fact_Operations (primary key + 7 foreign keys), fact_Affectations, fact_Time_Imputations" },
                  { label: "Dimensions", value: "Dim_ressources, Dim_Projets, Dim_Priorite, Dim_Etat, Dim_Resolution, dim_Date, Dim_Tickets" },
                ],
              },
              {
                title: "Decision reporting",
                text: "Constellation model and a Power BI dashboard with 30 DAX measures (progress, workload, productivity, on-time delivery), published to Power BI Service with scheduled refresh; tracks 9 projects and 51 team members, adopted by 3 managers to steer performance.",
              },
              {
                title: "Data quality",
                text: "5 Power Apps forms connected to Power BI, with input controls (required fields, formats, value lists): fewer entry errors at the source and more reliable downstream KPIs.",
              },
              {
                title: "Automation",
                text: "Power Automate flows (scheduled triggers, notifications, data updates) saving an estimated ~3 hours per week.",
              },
            ],
          },
          {
            title: "Performance Platform — Machine Learning",
            partLabel: "Machine Learning",
            tier: "silver",
            context: "EXCELLIA Solutions · Data Engineer",
            period: "Feb. 2026 – Aug. 2026",
            description:
              "EXCELLIA Solutions — 6 models on project, ticket and resource data: performance classification, ticket clustering, 2026–2029 forecasts and workload-risk detection, written to a dedicated ML database and surfaced in Power BI.",
            metrics: [
              { value: "6", label: "ML models" },
              { value: "90%", label: "accuracy" },
              { value: "2026–29", label: "forecast horizon" },
            ],
            stack: ["Python", "Random Forest", "TF-IDF", "K-Means", "Linear Regression", "Power BI"],
            cover: "/projects/excellia/ml-performance-ressources-anon.png",
            gallery: [
              { src: "/projects/excellia/ml-performance-ressources-anon.png", caption: "Predictive ML engine — resource performance: identified profile (High / Medium / Low), workload analysis, efficiency and volume handled" },
              { src: "/projects/excellia/ml-prevision-volume-anon.png", caption: "Project volume forecast — annual ticket workload predicted per project, 2026 to 2029" },
              { src: "/projects/excellia/ml-finalisation-ticket-anon.png", caption: "Ticket completion prediction — probability that a ticket is completed given its priority, status, type and assigned resource" },
              { src: "/projects/excellia/ml-clustering-tickets-anon.png", caption: "Ticket clustering — semantic category assigned to a ticket among the 8 themes" },
            ],
            details: [
              {
                title: "Resource performance classification",
                text: "Predict each resource's performance level: High (resolution rate ≥ 80%), Medium (≥ 50%) or Low.",
                facts: [
                  { label: "Algorithm", value: "Random Forest Classifier (100 trees)" },
                  { label: "Output table", value: "Ressources_Performance" },
                ],
              },
              {
                title: "Ticket clustering — baseline",
                text: "Group tickets by textual similarity of their \"Summary\" field (1,000 terms, English stop-words).",
                facts: [
                  { label: "Algorithm", value: "TF-IDF + K-Means (K = 5)" },
                  { label: "Output table", value: "Tickets_Cluster_Text" },
                ],
              },
              {
                title: "Ticket clustering — enriched",
                text: "Automatically categorize tickets, with their key, into 8 themes.",
                facts: [
                  { label: "Algorithm", value: "French TF-IDF + K-Means (K = 8)" },
                  { label: "Output table", value: "Tickets_Cluster_Text" },
                ],
              },
              {
                title: "Ticket volume forecast per project",
                text: "Anticipate the number of tickets per project from 2026 to 2029.",
                facts: [
                  { label: "Algorithm", value: "Linear regression (one model per project)" },
                  { label: "Output tables", value: "Forecast_Tickets_Projets, Forecast_Metriques_Projets" },
                ],
              },
              {
                title: "Resolution rate forecast per project",
                text: "Anticipate the resolution rate (%) per project from 2026 to 2029.",
                facts: [
                  { label: "Algorithm", value: "Linear regression (one model per project)" },
                  { label: "Output tables", value: "Forecast_Taux_Resolution_Projets, Forecast_Taux_Resolution_Metriques" },
                ],
              },
              {
                title: "Resource overload detection",
                text: "Identify resources at risk of overload (Risk = Yes/No).",
                facts: [
                  { label: "Algorithm", value: "Statistical threshold μ + σ, complemented by a Random Forest Classifier" },
                  { label: "Output tables", value: "Ressources_Charge, Ressources_Charge_Metriques" },
                ],
              },
              {
                title: "Integration",
                text: "Predictions written to a dedicated ML database and surfaced in the Power BI reporting, alongside the performance KPIs.",
              },
            ],
          },
          {
            title: "Performance Platform — Generative AI",
            partLabel: "Generative AI",
            tier: "cyan",
            context: "EXCELLIA Solutions · Data Engineer",
            period: "Feb. 2026 – Aug. 2026",
            description:
              "EXCELLIA Solutions — a Power BI agent that reads TMDL files to document the semantic model automatically, plus a Q&A chatbot that answers questions in natural language.",
            metrics: [
              { value: "100%", label: "TMDL files documented" },
              { value: "Q&A", label: "natural-language chatbot" },
            ],
            stack: ["Generative AI", "LLM", "TMDL", "Power BI"],
            cover: "/projects/excellia/demo-ia-poster.jpg",
            video: {
              src: "/projects/excellia/demo-ia-anon.mp4",
              poster: "/projects/excellia/demo-ia-poster.jpg",
              duration: "2:01",
              caption: "Demo of the Power BI AI Agent: TMDL file upload, generated constellation model, AI audit of the semantic model, chat with the data, DAX measure generation, then the analytics chatbot generating a PowerPoint report.",
            },
            details: [
              {
                title: "TMDL agent",
                text: "A Power BI agent that reads the TMDL files of the semantic model.",
              },
              {
                title: "Automatic documentation",
                text: "Automatically generates a data schema and an explanatory summary of the semantic model: every TMDL file is documented.",
              },
              {
                title: "Q&A chatbot",
                text: "A chatbot that answers questions about the model in natural language.",
              },
            ],
          },
        ],
      },
      {
        title: "Cosmitto Data Integration and Interactive BI Dashboard Project",
        slug: "cosmitto",
        tier: "silver",
        description:
          "Meninx Holding — Cosmitto_DW in a constellation schema, consolidating 4 sources across two ERPs (Odoo, Sage) through Talend pipelines, with Power BI dashboards for Purchasing, Sales, Losses and Inventory.",
        metrics: [
          { value: "1.4M+", label: "rows processed" },
          { value: "−35%", label: "prep time" },
          { value: "12", label: "KPIs · 6 decision-makers" },
        ],
        stack: ["Talend", "PostgreSQL", "Odoo", "Sage", "Excel", "Power BI"],
        cover: "/projects/cosmitto/achats-anon.png",
        gallery: [
          { src: "/projects/cosmitto/accueil-anon.png", caption: "Home page — navigation to Purchasing, Losses and Sales" },
          { src: "/projects/cosmitto/achats-anon.png", caption: "Purchasing — totals excl./incl. tax, received vs ordered quantity, reception rate, trends by period and product" },
          { src: "/projects/cosmitto/ventes-points-de-vente-anon.png", caption: "Sales — revenue, number of sales, discounts, quantity sold by point of sale and raw-material consumption per recipe" },
          { src: "/projects/cosmitto/ventes-produits-anon.png", caption: "Sales — revenue by product and by product category, 2024 vs 2025" },
          { src: "/projects/cosmitto/pertes-anon.png", caption: "Losses — quantity lost by point of sale, by product and by category" },
        ],
        context: "Meninx Holding · BI & Data Engineer",
        period: "Jul. 2025 – Sep. 2025",
        details: [
          {
            title: "Data integration",
            text: "Collected and integrated data from multiple sources: Excel, PostgreSQL, Odoo (2024-2025), Sage (2025-2026).",
          },
          {
            title: "Staging Area",
            text: "Centralized data in a Staging Area (SA), cleaned and organized it to ensure quality.",
          },
          {
            title: "ETL automation",
            text: "Designed and automated ETL processes using Talend.",
          },
          {
            title: "Data warehouse",
            text: "Built a Data Warehouse (Cosmitto_DW) based on a constellation schema.",
          },
          {
            title: "Power BI dashboards",
            text: "Developed interactive Power BI dashboards organized into: Purchases, Sales, Losses, Inventory.",
          },
          {
            title: "KPIs & decision support",
            text: "Produced KPIs and decision-making indicators to support business operations.",
          },
        ],
      },
      {
        title: "Intelligent Price Comparison Platform (Comparini)",
        tier: "bronze",
        description:
          "Compares products, hotels and flights from multiple sources: Scrapy and Selenium scrapers, Talend cleaning and deduplication into a MySQL data warehouse, a Flask API, an Angular front end and 5 Power BI dashboards.",
        metrics: [
          { value: "2,000+", label: "offers scraped" },
          { value: "5,000+", label: "products compared" },
          { value: "15+", label: "KPIs" },
        ],
        stack: ["Python", "Scrapy", "Selenium", "SQL", "MySQL", "Data Warehouse", "Talend", "Flask", "Angular", "Power BI", "Excel"],
        cover: "/projects/comparateur/1-comparateur-prix.png",
        gallery: [
          { src: "/projects/comparateur/1-comparateur-prix.png", caption: "Price comparator — max and min price, price gap ratio, cheapest and most expensive brand per category, with brand and product filters" },
          { src: "/projects/comparateur/2-performance-ventes.png", caption: "Sales performance — total sales, 2024 vs 2023 revenue and growth, monthly sales, top 5 delegations and top 5 products sold" },
          { src: "/projects/comparateur/3-enseignes-categories.png", caption: "Retailers & categories — sales by category, by retailer (Carrefour, Géant, Monoprix) and top 5 products per retailer" },
        ],
        details: [
          {
            title: "Collection & ETL",
            text: "A platform comparing products, hotels and flight tickets from multiple sources: Scrapy scrapers (static pages) and Selenium (dynamic pages) collecting 2,000+ offers; Talend pipelines for cleaning, normalization and deduplication into a structured MySQL data warehouse, enabling comparison of 5,000+ products.",
          },
          {
            title: "Application & BI",
            text: "Flask backend exposing the data through an API, Angular front end for search, filtering and comparison, and 5 Power BI dashboards (15+ KPIs: price trends, best offers, comparisons by source).",
          },
        ],
      },
      {
        title: "BI Solution for Flight Delay Analysis",
        tier: "cyan",
        description:
          "A data warehouse centralizing flights, delays, airlines and airports to identify recurring delay causes and trends, with Power BI dashboards using critical and optimal thresholds for operational decisions.",
        metrics: [
          { value: "20,000+", label: "flights analyzed" },
          { value: "12", label: "KPIs" },
        ],
        stack: ["SSAS", "SSIS", "SQL", "SQL Server", "Data Warehouse", "Power BI", "DAX", "Excel"],
        details: [
          {
            title: "Modeling & analysis",
            text: "Identifying delay causes to help airlines anticipate them: a data warehouse centralizing flights, delays, airlines and airports (20,000+ flights analyzed); recurring delay factors and trends by airline, airport and period surfaced through dedicated DAX measures.",
          },
          {
            title: "Reporting",
            text: "Power BI dashboards with 12 KPIs (delay rate, punctuality, disruption causes) using critical and optimal thresholds to support operational decisions.",
          },
        ],
      },
    ],
  },
  skills: {
    eyebrow: "// 05 — SKILLS",
    title: "The stack, by layer.",
    groups: [
      {
        title: "Programming",
        tier: "bronze",
        items: ["Python", "R", "SQL", "PySpark"],
      },
      {
        title: "BI & Data",
        tier: "gold",
        items: ["Power BI (Desktop & Service)", "DAX", "Data Warehousing","Microsoft Fabric", "Talend", "SSIS", "SSAS", "Excel", "Dynamics 365", "Spark"],
      },
      {
        title: "Databases",
        tier: "silver",
        items: ["MySQL", "PostgreSQL", "SQL Server", "Oracle"],
      },
      {
        title: "Artificial Intelligence",
        tier: "cyan",
        items: ["Machine Learning", "Deep Learning", "RAG"],
      },
      {
        title: "Automation & Project Management",
        tier: "cyan",
        items: ["Power Apps", "Power Automate", "Jira"],
      },
    ],
  },
  certifications: {
    eyebrow: "// 06 — CERTIFICATIONS",
    title: "Validated, not just claimed.",
    earned: "Earned",
    inProgress: "In progress",
    viewCredential: "Show credential",
    credentialId: "Credential ID",
    enlarge: "Enlarge",
    imageAlt: "Certificate",
    items: [
      {
        name: "Microsoft Certified: Power BI Data Analyst Associate",
        image: "/certs/pl-300.jpg",
        issuer: "Microsoft",
        code: "PL-300",
        credentialId: "E17265F65D210F3A",
        href: "https://learn.microsoft.com/en-us/users/mouadhnemri-0349/credentials/e17265f65d210f3a",
        year: "Aug 2025",
        status: "earned",
      },
      {
        name: "AWS Academy Graduate — Cloud Foundations",
        image: "/certs/aws-cloud-foundations.jpg",
        issuer: "Amazon Web Services",
        href: "https://www.credly.com/badges/38da1145-62da-42f5-88d1-b21bff1fa770",
        year: "Oct 2025",
        status: "earned",
      },
      {
        name: "Data Engineering on AWS — Foundations",
        image: "/certs/aws-data-engineering.jpg",
        issuer: "Amazon Web Services",
        year: "Aug 2025",
        status: "earned",
      },
      {
        name: "Data Analysis — Power BI",
        image: "/certs/codequest-power-bi.jpg",
        issuer: "CodeQuest",
        year: "Jul 2025",
        status: "earned",
      },
      {
        name: "Fundamentals of Deep Learning",
        image: "/certs/nvidia-deep-learning.jpg",
        issuer: "NVIDIA",
        year: "Jan 2025",
        status: "earned",
      },
    ],
  },
  languages: {
    eyebrow: "// 07 — LANGUAGES",
    title: "Languages I work in.",
    items: [
      { name: "Arabic", level: "Native", score: 5 },
      { name: "French", level: "Fluent", score: 4 },
      { name: "English", level: "Fluent", score: 4 },
      { name: "German", level: "Intermediate", score: 3 },
    ],
  },
  contact: {
    eyebrow: "// 08 — CONTACT",
    title: "Have raw data? Let's turn it into decisions.",
    sub: "Open to Data Engineer, BI Engineer and Analytics Engineer roles — on-site, hybrid or remote.",
    email: "Email me",
    call: "Call me",
    copy: "Copy email",
    copied: "Copied",
    cvEn: "CV — English",
    cvFr: "CV — Français",
  },
  footer: {
    built: "Built with Next.js, Tailwind & Motion",
    lastRefresh: "last_refresh",
    backToTop: "Back to top",
  },
}

const enExcelliaParts = en.projects.items[0].parts!

const fr: Dictionary = {
  meta: {
    title: "Mouadh Nemri — Data Engineer · BI & Analytics",
    description:
      "Data Engineer & BI Engineer : je construis des plateformes data de bout en bout sur la stack Microsoft — pipelines Python, architecture Medallion, modélisation dimensionnelle, Power BI & Microsoft Fabric.",
  },
  nav: {
    about: "À propos",
    experience: "Expériences",
    education: "Formation",
    projects: "Projets",
    skills: "Compétences",
    certifications: "Certifications",
    languages: "Langues",
    contact: "Contact",
    downloadCv: "Télécharger le CV",
    status: "Ouvert aux opportunités",
    menu: "Menu",
    search: "Rechercher",
    toggleTheme: "Changer de thème",
    toggleLanguage: "Changer de langue",
  },
  palette: {
    placeholder: "Tapez une commande ou recherchez…",
    empty: "Aucun résultat.",
    navigate: "Naviguer",
    actions: "Actions",
    preferences: "Préférences",
    copyEmail: "Copier l'email",
    emailCopied: "Email copié dans le presse-papiers",
    openLinkedin: "Ouvrir LinkedIn",
    downloadCvEn: "Télécharger le CV (anglais)",
    downloadCvFr: "Télécharger le CV (français)",
    switchLanguage: "Auf Deutsch wechseln",
    switchTheme: "Basculer thème clair / sombre",
  },
  hero: {
    eyebrow: "DATA ENGINEER · BI & ANALYTICS",
    headline: "Je construis des plateformes data de bout en bout — des API brutes aux décisions.",
    sub: "Ingénieur en informatique (ESPRIT) spécialisé en Business Intelligence & Data Engineering sur la stack Microsoft : pipelines Python, architecture Medallion, modélisation dimensionnelle, Power BI & Microsoft Fabric — avec du ML et de l'IA générative par-dessus.",
    ctaProjects: "Voir les projets",
    ctaCv: "Télécharger le CV",
    pipelineLabel:
      "Diagramme animé d'un pipeline de données : les sources API alimentent une couche Bronze brute, puis une couche Silver nettoyée, puis une couche Gold prête pour la BI, qui alimente Power BI, le machine learning et un agent IA.",
    pipeline: {
      sources: ["Sources API", "REST · JSON · CSV"],
      bronze: ["Bronze", "brut · append-only"],
      silver: ["Silver", "nettoyé · conforme"],
      gold: ["Gold", "schéma en étoile · BI"],
      outputs: ["Power BI", "ML", "Agent IA"],
    },
  },
  about: {
    eyebrow: "// 01 — À PROPOS",
    title: "La plomberie data, pensée comme un produit.",
    paragraphs: [
      "Je suis ingénieur en informatique diplômé de l'ESPRIT, spécialisé en Business Intelligence et Data Engineering. J'aime les parties ingrates — API instables, CSV désordonnés, clés incohérentes — car c'est là que la confiance dans la donnée se gagne ou se perd.",
      "Ma stack par défaut est Microsoft : Python pour l'ingestion, une architecture Medallion pour la structure, des modèles dimensionnels pour la clarté, et Power BI ou Microsoft Fabric pour le dernier kilomètre. Par-dessus, j'ajoute des modèles ML et des agents LLM, pour que la plateforme ne fasse pas que rapporter — elle prédit et répond.",
      "Je pense aux personnes en bout de pipeline. Chaque KPI que je livre commence par une conversation avec la personne qui prendra une décision grâce à lui.",
    ],
    specTitle: "profil.yaml",
    photoAlt: "Portrait de Mouadh Nemri",
    spec: [
      { key: "nom", value: "Mouadh Nemri" },
      { key: "rôle", value: "Data Engineer · BI Engineer" },
      { key: "formation", value: "Génie informatique — ESPRIT" },
      { key: "spécialité", value: "Business Intelligence & Data Engineering" },
      { key: "stack", value: "Python · SQL · PySpark · Power BI · Fabric" },
      { key: "aussi", value: "Machine Learning · Deep Learning · RAG" },
      { key: "langues", value: "Arabe · Français · Anglais · Allemand" },
      { key: "basé_à", value: "Tunis, Tunisie" },
      { key: "statut", value: "ouvert_aux_opportunités: true" },
    ],
  },
  experience: {
    eyebrow: "// 02 — EXPÉRIENCES",
    title: "Là où je l'ai mis en production.",
    sub: "Trois stages, du développement CRM aux plateformes data de bout en bout.",
    projectLabel: "Projet",
    items: [
      {
        ...en.experience.items[0],
        role: "Ingénieur Data — Analyse de Projets et Gestion de la Performance",
        period: "Fév. 2026 – Août 2026",
        project: "Plateforme de pilotage de la performance (Data Engineering, BI, Machine Learning, IA)",
      },
      {
        ...en.experience.items[1],
        role: "Ingénieur Business Intelligence & Data",
        period: "Juil. 2025 – Sep. 2025",
        project: "Data Warehouse et tableaux de bord décisionnels Cosmitto",
      },
      {
        ...en.experience.items[2],
        role: "Développeur Salesforce",
        period: "Juil. 2024 – Sep. 2024",
      },
    ],
  },
  education: {
    eyebrow: "// 03 — FORMATION",
    title: "Là où je l'ai appris.",
    sub: "Un diplôme d'ingénieur en cinq ans, spécialisé en ERP, Business Intelligence & Data.",
    focusLabel: "Axes",
    items: [
      {
        ...en.education.items[0],
        school: "ESPRIT — École Supérieure Privée d'Ingénierie et de Technologie",
        degree: "Diplôme d'ingénieur (Bac+5)",
        field: "Génie informatique — spécialisation ERP-BI & Data",
        location: "Tunis, Tunisie",
        focus: ["Business Intelligence", "Data Warehouse", "Data Engineering", "ERP", "Machine Learning"],
      },
    ],
  },
  projects: {
    eyebrow: "// 04 — PROJETS",
    title: "Réalisations choisies.",
    sub: "Des projets data de bout en bout, des sources brutes à la décision.",
    viewCode: "Voir le code",
    viewDetails: "Voir les détails",
    highlights: "Réalisations",
    stackLabel: "Stack technique",
    gallery: "Tableaux de bord",
    screenshots: "captures",
    demo: "Démo vidéo",
    close: "Fermer",
    parts: "volets",
    partsHint: "Explorez les 3 volets — cliquez pour changer",
    play: "Lancer le diaporama",
    pause: "Mettre le diaporama en pause",
    items: [
      {
        ...en.projects.items[0],
        title: "Plateforme de pilotage — EXCELLIA Solutions",
        context: "EXCELLIA Solutions · Ingénieur Data",
        period: "Fév. 2026 – Août 2026",
        description:
          "EXCELLIA Solutions — une plateforme de pilotage de la performance des projets et des ressources en 3 volets : un socle data Médaillon avec reporting Power BI, 6 modèles de machine learning et un agent d'IA générative pour le modèle sémantique.",
        metrics: [
          { value: "25 000+", label: "lignes traitées" },
          { value: "6", label: "modèles ML" },
          { value: "9 · 51", label: "projets · collaborateurs" },
        ],
        stack: ["Python", "Jira REST API", "Power BI", "DAX", "Power Apps", "Power Automate", "Machine Learning", "IA générative"],
        parts: [
          {
            ...enExcelliaParts[0],
            title: "Plateforme de pilotage — BI & Data Engineering",
            context: "EXCELLIA Solutions · Ingénieur Data",
            gallery: [
              { src: "/projects/excellia/menu-principal-anon.png", caption: "Menu principal — navigation vers le dashboard global, les projets et les ressources" },
              { src: "/projects/excellia/dashboard-global-anon.png", caption: "Dashboard global — budget estimé, temps consacré, ressources, taux de résolution et projets actifs ; écarts réel vs estimé, tickets, taux de résolution et ressources par projet" },
              { src: "/projects/excellia/menu-lateral-anon.png", caption: "Menu latéral — panneau escamotable avec navigation (gestion des projets, arborescence, prévisions) et filtres par projet, personne, état, priorité, type de ticket et date" },
              { src: "/projects/excellia/projet-anon.png", caption: "Tableau de bord projet — tickets par priorité, type, état et résolution, performance DEV & TEST" },
              { src: "/projects/excellia/ressource-anon-v2.png", caption: "Fiche ressource — KPI individuels et détail par projet, avec un formulaire Power Apps intégré au rapport" },
              { src: "/projects/excellia/prevision-anon.png", caption: "Prévisions — taux de résolution et volume de tickets par projet, réel vs prédiction" },
            ],
            period: "Fév. 2026 – Août 2026",
            description:
              "EXCELLIA Solutions — le socle data d'une plateforme de pilotage de la performance des projets et des ressources : ingestion de l'API Jira en architecture Médaillon Bronze / Silver / Gold, entrepôt de données en constellation (3 tables de faits, 7 dimensions) et dashboard Power BI adopté par 3 managers.",
            metrics: [
              { value: "25 000+", label: "lignes traitées" },
              { value: "30", label: "mesures DAX" },
              { value: "9 · 51", label: "projets · collaborateurs" },
            ],
            details: [
              {
                title: "Couche Bronze — ingestion brute",
                text: "Extraction Python des tickets depuis l'API REST Jira, sur 9 projets (sous-tâches exclues), via un fichier Excel de 24 colonnes, avec retry automatique et pagination ; les tickets sont mis à jour de façon incrémentale. 25 000+ lignes traitées, −40 % de temps de collecte manuelle.",
                facts: [
                  { label: "Base", value: "Bronze" },
                  { label: "Rôle", value: "Ingestion brute" },
                ],
              },
              {
                title: "Couche Silver — nettoyage et consolidation",
                text: "Normalisation des noms de colonnes (sans accents), suppression des doublons, conversion des dates avec création d'un identifiant de date au format AAAAMMJJ, traitement des valeurs manquantes, uniformisation des libellés d'états et des noms de personnes, et regroupement des libellés de projets équivalents.",
                facts: [
                  { label: "Base", value: "Silver" },
                  { label: "Rôle", value: "Nettoyage et consolidation" },
                ],
              },
              {
                title: "Couche Gold — modèle dimensionnel",
                text: "Entrepôt de données en schéma en constellation : 7 dimensions partagées par 3 tables de faits. Les dimensions sont alimentées en ajout seulement, sans suppression, pour préserver l'intégrité des clés.",
                facts: [
                  { label: "Base", value: "Project" },
                  { label: "Tables de faits", value: "fact_Operations (clé primaire + 7 clés étrangères), fact_Affectations, fact_Time_Imputations" },
                  { label: "Dimensions", value: "Dim_ressources, Dim_Projets, Dim_Priorite, Dim_Etat, Dim_Resolution, dim_Date, Dim_Tickets" },
                ],
              },
              {
                title: "Reporting décisionnel",
                text: "Conception d'un modèle en constellation et d'un dashboard Power BI de 30 mesures DAX (avancement, charge, productivité, respect des délais), publié sur Power BI Service avec actualisation planifiée ; suivi de 9 projets et 51 collaborateurs, adopté par 3 managers pour le pilotage de la performance.",
              },
              {
                title: "Qualité de la donnée",
                text: "Intégration de 5 formulaires Power Apps connectés à Power BI, avec contrôles de saisie (champs obligatoires, formats, listes de valeurs) : réduction des erreurs de saisie dès la source et fiabilisation des indicateurs en aval.",
              },
              {
                title: "Automatisation",
                text: "Flux Power Automate (déclenchement planifié, notifications, mise à jour des données) pour un gain estimé à environ 3 h par semaine.",
              },
            ],
          },
          {
            ...enExcelliaParts[1],
            title: "Plateforme de pilotage — Machine Learning",
            context: "EXCELLIA Solutions · Ingénieur Data",
            period: "Fév. 2026 – Août 2026",
            description:
              "EXCELLIA Solutions — 6 modèles sur les données projets, tickets et ressources : classification des performances, clustering des tickets, prévisions 2026–2029 et détection de surcharge, alimentant une base ML exposée dans Power BI.",
            metrics: [
              { value: "6", label: "modèles ML" },
              { value: "90%", label: "précision" },
              { value: "2026–29", label: "horizon de prévision" },
            ],
            stack: ["Python", "Random Forest", "TF-IDF", "K-Means", "Régression linéaire", "Power BI"],
            gallery: [
              { src: "/projects/excellia/ml-performance-ressources-anon.png", caption: "Moteur prédictif ML — performance des ressources : profil identifié (Performant / Moyen / Faible), analyse de charge, efficacité et volume traité" },
              { src: "/projects/excellia/ml-prevision-volume-anon.png", caption: "Prédiction du volume des projets — charge annuelle de tickets prévue par projet, de 2026 à 2029" },
              { src: "/projects/excellia/ml-finalisation-ticket-anon.png", caption: "Prédiction de finalisation — probabilité qu'un ticket soit finalisé selon sa priorité, son état, son type et la ressource assignée" },
              { src: "/projects/excellia/ml-clustering-tickets-anon.png", caption: "Clustering des tickets — catégorie sémantique attribuée à un ticket parmi les 8 thématiques" },
            ],
            details: [
              {
                title: "Classification des performances des ressources",
                text: "Prédire le niveau de performance de chaque ressource : Performant (taux de résolution ≥ 80 %), Moyen (≥ 50 %) ou Faible.",
                facts: [
                  { label: "Algorithme", value: "Random Forest Classifier (100 arbres)" },
                  { label: "Table de sortie", value: "Ressources_Performance" },
                ],
              },
              {
                title: "Clustering des tickets — version de base",
                text: "Regrouper les tickets par similarité textuelle du champ « Résumé » (1 000 termes, stop-words anglais).",
                facts: [
                  { label: "Algorithme", value: "TF-IDF + K-Means (K = 5)" },
                  { label: "Table de sortie", value: "Tickets_Cluster_Text" },
                ],
              },
              {
                title: "Clustering des tickets — version enrichie",
                text: "Catégoriser automatiquement les tickets, avec leur clé (Cle), en 8 thématiques.",
                facts: [
                  { label: "Algorithme", value: "TF-IDF français + K-Means (K = 8)" },
                  { label: "Table de sortie", value: "Tickets_Cluster_Text" },
                ],
              },
              {
                title: "Prévision du volume de tickets par projet",
                text: "Anticiper le nombre de tickets par projet de 2026 à 2029.",
                facts: [
                  { label: "Algorithme", value: "Régression linéaire (un modèle par projet)" },
                  { label: "Tables de sortie", value: "Forecast_Tickets_Projets, Forecast_Metriques_Projets" },
                ],
              },
              {
                title: "Prévision du taux de résolution par projet",
                text: "Anticiper le taux de résolution (%) par projet de 2026 à 2029.",
                facts: [
                  { label: "Algorithme", value: "Régression linéaire (un modèle par projet)" },
                  { label: "Tables de sortie", value: "Forecast_Taux_Resolution_Projets, Forecast_Taux_Resolution_Metriques" },
                ],
              },
              {
                title: "Détection de surcharge des ressources",
                text: "Identifier les ressources à risque de surcharge (Risk = Oui/Non).",
                facts: [
                  { label: "Algorithme", value: "Seuil statistique μ + σ, complété par un Random Forest Classifier" },
                  { label: "Tables de sortie", value: "Ressources_Charge, Ressources_Charge_Metriques" },
                ],
              },
              {
                title: "Intégration",
                text: "Prédictions stockées dans une base ML dédiée et exposées dans le reporting Power BI, aux côtés des indicateurs de performance.",
              },
            ],
          },
          {
            ...enExcelliaParts[2],
            title: "Plateforme de pilotage — IA générative",
            partLabel: "IA générative",
            video: {
              ...enExcelliaParts[2].video!,
              caption: "Démo du Power BI AI Agent : chargement des fichiers TMDL, modèle en constellation généré, audit IA du modèle sémantique, discussion avec les données, génération de mesures DAX, puis chatbot analytique générant un rapport PowerPoint.",
            },
            context: "EXCELLIA Solutions · Ingénieur Data",
            period: "Fév. 2026 – Août 2026",
            description:
              "EXCELLIA Solutions — un agent Power BI lisant les fichiers TMDL pour documenter automatiquement le modèle sémantique, complété par un chatbot Q&A interrogeable en langage naturel.",
            metrics: [
              { value: "100%", label: "fichiers TMDL documentés" },
              { value: "Q&A", label: "chatbot en langage naturel" },
            ],
            details: [
              {
                title: "Agent TMDL",
                text: "Conception d'un agent Power BI lisant les fichiers TMDL du modèle sémantique.",
              },
              {
                title: "Documentation automatique",
                text: "Génération automatique d'un schéma de données et d'un résumé explicatif du modèle sémantique : documentation de l'ensemble des fichiers TMDL.",
              },
              {
                title: "Chatbot Q&A",
                text: "Chatbot interrogeable en langage naturel sur le modèle.",
              },
            ],
          },
        ],
      },
      {
        ...en.projects.items[1],
        title: "Cosmitto — Projet d'intégration de données et de tableaux de bord BI interactifs",
        description:
          "Meninx Holding — Cosmitto_DW en schéma en constellation, consolidant 4 sources et deux ERP (Odoo, Sage) via des pipelines Talend, avec des tableaux de bord Power BI pour les Achats, Ventes, Pertes et Inventaire.",
        metrics: [
          { value: "1,4M+", label: "lignes traitées" },
          { value: "−35%", label: "temps de préparation" },
          { value: "12", label: "KPI · 6 décideurs" },
        ],
        context: "Meninx Holding · Ingénieur BI & Data",
        gallery: [
          { src: "/projects/cosmitto/accueil-anon.png", caption: "Page d'accueil — navigation vers les Achats, les Pertes et les Ventes" },
          { src: "/projects/cosmitto/achats-anon.png", caption: "Achats — totaux HT / TTC, quantité reçue vs commandée, taux de réception, évolution par période et par produit" },
          { src: "/projects/cosmitto/ventes-points-de-vente-anon.png", caption: "Ventes — CA, nombre de ventes, remises, quantité vendue par point de vente et consommation de matières premières par fiche technique" },
          { src: "/projects/cosmitto/ventes-produits-anon.png", caption: "Ventes — CA par produit et par catégorie de produit, 2024 vs 2025" },
          { src: "/projects/cosmitto/pertes-anon.png", caption: "Pertes — quantité perdue par point de vente, par produit et par catégorie" },
        ],
        period: "Juil. 2025 – Sep. 2025",
        details: [
          {
            title: "Intégration de données",
            text: "Collecte et intégration de données issues de plusieurs sources : Excel, PostgreSQL, Odoo (2024-2025), Sage (2025-2026).",
          },
          {
            title: "Staging Area",
            text: "Centralisation des données dans une Staging Area (SA), nettoyage et organisation pour en garantir la qualité.",
          },
          {
            title: "Automatisation ETL",
            text: "Conception et automatisation des processus ETL avec Talend.",
          },
          {
            title: "Data Warehouse",
            text: "Construction d'un Data Warehouse (Cosmitto_DW) basé sur un schéma en constellation.",
          },
          {
            title: "Tableaux de bord Power BI",
            text: "Développement de tableaux de bord Power BI interactifs organisés en : Achats, Ventes, Pertes, Inventaire.",
          },
          {
            title: "KPI & aide à la décision",
            text: "Production de KPI et d'indicateurs décisionnels pour soutenir les opérations métier.",
          },
        ],
      },
      {
        ...en.projects.items[2],
        title: "Plateforme intelligente de comparaison de prix (Comparini)",
        description:
          "Comparaison de produits, hôtels et billets d'avion multi-sources : scrapers Scrapy et Selenium, nettoyage et dédoublonnage Talend vers un data warehouse MySQL, API Flask, frontend Angular et 5 dashboards Power BI.",
        metrics: [
          { value: "2 000+", label: "offres récupérées" },
          { value: "5 000+", label: "produits comparés" },
          { value: "15+", label: "KPI" },
        ],
        gallery: [
          { src: "/projects/comparateur/1-comparateur-prix.png", caption: "Comparateur de prix — prix maximum et minimum, écart de prix, marque la moins chère et la plus chère par catégorie, avec filtres marque et produit" },
          { src: "/projects/comparateur/2-performance-ventes.png", caption: "Performance des ventes — ventes totales, CA 2024 vs 2023 et croissance, ventes par mois, top 5 délégations et top 5 produits vendus" },
          { src: "/projects/comparateur/3-enseignes-categories.png", caption: "Enseignes & catégories — ventes par catégorie, par enseigne (Carrefour, Géant, Monoprix) et top 5 produits par enseigne" },
        ],
        details: [
          {
            title: "Collecte & ETL",
            text: "Plateforme comparant produits, hôtels et billets d'avion issus de plusieurs sources : scrapers Scrapy (pages statiques) et Selenium (pages dynamiques) : 2 000+ offres récupérées ; pipelines Talend de nettoyage, normalisation et dédoublonnage vers un data warehouse structuré (MySQL) permettant de comparer 5 000+ produits.",
          },
          {
            title: "Application & BI",
            text: "Backend Flask exposant les données par API, frontend Angular pour la recherche, le filtrage et la comparaison, et 5 dashboards Power BI (15+ KPI : évolution des prix, meilleures offres, comparatifs par source).",
          },
        ],
      },
      {
        ...en.projects.items[3],
        title: "Solution BI d'analyse des retards de vols",
        description:
          "Data warehouse centralisant vols, retards, compagnies et aéroports pour identifier les causes de retard récurrentes et les tendances, avec des dashboards Power BI à seuils critiques et optimaux pour l'aide à la décision.",
        metrics: [
          { value: "20 000+", label: "vols analysés" },
          { value: "12", label: "KPI" },
        ],
        details: [
          {
            title: "Modélisation & analyse",
            text: "Identification des causes de retard pour aider les compagnies à les anticiper : data warehouse centralisant vols, retards, compagnies et aéroports (20 000+ vols analysés) ; identification des facteurs de retard récurrents et des tendances par compagnie, aéroport et période via des mesures DAX dédiées.",
          },
          {
            title: "Restitution",
            text: "Dashboards Power BI de 12 KPI (taux de retard, ponctualité, causes de perturbation) avec seuils critiques et optimaux pour l'aide à la décision opérationnelle.",
          },
        ],
      },
    ],
  },
  skills: {
    eyebrow: "// 05 — COMPÉTENCES",
    title: "La stack, couche par couche.",
    groups: [
      { ...en.skills.groups[0], title: "Programmation" },
      { ...en.skills.groups[1] },
      { ...en.skills.groups[2], title: "Bases de données" },
      { ...en.skills.groups[3], title: "Intelligence Artificielle" },
      { ...en.skills.groups[4], title: "Automatisation & gestion de projet" },
    ],
  },
  certifications: {
    eyebrow: "// 06 — CERTIFICATIONS",
    title: "Validé, pas seulement affirmé.",
    earned: "Obtenue",
    inProgress: "En cours",
    viewCredential: "Voir le certificat",
    credentialId: "ID du certificat",
    enlarge: "Agrandir",
    imageAlt: "Certificat",
    items: en.certifications.items.map((cert, i) => ({
      ...cert,
      year: ["Août 2025", "Oct. 2025", "Août 2025", "Juil. 2025", "Janv. 2025"][i],
    })),
  },
  languages: {
    eyebrow: "// 07 — LANGUES",
    title: "Langues parlées.",
    items: [
      { name: "Arabe", level: "Langue maternelle", score: 5 },
      { name: "Français", level: "Courant", score: 4 },
      { name: "Anglais", level: "Courant", score: 4 },
      { name: "Allemand", level: "Intermédiaire", score: 3 },
    ],
  },
  contact: {
    eyebrow: "// 08 — CONTACT",
    title: "Des données brutes ? Transformons-les en décisions.",
    sub: "Ouvert aux postes de Data Engineer, BI Engineer et Analytics Engineer — sur site, hybride ou à distance.",
    email: "M'écrire",
    call: "M'appeler",
    copy: "Copier l'email",
    copied: "Copié",
    cvEn: "CV — English",
    cvFr: "CV — Français",
  },
  footer: {
    built: "Construit avec Next.js, Tailwind & Motion",
    lastRefresh: "dernière_maj",
    backToTop: "Retour en haut",
  },
}

const de: Dictionary = {
  meta: {
    title: "Mouadh Nemri — Data Engineer · BI & Analytics",
    description:
      "Data Engineer & BI Engineer: Ich baue End-to-End-Datenplattformen auf dem Microsoft-Stack — Python-Pipelines, Medallion-Architektur, dimensionale Modellierung, Power BI & Microsoft Fabric.",
  },
  nav: {
    about: "Über mich",
    experience: "Erfahrung",
    education: "Ausbildung",
    projects: "Projekte",
    skills: "Kenntnisse",
    certifications: "Zertifikate",
    languages: "Sprachen",
    contact: "Kontakt",
    downloadCv: "Lebenslauf herunterladen",
    status: "Offen für neue Chancen",
    menu: "Menü",
    search: "Suchen",
    toggleTheme: "Design wechseln",
    toggleLanguage: "Sprache wechseln",
  },
  palette: {
    placeholder: "Befehl eingeben oder suchen…",
    empty: "Keine Ergebnisse.",
    navigate: "Navigation",
    actions: "Aktionen",
    preferences: "Einstellungen",
    copyEmail: "E-Mail kopieren",
    emailCopied: "E-Mail in die Zwischenablage kopiert",
    openLinkedin: "LinkedIn öffnen",
    downloadCvEn: "Lebenslauf herunterladen (Englisch)",
    downloadCvFr: "Lebenslauf herunterladen (Französisch)",
    switchLanguage: "Switch to English",
    switchTheme: "Helles / dunkles Design umschalten",
  },
  hero: {
    eyebrow: "DATA ENGINEER · BI & ANALYTICS",
    headline: "Ich baue End-to-End-Datenplattformen — von rohen APIs bis zur Entscheidung.",
    sub: "Informatikingenieur (ESPRIT), spezialisiert auf Business Intelligence & Data Engineering mit dem Microsoft-Stack: Python-Pipelines, Medallion-Architektur, dimensionale Modellierung, Power BI & Microsoft Fabric — ergänzt durch ML und generative KI.",
    ctaProjects: "Projekte ansehen",
    ctaCv: "Lebenslauf herunterladen",
    pipelineLabel:
      "Animiertes Diagramm einer Datenpipeline: API-Quellen fließen in eine Bronze-Rohschicht, dann in eine bereinigte Silver-Schicht, dann in eine BI-fertige Gold-Schicht, die Power BI, Machine Learning und einen KI-Agenten speist.",
    pipeline: {
      sources: ["API-Quellen", "REST · JSON · CSV"],
      bronze: ["Bronze", "roh · append-only"],
      silver: ["Silver", "bereinigt · vereinheitlicht"],
      gold: ["Gold", "Sternschema · BI-fertig"],
      outputs: ["Power BI", "ML", "KI-Agent"],
    },
  },
  about: {
    eyebrow: "// 01 — ÜBER MICH",
    title: "Datenklempnerei, gedacht wie Produktdesign.",
    paragraphs: [
      "Ich bin Informatikingenieur der ESPRIT, spezialisiert auf Business Intelligence und Data Engineering. Ich mag die unspektakulären Teile — instabile APIs, unordentliche CSVs, inkonsistente Schlüssel —, denn genau dort wird Vertrauen in Daten gewonnen oder verloren.",
      "Mein Standard-Stack ist Microsoft: Python für die Ingestion, eine Medallion-Architektur für die Struktur, dimensionale Modelle für die Klarheit und Power BI oder Microsoft Fabric für die letzte Meile. Darauf setze ich ML-Modelle und LLM-gestützte Agenten, damit die Plattform nicht nur berichtet — sondern vorhersagt und antwortet.",
      "Mir sind die Menschen am Ende der Pipeline wichtig. Jeder KPI, den ich liefere, beginnt mit einem Gespräch mit der Person, die damit eine Entscheidung treffen wird.",
    ],
    specTitle: "profil.yaml",
    photoAlt: "Porträt von Mouadh Nemri",
    spec: [
      { key: "name", value: "Mouadh Nemri" },
      { key: "rolle", value: "Data Engineer · BI Engineer" },
      { key: "ausbildung", value: "Informatikingenieur — ESPRIT" },
      { key: "schwerpunkt", value: "Business Intelligence & Data Engineering" },
      { key: "stack", value: "Python · SQL · PySpark · Power BI · Fabric" },
      { key: "außerdem", value: "Machine Learning · Deep Learning · RAG" },
      { key: "sprachen", value: "Arabisch · Französisch · Englisch · Deutsch" },
      { key: "standort", value: "Tunis, Tunesien" },
      { key: "status", value: "offen_für_angebote: true" },
    ],
  },
  experience: {
    eyebrow: "// 02 — ERFAHRUNG",
    title: "Wo ich es umgesetzt habe.",
    sub: "Drei Praktika, von CRM-Entwicklung bis zu End-to-End-Datenplattformen.",
    projectLabel: "Projekt",
    items: [
      {
        ...en.experience.items[0],
        role: "Data Engineer — Projektanalyse & Performance-Management",
        period: "Feb. 2026 – Aug. 2026",
        project: "Plattform zur Performance-Steuerung (Data Engineering, BI, Machine Learning, KI)",
      },
      {
        ...en.experience.items[1],
        role: "Business Intelligence & Data Engineer",
        period: "Juli 2025 – Sep. 2025",
        project: "Cosmitto Data Warehouse und Entscheidungs-Dashboards",
      },
      {
        ...en.experience.items[2],
        role: "Salesforce-Entwickler",
        period: "Juli 2024 – Sep. 2024",
      },
    ],
  },
  education: {
    eyebrow: "// 03 — AUSBILDUNG",
    title: "Wo ich es gelernt habe.",
    sub: "Ein fünfjähriges Ingenieurstudium mit Schwerpunkt ERP, Business Intelligence & Data.",
    focusLabel: "Schwerpunkte",
    items: [
      {
        ...en.education.items[0],
        school: "ESPRIT — Private Hochschule für Ingenieurwesen und Technologie",
        degree: "Ingenieurdiplom (5 Jahre, Bac+5)",
        field: "Informatik — Vertiefung ERP-BI & Data",
        period: "Sep. 2021 – Sep. 2026",
        location: "Tunis, Tunesien",
      },
    ],
  },
  projects: {
    eyebrow: "// 04 — PROJEKTE",
    title: "Ausgewählte Projekte.",
    sub: "End-to-End-Datenprojekte, von Rohdaten bis zur Entscheidung.",
    viewCode: "Code ansehen",
    viewDetails: "Details ansehen",
    highlights: "Was ich gebaut habe",
    stackLabel: "Tech-Stack",
    gallery: "Dashboards",
    screenshots: "Screenshots",
    demo: "Video-Demo",
    close: "Schließen",
    parts: "Teile",
    partsHint: "Die 3 Teile entdecken — zum Wechseln klicken",
    play: "Diashow starten",
    pause: "Diashow pausieren",
    items: [
      {
        ...en.projects.items[0],
        title: "Performance-Plattform — EXCELLIA Solutions",
        context: "EXCELLIA Solutions · Data Engineer",
        period: "Feb. 2026 – Aug. 2026",
        description:
          "EXCELLIA Solutions — eine Plattform zur Performance-Steuerung von Projekten und Ressourcen in 3 Teilen: ein Medallion-Datenfundament mit Power-BI-Reporting, 6 Machine-Learning-Modelle und ein generativer KI-Agent für das semantische Modell.",
        metrics: [
          { value: "25.000+", label: "verarbeitete Zeilen" },
          { value: "6", label: "ML-Modelle" },
          { value: "9 · 51", label: "Projekte · Personen" },
        ],
        stack: ["Python", "Jira REST API", "Power BI", "DAX", "Power Apps", "Power Automate", "Machine Learning", "Generative KI"],
        parts: [
          {
            ...enExcelliaParts[0],
            title: "Performance-Plattform — BI & Data Engineering",
            period: "Feb. 2026 – Aug. 2026",
            description:
              "EXCELLIA Solutions — das Datenfundament einer Plattform zur Performance-Steuerung von Projekten und Ressourcen: Ingestion der Jira-API in eine Bronze / Silver / Gold-Medallion-Architektur, ein Data Warehouse im Konstellationsschema (3 Faktentabellen, 7 Dimensionen) und ein Power-BI-Dashboard, das von 3 Managern genutzt wird.",
            metrics: [
              { value: "25.000+", label: "verarbeitete Zeilen" },
              { value: "30", label: "DAX-Measures" },
              { value: "9 · 51", label: "Projekte · Personen" },
            ],
            gallery: [
              { src: "/projects/excellia/menu-principal-anon.png", caption: "Hauptmenü — Navigation zum globalen Dashboard, zu Projekten und Ressourcen" },
              { src: "/projects/excellia/dashboard-global-anon.png", caption: "Globales Dashboard — geschätztes Budget, aufgewendete Zeit, Ressourcen, Lösungsquote und aktive Projekte; Ist- vs. Soll-Zeit, Tickets, Lösungsquote und Ressourcen pro Projekt" },
              { src: "/projects/excellia/menu-lateral-anon.png", caption: "Seitenmenü — einklappbares Panel mit Navigation (Projektverwaltung, Baumansicht, Prognosen) und Filtern nach Projekt, Person, Status, Priorität, Tickettyp und Datum" },
              { src: "/projects/excellia/projet-anon.png", caption: "Projekt-Dashboard — Tickets nach Priorität, Typ, Status und Lösung, DEV- & TEST-Performance" },
              { src: "/projects/excellia/ressource-anon-v2.png", caption: "Ressourcenblatt — individuelle KPIs und Details pro Projekt, mit einem in den Bericht eingebetteten Power-Apps-Formular" },
              { src: "/projects/excellia/prevision-anon.png", caption: "Prognosen — Lösungsquote und Ticketvolumen pro Projekt, Ist vs. Vorhersage" },
            ],
            details: [
              {
                title: "Bronze-Schicht — Roh-Ingestion",
                text: "Python-Extraktion der Tickets aus der Jira-REST-API über 9 Projekte (ohne Unteraufgaben), über eine Excel-Datei mit 24 Spalten, mit automatischem Retry und Paginierung; Tickets werden inkrementell aktualisiert. 25.000+ verarbeitete Zeilen, −40 % manueller Erfassungsaufwand.",
                facts: [
                  { label: "Datenbank", value: "Bronze" },
                  { label: "Rolle", value: "Roh-Ingestion" },
                ],
              },
              {
                title: "Silver-Schicht — Bereinigung & Konsolidierung",
                text: "Spaltennamen normalisiert (ohne Akzente), Duplikate entfernt, Datumswerte mit einem Datumsschlüssel im Format JJJJMMTT konvertiert, fehlende Werte behandelt, Statusbezeichnungen und Personennamen vereinheitlicht und gleichwertige Projektbezeichnungen zusammengeführt.",
                facts: [
                  { label: "Datenbank", value: "Silver" },
                  { label: "Rolle", value: "Bereinigung und Konsolidierung" },
                ],
              },
              {
                title: "Gold-Schicht — dimensionales Modell",
                text: "Ein Data Warehouse im Konstellationsschema: 7 Dimensionen, die von 3 Faktentabellen geteilt werden. Dimensionen werden nur ergänzt (append-only), ohne Löschungen, um die Schlüsselintegrität zu wahren.",
                facts: [
                  { label: "Datenbank", value: "Project" },
                  { label: "Faktentabellen", value: "fact_Operations (Primärschlüssel + 7 Fremdschlüssel), fact_Affectations, fact_Time_Imputations" },
                  { label: "Dimensionen", value: "Dim_ressources, Dim_Projets, Dim_Priorite, Dim_Etat, Dim_Resolution, dim_Date, Dim_Tickets" },
                ],
              },
              {
                title: "Entscheidungs-Reporting",
                text: "Konstellationsmodell und ein Power-BI-Dashboard mit 30 DAX-Measures (Fortschritt, Auslastung, Produktivität, Termintreue), veröffentlicht im Power BI Service mit geplanter Aktualisierung; verfolgt 9 Projekte und 51 Teammitglieder, von 3 Managern zur Performance-Steuerung genutzt.",
              },
              {
                title: "Datenqualität",
                text: "5 mit Power BI verbundene Power-Apps-Formulare mit Eingabeprüfungen (Pflichtfelder, Formate, Wertelisten): weniger Eingabefehler an der Quelle und verlässlichere KPIs im weiteren Verlauf.",
              },
              {
                title: "Automatisierung",
                text: "Power-Automate-Flows (geplante Auslöser, Benachrichtigungen, Datenaktualisierungen), die geschätzt rund 3 Stunden pro Woche einsparen.",
              },
            ],
          },
          {
            ...enExcelliaParts[1],
            title: "Performance-Plattform — Machine Learning",
            period: "Feb. 2026 – Aug. 2026",
            description:
              "EXCELLIA Solutions — 6 Modelle auf Projekt-, Ticket- und Ressourcendaten: Performance-Klassifikation, Ticket-Clustering, Prognosen 2026–2029 und Erkennung von Überlastungsrisiken, gespeichert in einer eigenen ML-Datenbank und in Power BI dargestellt.",
            metrics: [
              { value: "6", label: "ML-Modelle" },
              { value: "90%", label: "Genauigkeit" },
              { value: "2026–29", label: "Prognosehorizont" },
            ],
            stack: ["Python", "Random Forest", "TF-IDF", "K-Means", "Lineare Regression", "Power BI"],
            gallery: [
              { src: "/projects/excellia/ml-performance-ressources-anon.png", caption: "Prädiktive ML-Engine — Ressourcen-Performance: erkanntes Profil (Hoch / Mittel / Niedrig), Auslastungsanalyse, Effizienz und bearbeitetes Volumen" },
              { src: "/projects/excellia/ml-prevision-volume-anon.png", caption: "Prognose des Projektvolumens — vorhergesagte jährliche Ticketlast pro Projekt, 2026 bis 2029" },
              { src: "/projects/excellia/ml-finalisation-ticket-anon.png", caption: "Vorhersage des Ticketabschlusses — Wahrscheinlichkeit, dass ein Ticket abgeschlossen wird, je nach Priorität, Status, Typ und zugewiesener Ressource" },
              { src: "/projects/excellia/ml-clustering-tickets-anon.png", caption: "Ticket-Clustering — einem Ticket zugeordnete semantische Kategorie unter den 8 Themen" },
            ],
            details: [
              {
                title: "Klassifikation der Ressourcen-Performance",
                text: "Vorhersage des Performance-Niveaus jeder Ressource: Hoch (Lösungsquote ≥ 80 %), Mittel (≥ 50 %) oder Niedrig.",
                facts: [
                  { label: "Algorithmus", value: "Random Forest Classifier (100 Bäume)" },
                  { label: "Ausgabetabelle", value: "Ressources_Performance" },
                ],
              },
              {
                title: "Ticket-Clustering — Basisversion",
                text: "Gruppierung der Tickets nach textueller Ähnlichkeit ihres Feldes „Summary“ (1.000 Terme, englische Stoppwörter).",
                facts: [
                  { label: "Algorithmus", value: "TF-IDF + K-Means (K = 5)" },
                  { label: "Ausgabetabelle", value: "Tickets_Cluster_Text" },
                ],
              },
              {
                title: "Ticket-Clustering — erweiterte Version",
                text: "Automatische Einordnung der Tickets mit ihrem Schlüssel in 8 Themen.",
                facts: [
                  { label: "Algorithmus", value: "Französisches TF-IDF + K-Means (K = 8)" },
                  { label: "Ausgabetabelle", value: "Tickets_Cluster_Text" },
                ],
              },
              {
                title: "Prognose des Ticketvolumens pro Projekt",
                text: "Vorhersage der Anzahl Tickets pro Projekt von 2026 bis 2029.",
                facts: [
                  { label: "Algorithmus", value: "Lineare Regression (ein Modell pro Projekt)" },
                  { label: "Ausgabetabellen", value: "Forecast_Tickets_Projets, Forecast_Metriques_Projets" },
                ],
              },
              {
                title: "Prognose der Lösungsquote pro Projekt",
                text: "Vorhersage der Lösungsquote (%) pro Projekt von 2026 bis 2029.",
                facts: [
                  { label: "Algorithmus", value: "Lineare Regression (ein Modell pro Projekt)" },
                  { label: "Ausgabetabellen", value: "Forecast_Taux_Resolution_Projets, Forecast_Taux_Resolution_Metriques" },
                ],
              },
              {
                title: "Erkennung von Ressourcenüberlastung",
                text: "Identifikation von Ressourcen mit Überlastungsrisiko (Risiko = Ja/Nein).",
                facts: [
                  { label: "Algorithmus", value: "Statistischer Schwellenwert μ + σ, ergänzt durch einen Random Forest Classifier" },
                  { label: "Ausgabetabellen", value: "Ressources_Charge, Ressources_Charge_Metriques" },
                ],
              },
              {
                title: "Integration",
                text: "Vorhersagen werden in einer eigenen ML-Datenbank gespeichert und im Power-BI-Reporting neben den Performance-KPIs dargestellt.",
              },
            ],
          },
          {
            ...enExcelliaParts[2],
            title: "Performance-Plattform — Generative KI",
            partLabel: "Generative KI",
            period: "Feb. 2026 – Aug. 2026",
            video: {
              ...enExcelliaParts[2].video!,
              caption: "Demo des Power BI AI Agent: Upload der TMDL-Dateien, generiertes Konstellationsmodell, KI-Audit des semantischen Modells, Chat mit den Daten, Generierung von DAX-Measures und schließlich der Analyse-Chatbot, der einen PowerPoint-Bericht erstellt.",
            },
            description:
              "EXCELLIA Solutions — ein Power-BI-Agent, der TMDL-Dateien liest, um das semantische Modell automatisch zu dokumentieren, ergänzt durch einen Q&A-Chatbot, der Fragen in natürlicher Sprache beantwortet.",
            metrics: [
              { value: "100%", label: "TMDL-Dateien dokumentiert" },
              { value: "Q&A", label: "Chatbot in natürlicher Sprache" },
            ],
            stack: ["Generative KI", "LLM", "TMDL", "Power BI"],
            details: [
              {
                title: "TMDL-Agent",
                text: "Ein Power-BI-Agent, der die TMDL-Dateien des semantischen Modells liest.",
              },
              {
                title: "Automatische Dokumentation",
                text: "Erzeugt automatisch ein Datenschema und eine erklärende Zusammenfassung des semantischen Modells: Jede TMDL-Datei wird dokumentiert.",
              },
              {
                title: "Q&A-Chatbot",
                text: "Ein Chatbot, der Fragen zum Modell in natürlicher Sprache beantwortet.",
              },
            ],
          },
        ],
      },
      {
        ...en.projects.items[1],
        title: "Cosmitto — Datenintegration und interaktive BI-Dashboards",
        description:
          "Meninx Holding — Cosmitto_DW im Konstellationsschema, das 4 Quellen aus zwei ERP-Systemen (Odoo, Sage) über Talend-Pipelines konsolidiert, mit Power-BI-Dashboards für Einkauf, Verkauf, Verluste und Inventar.",
        metrics: [
          { value: "1,4 Mio.+", label: "verarbeitete Zeilen" },
          { value: "−35%", label: "Aufbereitungszeit" },
          { value: "12", label: "KPIs · 6 Entscheider" },
        ],
        context: "Meninx Holding · BI & Data Engineer",
        period: "Juli 2025 – Sep. 2025",
        gallery: [
          { src: "/projects/cosmitto/accueil-anon.png", caption: "Startseite — Navigation zu Einkauf, Verlusten und Verkauf" },
          { src: "/projects/cosmitto/achats-anon.png", caption: "Einkauf — Summen netto / brutto, erhaltene vs. bestellte Menge, Empfangsquote, Entwicklung nach Zeitraum und Produkt" },
          { src: "/projects/cosmitto/ventes-points-de-vente-anon.png", caption: "Verkauf — Umsatz, Anzahl Verkäufe, Rabatte, verkaufte Menge pro Verkaufsstelle und Rohstoffverbrauch pro Rezeptur" },
          { src: "/projects/cosmitto/ventes-produits-anon.png", caption: "Verkauf — Umsatz nach Produkt und Produktkategorie, 2024 vs. 2025" },
          { src: "/projects/cosmitto/pertes-anon.png", caption: "Verluste — verlorene Menge nach Verkaufsstelle, Produkt und Kategorie" },
        ],
        details: [
          {
            title: "Datenintegration",
            text: "Erfassung und Integration von Daten aus mehreren Quellen: Excel, PostgreSQL, Odoo (2024-2025), Sage (2025-2026).",
          },
          {
            title: "Staging Area",
            text: "Zentralisierung der Daten in einer Staging Area (SA), Bereinigung und Strukturierung zur Sicherung der Qualität.",
          },
          {
            title: "ETL-Automatisierung",
            text: "Konzeption und Automatisierung der ETL-Prozesse mit Talend.",
          },
          {
            title: "Data Warehouse",
            text: "Aufbau eines Data Warehouse (Cosmitto_DW) auf Basis eines Konstellationsschemas.",
          },
          {
            title: "Power-BI-Dashboards",
            text: "Entwicklung interaktiver Power-BI-Dashboards, gegliedert in: Einkauf, Verkauf, Verluste, Inventar.",
          },
          {
            title: "KPIs & Entscheidungsunterstützung",
            text: "Erstellung von KPIs und Entscheidungskennzahlen zur Unterstützung des operativen Geschäfts.",
          },
        ],
      },
      {
        ...en.projects.items[2],
        title: "Intelligente Preisvergleichsplattform (Comparini)",
        description:
          "Vergleicht Produkte, Hotels und Flüge aus mehreren Quellen: Scrapy- und Selenium-Scraper, Bereinigung und Deduplizierung mit Talend in ein MySQL-Data-Warehouse, eine Flask-API, ein Angular-Frontend und 5 Power-BI-Dashboards.",
        metrics: [
          { value: "2.000+", label: "gesammelte Angebote" },
          { value: "5.000+", label: "verglichene Produkte" },
          { value: "15+", label: "KPIs" },
        ],
        gallery: [
          { src: "/projects/comparateur/1-comparateur-prix.png", caption: "Preisvergleich — Höchst- und Mindestpreis, Preisspanne, günstigste und teuerste Marke pro Kategorie, mit Marken- und Produktfiltern" },
          { src: "/projects/comparateur/2-performance-ventes.png", caption: "Verkaufsperformance — Gesamtverkäufe, Umsatz 2024 vs. 2023 und Wachstum, monatliche Verkäufe, Top-5-Delegationen und Top-5-Produkte" },
          { src: "/projects/comparateur/3-enseignes-categories.png", caption: "Händler & Kategorien — Verkäufe nach Kategorie, nach Händler (Carrefour, Géant, Monoprix) und Top-5-Produkte pro Händler" },
        ],
        details: [
          {
            title: "Erfassung & ETL",
            text: "Eine Plattform, die Produkte, Hotels und Flugtickets aus mehreren Quellen vergleicht: Scrapy-Scraper (statische Seiten) und Selenium (dynamische Seiten) mit 2.000+ gesammelten Angeboten; Talend-Pipelines zur Bereinigung, Normalisierung und Deduplizierung in ein strukturiertes MySQL-Data-Warehouse, das den Vergleich von 5.000+ Produkten ermöglicht.",
          },
          {
            title: "Anwendung & BI",
            text: "Flask-Backend, das die Daten über eine API bereitstellt, Angular-Frontend für Suche, Filterung und Vergleich sowie 5 Power-BI-Dashboards (15+ KPIs: Preisentwicklung, beste Angebote, Vergleiche nach Quelle).",
          },
        ],
      },
      {
        ...en.projects.items[3],
        title: "BI-Lösung zur Analyse von Flugverspätungen",
        description:
          "Ein Data Warehouse, das Flüge, Verspätungen, Airlines und Flughäfen zentralisiert, um wiederkehrende Verspätungsursachen und Trends zu erkennen, mit Power-BI-Dashboards mit kritischen und optimalen Schwellenwerten für operative Entscheidungen.",
        metrics: [
          { value: "20.000+", label: "analysierte Flüge" },
          { value: "12", label: "KPIs" },
        ],
        details: [
          {
            title: "Modellierung & Analyse",
            text: "Ermittlung von Verspätungsursachen, damit Airlines sie antizipieren können: ein Data Warehouse, das Flüge, Verspätungen, Airlines und Flughäfen zentralisiert (20.000+ analysierte Flüge); wiederkehrende Verspätungsfaktoren und Trends nach Airline, Flughafen und Zeitraum über eigene DAX-Measures sichtbar gemacht.",
          },
          {
            title: "Reporting",
            text: "Power-BI-Dashboards mit 12 KPIs (Verspätungsquote, Pünktlichkeit, Störungsursachen) mit kritischen und optimalen Schwellenwerten zur Unterstützung operativer Entscheidungen.",
          },
        ],
      },
    ],
  },
  skills: {
    eyebrow: "// 05 — KENNTNISSE",
    title: "Der Stack, Schicht für Schicht.",
    groups: [
      { ...en.skills.groups[0], title: "Programmierung" },
      { ...en.skills.groups[1] },
      { ...en.skills.groups[2], title: "Datenbanken" },
      { ...en.skills.groups[3], title: "Künstliche Intelligenz" },
      { ...en.skills.groups[4], title: "Automatisierung & Projektmanagement" },
    ],
  },
  certifications: {
    eyebrow: "// 06 — ZERTIFIKATE",
    title: "Nachgewiesen, nicht nur behauptet.",
    earned: "Erworben",
    inProgress: "In Vorbereitung",
    viewCredential: "Nachweis ansehen",
    credentialId: "Nachweis-ID",
    enlarge: "Vergrößern",
    imageAlt: "Zertifikat",
    items: en.certifications.items.map((cert, i) => ({
      ...cert,
      year: ["Aug. 2025", "Okt. 2025", "Aug. 2025", "Juli 2025", "Jan. 2025"][i],
    })),
  },
  languages: {
    eyebrow: "// 07 — SPRACHEN",
    title: "Sprachen, in denen ich arbeite.",
    items: [
      { name: "Arabisch", level: "Muttersprache", score: 5 },
      { name: "Französisch", level: "Fließend", score: 4 },
      { name: "Englisch", level: "Fließend", score: 4 },
      { name: "Deutsch", level: "Mittelstufe", score: 3 },
    ],
  },
  contact: {
    eyebrow: "// 08 — KONTAKT",
    title: "Rohdaten? Machen wir Entscheidungen daraus.",
    sub: "Offen für Positionen als Data Engineer, BI Engineer und Analytics Engineer — vor Ort, hybrid oder remote.",
    email: "Schreiben Sie mir",
    call: "Rufen Sie mich an",
    copy: "E-Mail kopieren",
    copied: "Kopiert",
    cvEn: "CV — English",
    cvFr: "CV — Français",
  },
  footer: {
    built: "Erstellt mit Next.js, Tailwind & Motion",
    lastRefresh: "letzte_aktualisierung",
    backToTop: "Nach oben",
  },
}

export const dictionaries: Record<Locale, Dictionary> = { en, fr, de }
