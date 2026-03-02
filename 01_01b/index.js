import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables from .env.backend file
dotenv.config({ path: ".env.backend" });

// Access the API key from process.env
const openAIKey = process.env.OPENAI_API_KEY;
const openaiClient = new OpenAI({ apiKey: openAIKey });

async function getGameInfo(game) {
  const stream = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `For this videogame: ${game}, provide the following information structured as bulletpoints: 
        - Title
        - Year of release
        - Published by
        - Developed by
        - Game genre
        - Multiplayer options
        - Short Description
        `,
      },
      { role: "system", content: "You are a videogames history expert" },
    ],
    // Stream true allows to get access to the stream, to then be able to use chunks of it as they
    // are available instead of waitng for all of it
    stream: true,
    // Determines the length of the response
    // max_tokens: 64,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
}

getGameInfo("Tomb Raider");
