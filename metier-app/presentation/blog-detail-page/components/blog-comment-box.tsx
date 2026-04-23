"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as yup from "yup"
import { postComment } from "@/data/api/comment.hook"

const commentSchema = yup.object({
  username: yup
    .string()
    .required("กรุณากรอกชื่อ")
    .matches(
      /^[ก-๙0-9\s]+$/,
      "กรอกได้เฉพาะภาษาไทย ตัวเลข และเว้นวรรค"
    )
    .max(50, "ชื่อต้องไม่เกิน 50 ตัวอักษร"),

  comment: yup
    .string()
    .required("กรุณากรอกความคิดเห็น")
    .min(5, "ความคิดเห็นต้องมีอย่างน้อย 5 ตัวอักษร")
    .max(500, "ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร"),
})

export const BlogCommentBox = ({ blogId }: { blogId: string }) => {
  const [username, setUsername] = useState("")
  const [comment, setComment] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [errors, setErrors] = useState({
    username: "",
    comment: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await commentSchema.validate(
        {
          username,
          comment,
        },
        {
          abortEarly: false,
        }
      )

      setErrors({
        username: "",
        comment: "",
      })

      setIsSubmitting(true)

      await postComment({
        blogId,
        username,
        comment,
      })

      setUsername("")
      setComment("")

      setIsSuccess(true)

      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formErrors = {
          username: "",
          comment: "",
        }

        error.inner.forEach((err) => {
          if (err.path) {
            formErrors[err.path as keyof typeof formErrors] = err.message
          }
        })

        setErrors(formErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 py-8">
      <h1 className="text-xl md:text-2xl pl-4 border-l-3 border-primary font-bold">
        แสดงความคิดเห็น
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg"
      >
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              ส่งความคิดเห็นสำเร็จแล้ว 🎉
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            ชื่อของคุณ
          </label>

          <input
            type="text"
            placeholder="กรอกชื่อ"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />

          {errors.username && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {errors.username}
            </motion.span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            ความคิดเห็น
          </label>

          <textarea
            rows={5}
            placeholder="พิมพ์ความคิดเห็นของคุณ"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />

          {errors.comment && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {errors.comment}
            </motion.span>
          )}
        </div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "กำลังส่ง..." : "ส่งความคิดเห็น"}
          </motion.button>
        </div>
      </form>
    </div>
  )
}