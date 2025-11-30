"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./cart-provider"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const links = [
    { href: "/", label: "首頁" },
    { href: "/menu", label: "菜單" },
    { href: "/checkout", label: "結帳" },
    { href: "/support", label: "客服" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-2xl text-primary">
            MASTER DOUGHNUT
          </Link>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary font-medium" : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/checkout" className="relative">
              <ShoppingCart className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
