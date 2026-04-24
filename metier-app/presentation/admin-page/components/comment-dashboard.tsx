"use client"

import { useState } from "react"
import { BlogComment } from "@/data/domain/blog.domain"
import { useGetAllComments } from "@/data/api/admin.hook"
import { CommentRow } from "./comment-row"

const STATUS_CONFIG = {
  APPROVED: {
    label: "Approved",
    dot: "bg-green-500",
    badge: "bg-green-50 text-green-700 border-green-200",
  },
  PENDING: {
    label: "Pending",
    dot: "bg-yellow-400",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  REJECTED: {
    label: "Rejected",
    dot: "bg-neutral-300",
    badge: "bg-neutral-100 text-neutral-500 border-neutral-200",
  },
}


type FilterType = "ALL" | "APPROVED" | "PENDING" | "REJECTED"

function FilterTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${
        active
          ? "bg-[#EE571F] text-white border-[#EE571F]"
          : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {label}
      <span className={`ml-1.5 text-[11px] ${active ? "opacity-70" : "opacity-50"}`}>
        ({count})
      </span>
    </button>
  )
}

export const CommentDashboard = ({
  comments,
  isCommentsLoading,
}: {
  comments: BlogComment[]
  isCommentsLoading: boolean
}) => {
  const [filter, setFilter] = useState<FilterType>("ALL")

  const filtered = filter === "ALL" ? comments : comments.filter((c) => c.status === filter)

  const count = (s: FilterType) =>
    s === "ALL" ? comments.length : comments.filter((c) => c.status === s).length

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#151515]">Comment Management</h2>
          <p className="text-sm text-neutral-400 mt-0.5">จัดการความคิดเห็นทั้งหมดของระบบ</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as FilterType[]).map((f) => (
            <FilterTab
              key={f}
              label={f === "ALL" ? "ทั้งหมด" : STATUS_CONFIG[f].label}
              count={count(f)}
              active={filter === f}
              onClick={() => setFilter(f)}
            />
          ))}
        </div>
      </div>
      {isCommentsLoading ? (
        <div className="py-16 text-center text-neutral-400 text-sm">กำลังโหลด...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-neutral-400 text-sm">ไม่มี comment</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-[1fr_2fr_100px_180px] gap-4 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">ผู้ใช้</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">ความคิดเห็น</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest text-center">Status</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest text-right">Actions</span>
          </div>
          <div className="divide-y divide-neutral-100">
            {filtered.map((comment) => (
              <CommentRow key={comment.blog_comment_id} comment={comment} currentTab={filter.toLocaleLowerCase() as "all" | "approved" | "pending" | "rejected"} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}