import axios from "axios";
import { BlogDetailResponse, BlogResponse } from "../domain/blog.domain";

const baseUrl = process.env.BACKEND_ENDPOINT

export const getBlogs = async (
  name: string = "",
  page: number = 1,
  limit: number = 10
) => {
  const params = new URLSearchParams()

  if (name) {
    params.append("name", name)
  }

  params.append("page", String(page))
  params.append("limit", String(limit))

  const response = await axios.get<BlogResponse>(
    `${baseUrl}/blogs?${params.toString()}`
  )

  return response.data
}

export const getBlogBySlug = async (slug: string) => {
  const response = await axios.get<BlogDetailResponse>(`${baseUrl}/blogs/${slug}`)
  return response.data
}

