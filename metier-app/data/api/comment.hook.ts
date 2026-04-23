import axios from "axios"
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

export const postComment = ({ blogId, comment, username }: { blogId: string, comment: string, username: string }) => {
  return axios.post(`${baseUrl}/comment`, { blogId, comment, username })
}