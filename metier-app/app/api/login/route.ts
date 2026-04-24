import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // validation
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "username and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        {
          status: 401,
        }
      );
    }

    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        adminId: admin.admin_id,
        username: admin.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        admin_id: admin.admin_id,
        username: admin.username,
        token: token,
      },
    });
  } catch (error) {
    console.error("POST /api/admin/login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to login",
      },
      {
        status: 500,
      }
    );
  }
}