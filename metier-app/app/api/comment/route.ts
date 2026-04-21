// app/api/comments/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, comment, blogId } = body;

    // validation required fields
    if (!username || !comment || !blogId) {
      return NextResponse.json(
        {
          success: false,
          message: "username, comment and blogId are required",
        },
        {
          status: 400,
        }
      );
    }

    // validate comment: Thai + number only
    const thaiAndNumberRegex = /^[ก-๙0-9\s]+$/;

    if (!thaiAndNumberRegex.test(comment)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment must contain only Thai characters and numbers",
        },
        {
          status: 400,
        }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: {
        blog_id: blogId,
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

    const newComment = await prisma.blog_comment.create({
      data: {
        blog_id: blogId,
        username,
        comment,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment submitted successfully",
        data: newComment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/comments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create comment",
      },
      {
        status: 500,
      }
    );
  }
}