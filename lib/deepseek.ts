import Anthropic from "@anthropic-ai/sdk";

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY manquante dans .env.local");
}

/**
 * Client DeepSeek via SDK Anthropic.
 * DeepSeek expose une API compatible Anthropic — on garde le même SDK.
 */
export const deepseek = new Anthropic({
  baseURL: "https://api.deepseek.com/anthropic",
  apiKey: process.env.DEEPSEEK_API_KEY,
});
