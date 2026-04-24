// app/api/admin/blogs/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function PATCH(
  request: Request,
) {
  try {

    const authToken = request.headers.get("authorization");
    const body = await request.json();

    const { status, blog_comment_id } = body;

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

    const comment = await prisma.blog_comment.findUnique({
      where: {
        blog_comment_id: blog_comment_id,
      },
    });

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedComment = await prisma.blog_comment.update({
      where: {
        blog_comment_id: blog_comment_id,
      },
      data: {
        ...(status && { status }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.error("PATCH /api/admin/comments/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update comment",
      },
      {
        status: 500,
      }
    );
  }
}