import { NextResponse } from "next/server";
import axios from "axios";

// Your system prompt for generating flashcards
const systemPrompt = `
You are a flashcard creator. You take in text and create exactly 10 flashcards. 
Each flashcard's front and back should be one sentence long. 
Return the flashcards in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  // Read the request body (the text to generate flashcards from)
  const data = await req.text();

  // Construct the full prompt
  const fullPrompt = systemPrompt + data;

  // Send a POST request to the Flashcard generation API
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC9RVYMEhuGSHUAonKgPWZ8LHzS5GOBOqQ",
    {
      prompt: fullPrompt,
      model: "text-davinci-003", // Update model if necessary
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer AIzaSyC9RVYMEhuGSHUAonKgPWZ8LHzS5GOBOqQAIzaSyC9RVYMEhuGSHUAonKgPWZ8LHzS5GOBOqQ`, // Replace with your API key
      },
    }
  );

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(response.data.choices[0].message.content);

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards);
}
