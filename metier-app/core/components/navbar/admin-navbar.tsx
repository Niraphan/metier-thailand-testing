"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export function AdminNavbar() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie =
      "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"

    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#151515] text-white ">
      <div className="container mx-auto flex h-[72px]">
        <div className="flex flex-row justify-between w-full items-center">
        <Link
          href="/admin"
          className="text-xl font-bold tracking-tight"
        >
          ADMIN PANEL
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-white px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-black"
        >
          Logout
        </button></div>
      </div>
    </header>
  )
}