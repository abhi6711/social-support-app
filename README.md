# Social Support Application (Front-End)

A 3-step application wizard for a government social support portal with English/Arabic (RTL) support, accessibility basics, local progress persistence, and AI-assisted writing via OpenAI.

## Tech Stack
- React 18, TypeScript
- Material UI (MUI)
- React Router v6
- React Hook Form
- i18next + react-i18next
- Axios (OpenAI API)

## Prerequisites
- Node.js >= 18 recommended (v14+ may work but not recommended)
- npm or yarn

## Setup
1. Install dependencies:
```bash
npm install
```

2. Initialize Tailwind (already configured):
Tailwind is preconfigured via `tailwind.config.js`, `postcss.config.js`, and `src/index.css`. No action needed.

3. Configure OpenAI API key (optional - app works with mock suggestions):
   
   **Option A: Use real OpenAI API**
   - Get your API key from: https://platform.openai.com/api-keys
   - Edit `.env` file and add: `REACT_APP_OPENAI_API_KEY=sk-your-actual-key-here`
   
   **Option B: Use mock suggestions (default)**
   - Leave `.env` file as is (empty API key)
   - App will show realistic mock suggestions for testing

4. Run the app:
```bash
npm start
```
The app will open at `http://localhost:3000`.

## Features
- Multi-step wizard with progress bar
- English/Arabic toggle (RTL aware)
- Accessibility basics (ARIA labels, keyboard-friendly controls)
- LocalStorage persistence of form data
- AI-assisted writing for Step 3 textareas
- Mock submission endpoint

## OpenAI Integration
- Endpoint: `https://api.openai.com/v1/chat/completions`
- Model: `gpt-3.5-turbo`
- The service is implemented in `src/services/openai.ts`.
- Prompts are tailored per field via `buildPrompt`.
- **Mock Mode**: When no API key is configured, the app provides realistic mock suggestions with a 1-second delay to simulate API calls.
- Timeouts and errors are handled gracefully.

## Project Structure
- `src/pages/Wizard.tsx`: Wizard routing and progress
- `src/pages/wizard/Step1.tsx`: Personal info
- `src/pages/wizard/Step2.tsx`: Family & financial info
- `src/pages/wizard/Step3.tsx`: Situations + AI assistance
- `src/components/WizardLayout.tsx`: App shell
- `src/context/FormContext.tsx`: Global form state + LocalStorage
- `src/services/openai.ts`: OpenAI client
- `src/services/api.ts`: Mock submission
- `src/i18n.ts`: i18n config and resources

## Accessibility
- Forms have ARIA labels and are keyboard navigable.
- Dialogs are announced with appropriate titles.

## Improvements
- Add unit/integration tests (Jest + Testing Library)
- Stronger validation schemas (e.g., Zod/Yup)
- Server-side persistence and auth integration
- Better error banners and loading skeletons
