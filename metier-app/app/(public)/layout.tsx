import { Navbar } from "@/core/components/navbar/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="h-full bg-background">{children}</main>
    </div>
  )
}
