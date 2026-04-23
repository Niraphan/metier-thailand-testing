// app/api/blogs/[slug]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    const { slug } = await context.params;

    await prisma.blog.update({
      where: {
        slug,
        status: "PUBLISH",
      },
      data: {
        view_amount: {
          increment: 1,
        },
      },
    });

    const blog = await prisma.blog.findUnique({
      where: {
        slug,
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

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("GET /api/blogs/[slug] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog detail",
      },
      {
        status: 500,
      }
    );
  }
}