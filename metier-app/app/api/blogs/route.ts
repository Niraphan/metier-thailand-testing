// app/api/blogs/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISH",
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        blog_id: true,
        title: true,
        short_description: true,
        slug: true,
        thumbnail: true,
        view_amount: true,
        created_at: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return NextResponse.json({
      success: true,
      data: blogs,
      page,
      limit,
      total: blogs.length,
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