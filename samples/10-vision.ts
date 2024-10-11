// This example demonstrates how to use the OpenAI API to analyse pictures.

import process from "node:process";
import fs from "node:fs";
import { OpenAI } from "openai";

// Load an image and convert it to base64
const image = fs.readFileSync("./data/image.jpg");
const base64 = Buffer.from(image).toString("base64");

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const chatCompletion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{
    role: "user",
    content: [
      { type: "text", text: "Describe the image" },
      { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } }
    ]
  }],
});

console.log(chatCompletion.choices[0].message.content);
