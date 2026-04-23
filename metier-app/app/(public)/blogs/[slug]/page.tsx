import { getBlogBySlug } from "@/data/api/blog.hook"
import { BlogDetailPage } from "@/presentation/blog-detail-page/blog-detail-page"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  return (
    <BlogDetailPage blog={blog.data} />
  )
}
