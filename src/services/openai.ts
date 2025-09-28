import axios from 'axios';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

/**
 * Get AI suggestion from OpenAI API with fallback to mock suggestions on failure
 */
export async function getSuggestion(prompt: string, signal?: AbortSignal): Promise<string> {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  console.log('OpenAI API Key configured:', !!apiKey);
  console.log('API Key value:', apiKey ? `${apiKey.substring(0, 8)}...` : 'Not set');
  
  if (!apiKey) {
    // Return contextual mock suggestions based on the prompt
    return getMockSuggestion(prompt);
  }

  try {
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
    if (!content) {
      console.warn('OpenAI API returned empty response, using mock suggestion');
      return getMockSuggestion(prompt);
    }
    return content;
  } catch (error) {
    console.warn('OpenAI API failed, using mock suggestion:', error.message);
    return getMockSuggestion(prompt);
  }
}

/**
 * Build contextual prompts for different form fields to generate appropriate AI suggestions
 */
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

/**
 * Generate contextual mock suggestions with simulated API delay for development/testing
 */
function getMockSuggestion(prompt: string): Promise<string> {
  // Simulate API delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      if (prompt.includes('financial situation') || prompt.includes('financial')) {
        resolve(`I am currently experiencing financial difficulties due to unexpected circumstances. My monthly expenses exceed my available income, making it challenging to meet basic needs such as housing, utilities, and food. I am seeking assistance to help bridge this gap and stabilize my financial situation.`);
      } else if (prompt.includes('employment') || prompt.includes('job')) {
        resolve(`I am currently unemployed and actively seeking employment opportunities. I have been applying to various positions but have not yet secured a job that matches my skills and experience. The job search process has been challenging due to the competitive market and my need for flexible arrangements.`);
      } else if (prompt.includes('reason') || prompt.includes('applying')) {
        resolve(`I am applying for financial assistance because I am facing temporary financial hardship that affects my ability to meet essential living expenses. This support would help me maintain stability while I work to improve my financial situation through employment or other means.`);
      } else {
        resolve(`This is a mock suggestion to help you get started. Please replace this with your actual description. The AI assistance feature requires an OpenAI API key to be configured in your .env file.`);
      }
    }, 1000); // 1 second delay to simulate API call
  });
}




