// This example demonstrates how to use GitHub Models to generate chat
// completions and embeddings using different models.

import process from "node:process";
import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const chatCompletion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Say hello!" }],
});

console.log(chatCompletion.choices[0].message.content);

const embeddings = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: ["Once upon a time", "The end."],
});

for (const embedding of embeddings.data) {
  console.log(embedding.embedding.slice(0, 3));
}
