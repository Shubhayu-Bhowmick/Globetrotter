import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import { db } from "./db"; // Import your Drizzle database instance
//import { destinations } from "./schema"; // Import your Drizzle schema
import { db } from "@/db/drizzle";
import { destinations } from "@/db/schema";

const apiKey = process.env.GEMINI_API_KEY as string;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const prompt = `
Generate 5 unique travel destinations with the following JSON format:
[
  {
    "city": "City Name",
    "country": "Country Name",
    "clues": ["Clue 1", "Clue 2"],
    "fun_fact": ["Fun fact 1", "Fun fact 2"],
    "trivia": ["Trivia 1", "Trivia 2"]
  }
]
Make sure each destination is interesting and diverse!
`;

async function fetchDestinations() {
  try {
    const chatSession = model.startChat({ generationConfig, history: [] });
    const response = await chatSession.sendMessage(prompt);

    const rawResponse = response.response.text();
    console.log("Raw API Response:", rawResponse);

    const destinationsData = JSON.parse(rawResponse);

    if (!Array.isArray(destinationsData)) {
      throw new Error("API response is not an array");
    }

    return destinationsData;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

async function seedDatabase() {
  const newDestinations = await fetchDestinations();

  if (newDestinations.length === 0) {
    console.log("No new destinations to insert.");
    return;
  }

  try {
    await db.insert(destinations).values(newDestinations);
    console.log(`✅ Successfully inserted ${newDestinations.length} destinations.`);
  } catch (error) {
    console.error("Database insertion error:", error);
  }
}

seedDatabase();
