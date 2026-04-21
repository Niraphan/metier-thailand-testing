// app/api/admin/blogs/[id]/pictures/route.ts

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
    const body = await request.json();

    const { images } = body;

    if (!Array.isArray(images)) {
      return NextResponse.json(
        {
          success: false,
          message: "Images must be an array",
        },
        {
          status: 400,
        }
      );
    }

    if (images.length > 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum 6 images allowed",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.blog_picture.deleteMany({
      where: {
        blog_id: id,
      },
    });

    await prisma.blog_picture.createMany({
      data: images.map((image_url: string) => ({
        blog_id: id,
        image_url,
      })),
    });

    return NextResponse.json({
      success: true,
      message: "Blog pictures updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog pictures",
      },
      {
        status: 500,
      }
    );
  }
}