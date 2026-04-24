import { HomePage } from "@/presentation/home-page/home-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Metier Blog | บทความและสาระน่ารู้",
  description:
    "รวมบทความเกี่ยวกับเทคโนโลยี การพัฒนาเว็บไซต์ และสาระน่ารู้ต่าง ๆ จาก Metier Blog",
  openGraph: {
    title: "Metier Blog",
    description: "รวมบทความและสาระน่ารู้",
    type: "website",
  },
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string
    page?: string
  }>
}) {
  const resolvedSearchParams = await searchParams

  return <HomePage searchParams={resolvedSearchParams} />
}
