import dotenv from "dotenv";
import OpenAI from "openai";
import { writeFile } from "fs/promises";
dotenv.config({ path: ".env.backend" });

const openAiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: openAiKey });

const generateImage = async (userPrompt) => {
  const img = await client.images.generate({
    model: "gpt-image-1-mini",
    prompt: userPrompt,
    n: 1,
    size: "1024x1024",
  });

  const imageBuffer = Buffer.from(img.data[0].b64_json, "base64");
  await writeFile("output.png", imageBuffer);
};

generateImage(
  "A ninja resembling Sub-Zero from Mortal Kombat, that throws an ice globe power ball",
);
