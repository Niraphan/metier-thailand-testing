import { getBlogBySlug } from "@/data/api/blog.hook"
import { BlogDetailPage } from "@/presentation/blog-detail-page/blog-detail-page"
import { Metadata } from "next"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  return {
    title: blog.data.title,
    description: blog.data.short_description || blog.data.title,

    openGraph: {
      title: blog.data.title,
      description: blog.data.short_description || blog.data.title,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`,
      images: [
        {
          url: blog.data.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.data.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.data.title,
      description: blog.data.short_description || blog.data.title,
      images: [blog.data.thumbnail],
    },
  }
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  return <BlogDetailPage blog={blog.data} />
}