import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.configDotenv({ path: ".env.backend" });

const openAiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: openAiKey });

async function getInterviewQuestions(devType) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Provide 3 questions to present a software developer position canditate with. 
        The questions need to be tailored to consider their specialization as software developers: ${devType} `,
      },
      {
        role: "system",
        content:
          "You are an expert interviewer in the software development sector, used to interviewing canditates.",
      },
    ],
  });

  console.log(response.choices[0].message);
}

getInterviewQuestions("frontend javascript");
getInterviewQuestions("backend javascript");
getInterviewQuestions("python");
