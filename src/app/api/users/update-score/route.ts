import { NextResponse } from "next/server"
import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const { username, correct } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Get current user data
    const existingUser = await db.select().from(users).where(eq(users.username, username))

    if (existingUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = existingUser[0]

    // Update user score
    const updatedUser = await db
      .update(users)
      .set({
        score: correct ? user.score + 1 : user.score - 1,
        correct_count: correct ? user.correct_count + 1 : user.correct_count,
        wrong_count: correct ? user.wrong_count : user.wrong_count + 1,
        updated_at: new Date(),
      })
      .where(eq(users.username, username))
      .returning()

    return NextResponse.json({
      user: updatedUser[0],
      message: "Score updated successfully",
    })
  } catch (error) {
    console.error("Error updating user score:", error)
    return NextResponse.json({ error: "Failed to update score" }, { status: 500 })
  }
}

