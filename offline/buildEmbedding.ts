import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import 'dotenv/config';

const MODEL = "text-embedding-3-small";
const DIM = 512; 
const INPUT_FILE = path.resolve("./offline/embeddings_data.json");
//console.log(INPUT_FILE);
const OUTPUT_FILE = path.resolve("./offline/embeddings_data_with_vectors.json");

// Simple rate-limit helper (linear backoff)
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const raw = await fs.readFile(INPUT_FILE, "utf-8");
  const data: Array<any> = JSON.parse(raw);

  // Pull texts (defensively handle shape)
  const texts = data.map((item, i) => {
    const txt = item?.quote?.content;
    if (typeof txt !== "string" || !txt.trim()) {
      throw new Error(`Item ${i} missing quote.content`);
    }
    return txt;
  });

  const BATCH = 100;
  const all: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH) {
    const slice = texts.slice(i, i + BATCH);
    try {
      const resp = await client.embeddings.create({
        model: MODEL,
        input: slice,
        dimensions: DIM,
      });
      for (const r of resp.data) all.push(r.embedding as number[]);
      console.log(`Embedded ${Math.min(i + BATCH, texts.length)}/${texts.length}`);
    } catch (err: any) {
      const status = err?.status || err?.response?.status;
      if (status === 429 || (status >= 500 && status < 600)) {
        console.warn("Rate limit/server error—retrying in 1s…");
        await sleep(1000);
        i -= BATCH; // redo this batch
        continue;
      }
      throw err;
    }
  }

  // Attach embeddings back
  data.forEach((item, i) => {
    item.embedding = all[i];
  });

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Wrote ${all.length} embeddings → ${OUTPUT_FILE}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
