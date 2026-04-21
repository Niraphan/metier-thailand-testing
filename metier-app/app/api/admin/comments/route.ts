import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";

export async function GET(request: Request) {
    const authToken = request.headers.get("authorization");

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

    const comments = await prisma.blog_comment.findMany({
        include: {
            blog: {
                select: {
                    blog_id: true,
                    title: true,
                }
            }
            
        },
    });

    return NextResponse.json({
        success: true,
        data: comments,
    });
}