// This example demonstrates how to use the OpenAI API to generate structured
// JSON output to chat prompts.

import process from "node:process";
import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const chatCompletion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: 'Say hello 5 different languages. Answer in JSON using { "<language>": "<result>" } format.',
    },
  ],
  response_format: {
    type: "json_object",
  },
});

console.log(chatCompletion.choices[0].message.content);
