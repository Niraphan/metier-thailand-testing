"use client"

import { BlogComment } from "@/data/domain/blog.domain"
import { useGetAllComments } from "@/data/api/admin.hook"
import { useState } from "react"
import { usePatchCommentStatus } from "@/data/api/admin.hook"

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

export const CommentRow = ({
  comment,
  currentTab,
}: {
  comment: BlogComment
  currentTab: "all" | "approved" | "pending" | "rejected"
}) => {
  const cfg = STATUS_CONFIG[comment.status]
  const { mutateAsync: patchCommentStatus } = usePatchCommentStatus()

  const handleStatusChange = async (status: "APPROVED" | "PENDING" | "REJECTED") => {
    await patchCommentStatus({ id: comment.blog_comment_id, status })
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_100px_180px] gap-4 px-4 py-3.5 items-center hover:bg-neutral-50 transition-colors group">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-[#EE571F]/10 flex items-center justify-center shrink-0">
          <span className="text-[13px] font-bold text-[#EE571F]">
            {comment.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#151515] truncate">
            {comment.username}
          </p>
          <p className="text-[11px] text-neutral-400">
            {new Date(comment.created_at).toLocaleDateString("th-TH")}
          </p>
        </div>
      </div>
      <p className="text-sm text-neutral-600 line-clamp-2">{comment.comment}</p>
      <div className="flex justify-center">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.badge}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`}
          />
          {cfg.label}
        </span>
      </div>
      {currentTab == "pending" && (
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1.5 text-[11px] font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors" onClick={() => handleStatusChange("APPROVED")}>
            Approve
          </button>
          <button className="px-3 py-1.5 text-[11px] font-semibold text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors" onClick={() => handleStatusChange("REJECTED")}>
            Reject
          </button>
        </div>
      )}
    </div>
  )
}
