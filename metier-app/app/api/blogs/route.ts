import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const blogName = searchParams.get("name") || "";

    const whereCondition = {
      status: "PUBLISH" as const,
      title: {
        contains: blogName,
        mode: "insensitive" as const,
      },
    };

    const total = await prisma.blog.count({
      where: whereCondition,
    });

    const blogs = await prisma.blog.findMany({
      where: whereCondition,
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
      total,
      totalPages: Math.ceil(total / limit),
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