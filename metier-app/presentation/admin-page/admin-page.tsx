"use client"

import { useState } from "react"
import {
  useGetAllBlogs,
  useGetAllComments,
} from "@/data/api/admin.hook"

import { BlogDashboard } from "./components/blog-dashboard"
import { CommentDashboard } from "./components/comment-dashboard"
import { EditBlogModal } from "./components/edit-blog-modal"

import { Blog } from "@/data/domain/blog.domain"

export const AdminPage = () => {
  const [dashboardMode, setDashboardMode] = useState<
    "blog" | "comment"
  >("blog")

  const [selectedBlog, setSelectedBlog] =
    useState<Blog | null>(null)

  const [openEditModal, setOpenEditModal] =
    useState(false)

  const {
    data: blogs,
    isLoading: isBlogsLoading,
  } = useGetAllBlogs()

  const {
    data: comments,
    isLoading: isCommentsLoading,
  } = useGetAllComments()

  const handleOpenEditModal = (blog: Blog) => {
    setSelectedBlog(blog)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setSelectedBlog(null)
    setOpenEditModal(false)
  }

  return (
    <>
      <section className="min-h-screen bg-neutral-100 p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-neutral-800">
            Admin Dashboard
          </h1>

          <div className="mb-8 flex gap-4">
            <button
              onClick={() => setDashboardMode("blog")}
              className={`rounded-lg px-6 py-3 font-medium transition ${
                dashboardMode === "blog"
                  ? "bg-black text-white"
                  : "border border-neutral-300 bg-white text-neutral-700"
              }`}
            >
              Blog Management
            </button>

            <button
              onClick={() => setDashboardMode("comment")}
              className={`rounded-lg px-6 py-3 font-medium transition ${
                dashboardMode === "comment"
                  ? "bg-black text-white"
                  : "border border-neutral-300 bg-white text-neutral-700"
              }`}
            >
              Comment Management
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            {dashboardMode === "blog" ? (
              <BlogDashboard
                blogs={blogs?.data || []}
                isBlogsLoading={isBlogsLoading}
                onEdit={handleOpenEditModal}
              />
            ) : (
              <CommentDashboard
                comments={comments?.data || []}
                isCommentsLoading={isCommentsLoading}
              />
            )}
          </div>
        </div>
      </section>

      {openEditModal && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  )
}