# Executive Productivity Agent | AIONOS Agentic AI Factory
**Assignment 1 — Executive Productivity Agent**  
*Candidate Submission for Arjun Malhotra (VP Sales, Veridian Corp)*  
*Week of Evaluation: September 21–25, 2026*

---

## 1. Executive Summary & Working Prototype
The **Executive Productivity Agent** is a full-stack, enterprise-grade AI system that solves executive communication fragmentation. By ingesting unstructured meeting transcripts, 5 email threads (25 messages), 4 executive calendars, and private voice memos, the agent converts messy operational noise into a trusted, deduplicated **Daily Action Brief** with zero hallucination.

### Key Highlights
- **Interactive Working Prototype:** Live interactive dashboard featuring a Daily Brief, All Actions inventory, My Commitments, Waiting on Others, Unclear Ownership alerts, and a grounded conversational AI assistant.
- **Timeline Simulator:** A dynamic 5-day reference scrubber (Mon 21 Sep – Fri 25 Sep 2026) that demonstrates how commitments transition from *Open* to *Due Today*, *Overdue*, and *Completed*.
- **Zero-Hallucination Policy:** Verbatim source citations for every extracted commitment. When ownership is ambiguous (e.g., the Mumbai Office Lease Renewal), the agent **strictly refuses to invent an owner**, categorizing it as **UNCLEAR OWNERSHIP** with urgent escalation.
- **Embedded 10-Slide Pitch & Defence Deck:** Fulfills Mandatory Output #7 directly inside the application, complete with presenter notes and defence scripts.

---

## 2. Architecture & Process Flow

