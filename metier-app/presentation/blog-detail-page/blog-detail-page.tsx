import { Blog } from "@/data/domain/blog.domain"
import { BlogBanner } from "./components/blog-banner"
import { BlogInformation } from "./components/blog-information"

export const BlogDetailPage = ({ blog }: { blog: Blog }) => {
  return (
    <div className=" flex flex-col w-full ">
      <BlogBanner thumbnail={blog.thumbnail} title={blog.title} />
      <BlogInformation 
        createdAt={blog.created_at}
        viewAmount={blog.view_amount}
        commentCount={blog.blog_comment.length}
        description={blog.description}
        images={blog.blog_picture || []}
        comments={blog.blog_comment || []}
        blogId={blog.blog_id}
      />
    </div>
  )
}
