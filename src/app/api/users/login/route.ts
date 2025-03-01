import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { username, score = 0, correctAnswers = 0, wrongAnswers = 0 } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.username, username));

    if (existingUser.length > 0) {
      const user = existingUser[0]; // Get first user

      return NextResponse.json({
        user: {
          id: user.id,
          username: user.username, // Ensure it's just a string
          score: user.score,
          correct_count: user.correct_count,
          wrong_count: user.wrong_count,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
        message: "Login successful",
      });
    } else {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          username,
          score,
          correct_count: correctAnswers,
          wrong_count: wrongAnswers,
        })
        .returning();

      return NextResponse.json({
        user: {
          id: newUser.id,
          username: newUser.username, // Ensure it's just a string
          score: newUser.score,
          correct_count: newUser.correct_count,
          wrong_count: newUser.wrong_count,
          created_at: newUser.created_at,
          updated_at: newUser.updated_at,
        },
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error("Error during login/registration:", error);
    return NextResponse.json({ error: "Failed to process login" }, { status: 500 });
  }
}
