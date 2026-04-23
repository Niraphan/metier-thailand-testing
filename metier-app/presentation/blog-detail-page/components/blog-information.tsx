import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import { BlogAlbum } from "./blog-album"
import { BlogComment } from "./blog-comment"
import { BlogComment as BlogCommentType, BlogPicture } from "@/data/domain/blog.domain"
import { BlogCommentBox } from "./blog-comment-box"


export const BlogInformation = ({
  createdAt,
  viewAmount,
  commentCount,
  description,
  images,
  comments,
  blogId,
}: {
  createdAt: string
  viewAmount: number
  commentCount: number
  description: string
  images: BlogPicture[]
  comments: BlogCommentType[]
  blogId: string
}) => {
  const formattedDate = new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(createdAt))
  return (
    <div className=" container mx-auto flex flex-col px-4  md:px-0">
      <div className=" w-full flex flex-row items-center text-gray-500  gap-4 border-b border-gray-300/70">
        <div className=" flex flex-row gap-2 items-center py-8  ">
          <CalendarMonthRoundedIcon />
          <span>
            {formattedDate}
          </span>
        </div>
        <div className=" flex flex-row gap-2 items-center py-8  ">
          <RemoveRedEyeOutlinedIcon />
          <span>{viewAmount} ครั้ง</span>
        </div>
        <div className=" flex flex-row gap-2 items-center py-8  ">
          <ChatBubbleOutlineOutlinedIcon />
          <span>{commentCount} ความคิดเห็น</span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: description }} className="prose max-w-none py-8 text-sm md:text-base leading-relaxed" />
      <BlogAlbum images={images} />
      <BlogComment comments={comments} />
      <BlogCommentBox blogId={blogId} />

    </div>
  )
}
