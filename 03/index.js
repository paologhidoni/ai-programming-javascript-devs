/**
 * Using Readline we can create a CLI in the terminal which allows us to create an interface
 * to ask questions and get answers.
 */

import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "readline";

// Load environment variables from .env.backend file
dotenv.config({ path: ".env.backend" });

// Access the API key from process.env
const openAIKey = process.env.OPENAI_API_KEY;
const openaiClient = new OpenAI({ apiKey: openAIKey });

const rl = readline.createInterface({
  input: process.stdin, // what the user types in
  output: process.stdout, // what the user receives back
});

rl.question("What do you want to ask the robots?", async (question) => {
  let res = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: question,
      },
      { role: "system", content: "You are a friendly robot!" },
    ],
  });

  console.log(res.choices[0].message);
  rl.close();
});
