import { QA_DATA } from './qaData';

// Very lightweight pure JS offline NLP matcher
export function getBestAnswer(userInput) {
  const query = userInput.toLowerCase().replace(/[^\w\s]/g, '').trim();
  if (!query) return null;

  const queryTokens = new Set(query.split(/\s+/));
  
  let bestMatch = null;
  let highestScore = 0;

  for (const item of QA_DATA) {
    const qClean = item.q.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const qTokens = new Set(qClean.split(/\s+/));
    
    let intersection = 0;
    for (const token of queryTokens) {
      if (qTokens.has(token)) intersection++;
    }

    // A simple Jaccard similarity or overlap score
    // Add bonus if the query is a near-exact substring match
    let score = intersection / (queryTokens.size + qTokens.size - intersection);
    if (qClean.includes(query) || query.includes(qClean)) {
      score += 0.5; 
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Threshold to avoid returning a very unrelated answer
  if (highestScore < 0.15) {
    return "I am not exactly sure about that. Could you ask about cultivation, temperature, harvest, or substrates?";
  }

  return bestMatch.a;
}
