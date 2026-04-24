import { Blog } from "@/data/domain/blog.domain"
import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';

export const BlogDashboard = ({
  blogs,
  isBlogsLoading,
  onEdit,
}: {
  blogs: Blog[]
  isBlogsLoading: boolean
  onEdit: (blog: Blog) => void
}) => {
 
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#151515]">Blog Management</h2>
          <p className="text-sm text-neutral-400 mt-0.5">{blogs.length} บทความทั้งหมด</p>
        </div>
      </div>
 
      {isBlogsLoading ? (
        <div className="py-16 text-center text-neutral-400 text-sm">กำลังโหลด...</div>
      ) : blogs.length === 0 ? (
        <div className="py-16 text-center text-neutral-400 text-sm">ไม่มีบทความ</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[2fr_1fr_80px_100px_44px] gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">บทความ</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Slug</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest text-right">Views</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest text-center">Status</span>
            <span />
          </div>

          <div className="divide-y divide-neutral-100">
            {blogs.map((blog) => (
              <div
                key={blog.blog_id}
                className="grid grid-cols-[2fr_1fr_80px_100px_44px] gap-3 px-4 py-3.5 items-center hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                    {blog.thumbnail ? (
                      <img src={blog.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">🖼</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#151515] truncate">{blog.title}</p>
                    <p className="text-[12px] text-neutral-400 truncate">{blog.short_description}</p>
                  </div>
                </div>
                <p className="text-[12px] font-mono text-neutral-400 truncate">{blog.slug}</p>

                <p className="text-sm text-neutral-500 text-right">{blog.view_amount.toLocaleString()}</p>
                <div className="flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${blog.status === "PUBLISH" ? "bg-green-100 text-green-700 border border-green-200" : "bg-neutral-100 text-neutral-500 border border-neutral-200"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
                    {blog.status}
                  </span>
                </div>
                <button onClick={() => onEdit(blog)} className="flex justify-center items-center h-8 w-8 cursor-pointer bg-primary rounded-md">
                  <EditIcon className=" text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
 
    </div>
  )
}