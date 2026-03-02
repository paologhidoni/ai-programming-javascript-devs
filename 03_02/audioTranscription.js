/**
 * Voice audio transcription
 */

/* CURL - An example call that can be sent from the terminal */
// curl --request POST \                                                     ─╯
// --url https://api.openai.com/v1/audio/transcriptions \
// --header "Authorization: Bearer <api-key-here>" \
// --header "Content-Type: multipart/form-data" \
// --form file=@/Users/paolo/Desktop/hey.mp3 \
// --form model=gpt-4o-mini-transcribe

import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables from .env.backend file
dotenv.config({ path: ".env.backend" });

// Access the API key from process.env
const openAIKey = process.env.OPENAI_API_KEY;
const openaiClient = new OpenAI({ apiKey: openAIKey });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audioFilePath = path.join(__dirname, "./assets/hey.mp3");

async function audioTranscription() {
  const transcription = await openaiClient.audio.transcriptions.create({
    file: fs.createReadStream(audioFilePath),
    model: "gpt-4o-mini-transcribe",
  });

  console.log(transcription.text);
}

audioTranscription();
