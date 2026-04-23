import { BlogComment as BlogCommentType } from "@/data/domain/blog.domain"

export const BlogComment = ({ comments }: { comments: BlogCommentType[] }) => {

  const formattedDate = (date: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }
  
  return (
    <div className=" w-full flex flex-col gap-4 py-8">
      <h1 className=" text-xl md:text-2xl pl-4 border-l-3 border-primary border-rounded font-bold">
        ความคิดเห็น
      </h1>
      <div className=" flex flex-col gap-2">
        {comments.map((comment, index) => (
          <div key={index} className=" flex gap-3 items-start bg-white p-4 rounded-lg">
            <div className=" w-10 h-10 bg-gray-200 rounded-full">
            </div>
            <div className=" flex flex-col gap-4">
              <div className="text-base font-bold">
                {comment.username}
                <span className="pl-2 text-sm text-gray-500">
                  {formattedDate(comment.created_at)}
                </span> 
              </div>
              <div className="text-sm text-gray-700">{comment.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
