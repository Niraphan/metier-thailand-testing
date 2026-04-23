"use client"
import { BlogPreview } from "@/data/domain/blog.domain"
import Image from "next/image"
import Link from "next/link"

export const BlogPreviewItem = ({ blog }: { blog: BlogPreview }) => {
  return (
    <article className=" flex flex-col group overflow-hidden shadow-sm rounded-2xl">
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        width={150}
        height={150}
        className="w-full aspect-video group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
      />
      <div className="flex flex-col p-2 md:p-4 gap-2 rounded-b-2xl bg-white">
        <div className="flex flex-row justify-between items-start">
          <h3 className="text-base md:text-lg font-semibold w-[75%] line-clamp-2">{blog.title}</h3>
          <span className="text-xs md:text-sm text-gray-500 items-baseline "> {new Date(blog.created_at).toLocaleDateString("th-TH")}</span>
        </div>
        <p className="text-xs md:text-sm text-gray-500 line-clamp-3">
          {blog.short_description}
        </p>
        <div className=" flex flex-row items-center justify-between">
          <span className="text-xs md:text-sm text-gray-500">
            ยอดเข้าชม: {blog.view_amount}
          </span>
          <Link href={`/blogs/${blog.slug}`} className="text-xs md:text-sm text-white bg-primary px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-primary/80 transition-colors">
            อ่านเพิ่มเติม
          </Link>
        </div>
      </div>
    </article>
  )
}
