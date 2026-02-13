"use client"

import { MapPin } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cities } from "@/lib/mock-data"

interface LocationSelectorProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function LocationSelector({
  value,
  onValueChange,
  className,
}: LocationSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-muted-foreground shrink-0" />
          <SelectValue placeholder="All Cities" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All Cities">All Cities</SelectItem>
        {cities.map((city) => (
          <SelectItem key={city.name} value={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
