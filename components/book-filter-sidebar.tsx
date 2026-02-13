"use client"

import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { genres, conditions, type Genre, type BookCondition } from "@/lib/mock-data"
import { formatPrice } from "@/lib/mock-data"

interface BookFilterSidebarProps {
  selectedGenres: Genre[]
  onGenresChange: (genres: Genre[]) => void
  selectedConditions: BookCondition[]
  onConditionsChange: (conditions: BookCondition[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  onReset: () => void
}

export function BookFilterSidebar({
  selectedGenres,
  onGenresChange,
  selectedConditions,
  onConditionsChange,
  priceRange,
  onPriceRangeChange,
  onReset,
}: BookFilterSidebarProps) {
  const hasFilters =
    selectedGenres.length > 0 ||
    selectedConditions.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 20

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
            <X size={12} className="mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Genre */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Genre</h4>
        <div className="flex flex-col gap-2.5">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center gap-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onGenresChange([...selectedGenres, genre])
                  } else {
                    onGenresChange(
                      selectedGenres.filter((g) => g !== genre)
                    )
                  }
                }}
              />
              <Label
                htmlFor={`genre-${genre}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Condition */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Condition</h4>
        <div className="flex flex-col gap-2.5">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center gap-2">
              <Checkbox
                id={`condition-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onConditionsChange([...selectedConditions, condition])
                  } else {
                    onConditionsChange(
                      selectedConditions.filter((c) => c !== condition)
                    )
                  }
                }}
              />
              <Label
                htmlFor={`condition-${condition}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          Price Range
        </h4>
        <Slider
          min={0}
          max={20}
          step={0.5}
          value={priceRange}
          onValueChange={(val) => onPriceRangeChange(val as [number, number])}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  )
}
