import { usePathname } from "next/navigation"
import Link from "next/link"

export function PublicNavbar({
  navItems,
}: {
  navItems: { label: string; href: string }[]
}) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md ">
      <div className=" h-[72px]  container mx-auto">
        <div className="md:px-0 px-4 items-center justify-between h-full flex w-full">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            METIER BLOG
          </Link>
          <nav className="flex items-center gap-3">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
