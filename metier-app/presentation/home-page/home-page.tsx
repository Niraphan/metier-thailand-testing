// presentation/home-page/home-page.tsx

import { BlogPreviewItem } from "./components/blog-preview-item"
import { getBlogs } from "@/data/api/blog.hook"
import { SearchBar } from "@/core/components/search-bar/search-bar"
import { Pagination } from "@/core/components/pagination/pagination"

interface HomePageProps {
  searchParams?: {
    name?: string
    page?: string
  }
}

export const HomePage = async ({ searchParams }: HomePageProps) => {
  const name = searchParams?.name || ""
  const page = Number(searchParams?.page || 1)

  const blogs = await getBlogs(name, page, 10)

  console.log("name", name)

  return (
    <section className="container mx-auto flex h-full  flex-col gap-10 px-4 pt-20 pb-20 md:px-0">
      <h1 className="text-4xl font-bold">Blogs</h1>
      <div className="flex flex-col gap-4">
        <SearchBar defaultValue={name} />
        {blogs.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.data.map((blog) => (
              <BlogPreviewItem key={blog.blog_id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex h-[250px] w-full flex-col items-center justify-center">
            <p className="text-lg font-semibold">No blogs found</p>
          </div>
        )}
        {blogs.totalPages && (
          <Pagination totalPages={blogs.totalPages} currentPage={page} />
        )}
      </div>
    </section>
  )
}
