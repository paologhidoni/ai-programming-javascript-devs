import { useState } from "react";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

/**
 * Use RunnableSequence and combine chains to:
 * - Answer a question
 * - Translate the answer to Italian
 */

/* ---------------- MODEL ---------------- */

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const parser = new StringOutputParser();

/* ---------------- STEP 1: GENERATE ANSWER ---------------- */

const generateAnswerPrompt = PromptTemplate.fromTemplate("{userPrompt}");

const generateAnswerChain = generateAnswerPrompt.pipe(model).pipe(parser);

/* ---------------- STEP 2: TRANSLATE ANSWER ---------------- */

const translatePrompt = PromptTemplate.fromTemplate(
  "Translate the following text to {language}: {originalAnswer}",
);

/* ---------------- FULL PIPELINE ---------------- */

const translateAnswerChain = RunnableSequence.from([
  {
    originalAnswer: generateAnswerChain,
    language: (input) => input.language,
  },
  translatePrompt,
  model,
  parser,
]);

/* ---------------- REACT COMPONENT ---------------- */

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    setResponse("");

    try {
      setLoading(true);

      const result = await translateAnswerChain.invoke({
        userPrompt: prompt,
        language: "Italian",
      });

      setResponse(result);
    } catch (err) {
      console.error(err);
      setResponse("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-950 flex flex-col items-center justify-center px-4 py-8 gap-8">
      <div className="w-2/3 flex flex-col gap-5 items-center">
        <label htmlFor="user-prompt" className="text-white font-bold">
          Ask anything
        </label>

        <textarea
          id="user-prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="px-2 py-3 bg-white rounded-lg w-full"
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={loading}
          className="px-1 py-1 bg-white rounded-lg min-w-25 cursor-pointer"
        >
          {loading ? "Thinking" : "Send"}
        </button>
      </div>

      {loading && <p className="text-white">Loading ...</p>}
      {response && <p className="text-white">{response}</p>}
    </div>
  );
}

export default App;
