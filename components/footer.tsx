import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen size={16} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">KitaBook</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trade books, share stories. The community marketplace for affordable
              books across Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Explore</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/browse"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  href="/list"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  List a Book
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?genre=Fiction"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?genre=Technology"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Company</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-sm text-muted-foreground">About Us</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">How It Works</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Safety Tips</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Contact</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-sm text-muted-foreground">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Community Guidelines</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Made with love for book lovers across Indonesia
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 KitaBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
