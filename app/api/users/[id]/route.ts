import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { index } from "@/lib/search";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!currentUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(currentUser);
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return Response.json({ error: "Failed to get user" }, { status: 500 });
  }
}

interface UpdateUserProps {
  email?: string;
  username?: string;
  password?: string;
  updatedAt?: Date;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { email, username, password } = body;

    if (!email && !username && !password) {
      return Response.json(
        { error: "At least one field (email, username, password) is required" },
        { status: 400 }
      );
    }

    const updateData: UpdateUserProps = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    updateData.updatedAt = new Date();

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    await index.upsert([
      {
        id: updatedUser.id,
        content: {
          email: updatedUser.email,
          username: updatedUser.username,
        },
        metadata: {
          id: updatedUser.id,
          password: updatedUser.password,
        },
      },
    ]);

    return Response.json(updatedUser);
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();

    if (!deletedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    await index.delete(userId);

    return Response.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
