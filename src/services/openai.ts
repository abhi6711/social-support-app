import axios from 'axios';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

export async function getSuggestion(prompt: string, signal?: AbortSignal): Promise<string> {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) {
    // In development, return a mock suggestion for easier testing
    return `Suggested text: ${prompt}`;
  }

  const response = await axios.post(OPENAI_URL, {
    model: MODEL,
    messages: [
      { role: 'system', content: 'You help citizens describe their financial and employment situations clearly and respectfully.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.5,
    max_tokens: 250,
  }, {
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    signal,
    timeout: 15000,
  });

  const content = response.data?.choices?.[0]?.message?.content?.trim();
  return content || '';
}

export function buildPrompt(field: 'financialSituation' | 'employmentCircumstances' | 'reasonForApplying'): string {
  switch (field) {
    case 'financialSituation':
      return 'Help me describe my current financial situation in a respectful, clear way.';
    case 'employmentCircumstances':
      return 'Help me describe my current employment circumstances in a respectful, clear way.';
    case 'reasonForApplying':
      return 'Help me explain my reason for applying for financial assistance.';
    default:
      return 'Help me write this description clearly.';
  }
}




