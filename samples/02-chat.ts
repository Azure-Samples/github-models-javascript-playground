// This example demonstrates how to use the OpenAI API to chat with a model.

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
