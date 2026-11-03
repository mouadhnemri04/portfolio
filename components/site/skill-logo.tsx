import Image from "next/image"
import { Brain, Database, FileSearch, Network, SquareFunction, Warehouse, type LucideIcon } from "lucide-react"
import { skillLogos } from "@/lib/content"
import { cn } from "@/lib/utils"

// Concepts and languages without a brand logo
const skillFallbackIcons: Record<string, LucideIcon> = {
  SQL: Database,
  DAX: SquareFunction,
  "Data Warehousing": Warehouse,
  "Machine Learning": Brain,
  "Deep Learning": Network,
  RAG: FileSearch,
}

export function SkillLogo({
  item,
  size,
  iconClassName,
}: {
  item: string
  size: number
  /** Color of the generic icon used when the skill has no brand logo */
  iconClassName?: string
}) {
  const logo = skillLogos[item]
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 object-contain"
      />
    )
  }
  const Icon = skillFallbackIcons[item] ?? Database
  return (
    <Icon
      aria-hidden="true"
      strokeWidth={1.6}
      style={{ width: size * 0.9, height: size * 0.9 }}
      className={cn("shrink-0", iconClassName)}
    />
  )
}
