// This example demonstrates how to use embeddings to classify a text into
// a vector and search for similar vectors.
//
// We use a different model to generate embeddings for the query and the texts.
// See https://github.com/marketplace/models/azure-openai/text-embedding-3-small
// for more information about the model.

import process from "node:process";
import { OpenAI } from "openai";
import { LocalIndex } from "vectra";

const query = "fruit";

const texts = [
  "The red fox jumped over the lazy dog.",
  "A green apple a day keeps the doctor away.",
  "The blue whale is the largest animal in the ocean.",
  "Oranges are rich in vitamin C and taste sweet.",
  "My cat loves playing with a yellow ball.",
  "Bananas are a popular fruit among monkeys.",
  "The black panther moves silently in the night.",
  "The computer screen displayed a vibrant purple background.",
  "Cherries are small, red, and very sweet.",
  "The golden retriever is a friendly and loyal dog.",
];

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

// Create a vector database
const index = new LocalIndex(".vectordb");

// Only ingest the texts and generate vectors once
if (!(await index.isIndexCreated())) {
  await index.createIndex();

  // Generate vectors for the texts
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  // Insert the vectors into the database
  for (let i = 0; i < texts.length; i++) {
    await index.insertItem({
      vector: embeddings.data[i].embedding,
      metadata: { text: texts[i] },
    });
  }
}

// Transform the query into a vector
const queryEmbedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: query,
});
const vector = queryEmbedding.data[0].embedding;

// Search for similar vectors
const results = await index.queryItems(vector, 3);

console.log(`Top 3 matches for "${query}":`);
for (const result of results) {
  console.log(`[score: ${result.score}] ${result.item.metadata.text}`);
}
