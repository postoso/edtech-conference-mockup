# Shared Spec — Conference Mockup Wave 2

**Read this file before building. Every wave 2 file references this spec.**

---

## Context

These are static HTML mockups for **IECA Baltimore 2026-05-18** — a college admissions consulting conference. Xiao (one of three team members building the LMS) will pull these up on iPad during 5-min booth conversations with consultants. The mockups are **conversation tools to elicit feedback**, not product demos.

Posture: **affordance-light + visual-hierarchy-strong**. Drop interactive affordances, keep production-quality typography + layout + color.

Stage: **exploration**. Not the final lock. Pick a clear point of view; commit hard.

---

## Aesthetic family (locked across all wave 2)

### Colors
```
--bg:        #f7f8fa   /* content area — light cool gray */
--surface:   #ffffff   /* cards, table rows */
--surface-2: #fbfcfd   /* zebra alt rows */
--ink:       #0f1419   /* primary text */
--ink-2:     #475569   /* secondary text */
--ink-3:     #94a3b8   /* tertiary text */
--line:      #e4e6eb   /* hairlines */
--line-2:    #cbd5e1   /* slightly heavier divider */

--sidebar:        #0f172a   /* dark slate sidebar */
--sidebar-ink:    #cbd5e1   /* sidebar text */
--sidebar-ink-2:  #64748b   /* dimmer sidebar text */
--sidebar-line:   rgba(255,255,255,0.08)

--primary:        #5b5fcf   /* indigo accent — interactive only, sparingly */
--primary-bg:     #eef0fb
--primary-line:   #c7cbe8

--warn:           #b45309   /* amber-700 */
--warn-bg:        #fef3c7
--rose:           #be123c   /* rose-700, slightly more saturated than wave 1 */
--rose-bg:        #ffe4e6
--success:        #047857   /* emerald-700 */
--success-bg:     #d1fae5

/* Working-style chip colors */
--ws-perfectionist: #8b5cf6   /* on #f5f3ff */
--ws-anxious:       #e11d48   /* on #fff1f2 */
--ws-self-directed: #16a34a   /* on #f0fdf4 */
```

### Typography
- **Body:** Geist Sans (400, 500, 600) — `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap`
- **Display:** Fraunces (variable serif) — `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap`
- **Numeric:** Geist Mono — `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap`

Use Fraunces for:
- Student names (large, ~26-32px)
- Page-level section headings ("Today", "Next Steps", "This Week", etc)
- Italic Fraunces (~13px) for editorial / contextual lines if applicable

Use Geist Sans for: everything else (body, labels, buttons, table content)
Use Geist Mono for: numerics, dates, counts, codes, timestamps (tabular nums)

### Radius
6px standard. 4px for chips. 8px for substantive cards. 0px for table cells.

### Density guidance
- Tables: medium-high (triage view, density is value)
- Cards: medium-low (substance per card)
- Sidebars: tight rows, generous outer padding

---

## Brand

**No brand name.** Use a small geometric logo mark in the top-left of the dark sidebar:
- A 24x24 rounded square with a subtle geometric glyph inside (e.g., concentric circles, intersecting strokes, an "L"-shape — pick something simple)
- Background fill `--primary` (indigo)
- White stroke / fill on the glyph
- No "App Name" text next to it

This avoids the wave-1 "5 different products" feel where each variant invented its own name.

---

## Data: 15 students, Dec 15 2026 cycle anchor

Cycle anchor: **December 15, 2026** (mid-senior-year, ED results out, deferrals + LOCIs active phase). Maya Chen is the **flagship student** for any single-student view.

### Maya Chen (flagship — use for all single-student views)
- Class of 2027, Senior, US Citizen
- GPA 3.96 (UW), SAT 1530
- Intended major: Studio Art (also considering Art History)
- Hooks: First-gen college, Studio art portfolio, NYC public school
- Working style: **Perfectionist**
- Top choice: Yale University (REA → Deferred → LOCI in progress)
- Schools (12): Yale (REA Deferred + LOCI active), RISD (ED Deferred + LOCI), Brown (REA in flight), Penn (RD drafting), Cornell (RD drafting), NYU Tisch (RD drafting), USC Roski (RD drafting), Northwestern (RD researching), Dartmouth (RD researching), Pratt Institute (RD drafting), UC Berkeley (UC submitted), UCLA (UC submitted)
- Last meeting: 2 days ago (Dec 13). Next meeting: tomorrow 4pm (Dec 16).

