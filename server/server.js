import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", function (req, res) {
  res.json("this is just the end point");
});

app.post("/chat", async function (req, res) {
  const prompt = req.body.prompt;

  if (!prompt) {
    res.json("No prompt given.");
  } else {
    const geminiResponse = await ai.models.generateContent({
      // we decalre a variable so that we can use the APIs response.
      model: "gemini-2.0-flash", // we specify a model to usel in this case, gemini-2.0-flash is the cheapest!
      contents: prompt, // we give our 'prompt' variable to the requests 'contents'. 'contents' is basically what the user types to the LLM.
      config: {
        systemInstruction: "You are a very helpful assistant.", // this is how we prompt engineer and give the LLM guided instructions.
      },
    });

    res.json(geminiResponse.text);

    console.log("Geminis response is", geminiResponse.text);
  }
});

app.listen(8222, function () {
  console.log("Server is running on port 8222");
});
