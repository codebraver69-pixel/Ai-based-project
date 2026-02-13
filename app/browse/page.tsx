"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, BookX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BookCard } from "@/components/book-card"
import { LocationSelector } from "@/components/location-selector"
import { BookFilterSidebar } from "@/components/book-filter-sidebar"
import {
  books,
  cities,
  calculateDistance,
  type Genre,
  type BookCondition,
} from "@/lib/mock-data"

type SortOption = "newest" | "price-low" | "price-high" | "rating"

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-6"><p className="text-muted-foreground">Loading books...</p></div>}>
      <BrowseContent />
    </Suspense>
  )
}

function BrowseContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialGenre = searchParams.get("genre") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    initialGenre ? [initialGenre as Genre] : []
  )
  const [selectedConditions, setSelectedConditions] = useState<BookCondition[]>(
    []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20])

  const userLocation = useMemo(() => {
    if (selectedCity === "All Cities") return null
    return cities.find((c) => c.name === selectedCity) || null
  }, [selectedCity])

  const filteredBooks = useMemo(() => {
    let result = [...books]

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q)
      )
    }

    // City
    if (selectedCity !== "All Cities") {
      result = result.filter((b) => b.location.city === selectedCity)
    }

    // Genre
    if (selectedGenres.length > 0) {
      result = result.filter((b) => selectedGenres.includes(b.genre))
    }

    // Condition
    if (selectedConditions.length > 0) {
      result = result.filter((b) => selectedConditions.includes(b.condition))
    }

    // Price
    result = result.filter(
      (b) => b.price >= priceRange[0] && b.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
        )
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => {
          const aRating = 4.5
          const bRating = 4.5
          return bRating - aRating
        })
        break
    }

    return result
  }, [searchQuery, selectedCity, sortBy, selectedGenres, selectedConditions, priceRange])

  function getDistance(book: (typeof books)[0]) {
    if (!userLocation) return null
    return calculateDistance(
      userLocation.lat,
      userLocation.lng,
      book.location.lat,
      book.location.lng
    )
  }

  function resetFilters() {
    setSelectedGenres([])
    setSelectedConditions([])
    setPriceRange([0, 20])
  }

  const activeFilterCount =
    selectedGenres.length +
    selectedConditions.length +
    (priceRange[0] > 0 || priceRange[1] < 20 ? 1 : 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground">Browse Books</h1>
          <div className="flex items-center gap-2">
            <LocationSelector
              value={selectedCity}
              onValueChange={setSelectedCity}
              className="w-44"
            />
            <Select
              value={sortBy}
              onValueChange={(v) => setSortBy(v as SortOption)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden shrink-0">
                <SlidersHorizontal size={16} />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <BookFilterSidebar
                  selectedGenres={selectedGenres}
                  onGenresChange={setSelectedGenres}
                  selectedConditions={selectedConditions}
                  onConditionsChange={setSelectedConditions}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  onReset={resetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-60 shrink-0">
          <div className="sticky top-24">
            <BookFilterSidebar
              selectedGenres={selectedGenres}
              onGenresChange={setSelectedGenres}
              selectedConditions={selectedConditions}
              onConditionsChange={setSelectedConditions}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Book grid */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-4">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}{" "}
            found
            {selectedCity !== "All Cities" && ` in ${selectedCity}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  distance={getDistance(book)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <BookX size={28} className="text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                No books found
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Try adjusting your search or filters to find what you are
                looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCity("All Cities")
                  resetFilters()
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
