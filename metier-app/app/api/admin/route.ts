// app/api/admin/me/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";
import jwt from "jsonwebtoken";

type JwtPayload = {
  adminId: string;
  username: string;
};

export async function GET(request: Request) {
  try {
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

    const token = authToken.replace("Bearer ", "");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const admin = await prisma.admin.findUnique({
      where: {
        username: decoded.username,
      },
      select: {
        admin_id: true,
        username: true,
        created_at: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin fetched successfully",
      data: admin,
    });
  } catch (error) {
    console.error("GET /api/admin/me error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
      },
      {
        status: 401,
      }
    );
  }
}