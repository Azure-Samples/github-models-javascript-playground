// This example demonstrates how to use the OpenAI API to stream the chat
// response to the console, to provide a more interactive experience.

import process from "node:process";
import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const chunks = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Say hello in pirate style. Be brief with nothing else." }],
  stream: true,
});

for await (const chunk of chunks) {
  process.stdout.write(chunk.choices[0].delta.content ?? "");
}
