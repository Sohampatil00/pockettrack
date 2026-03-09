import { GoogleGenAI } from '@google/genai';
import type { Transaction } from '../types';

// Initialize the Gemini client with the provided API key
// Security Note: In a real-world app, this key should not be exposed in the client-side code.
// It should be stored in an environment variable and accessed via a backend proxy.
const ai = new GoogleGenAI({ apiKey: 'AIzaSyAKMUnaRezQYa9rS_mkL1hNystzMbjIXqE' });

export async function generateInsights(transactions: Transaction[]): Promise<string> {
  if (!transactions || transactions.length === 0) {
    return "You don't have enough transactions yet for me to analyze. Start adding your income and expenses, and check back soon!";
  }

  // Create a dense summary to save context window and avoid sending unnecessary PII
  const summaryData = transactions.map(tx => ({
    date: tx.date,
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    desc: tx.description
  }));

  const prompt = `
You are an expert personal finance advisor named PocketTrack AI. 
I am going to provide you with my recent financial transactions in JSON format.
Analyze my spending habits and provide 2-3 short, actionable, and personalized insights. 
Be encouraging but realistic. Format your response in clean Markdown (use bullet points or bold text where appropriate). Keep it under 150 words total. Do not include raw JSON or code blocks in your output.
IMPORTANT: The amounts provided are in Indian Rupees (INR). ALWAYS use the ₹ symbol (never the $ sign) when referencing amounts.

User's Transactions:
\`\`\`json
${JSON.stringify(summaryData, null, 2)}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "I'm sorry, I couldn't generate insights at this time.";
  } catch (error) {
    console.error('Error generating AI insights:', error);
    throw new Error('Failed to communicate with AI service.');
  }
}
