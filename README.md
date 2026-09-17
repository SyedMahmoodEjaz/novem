# NOVEM

An IELTS coaching system. It explains how the exam works, then walks you through all four sections on
their own pages, marks everything you write and say against the band descriptors, and points you at the
official material.

---

## What is inside

| Page | What it does |
|---|---|
| How the exam works | Interactive 0–9 band scale, the overall-band rounding rule, format and timing for each section, and where candidates lose marks |
| Listening | Four practice recordings covering all four exam parts, spoken aloud by the browser, plus the part-by-part format table, six question types and five technique rules |
| Reading | Four passages (Academic and General Training) with a 20-minute clock, plus the passage breakdown, minute-by-minute plan, seven question types, which types follow text order, and five technique rules |
| Writing | Seventeen tasks covering all seven Task 1 visual types, three General Training letter types and all five Task 2 question shapes, plus the 40-minute breakdown, the first-five-minutes procedure and the PEEL paragraph model |
| Speaking | Record your voice (or type), get marked on the four speaking criteria, or run a live mock test where an AI examiner asks questions out loud, Part 1, 2 or 3 |
| Study library | Official British Council, IELTS.org, IDP and Cambridge resources, plus a four-week plan |
| Ask the coach | Free-form questions about rules, scoring and strategy |

**Stack:** React + Vite on the front, a small Node/Express server on the back. The server holds your API
key so it is never exposed to the browser. Speech in both directions uses the browser's own engine, so
there are no audio files and no transcription service to pay for.

---

## Download and run

You need **Node.js 18 or newer**. Check with `node -v`. If you do not have it, get it from nodejs.org.

```bash
# 1. unzip the folder, then open a terminal inside it
cd novem

# 2. install dependencies (once)
npm install

# 3. add your key
copy .env.example .env      # macOS/Linux:  cp .env.example .env
#    open .env and paste a free Groq key from console.groq.com

# 4. run it
npm run dev
```

Open **http://localhost:5173**.

`npm run dev` starts two things at once: the Vite dev server on port 5173 (the interface) and the Express
API on port 5174 (the marking engine). The dot at the bottom of the sidebar turns green when they are
talking to each other.

### Running the built version

```bash
npm run build
npm start
```

That serves everything from **http://localhost:5174** on its own.

### Which API key

NOVEM works with three providers and uses whichever key it finds in `.env`:

| Provider | Cost | Where to get a key |
|---|---|---|
| **Groq** (recommended) | Free, no card. Roughly 30 requests/minute, ~1,000/day | console.groq.com |
| **Google Gemini** | Free, no card. Roughly 10–30 requests/minute | aistudio.google.com |
| Anthropic | Paid, needs billing | console.anthropic.com |

Set one key and leave the rest blank. If you set more than one, add `PROVIDER=groq` to choose.

Free-tier model names change. If the app says the model was not recognised, open the provider's console,
copy a current model id, and put it in `GROQ_MODEL` or `GEMINI_MODEL`.

### Without an API key

It still runs. Listening and Reading are fully functional, because those are marked locally. Writing and
Speaking fall back to a mechanical check — word counts, common spelling slips, sentence variety — and say
clearly that it is not real marking. Add the key and restart to turn on examiner feedback.

---

## How to use it

1. **Read the overview page first.** Drag along the band scale to see what each band means to whoever is
   reading your result. Knowing that 6.5 and 7.0 are different worlds changes how you practise.
2. **Do one section per sitting.** Each page has its own clock. Start it.
3. **Read the corrections before the band.** The number tells you where you are; the corrections tell you
   what to do tomorrow.
4. **Speaking works best in Chrome or Edge** — they can transcribe your voice. Safari speaks but does not
   listen, and Firefox does neither; in those you type your answer instead and still get marked.
5. **Take real papers from the study library.** NOVEM gives feedback; only the official sites give
   authentic questions.

---

## Configuration

`.env` keys:

| Key | Default | Notes |
|---|---|---|
| `GROQ_API_KEY` | none | Free tier, no card |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Copy a current id from the Groq console if rejected |
| `GEMINI_API_KEY` | none | Free tier, no card |
| `GEMINI_MODEL` | `gemini-2.0-flash` | |
| `ANTHROPIC_API_KEY` | none | Paid |
| `PROVIDER` | auto | Set to `groq`, `gemini` or `anthropic` to force one |
| `PORT` | `5174` | The API server port |

With no key at all, the app runs in offline mode.

---

## Where to change things

```
server/prompts.js      how the examiner marks — edit here to change tone or strictness
server/providers.js    Groq / Gemini / Anthropic wiring
server/offline.js      the no-key fallback
src/styles/tokens.css  colours, type scale, all keyframes
src/styles/app.css     layout and components
src/data/bands.js      band descriptors, section facts, raw-score conversion tables
src/data/listening.js  transcripts and questions — add your own sets here
src/data/reading.js    passages and questions
src/data/tasks.js      writing prompts and speaking question banks
src/data/resources.js  the study library links
```

Adding a new Listening or Reading test is just another object in those data files. Nothing else changes.

---

## Practice content

| Section | What is in the bank |
|---|---|
| Listening | 4 recordings: Part 1 enquiry, Part 2 orientation talk, Part 3 tutorial, Part 4 lecture |
| Reading | 4 passages: 2 Academic, 2 General Training |
| Writing | 17 tasks across Academic Task 1, General Training Task 1 and Task 2 |
| Speaking | 14 Part 1 questions, 10 Part 2 cue cards, 12 Part 3 discussion questions |

Every page opens as a short list of headings that expand where you ask, rather than showing
everything at once. The reference material sits in collapsed panels above the practice.

## Design notes

The band scale is the motif the whole interface is built on: it is the hero element, the shape of every
result, and the reason for the name. Palette is black ground, white text, one red for anything that
carries a score or an action, and navy for the quieter second surface. Animations: page content arrives in
sequence rather than all at once, sections further down reveal as they scroll into view, panels open
with a measured height slide and a red underline that wipes in, the scale ticks rise in sequence on
load, score bars sweep in when results arrive, the recorder waveform reacts while you speak, timers
spin, and corrections shift under the cursor. All of it switches off automatically for anyone with
reduced-motion turned on.

NOVEM is not affiliated with the IELTS partners. Band estimates are practice guidance, not official
scores.


---

## Deploying to Vercel

The `api/` folder holds the same marking engine as `server/`, packaged as serverless functions. Vercel
runs those and serves the built front end; `npm run dev` locally still uses the Express server, so nothing
about local development changes.

1. Push the project to GitHub.
2. On vercel.com, New Project, import the repo.
3. Vercel detects Vite. Leave every build setting as it autofills.
4. Before deploying, open Environment Variables and add:
   - `GROQ_API_KEY` — your key
   - `GROQ_MODEL` — `llama-3.3-70b-versatile`
5. Deploy.

No card is required on the hobby tier, and there are no cold starts, so a shared link loads immediately.
