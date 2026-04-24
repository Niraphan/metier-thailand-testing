import { QueryClient, useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/core/lib/axios"
import {  BlogResponse,  BlogCommentsResponse, BlogDetailResponse } from "@/data/domain/blog.domain"

export const useGetAllBlogs = () => {
    return useQuery<BlogResponse>({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await axiosInstance.get("/admin/blogs")
            return res.data
        },
    })
}

export const useGetBlogById = () => {
    return useQuery<BlogDetailResponse>({
        queryKey: ["blogs", "id"],
        queryFn: async () => {
            const res = await axiosInstance.get("/admin/blogs")
            return res.data
        },
    })
}

export const useGetAllComments = () => {
    return useQuery<BlogCommentsResponse>({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await axiosInstance.get("/admin/comments")
            return res.data
        },
    })
}

export const usePatchBlog = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["blogs"],
        mutationFn: async (payload: { id: string; payload: any }) => {
            const res = await axiosInstance.patch(`/admin/blogs/${payload.id}`, payload.payload)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs"],
            })
        }
    })

}

export const usePatchCommentStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: {
            id: string
            status: string
        }) => {
            const res = await axiosInstance.patch(
                `/admin/comments/${payload.id}`,
                {
                    blog_comment_id: payload.id,
                    status: payload.status,
                }
            )
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            })
        },
    })
} 

export const createBlogPicture = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["blog-pictures"],
        mutationFn: async (payload: { blog_id: string; image_url: string }) => {
            const res = await axiosInstance.patch(`/admin/blogs/${payload.blog_id}/pictures`, payload)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blog-pictures","blogs"],
            })
        },
    })
}