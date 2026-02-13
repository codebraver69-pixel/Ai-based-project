import Link from "next/link"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { ConditionBadge } from "@/components/condition-badge"
import type { Book } from "@/lib/mock-data"
import { formatPrice, getUserById } from "@/lib/mock-data"

interface BookCardProps {
  book: Book
  userCity?: { lat: number; lng: number } | null
  distance?: number | null
}

export function BookCard({ book, distance }: BookCardProps) {
  const seller = getUserById(book.sellerId)
  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  )

  return (
    <Link href={`/books/${book.id}`}>
      <Card className="group overflow-hidden border-border/60 bg-card transition-all hover:shadow-md hover:-translate-y-0.5">
        <div
          className="relative aspect-[3/4] flex items-center justify-center p-6"
          style={{
            background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})`,
          }}
        >
          <div className="text-center text-white">
            <p className="text-sm font-medium opacity-80 mb-2">{book.author}</p>
            <h3 className="text-lg font-bold leading-tight text-balance">
              {book.title}
            </h3>
          </div>
          <div className="absolute top-3 right-3">
            <ConditionBadge condition={book.condition} />
          </div>
          {discount > 0 && (
            <div className="absolute top-3 left-3 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
              -{discount}%
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground leading-tight line-clamp-1 mb-0.5">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(book.price)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(book.originalPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin size={13} />
              <span className="text-xs">
                {book.location.city}
                {distance != null && ` (${distance} km)`}
              </span>
            </div>
            {seller && <StarRating rating={seller.rating} size={12} />}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