### 15-student roster (for All-Students, Cross-Tasks, Calendar surfaces)
| Name | Class | Working style | Stage | Top + status | Tasks | Last mtg | Next mtg |
|---|---|---|---|---|---|---|---|
| Maya Chen | 2027 | Perfectionist | Submitting | Yale REA Deferred + LOCI | 8 (2 over) | 2d ago | Dec 16 |
| Priya Mehta | 2027 | Perfectionist | Submitting | Penn ED Deferred + LOCI | 6 (1 over) | 3d ago | Dec 17 |
| Marcus Johnson | 2027 | Anxious-parent | Regrouping | Stanford REA Denied | 11 (4 over) | 5d ago | Dec 16 |
| Caroline Park | 2027 | Anxious-parent | Submitting | Brown ED Deferred + LOCI | 7 (0) | today | Dec 18 |
| Tony Liu | 2027 | Self-directed | Submitting | Yale REA Admit | 4 (0) | 5d ago | Dec 19 |
| Roya Nazari | 2027 | Self-directed | Regrouping | Princeton SPIA Denied (restart) | 9 (1 over) | 4d ago | Dec 16 |
| Min-jun Park | 2027 | — | Cycle done | Wharton ED Admit | 0 | 30d ago | — |
| Jackson Reed | 2027 | — | Cycle done | Princeton REA Admit + athletic | 0 | 45d ago | — |
| Daniel Kim | 2027 | — | Cycle done | Stanford QB Match | 1 | 12d ago | — |
| Henry Wells | 2027 | — | Regrouping | Yale REA Denied | 8 (2 over) | 6d ago | Dec 18 |
| Sophia Nguyen | 2027 | — | Submitting | UMiami ED Deferred + LOCI | 5 (0) | 2d ago | Dec 22 |
| Hassan Ali | 2027 | — | Submitting | QB non-match → RD | 6 (1 over) | 4d ago | Dec 20 |
| Eliana Cohen | 2027 | — | Submitting | UChicago non-binding admit | 3 (0) | 7d ago | Jan 6 |
| Eric Watson | 2027 | — | Submitting | Hawaii Pacific admit | 2 (0) | 14d ago | Jan 8 |
| Layla Ahmed | 2028 | — | Building | (junior intake — exploring) | 4 (0) | 1d ago | Dec 17 |

### Sample tasks (representative — fill in plausibly per surface)
Total tasks across roster ≈ 80. Tasks have these fields: title / student / school / due-date / stage / priority. Stages per the task-stage taxonomy below.

Examples:
- "Finalize Yale LOCI" — Maya / Yale / Dec 14 (overdue 3d) / Editing
- "Penn 'why Penn' supplement" — Maya / Penn / Dec 18 / Drafting
- "RISD scholarship app — financial section" — Maya / RISD / Dec 21 / Brainstorming
- "Stanford LOCI" — Marcus / Stanford / Dec 12 (overdue 5d) / Editing
- "Princeton SPIA restart — common app revisions" — Roya / Princeton (general) / Dec 23 / Drafting
- "Brown LOCI submitted, awaiting confirmation" — Caroline / Brown / Dec 13 / Awaiting review
- "Wharton enrollment paperwork" — Min-jun / Wharton / Dec 30 / Submitted (cycle done)
- ...
- Make up additional plausible tasks. Use the student's actual top-school + RD list. Mix stages realistically (most submitting kids have 2-3 in Drafting, 1-2 in Editing, 0-1 in Awaiting review). Overdue tasks cluster on Marcus/Maya/Priya/Henry/Hassan.

---

## Locked structural elements

### Workspace nav (left sidebar, top section — IDENTICAL across all surfaces)
4 items, in this order, with Lucide icon names:
1. **Students** — `<Users>` icon
2. **Cross-Tasks** — `<ListTodo>` icon
3. **Calendar** — `<Calendar>` icon
4. **Modules** — `<BookOpen>` icon

Active state = indigo text + indigo left-edge accent (3px) + slightly brighter sidebar bg row.
Inactive = `--sidebar-ink-2` color, no accent.

Use inline SVG for Lucide icons (16px). Reference: https://lucide.dev/icons/

### Per-student section nav (left sidebar, secondary section — for single-student views only)
Below the workspace nav, when in a single-student context, show a "MAYA CHEN" header (uppercase, 11px, `--sidebar-ink-2`) followed by:
1. Overview (or "Dashboard" — pick one)
2. Schools (with count: 12)
3. Tasks (with count: 8)
4. Snapshots (with count: 18)
5. Documents (with count: 9)
6. Meetings (with count: 7)
7. Notes (with count: 11)

Counts are right-aligned in Geist Mono. Active state same pattern as workspace nav.

