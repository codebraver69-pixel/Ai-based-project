import Link from "next/link"
import {
  BookOpen,
  Search,
  ArrowRightLeft,
  ArrowRight,
  MapPin,
  Users,
  BookMarked,
  Shield,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookCard } from "@/components/book-card"
import { books, testimonials } from "@/lib/mock-data"

const featuredBooks = books.slice(0, 8)

const howItWorks = [
  {
    icon: BookOpen,
    title: "List Your Books",
    description:
      "Take a photo, set your price, and your book is ready to find a new home in minutes.",
  },
  {
    icon: Search,
    title: "Browse & Discover",
    description:
      "Search by title, genre, or location. Find great deals from readers near you.",
  },
  {
    icon: ArrowRightLeft,
    title: "Trade & Exchange",
    description:
      "Chat with sellers, negotiate prices, or swap books directly. Meet up and trade!",
  },
]

const stats = [
  { value: "10,000+", label: "Books Listed" },
  { value: "5,000+", label: "Active Traders" },
  { value: "20+", label: "Cities" },
  { value: "50%", label: "Avg. Savings" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-accent opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <BookMarked size={14} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Indonesia&apos;s Book Trading Community
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Trade Books,
                <br />
                <span className="text-primary">Share Stories</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                Buy, sell, and trade pre-loved books at great prices. Join
                thousands of readers building a more affordable and sustainable
                reading community.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/browse">
                  <Button size="lg" className="gap-2">
                    Start Browsing
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/list">
                  <Button size="lg" variant="outline" className="gap-2">
                    <BookOpen size={16} />
                    List a Book
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative book stack */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                {/* Stacked book cards */}
                <div className="relative w-64">
                  {[books[0], books[4], books[8]].map((book, i) => (
                    <div
                      key={book.id}
                      className="absolute rounded-xl shadow-lg overflow-hidden"
                      style={{
                        width: 180,
                        height: 240,
                        top: i * 20,
                        left: i * 30,
                        transform: `rotate(${-6 + i * 6}deg)`,
                        zIndex: i,
                        background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})`,
                      }}
                    >
                      <div className="flex h-full flex-col items-center justify-center p-4 text-center text-white">
                        <p className="text-xs font-medium opacity-70 mb-1">
                          {book.author}
                        </p>
                        <p className="text-sm font-bold leading-tight">
                          {book.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Make room for the stacked cards */}
                <div className="w-64 h-72" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              How KitaBook Works
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Three simple steps to start trading books with your community
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Card
                key={step.title}
                className="relative border-border/60 bg-card text-center"
              >
                <CardContent className="p-8">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <step.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured Books
              </h2>
              <p className="mt-1 text-muted-foreground">
                Recently listed books from our community
              </p>
            </div>
            <Link href="/browse">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/browse">
              <Button variant="outline" className="gap-2">
                View All Books
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Location-Based
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Find books near you. Browse by city and see the distance to each
                listing for easy local meetups.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Shield size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Rated Sellers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every trader has a rating from the community. Trade with
                confidence knowing the seller&apos;s track record.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Growing Community
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Join thousands of book lovers who are making reading more
                affordable and sustainable across Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Testimonials */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              What Our Community Says
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Join thousands of happy readers trading books every day
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-border/60 bg-background"
              >
                <CardContent className="p-6">
                  <Quote size={24} className="text-primary/20 mb-3" />
                  <p className="text-sm leading-relaxed text-foreground mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 text-center">
          <h2 className="text-3xl font-bold text-foreground text-balance md:text-4xl">
            Ready to Start Trading?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-pretty">
            List your first book today and join Indonesia&apos;s most vibrant book
            trading community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/browse">
              <Button size="lg" className="gap-2">
                Browse Books
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/list">
              <Button size="lg" variant="outline" className="gap-2">
                List Your First Book
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
