"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import * as yup from "yup"
import "react-quill-new/dist/quill.snow.css"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

import { TextInput } from "@/core/components/input/text-input"
import { Blog } from "@/data/domain/blog.domain"
import { usePatchBlog } from "@/data/api/admin.hook"

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  { ssr: false }
)

const schema = yup.object({
  title: yup.string().required("กรุณากรอก title"),
  short_description: yup
    .string()
    .required("กรุณากรอก short description"),
  slug: yup.string().required("กรุณากรอก slug"),
  thumbnail: yup.string().required("กรุณากรอก thumbnail"),
  description: yup
    .string()
    .required("กรุณากรอก description"),
})

const labelClass =
  "block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5"

export const EditBlogModal = ({
  blog,
  onClose,
}: {
  blog: Blog
  onClose: () => void
}) => {
  const { mutateAsync: patchBlog, isPending } =
    usePatchBlog()

  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] =
    useState("")
  const [slug, setSlug] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<
    "PUBLISH" | "UNPUBLISH"
  >("PUBLISH")

  const [images, setImages] = useState<string[]>([""])

  const [errors, setErrors] = useState({
    title: "",
    short_description: "",
    slug: "",
    thumbnail: "",
    description: "",
  })

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "")
      setShortDescription(blog.short_description || "")
      setSlug(blog.slug || "")
      setThumbnail(blog.thumbnail || "")
      setDescription(blog.description || "")
      setStatus(blog.status || "PUBLISH")

      setImages(
        blog.blog_picture?.length
          ? blog.blog_picture.map(
              (item) => item.image_url
            )
          : [""]
      )
    }
  }, [blog])

  const handleAddImage = () => {
    if (images.length >= 6) return
    setImages([...images, ""])
  }

  const handleRemoveImage = (
    index: number
  ) => {
    if (images.length === 1) return

    setImages(
      images.filter((_, i) => i !== index)
    )
  }

  const handleChangeImage = (
    index: number,
    value: string
  ) => {
    const updatedImages = [...images]
    updatedImages[index] = value
    setImages(updatedImages)
  }

  const handleSubmit = async () => {
    try {
      await schema.validate(
        {
          title,
          short_description: shortDescription,
          slug,
          thumbnail,
          description,
        },
        {
          abortEarly: false,
        }
      )

      await patchBlog({
        id: blog.blog_id,
        payload: {
          title,
          short_description: shortDescription,
          slug,
          thumbnail,
          description,
          status,
          images: images.filter(
            (img) => img.trim() !== ""
          ),
        },
      })

      onClose()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formErrors = {
          title: "",
          short_description: "",
          slug: "",
          thumbnail: "",
          description: "",
        }

        error.inner.forEach((err) => {
          if (err.path) {
            formErrors[
              err.path as keyof typeof formErrors
            ] = err.message
          }
        })

        setErrors(formErrors)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">
          Edit Blog
        </h2>

        <div className="space-y-5">
          <TextInput
            label="Title"
            id="title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            error={errors.title}
          />

          <TextInput
            label="Short Description"
            id="short_description"
            value={shortDescription}
            onChange={(e) =>
              setShortDescription(
                e.target.value
              )
            }
            error={errors.short_description}
          />

          <TextInput
            label="Slug"
            id="slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
            error={errors.slug}
          />

          <TextInput
            label="Thumbnail"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) =>
              setThumbnail(e.target.value)
            }
            error={errors.thumbnail}
          />

          {/* Multiple Images */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className={labelClass}>
                Blog Images (max 6)
              </label>

              <button
                type="button"
                onClick={handleAddImage}
                disabled={images.length >= 6}
                className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50"
              >
                <AddIcon />
              </button>
            </div>

            {images.map((image, index) => (
              <div
                key={index}
                className="flex gap-3 items-center"
              >
                <div className="flex-1">
                  <TextInput
                    label={`Image ${index + 1}`}
                    id={`image-${index}`}
                    value={image}
                    onChange={(e) =>
                      handleChangeImage(
                        index,
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveImage(index)
                  }
                  disabled={images.length === 1}
                  className="mt-7 h-10 w-10 rounded-lg border border-red-200 text-red-500 flex items-center justify-center disabled:opacity-50"
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>
              Description
            </label>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setStatus("PUBLISH")
              }
              className={`flex-1 rounded-lg p-3 font-semibold ${
                status === "PUBLISH"
                  ? "bg-green-500 text-white"
                  : "border"
              }`}
            >
              Publish
            </button>

            <button
              type="button"
              onClick={() =>
                setStatus("UNPUBLISH")
              }
              className={`flex-1 rounded-lg p-3 font-semibold ${
                status === "UNPUBLISH"
                  ? "bg-red-500 text-white"
                  : "border"
              }`}
            >
              Unpublish
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-lg bg-primary px-5 py-2 text-white"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}