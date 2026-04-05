import OpenAI from 'openai';
import { getBestAnswer } from './qaMatcher';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'dummy_key',
  dangerouslyAllowBrowser: true 
});

const SYSTEM_PROMPT = `
You are an AI assistant for a Cordyceps militaris cultivation platform.
Your job is to answer user questions clearly, accurately, and practically.

STRICT RULES:
* Do NOT repeat the same answer for different questions
* Understand the intent of the question, not just keywords
* Give step-by-step answers when needed
* Keep answers simple and farmer-friendly
* Avoid generic answers
* If similar questions are asked, vary explanation naturally

DOMAIN KNOWLEDGE:
You specialize in:
* Cordyceps militaris cultivation
* Mushroom farming techniques
* Indoor farming systems
* Contamination control
* Temperature & humidity management
* Harvesting & drying
* Business & franchise model
* Marketplace & selling

ANSWER STYLE:
* Short but informative (3–6 lines)
* Use bullet points if needed
* Give practical examples
* Avoid complex scientific terms unless required

INTELLIGENCE RULE:
If user question is:
* vague → ask for clarification
* similar to previous → rephrase answer differently
* unknown → give closest helpful answer

GOAL: Provide valuable, non-repetitive, accurate answers that help farmers succeed.
`;

export async function askSmartAssistant(messageHistory, newQuestion) {
  // If OpenAI isn't configured, immediately fallback to offline mode
  if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'dummy_key' || import.meta.env.VITE_OPENAI_API_KEY === '') {
    return getBestAnswer(newQuestion);
  }

  try {
    const formattedHistory = messageHistory.map(msg => ({
      role: msg.sender === 'ai' ? 'assistant' : 'user',
      content: msg.text
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast, cheap, smart
      temperature: 0.6,
      max_tokens: 300,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...formattedHistory,
        { role: "user", content: newQuestion }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error, falling back to offline knowledge:", error);
    return getBestAnswer(newQuestion);
  }
}
