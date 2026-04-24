"use client"
import { AdminNavbar } from '@/core/components/navbar/admin-navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminNavbar />
      <main className="w-full bg-background">{children}</main>
    </QueryClientProvider>
  )
}