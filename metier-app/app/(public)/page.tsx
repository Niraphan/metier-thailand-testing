import { HomePage } from "@/presentation/home-page/home-page"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string
    page?: string
  }>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <HomePage searchParams={resolvedSearchParams} />
  )
}