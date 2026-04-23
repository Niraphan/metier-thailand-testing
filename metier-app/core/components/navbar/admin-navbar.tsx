
"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"


export function AdminNavbar() {
  const pathname = usePathname()

  const adminItems = [
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Create Blog",
      href: "/admin/create",
    },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#151515] text-white ">
      <div className=" flex h-[72px] max-w-7xl items-center justify-between container px-4 md:px-0">
        <Link
          href="/admin"
          className="text-xl font-bold tracking-tight"
        >
          ADMIN PANEL
        </Link>
        <nav className="flex items-center gap-3">
          {adminItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}