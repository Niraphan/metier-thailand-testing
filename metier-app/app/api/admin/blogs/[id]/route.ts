// app/api/admin/blogs/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function PATCH(
    request: Request,
    context: {
        params: Promise<{
            id: string;
        }>;
    }
) {
    try {
        const { id } = await context.params;
        const authToken = request.headers.get("authorization");
        const body = await request.json();

        const {
            title,
            short_description,
            description,
            thumbnail,
            status,
            slug,
        } = body;

        if (!authToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const blog = await prisma.blog.findUnique({
            where: {
                blog_id: id,
            },
        });

        if (!blog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                {
                    status: 404,
                }
            );
        }

        if (slug) {
            const existingBlog = await prisma.blog.findFirst({
                where: {
                    slug,
                    NOT: {
                        blog_id: id,
                    },
                },
            });

            if (existingBlog) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Slug already exists",
                    },
                    {
                        status: 400,
                    }
                );
            }
        }

        const updatedBlog = await prisma.blog.update({
            where: {
                blog_id: id,
            },
            data: {
                ...(title && { title }),
                ...(short_description && { short_description }),
                ...(description && { description }),
                ...(thumbnail && { thumbnail }),
                ...(status && { status }),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        console.error("PATCH /api/admin/blogs/[id] error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update blog",
            },
            {
                status: 500,
            }
        );
    }
}