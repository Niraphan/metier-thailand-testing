"use client"

import Image from "next/image"
import Link from "next/link"
import { Blogs } from "@/data/domain/blog.domain"

interface HomePageProps {
  blogs: Blogs[]
}

export const HomePage = ({ blogs }: HomePageProps) => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Our Blog Articles
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.blog_id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Thumbnail */}
              <div className="relative h-[240px] w-full">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="mb-2 text-sm text-neutral-500">
                  {new Date(blog.created_at).toLocaleDateString("th-TH")}
                </p>

                <h2 className="mb-3 line-clamp-2 text-xl font-semibold text-foreground">
                  {blog.title}
                </h2>

                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {blog.short_description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    👁 {blog.view_amount} views
                  </span>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}