### Task stage taxonomy (locked across cross-tasks + future single-student tasks)
6 stages, in pipeline order:
1. **Brainstorming** — early concept, not yet drafting
2. **Drafting** — actively being written
3. **Editing** — has a draft, in revision
4. **Awaiting review** — consultant needs to review
5. **Submitted** — sent to school
6. **Done** — final, all loose ends closed

Empty columns are MEANINGFUL — render them as empty with subtle dashed border + "0 items" placeholder. Don't compress to 5 columns.

### Working-style chip placement
**Visible on row/card listings only** (where students appear in lists — All-Students table, Cross-Tasks if applicable). **NOT in the persistent right rail.** Internal counselor metadata; not student-facing.

### Status pill verbosity
Prefer short pills. "ED Deferred · LOCI in progress" → break into two pills ("ED Deferred" + "LOCI active") OR shorten to "Deferred + LOCI". Avoid 4+ word pills.

---

## DROP LIST

Do not include:
- Snooze / Defer / Review / Undo buttons
- Keyboard shortcut hints (no `<kbd>` tags)
- Mass-action UI (no checkbox columns)
- Pulse dot animations / status pip cycling
- Drag-to-reorder hints
- Real filter logic (chips can look filterable — don't make them filter)

**EXCEPTION for buttons that would trigger an action** (e.g., "+ Log meeting", "+ Add task"): you MAY include these BUT they must use the hover-tooltip pattern below — hover reveals what the action would do. See Universal Pattern 2.

---

## Universal Pattern 1 — Collapsible right rail

If your surface has a right rail (single-student views: dashboard, document/snapshot when scoped to one student), it must be collapsible. Include this:

```html
<!-- In the top header chrome, right side -->
<button id="rail-toggle" class="rail-toggle" aria-label="Toggle profile rail">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  </svg>
  Hide profile
</button>
```

```css
.rail-toggle {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--ink-2);
  padding: 4px 8px; border-radius: 4px;
  background: transparent; border: 1px solid var(--line);
  cursor: pointer;
}
.rail-toggle:hover { background: var(--surface); }

.right-rail {
  width: 280px; flex-shrink: 0;
  transition: width 0.2s ease, opacity 0.2s ease;
  overflow: hidden;
}
body.rail-collapsed .right-rail { width: 0; opacity: 0; }
body.rail-collapsed .rail-toggle::after { content: ""; }
body.rail-collapsed #rail-toggle span.label::before { content: "Show profile"; }
/* (or just swap the text in JS) */
```

```javascript
document.getElementById('rail-toggle').addEventListener('click', () => {
  document.body.classList.toggle('rail-collapsed');
  const label = document.body.classList.contains('rail-collapsed') ? 'Show profile' : 'Hide profile';
  document.querySelector('#rail-toggle .label').textContent = label;
});
```

(Wrap the text in `<span class="label">Hide profile</span>` in the button HTML.)

---

## Universal Pattern 2 — Hover tooltips on fake-interactive buttons

Any button that would trigger an action — "+ Log meeting", "+ Add task", "Snapshot", "Send for review", etc. — must include a `data-tooltip` attribute explaining what it would do. Pure CSS reveal on hover.

```html
<button class="fake-btn" data-tooltip="Logs a meeting for Maya — opens modal with date/duration/notes">
  + Log meeting
</button>
```

```css
.fake-btn {
  position: relative;
  /* your normal button styling */
}
.fake-btn::after {
  content: attr(data-tooltip);
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  max-width: 280px;
  white-space: normal;
  width: max-content;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 100;
}
.fake-btn:hover::after { opacity: 1; }
```

---

## Universal Pattern 3 — Design-intent overlay

**DO NOT BUILD THIS YET.** You'll be asked to add design annotations in a follow-up resume after the initial design is reviewed. For now, focus solely on building the surface content.

---

## Quality bar

- Visual hierarchy must land in 10 seconds: someone glancing should immediately know what they're looking at, what matters, what to scan.
- Spacing must feel intentional. No prototype sloppiness.
- Hairline-heavy: borders are 1px solid var(--line), used generously instead of shadows.
- Generous breathing room in section padding (~24-32px).
- Self-contained: single HTML file, Tailwind CDN, Google Fonts CDN, all CSS inline in `<style>`, all JS inline.

---

## Output expectation

After writing your file:
1. Run `ls -la <your file path>` to confirm size + existence.
2. Return: one-line confirmation + 3-5 bullets on the strongest design choices you made + any deviations from spec.
3. Note any wave-1 patterns you're explicitly carrying forward (e.g., "borrowed students-3 kanban card design for the task cards").
