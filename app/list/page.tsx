"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  DollarSign,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  PartyPopper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ConditionBadge } from "@/components/condition-badge"
import { genres, cities, conditions, formatPrice, type Genre, type BookCondition } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type FormData = {
  title: string
  author: string
  isbn: string
  genre: Genre | ""
  description: string
  condition: BookCondition | ""
  originalPrice: string
  price: string
  city: string
}

const steps = [
  { label: "Book Details", icon: BookOpen },
  { label: "Pricing & Condition", icon: DollarSign },
  { label: "Location & Review", icon: MapPin },
]

export default function ListBookPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    description: "",
    condition: "",
    originalPrice: "",
    price: "",
    city: "",
  })

  function updateForm(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function canProceed() {
    switch (step) {
      case 0:
        return form.title && form.author && form.genre && form.description
      case 1:
        return form.condition && form.originalPrice && form.price
      case 2:
        return form.city
      default:
        return false
    }
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mb-6 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <PartyPopper size={36} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Book Listed Successfully!
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Your book &ldquo;{form.title}&rdquo; is now live and visible to
          thousands of readers. You will be notified when someone is interested.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/browse">
            <Button className="gap-2">
              Browse Books
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false)
              setStep(0)
              setForm({
                title: "",
                author: "",
                isbn: "",
                genre: "",
                description: "",
                condition: "",
                originalPrice: "",
                price: "",
                city: "",
              })
            }}
          >
            List Another Book
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">List a Book</h1>
      <p className="text-muted-foreground mb-8">
        Share your pre-loved books with the community
      </p>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex items-center gap-2",
                i <= step ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                      ? "bg-primary/10 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <Progress value={((step + 1) / steps.length) * 100} className="h-1.5" />
      </div>

      <Card className="border-border/60">
        <CardContent className="p-6">
          {/* Step 1: Book Details */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <Label htmlFor="title">Book Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Laskar Pelangi"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  placeholder="e.g., Andrea Hirata"
                  value={form.author}
                  onChange={(e) => updateForm("author", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="isbn">ISBN (Optional)</Label>
                <Input
                  id="isbn"
                  placeholder="e.g., 978-979-015-171-2"
                  value={form.isbn}
                  onChange={(e) => updateForm("isbn", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Genre *</Label>
                <Select
                  value={form.genre}
                  onValueChange={(v) => updateForm("genre", v)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the book and its condition..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  rows={4}
                  className="mt-1.5 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Condition & Pricing */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <Label className="mb-3 block">Book Condition *</Label>
                <RadioGroup
                  value={form.condition}
                  onValueChange={(v) => updateForm("condition", v)}
                  className="flex flex-col gap-3"
                >
                  {conditions.map((c) => (
                    <Label
                      key={c}
                      htmlFor={`condition-${c}`}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors",
                        form.condition === c
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      )}
                    >
                      <RadioGroupItem value={c} id={`condition-${c}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground text-sm">
                            {c}
                          </span>
                          <ConditionBadge condition={c} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {c === "Like New" &&
                            "No visible wear, looks and feels brand new"}
                          {c === "Good" &&
                            "Minor wear, possibly some dog-eared pages or light marks"}
                          {c === "Fair" &&
                            "Noticeable wear, yellowing, or annotations but fully readable"}
                        </p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalPrice">Original Price ($) *</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    placeholder="e.g., 8.99"
                    value={form.originalPrice}
                    onChange={(e) =>
                      updateForm("originalPrice", e.target.value)
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Your Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 4.50"
                    value={form.price}
                    onChange={(e) => updateForm("price", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
              {form.originalPrice && form.price && (
                <p className="text-sm text-primary font-medium">
                  Buyers save{" "}
                  {Math.round(
                    ((Number(form.originalPrice) - Number(form.price)) /
                      Number(form.originalPrice)) *
                      100
                  )}
                  % ({formatPrice(Number(form.originalPrice) - Number(form.price))})
                </p>
              )}

              {/* Upload zone placeholder */}
              <div>
                <Label className="mb-1.5 block">Cover Photo (Optional)</Label>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload
                    size={28}
                    className="text-muted-foreground mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Review */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <Label>Your City *</Label>
                <Select
                  value={form.city}
                  onValueChange={(v) => updateForm("city", v)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preview */}
              <div>
                <Label className="mb-3 block">Listing Preview</Label>
                <Card className="border-border/60 overflow-hidden">
                  <div
                    className="aspect-[16/9] flex items-center justify-center p-6"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(213 58% 45%), hsl(213 58% 30%))",
                    }}
                  >
                    <div className="text-center text-white">
                      <p className="text-sm opacity-70 mb-1">
                        {form.author || "Author"}
                      </p>
                      <p className="text-xl font-bold">
                        {form.title || "Book Title"}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {form.title || "Book Title"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {form.author || "Author"}
                        </p>
                      </div>
                      {form.condition && (
                        <ConditionBadge
                          condition={form.condition as BookCondition}
                        />
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      {form.price && (
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(Number(form.price))}
                        </span>
                      )}
                      {form.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(Number(form.originalPrice))}
                        </span>
                      )}
                    </div>
                    {form.city && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={13} />
                        {form.city}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="gap-1.5"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="gap-1.5"
              >
                Next
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="gap-1.5"
              >
                <Check size={16} />
                Publish Listing
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
