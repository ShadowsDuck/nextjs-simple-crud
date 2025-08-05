import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET() {
  try {
    const allUsers = await db.select().from(users);

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

    return Response.json(newUser);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to create new user" },
      { status: 500 }
    );
  }
}
