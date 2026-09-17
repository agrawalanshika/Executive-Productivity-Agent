import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { answerDeterministicQuery } from './src/data/agentEngine';
import {
  PEOPLE,
  MEETING_TRANSCRIPT,
  CALENDARS,
  EMAIL_THREADS,
  VOICE_NOTES,
  ASSUMPTIONS_AND_CONSTRAINTS,
} from './src/data/assignmentData';

const PORT = 3000;

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

const SYSTEM_INSTRUCTION = `You are the Executive Productivity Agent for Arjun Malhotra (VP Sales at Veridian Corp).
You are an expert AI assistant designed to extract commitments, track ownership, calculate deadlines, and answer executive questions using ONLY the provided assignment data pack (September 21–25, 2026).

CRITICAL GROUNDING RULES:
1. Use ONLY the provided assignment data. DO NOT invent facts, commitments, owners, deadlines, meetings, or emails.
2. OWNERSHIP CLASSIFICATION:
   - "My Actions": Commitments and actions belonging to Arjun Malhotra.
   - "Waiting on Others": Deliverables assigned to or dependent on colleagues (e.g., Divya for July variance report, Neha for campaign deck draft).
   - "Unclear Ownership": Items where the responsible person is not confirmed (e.g., Mumbai Office Lease Renewal). NEVER invent ownership. Always warn when ownership is unconfirmed.
3. DEADLINES & OVERDUE:
   - Resolve relative dates within the week of Mon 21 Sep to Fri 25 Sep 2026.
   - Do NOT claim an item is overdue unless the reference date has strictly passed its agreed deadline without evidence of completion.
   - For example, the updated vendor list was promised by Arjun to Raghav for Wednesday morning. In subsequent emails Raghav checked in, and no record shows Arjun sending it. It is therefore OVERDUE.
4. DEDUPLICATION:
   - Merge references across meetings, emails, and voice notes into canonical records.
   - Retain the latest confirmed deadline or status.
5. FORMATTING:
   - Provide clean, readable plain text using natural paragraphs and bullet points.
   - DO NOT output markdown table syntax (like |---|---| or raw pipes) or code block markdowns.
   - Present lists and commitments with clear bullet points (•) and bold titles for easy reading.
   - Cite specific evidence (who said what, when, and in which thread or meeting).

DATA PACK CONTEXT:
People: ${JSON.stringify(PEOPLE)}
Meeting Transcript: ${JSON.stringify(MEETING_TRANSCRIPT)}
Calendars: ${JSON.stringify(CALENDARS)}
Email Threads: ${JSON.stringify(EMAIL_THREADS)}
Voice Notes: ${JSON.stringify(VOICE_NOTES)}
Assumptions: ${JSON.stringify(ASSUMPTIONS_AND_CONSTRAINTS)}
`;

// Helper for resilient Gemini API execution with retry on 503/temporary demand spikes
async function queryGeminiWithFallback(
  ai: GoogleGenAI,
  query: string,
  referenceDate: string
): Promise<{ text: string; modelUsed: string } | null> {
  const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: `User Query: "${query}". Reference Date: "${referenceDate}". Please answer objectively using the authoritative data pack and provide relevant citations.`,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2,
          },
        });

        if (response?.text) {
          return { text: response.text, modelUsed: model };
        }
      } catch (err: unknown) {
        // Detect transient errors like 503 (high demand) or 429
        const isTransient =
          err &&
          typeof err === 'object' &&
          (('status' in err && (err as { status?: string | number }).status === 'UNAVAILABLE') ||
           ('code' in err && (err as { code?: number }).code === 503) ||
           String((err as Error)?.message || '').includes('503') ||
           String((err as Error)?.message || '').includes('high demand') ||
           String((err as Error)?.message || '').includes('UNAVAILABLE'));

        if (isTransient && attempt === 1) {
          // Brief exponential backoff before retrying
          await new Promise((resolve) => setTimeout(resolve, 750));
          continue;
        }

        // If not transient or attempt 2 failed, proceed to next candidate model
        break;
      }
    }
  }

  return null;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
      agent: 'Executive Productivity Agent',
    });
  });

  // Download project zip endpoint
  app.get('/api/download-zip', (req, res) => {
    const zipPath = path.join(process.cwd(), 'executive-productivity-agent.zip');
    res.download(zipPath, 'executive-productivity-agent.zip');
  });

  // Natural language query endpoint
  app.post('/api/ask', async (req, res) => {
    const { query, referenceDate = 'current' } = req.body;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query string is required' });
      return;
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const aiResult = await queryGeminiWithFallback(ai, query, referenceDate);
        if (aiResult?.text) {
          const fallback = answerDeterministicQuery(query, referenceDate);
          res.json({
            answer: aiResult.text,
            citations: fallback.citations,
            referencedActionIds: fallback.referencedActionIds,
            modelUsed: aiResult.modelUsed,
            isFallback: false,
          });
          return;
        }
      } catch {
        // Silently caught, proceed to deterministic engine
      }
    }

    // Deterministic fallback engine (guaranteed 100% grounded in assignment dataset)
    const fallback = answerDeterministicQuery(query, referenceDate);
    res.json({
      answer: fallback.answer,
      citations: fallback.citations,
      referencedActionIds: fallback.referencedActionIds,
      modelUsed: 'deterministic-grounded-engine',
      isFallback: true,
    });
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Executive Productivity Agent server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
