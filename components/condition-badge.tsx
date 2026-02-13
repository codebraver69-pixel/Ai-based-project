import { cn } from "@/lib/utils"
import type { BookCondition } from "@/lib/mock-data"

interface ConditionBadgeProps {
  condition: BookCondition
  className?: string
}

const conditionStyles: Record<BookCondition, string> = {
  "Like New": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Good: "bg-sky-50 text-sky-700 border-sky-200",
  Fair: "bg-amber-50 text-amber-700 border-amber-200",
}

export function ConditionBadge({ condition, className }: ConditionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        conditionStyles[condition],
        className
      )}
    >
      {condition}
    </span>
  )
}
