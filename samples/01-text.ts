// This example demonstrates how to use the OpenAI API to generate text.

import process from "node:process";
import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const completion = await openai.completions.create({
  model: "gpt-4o-mini",
  prompt: "Say hello in French: ",
});

console.log(completion.choices[0].text);
