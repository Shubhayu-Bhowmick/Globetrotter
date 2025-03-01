import { NextResponse } from "next/server"
import { db } from "@/db/drizzle"
import { destinations } from "@/db/schema"
import { sql } from "drizzle-orm"

export async function GET() {
  try {
    // Fetch 4 random destinations using SQL random ordering
    const randomDestinations = await db
      .select()
      .from(destinations)
      .orderBy(sql.raw("RANDOM()"))
      .limit(4)

    if (randomDestinations.length < 4) {
      return NextResponse.json({ error: "Not enough destinations" }, { status: 500 })
    }

    // Select one destination as the correct answer
    const correctDestination = randomDestinations[0]

    // Remaining destinations as wrong options
    const wrongOptions = randomDestinations.slice(1).map(dest => dest.city)

    // Combine correct answer and wrong options
    const options = [correctDestination.city, ...wrongOptions]

    // Shuffle options using Fisher-Yates algorithm
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    return NextResponse.json({
      destination: correctDestination,
      options,
    })
  } catch (error) {
    console.error("Error fetching random destination:", error)
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 })
  }
}
