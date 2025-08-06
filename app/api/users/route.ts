import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest } from "next/server";
import { or, ilike, desc } from "drizzle-orm";
import { index } from "@/lib/search";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    let allUsers;

    if (query) {
      // Search ใน email และ username (case-insensitive)
      allUsers = await db
        .select()
        .from(users)
        .where(
          or(
            ilike(users.email, `%${query}%`),
            ilike(users.username, `%${query}%`)
          )
        )
        .orderBy(desc(users.updatedAt));
    } else {
      // ถ้าไม่มี query ให้ return ทุก user
      allUsers = await db.select().from(users).orderBy(desc(users.updatedAt));
    }

    return Response.json(allUsers);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to get users" }, { status: 500 });
  }
}

interface CreateUserProps {
  email: string;
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, username, password }: CreateUserProps = await req.json();

    if (!email || !username || !password) {
      return Response.json(
        { error: "Email, username, and password are required" },
        { status: 400 }
      );
    }

    const [newUser] = await db
      .insert(users)
      .values({ email, username, password })
      .returning();

    await index.upsert([
      {
        id: newUser.id,
        content: {
          email,
          username,
        },
        metadata: {
          id: newUser.id,
          password: password,
        },
      },
    ]);

    return Response.json(newUser);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to create new user" },
      { status: 500 }
    );
  }
}
