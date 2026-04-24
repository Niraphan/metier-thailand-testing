// app/api/blogs/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
        orderBy: {
          created_at: "desc",
        },
        select: {
          blog_id: true,
          title: true,
          short_description: true,
          slug: true,
          status: true,
          thumbnail: true,
          view_amount: true,
          created_at: true,
          blog_picture: {
            select: {
              image_url: true,
              blog_picture_id: true,
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("GET /api/blogs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      {
        status: 500,
      }
    );
  }
}