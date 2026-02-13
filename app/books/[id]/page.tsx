import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin,
  MessageCircle,
  ArrowLeft,
  Calendar,
  BookOpen,
  Globe,
  Hash,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/star-rating"
import { ConditionBadge } from "@/components/condition-badge"
import { BookCard } from "@/components/book-card"
import {
  getBookById,
  getUserById,
  getSimilarBooks,
  formatPrice,
  formatDate,
  getTimeAgo,
} from "@/lib/mock-data"

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = getBookById(id)
  if (!book) notFound()

  const seller = getUserById(book.sellerId)
  if (!seller) notFound()

  const similarBooks = getSimilarBooks(book.id, 4)
  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Back button */}
      <Link href="/browse">
        <Button variant="ghost" size="sm" className="mb-4 gap-1.5 -ml-2">
          <ArrowLeft size={16} />
          Back to Browse
        </Button>
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Book Cover - Left Column */}
        <div className="lg:col-span-2">
          <div
            className="aspect-[3/4] rounded-xl flex items-center justify-center p-8 shadow-md"
            style={{
              background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})`,
            }}
          >
            <div className="text-center text-white">
              <p className="text-sm font-medium opacity-70 mb-3">
                {book.author}
              </p>
              <h2 className="text-2xl font-bold leading-tight text-balance md:text-3xl">
                {book.title}
              </h2>
              <div className="mt-4">
                <ConditionBadge condition={book.condition} />
              </div>
            </div>
          </div>
        </div>

        {/* Book Details - Right Column */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Title & Price */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{book.genre}</Badge>
              <ConditionBadge condition={book.condition} />
            </div>
            <h1 className="text-3xl font-bold text-foreground text-balance">
              {book.title}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{book.author}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(book.price)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(book.originalPrice)}
              </span>
              <Badge className="bg-primary/10 text-primary border-0">
                Save {discount}%
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {book.description}
            </p>
          </div>

          {/* Book Info Table */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <Hash size={16} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">ISBN</p>
                <p className="text-xs font-medium text-foreground truncate">
                  {book.isbn}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <BookOpen size={16} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Pages</p>
                <p className="text-xs font-medium text-foreground">
                  {book.pages}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <Globe size={16} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Language</p>
                <p className="text-xs font-medium text-foreground">
                  {book.language}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <Calendar size={16} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Published</p>
                <p className="text-xs font-medium text-foreground">
                  {book.publishedYear}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Seller Card */}
          <Card className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Link href={`/profile/${seller.id}`}>
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/profile/${seller.id}`}
                        className="font-semibold text-foreground hover:underline"
                      >
                        {seller.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating
                          rating={seller.rating}
                          size={14}
                          showValue
                        />
                        <span className="text-xs text-muted-foreground">
                          ({seller.totalTrades} trades)
                        </span>
                      </div>
                    </div>
                    <Link href={`/messages?book=${book.id}&seller=${seller.id}`}>
                      <Button size="sm" className="gap-1.5 shrink-0">
                        <MessageCircle size={14} />
                        Message Seller
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {seller.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      Member since {formatDate(seller.joinedDate)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            Listed {getTimeAgo(book.listedDate)}
          </p>
        </div>
      </div>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Similar Books
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {similarBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
