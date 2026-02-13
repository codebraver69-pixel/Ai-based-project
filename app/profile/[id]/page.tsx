"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import {
  MapPin,
  Calendar,
  Star,
  ArrowRightLeft,
  BookOpen,
  Clock,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/star-rating"
import { BookCard } from "@/components/book-card"
import {
  getUserById,
  getBooksBySeller,
  getReviewsForUser,
  formatDate,
} from "@/lib/mock-data"

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const user = getUserById(id)
  if (!user) notFound()

  const userBooks = getBooksBySeller(id)
  const userReviews = getReviewsForUser(id)

  // Rating breakdown
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: userReviews.filter((r) => Math.round(r.rating) === stars).length,
  }))
  const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Profile Header */}
      <Card className="border-border/60 mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Avatar className="h-24 w-24 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-sm text-muted-foreground md:justify-start">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Member since {formatDate(user.joinedDate)}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg">
                {user.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3 md:items-start">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                    <Star size={14} />
                    <span className="text-xs">Rating</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {user.rating.toFixed(1)}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3 md:items-start">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                    <ArrowRightLeft size={14} />
                    <span className="text-xs">Trades</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {user.totalTrades}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3 md:items-start">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                    <BookOpen size={14} />
                    <span className="text-xs">Listed</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {user.booksListed}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3 md:items-start">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                    <Clock size={14} />
                    <span className="text-xs">Response</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {user.responseRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="listings">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="listings">
            Listings ({userBooks.length})
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({userReviews.length})
          </TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings" className="mt-6">
          {userBooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {userBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No books listed yet.</p>
            </div>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Rating Breakdown */}
            <Card className="border-border/60 lg:col-span-1 h-fit">
              <CardContent className="p-5">
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-foreground">
                    {user.rating.toFixed(1)}
                  </p>
                  <StarRating
                    rating={user.rating}
                    size={18}
                    className="justify-center mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {userReviews.length} review{userReviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-2">
                  {ratingCounts.map(({ stars, count }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-3">
                        {stars}
                      </span>
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <Progress
                        value={(count / maxCount) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-4 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {userReviews.length > 0 ? (
                userReviews.map((review) => {
                  const reviewer = getUserById(review.fromUserId)
                  return (
                    <Card key={review.id} className="border-border/60">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {reviewer?.avatar || "??"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-foreground">
                                {reviewer?.name || "Unknown User"}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(review.date)}
                              </span>
                            </div>
                            <StarRating
                              rating={review.rating}
                              size={13}
                              className="mt-1"
                            />
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
