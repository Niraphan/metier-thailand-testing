"use client"

import { PublicNavbar } from "./public-navbar"

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Admin",
    href: "/admin",
  },
]

export const Navbar = () => {
  return <PublicNavbar navItems={navItems} />
}

