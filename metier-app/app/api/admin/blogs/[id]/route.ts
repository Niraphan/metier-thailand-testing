// app/api/admin/blogs/[id]/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/core/lib/prisma"

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } = await context.params
    const authToken = request.headers.get("authorization")
    const body = await request.json()

    const {
      title,
      short_description,
      description,
      thumbnail,
      status,
      slug,
      images,
    } = body

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    const blog = await prisma.blog.findUnique({
      where: {
        blog_id: id,
      },
    })

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        {
          status: 404,
        }
      )
    }

    if (slug) {
      const existingBlog = await prisma.blog.findFirst({
        where: {
          slug,
          NOT: {
            blog_id: id,
          },
        },
      })

      if (existingBlog) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug already exists",
          },
          {
            status: 400,
          }
        )
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        blog_id: id,
      },

      data: {
        ...(title && { title }),

        ...(short_description && {
          short_description,
        }),

        ...(description && {
          description,
        }),

        ...(thumbnail && {
          thumbnail,
        }),

        ...(status && {
          status,
        }),

        ...(slug && {
          slug,
        }),

        updated_at: new Date(),

        ...(images && {
          blog_picture: {
            deleteMany: {},

            create: images.map(
              (image_url: string) => ({
                image_url,
              })
            ),
          },
        }),
      },

      include: {
        blog_picture: {
          select: {
            blog_picture_id: true,
            image_url: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    })
  } catch (error) {
    console.error(
      "PATCH /api/admin/blogs/[id] error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
      },
      {
        status: 500,
      }
    )
  }
}

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } = await context.params

    await prisma.blog.update({
      where: {
        blog_id: id,
      },
      data: {
        view_amount: {
          increment: 1,
        },
      },
    })

    const blog = await prisma.blog.findUnique({
      where: {
        blog_id: id,
      },

      include: {
        blog_picture: {
          select: {
            blog_picture_id: true,
            image_url: true,
          },
        },

        blog_comment: {
          where: {
            status: "APPROVED",
          },

          orderBy: {
            created_at: "desc",
          },

          select: {
            blog_comment_id: true,
            username: true,
            comment: true,
            created_at: true,
          },
        },
      },
    })

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({
      success: true,
      data: blog,
    })
  } catch (error) {
    console.error(
      "GET /api/admin/blogs/[id] error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog detail",
      },
      {
        status: 500,
      }
    )
  }
}