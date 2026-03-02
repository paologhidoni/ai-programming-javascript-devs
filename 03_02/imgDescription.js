/**
 * Creating image descriptions based on a URL
 */

import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables from .env.backend file
dotenv.config({ path: ".env.backend" });

// Access the API key from process.env
const openAIKey = process.env.OPENAI_API_KEY;
const openaiClient = new OpenAI({ apiKey: openAIKey });
const imageUrl =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.api.playstation.com%2Fvulcan%2Fap%2Frnd%2F202511%2F2419%2F50e2d914c211a2e9f0cce13b1e631719aa0c888f3f993bf9.png&f=1&nofb=1&ipt=0001152df203afbff629096daa75ffd99dfcc1bec1395a74e0b65a6f0a103237";

async function imageDescription() {
  let response = await openaiClient.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this picture." },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    model: "gpt-4o-mini",
    // max_tokens: 200
  });

  console.log(response.choices[0].message);
}

imageDescription();