The agent implements an 8-stage deterministic and agentic pipeline:

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────────┐
│  Input Sources  │ ──> │  Normalization   │ ──> │ Commitment Extraction  │
│ (Sync, Emails,  │     │ (Temporal SLA &  │     │ (Modality & Intent     │
│  Cals, Memos)   │     │  Schema Mapping) │     │  Detection)            │
└─────────────────┘     └──────────────────┘     └────────────────────────┘
                                                              │
                                                              ▼
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────────┐
│ Canonical Dedupe│ <── │ Deadline Resolve │ <── │Ownership Classification│
│(Merge Touches   │     │ (Relative Time   │     │(My Actions vs Waiting  │
│ into 1 Action)  │     │  Offsets to 2026)│     │ vs Unclear Ownership)  │
└─────────────────┘     └──────────────────┘     └────────────────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────────┐
│Status Evaluation│ ──> │Daily Action Brief│ ──> │ Grounded Q&A Assistant │
│(Open/Due/Overdue│     │ (Executive Triage│     │ (Gemini 3.8 Flash +    │
│ vs Ref Date)    │     │  Dashboard)      │     │  Deterministic Engine) │
└─────────────────┘     └──────────────────┘     └────────────────────────┘
```

### The 8 Stages Detailed
1. **Input Sources:** Ingests the 4 heterogeneous data streams from the assignment data pack (Monday sync transcript, 4 Outlook calendars, 5 email threads, 2 voice notes).
2. **Normalization:** Standardizes timestamps, sender/recipient identities, and context blocks.
3. **Commitment Extraction:** Identifies explicit promises, requests, deliverables, and SLAs made by Arjun, his peers (Neha, Raghav, Divya), and external partners.
4. **Ownership Classification:** Rigid tri-state classification:
   - `MY_ACTION`: Commitments owned by Arjun Malhotra.
   - `WAITING_ON_OTHERS`: Deliverables assigned to colleagues (e.g., Divya for July variance report, Neha for campaign deck draft).
   - `UNCLEAR`: Deliverables without an authorized, accepted owner.
5. **Deadline Detection:** Maps relative deadlines ("tomorrow morning", "Wednesday evening", "end of day Friday") to concrete target timestamps within Sep 21–25, 2026. Tracks extensions when deadlines are pushed.
6. **Deduplication & Entity Resolution:** Merges multiple conversational mentions into single canonical action items with complete event timelines (e.g., the Vendor List across Sync, Voice Note 1, and Email Thread 1).
7. **Status Calculation:** Dynamically checks whether the active reference date has strictly passed an agreed deadline without proof of delivery (e.g., Vendor list to Raghav after Wednesday morning is strictly **OVERDUE**).
8. **Daily Brief & Grounded Q&A:** Synthesizes the daily brief cards and answers natural language queries with verbatim source quotes.

---

## 3. Inputs, Sources & Assumptions

### Authoritative Sources Ingested
1. **Meeting Transcript:** *Veridian Corp — Executive Leadership Weekly Sync* (Monday, 21 September 2026, 09:00 – 10:00 AM).
2. **Calendars:** Executive calendars for Arjun Malhotra, Neha Kapoor, Raghav Sethi, and Divya Rao (Sep 21–25, 2026).
3. **Email Threads (25 messages):**
   - *Thread 1:* Updated Vendor List (Arjun & Raghav, 5 messages)
   - *Thread 2:* Q3 Campaign Deck Draft (Neha & Arjun, 5 messages)
   - *Thread 3:* Meridian Call Follow-up & Proposal (Arjun & Marcus Reed, 5 messages)
   - *Thread 4:* Expense Variance Breakdown (Divya, Arjun, & Raghav, 5 messages)
   - *Thread 5:* Mumbai Office Lease Renewal (Facilities, Raghav, Arjun, & Divya, 5 messages)
4. **Voice Notes (2 recordings):**
   - *Voice Note 1:* Recorded Mon 21 Sep, 6:45 PM (in cab after client dinner).
   - *Voice Note 2:* Recorded Thu 24 Sep, 7:15 AM (morning reflection before Meridian call).

### Grounding Assumptions & Safety Rules
- **Non-Fabrication Mandate:** The system never invents facts, deadlines, commitments, or owners.
- **The Mumbai Lease Rule:** Because neither Arjun, Divya, nor Raghav confirmed ownership in the meeting or emails, the system **never guesses an owner**. It is surfaced as **UNCLEAR OWNERSHIP** to protect the executive from dropped liabilities.
- **Defensible Overdue Logic:** An item is only flagged as overdue if the selected reference date has strictly passed its latest confirmed SLA without documented completion.

---

## 4. List of AI Tools Used & How They Were Used

As per Mandatory Deliverable #4:
1. **Google Gemini 3.8 Flash (`@google/genai` TypeScript SDK):**
   - *Usage:* Server-side inference for natural-language Q&A (`POST /api/ask`).
   - *Role:* Synthesizes unstructured conversational answers grounded strictly in the assignment data pack. System prompt restricts output to provided facts and forbids hallucinating ownership.
2. **Deterministic Fallback Engine (`agentEngine.ts`):**
   - *Usage:* Built-in rule-based reasoning engine.
   - *Role:* Guarantees 100% availability even without an external API key or network connection. Powers exact status calculation, metric distributions, and keyword intent matching.
3. **TypeScript & React 18 + Vite:**
   - *Usage:* Modern, component-driven client architecture.
   - *Role:* Powers the responsive executive UI, dynamic timeline simulation, and instant state switching.
4. **Tailwind CSS:**
   - *Usage:* High-craft, Anti-Slop executive aesthetic.
   - *Role:* Crisp slate neutrals, high contrast WCAG AA compliance, and clean mathematical spacing.

---

## 5. Canonical Actions Inventory (8 Deduplicated Actions)

| ID | Canonical Title | Owner | Counterparty | Classification | Resolved Deadline | Final Status | Sources Merged |
|---|---|---|---|---|---|---|---|
| `act-vendor-list` | Updated Vendor List to Raghav | Arjun Malhotra | Raghav Sethi | My Action | Wed 23 Sep 10:00 | **OVERDUE** | Sync + VN1 + Thread 1 |
| `act-meridian-call` | Meridian Partner Call & Alignment | Arjun Malhotra | Marcus Reed | My Action | Thu 24 Sep 11:30 | **COMPLETED** | Sync + VN2 + Thread 3 |
| `act-campaign-deck` | Review Q3 Campaign Deck Draft | Neha Kapoor | Arjun Malhotra | Waiting on Others | Thu 24 Sep 17:00 | **OPEN** | Sync + Thread 2 |
| `act-july-variance` | July Variance Breakdown Report | Divya Rao | Arjun Malhotra | Waiting on Others | Wed 23 Sep 18:00 | **OPEN** | Sync + Thread 4 |
| `act-mumbai-lease` | Mumbai Office Lease Renewal | **Unassigned** | Landlord / Facilities | **UNCLEAR** | Fri 25 Sep 17:00 | **UNCLEAR** | Sync + VN1 + Thread 5 |
| `act-incentive-deck` | Review Sales Incentive Deck | Arjun Malhotra | Internal Sales | My Action | Fri 25 Sep 17:00 | **OPEN** | Voice Note 1 |
| `act-meridian-prop` | Send Finalized Meridian Proposal | Arjun Malhotra | Marcus Reed | My Action | Thu 24 Sep 18:00 | **COMPLETED** | Thread 3 |
| `act-august-actuals` | August Actuals vs Forecast | Divya Rao | Leadership Team | Waiting on Others | Tue 22 Sep 17:00 | **COMPLETED** | Sync + Thread 4 |

---

## 6. 15-Minute Demo & Defence Structure

### Demo Flow (15 Minutes)
1. **00:00 – 03:00 | Problem & Architecture (Slides 1–3):** Explain the executive noise problem and walk through the 8-stage pipeline.
2. **03:00 – 06:00 | Executive Briefing & Timeline Simulation (Slides 4–7):** Demonstrate the Daily Brief. Use the 5-day scrubber to show how the Vendor List transitions from *Open* on Monday to *Due Today* on Wednesday, and *Overdue* on Thursday/Friday.
3. **06:00 – 09:00 | The Unclear Ownership Case Study (Slide 6):** Walk through the Mumbai Lease item. Show how the agent refuses to invent an owner and presents an urgent escalation card with full provenance.
4. **09:00 – 12:00 | Grounded Conversational Q&A (Slides 8–9):** Query the agent with core business questions:
   - *"What did I promise Raghav?"*
   - *"What needs action today?"*
   - *"What am I waiting on?"*
   - *"Which items have unclear ownership?"*
   Show verbatim source citations and quote verification cards.
5. **12:00 – 15:00 | Defence, Critique & Production Roadmap (Slide 10):** Defend design choices, discuss enterprise edge cases (offline calls, informal messaging), and outline the production roadmap.

---

## 7. Embedded 10-Slide Presentation Deck

The application includes an embedded, interactive presentation deck under the **10-Slide Pitch & Defence** sidebar tab:
- **Slide 1:** Title & Executive Overview
- **Slide 2:** Problem Statement & Executive Cognitive Load
- **Slide 3:** End-to-End System Architecture (8-Stage Pipeline)
- **Slide 4:** Multi-Modal Ingestion & Temporal Normalization
- **Slide 5:** Commitment Extraction & Deduplication Engine
- **Slide 6:** Ownership Classification: The Non-Negotiable Anti-Hallucination Rule
- **Slide 7:** Temporal Reasoning & Defensible Status Calculation
- **Slide 8:** Executive User Experience & Daily Briefing UX
- **Slide 9:** Natural Language Q&A with Citation Grounding
- **Slide 10:** Defence, Real-World Limitations & Production Roadmap

*Includes toggleable presenter speaking notes for each slide.*

---

## 8. Installation & Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Quickstart
```bash
# Clone the repository
git clone <repository-url>
cd executive-productivity-agent

# Install dependencies
npm install

# (Optional) Add your Gemini API key in .env for server-side LLM inference
# If omitted, the system seamlessly uses its deterministic rule engine!
echo "GEMINI_API_KEY=your_key_here" > .env

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```
