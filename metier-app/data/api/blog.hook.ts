import axios from "axios";
import { BlogDetailResponse, BlogResponse } from "../domain/blog.domain";

const baseUrl = process.env.BACKEND_ENDPOINT

export const getBlogs = async () => {
  const response = await axios.get<BlogResponse>(`${baseUrl}/blogs`);
  return response.data
};

export const getBlogBySlug = async (slug: string) => {
  const response = await axios.get<BlogDetailResponse>(`${baseUrl}/blogs/${slug}`);
  return response.data
} 

