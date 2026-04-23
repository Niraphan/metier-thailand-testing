"use client"

import { PublicNavbar } from "./public-navbar"

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Admin",
    href: "/login",
  },
]

export const Navbar = () => {
  return <PublicNavbar navItems={navItems} />
}

