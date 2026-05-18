# Shared Spec v2 — Conference Mockup (post-2026-05-10 sync)

**v2 supersedes v1. v1 snapshot preserved at git tag `v1-pre-meeting` (commit `c5cc6a5`) on branch `mockups-conference`. Diff your work against that tag to see what's expected to change.**

---

## What's new in v2 (since v1)

Eleven locked decisions from the 2026-05-10 team mockup-review sync:

1. Profile card → top-of-page, collapsible. NOT in right rail.
2. Tab navigation → horizontal tabs UNDER student name (primary). Sidebar tabs is the A/B alt for Dashboard 1 only.
3. Recent Activity = auto-generated app events ONLY. Manual notes go in a separate "Recent Notes" section.
4. Universal task statuses: **Not started / In progress / Awaiting review / Stuck / Done**. Drop essay-specific stages (those live on the document/essay entity).
5. Card information hierarchy: **Student → Title → Due → supplemental.** Apply to every card-style element.
6. Calendar event types: **Meetings / Tasks / Deadlines** only. Drop snapshots/tracking-changes from the calendar surface.
7. Calendar Month default content = school deadlines + cross-cutting events (e.g., team meetings). Tasks opt-in via filter.
8. Modules architecture: admin Modules tab = preset library only. Per-student module progress lives ON student dashboard, not in Modules.
9. Module mockup scope = 2 NEW screens (admin assignment + student-facing sample) + 1 section on student dashboard. Not 3 standalone files.
10. Document diff: inline = default. Side-by-side = togglable view. Comparison is implicit on draft-pair selection (no explicit "Track Changes" button).
11. Color: lock 3-color status palette (green / amber / rose). Indigo stays as primary/interactive accent. Working-style chips stay distinct (purple / rose / sage). Drop everything else from semantic color use.

Plus aesthetic + typography lock:

- **Font: all-Geist** (Geist Sans body + Geist Sans 600 for headings + Geist Mono for numerics). DROP Fraunces entirely.
- Two new universal patterns (4 & 5 below) for color-intensity A/B and design-choice A/B.

---

## Re-anchor: D40–D44 still hold

The 2026-05-10 meeting was almost entirely surface mockup feedback. **It did NOT re-anchor the conference posture.** Those locks from 2026-05-08 still hold:

- **D40** Format: interactive HTML mockups (not flat screenshots). iPad-accessed.
- **D41** Style: single cohesive tab-based, **affordance-light + visual-hierarchy-strong**. NO interactive shipping affordances.
- **D42** Cadence: linear daily iterations. Friday 2026-05-15 = hard lock (3 days before IECA Baltimore).
- **D43** Screen scope: 6 surfaces (single-student dashboard, all-students, cross-tasks, document/snapshot, calendar, module).
- **D44** Conference posture: relationship-first / peer-pain-sharing leads. Mockups conditional on interest signals — they support the conversation, they don't lead it.

**Affordance-light interpretation for v2 (clarified):** the meeting prompted us to add *some* mock interactivity (multi-student selectors, school filter chips, search inputs, view toggles). These are OK — but they must be **VISIBLE-AFFORDANCE-NOT-FUNCTIONAL.** Chips that look filterable but don't actually filter, or that toggle visible CSS state via a tiny JS click handler, are fine. NO real autocomplete. NO real backend search. NO real data ops. The point is to *signal* the affordance to the consultant, not implement it.

If you find yourself building a real filter / search / selector with real logic, stop — that's V1 product work, not conference demo material.

---

## Post-V2-baseline decisions (D45-D49)

These are locked decisions from the 2026-05-10 and 2026-05-12 syncs. Surfaces in this directory reference them by ID. Full entries (rationale, quotes, impact) live in `basic-memory/lms project/LMS Decisions.md`.

- **D45 (2026-05-10)** — Recent Activity = auto-generated app events only (status transitions, snapshots, notifications). Manual notes (parent calls, async info from chat) go in a separate Recent Notes section. Activity log is event-driven; Recent Notes has the manual write affordance.
- **D46 (2026-05-10)** — Universal task statuses: **Not started / In progress / Awaiting review / Stuck / Done.** Applies to all tasks. Essay-specific stages (Brainstorming / Drafting / Editing) live on the document/essay entity, not the task entity.
- **D47 (2026-05-10)** — Module mockup scope = 3 screens: (1) admin assignment view, (2) per-student module progress on student profile, (3) student-facing sample module page (≥1 video + ≥1 quiz). Refines D43's "module view (1-2 examples)" placeholder.
- **D48 (2026-05-10)** — Modules IA: admin Modules tab = preset library only (build/edit modules, view library). Per-student module progress lives on the student profile, NOT in the global Modules tab.
- **D49 (2026-05-12)** — Color = status/urgency only, always paired with explicit text label. Pick ONE consistent meaning per surface (stage OR urgency OR completion %), don't mix semantics within a view. Color is supplementary accent — never load-bearing alone.

---

## Aesthetic lock (v2)

### Colors
```
--bg:        #f7f8fa
--surface:   #ffffff
--surface-2: #fbfcfd
--ink:       #0f1419
--ink-2:     #475569
--ink-3:     #94a3b8
--line:      #e4e6eb
--line-2:    #cbd5e1

--sidebar:        #0f172a
--sidebar-ink:    #cbd5e1
--sidebar-ink-2:  #64748b
--sidebar-line:   rgba(255,255,255,0.08)

--primary:        #5b5fcf      /* indigo — interactive only */
--primary-bg:     #eef0fb
--primary-line:   #c7cbe8

/* Status palette — LOCKED to these 3 + neutral */
--status-done:    #047857      /* emerald-700 — done / on-track / submitted */
--status-done-bg: #d1fae5
--status-active:  #b45309      /* amber-700 — AWAITING REVIEW (canonical 5/13 11:05 PM).
                                  IN PROGRESS now uses --primary (indigo) — see Color discipline rule. */
--status-active-bg: #fef3c7
--status-overdue: #be123c      /* rose-700 — overdue ONLY (stuck uses neutral-dashed; see line 93) */
--status-overdue-bg: #ffe4e6
--status-neutral: var(--ink-3) /* not started / cycle done / muted */

/* Working-style chips (counselor metadata, NOT status — distinct color family) */
--ws-perfectionist: #8b5cf6  /* purple */
--ws-perfectionist-bg: #f5f3ff
--ws-anxious:       #e11d48  /* rose */
--ws-anxious-bg:    #fff1f2
--ws-self-directed: #16a34a  /* sage */
--ws-self-directed-bg: #f0fdf4
```

**Color discipline rule:** every row, card, or status indicator uses ONE color from the status palette per state (not three at once). If a row is overdue, it's rose. If it's **in progress, it's indigo** (brand primary — reads as "actively in flight"). If it's **awaiting review, it's amber** (reads as "needs attention / awaiting someone"). If it's done, it's emerald. Period. Working-style chips can coexist with status because they're a different category (metadata, not status), but they should be visually subordinate (smaller, less saturated than the status pip).

**Status color canonical (R2.5 5/13 11:05 PM verdict):**
- Not started → neutral (ink-3)
- **In progress → indigo (--primary)** — was amber; flipped to resolve collision with Awaiting Review
- **Awaiting review → amber (--status-active)** — canonical
- Stuck → neutral-dashed (border-style: dashed, border-color: --line-2, color: --ink-2, background: --surface). **Rose reserved for overdue only.** Dashed shape conveys "needs intervention" semantically without doubling on rose's color budget. Canonical implementation: see `dashboard-1-tabs-horizontal.html` `.ts-stuck`. (Resolved 2026-05-14 — replaces inconsistent rose/amber treatments across surfaces.)
- Overdue → rose (--status-overdue)
- Done → emerald (--status-done)

### Typography (CHANGED from v1)
- **Body:** Geist Sans (400, 500, 600). Google Fonts: `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap`
- **Headings:** Geist Sans 600 (NOT Fraunces). For larger display headings, can go to weight 600 at sizes up to ~36px.
- **Numerics / dates:** Geist Mono. Google Fonts: `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap`
- **DROP Fraunces entirely** — both display and editorial uses. The "too fancy" feedback applied across multiple surfaces; sticking to one family eliminates the issue and produces visual coherence cheaply.
- Italics for editorial / contextual subtitles → Geist Sans italic (400) is fine.

### Radius
6px standard. 4px chips. 8px substantive cards. 0px table cells. (Unchanged from v1.)

### Spacing / density
- Tables: medium-high (triage value)
- Cards: medium-low (substance per card)
- Sidebars: tight rows, generous outer padding
- **Reduce density across the board from v1.** Roei: "I would rather it be a little underwhelming than overwhelming for the sake that I was using it for right now."

---

## Brand mark (LOCKED — v2)

Small geometric logo mark in the topbar (left-aligned). 24×24 rounded square, indigo fill, **canonical concentric-circles glyph in white**. **NO brand name text.**

**Placement note (2026-05-15):** Brand mark lives in the topbar across all surfaces. Earlier guidance specified "top-left of dark sidebar" — that read awkward in practice (the dark column has too much vertical space above/below a 24px mark and gave the brand a stranded feel). Topbar placement is canonical; sidebar placement is not.

### Canonical SVG (paste IDENTICALLY into every surface)

```html
<div class="brand-mark" aria-hidden="true">
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" stroke-width="1.4">
    <circle cx="7" cy="7" r="5.5"/>
    <circle cx="7" cy="7" r="2.5"/>
  </svg>
</div>
```

```css
.brand-mark {
  width: 24px; height: 24px;
  border-radius: 7px;
  background: var(--primary);
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.brand-mark svg { display: block; }
```

**That's the entire glyph.** Two stroked rings (r=5.5 outer, r=2.5 inner), white stroke, no fill, no inner dot, no extra lines, no clock ticks. Identical viewBox, identical radii, identical stroke-width across every file.

**Reason for tightening (2026-05-10 review):** the previous "concentric circles, intersecting strokes, etc. — pick something simple" allowance resulted in 5+ visual variants across surfaces (some 2-circle, some 3-circle, some with center dot, some with extra line, one with a completely different "pathways" glyph). Locking the exact SVG removes the drift.

---

## Per-page purpose (REQUIRED)

Every surface MUST have a **single-sentence "What this page is for"** statement that the subagent answers in the file's metadata AND optionally surfaces visibly in the UI (small italic Geist subtitle under the page title is fine; or a hover tooltip on the page title; or a small `<meta>` tag for documentation).

Roei's framing: *"I think the question with each page that we have to ask ourselves is, like, what is this actually for?"*

Each page-purpose statement should be one sentence answering: **"This page is for: [consultant doing X / answering Y / handling Z workflow]."** Example:
- Dashboard 1: "This page is for: a consultant orienting on one student — what's urgent, what's the school landscape, who is this person."
- Cross-tasks Kanban: "This page is for: a consultant triaging work pipeline — what's stuck where across all (or some) students, what needs my review."
- Module (admin assignment): "This page is for: a consultant assigning learning modules to students — building a custom track from the preset library."

The page-purpose statement is the constraint. If a page element doesn't serve the page purpose, cut it.

---

## Data lock (unchanged + clarifications)

Same Maya + 15-student roster as v1. Cycle anchor Dec 15, 2026.

**Task stage taxonomy CHANGED:** v1 used essay-specific stages (Brainstorming / Drafting / Editing / Awaiting review / Submitted / Done). v2 locks **universal task statuses**:

1. **Not started** — no work yet
2. **In progress** — actively being worked on
3. **Awaiting review** — needs consultant attention
4. **Stuck** — blocked, needs intervention
5. **Done** — complete

These apply to ALL tasks, regardless of whether the task is "draft Yale SA2" or "schedule alumni call." The 5 columns are universal.

(Essay-specific stages — Brainstorming / Drafting / Editing — still live on the **document/essay entity** as a per-document state. They appear in the document/snapshot view, not on the task entity.)

---

## Universal patterns (5 total, 2 NEW)

### Pattern 1 — Collapsible right rail (CLARIFIED)
The rail is no longer a "persistent profile" container by default. The profile MOVES to top-of-page (collapsible). The rail can still EXIST on relevant surfaces and hold OTHER context:
- Calendar pages: today's events / upcoming summary
- Document V2: comments thread (anchored to highlighted text)
- (etc.)

If your surface doesn't have rail-appropriate context, omit the rail entirely.

If you DO use the rail, keep the toggle pattern from v1 ("Hide / Show [context]" button in top chrome).

### Pattern 2 — Hover tooltips on fake-action buttons (UNCHANGED)
Every button that would trigger an action gets `data-tooltip="[explanation]"` that reveals on hover. CSS-only.

### Pattern 3 — Design-intent overlay (UNCHANGED — DON'T TOUCH)
Existing overlay system stays. **A parallel chat is evolving this into a categorized version** as a reusable artifact. Do NOT modify the overlay's CSS, JS, or annotation system in any v2 file. Simply preserve the existing toggle + annotations that were added in the wave 2 post-meeting pass.

If you're building a brand-new file (no v1 precedent), include the overlay-toggle button in the top chrome but leave the annotations EMPTY (just the toggle infrastructure — annotations come later).

### Pattern 4 — NEW: Color-intensity slider (5-STATE)

A **5-state** slider in top chrome of every page that lets the team A/B test color intensity in-meeting. Order left-to-right:

1. **Off** — no semantic color anywhere; everything in neutrals (`--ink`, `--ink-2`, `--ink-3`). Even overdue rendered as bold-ink (not rose). Brand indigo also neutralized for true "monochrome" comparison.
2. **Minimal** — overdue (rose) + brand indigo + status-done (emerald) retain saturation. Status-active (amber) + working-style chips → neutral.
3. **Status** (DEFAULT) — locked 3-color status palette (green/amber/rose) + indigo accent; working-style chips muted/neutral.
4. **Status+** — status palette + working-style chips at full saturation (purple/rose/sage chips visible).
5. **Full** — everything; restore decorative tints, secondary colors, working-style chips, essentially v1 behavior.

Implementation:
```html
<div class="color-slider" role="radiogroup" aria-label="Color intensity">
  <button data-color-mode="off">Off</button>
  <button data-color-mode="minimal">Minimal</button>
  <button data-color-mode="status" aria-pressed="true">Status</button>
  <button data-color-mode="status-plus">Status+</button>
  <button data-color-mode="full">Full</button>
</div>
```

(Compact mono labels A B C D E or single-letter abbreviations are also fine. Per-button tooltip via `data-tooltip` explaining each mode.)

```css
/* Default = status mode (body class color-status applied by default OR no class needed) */

body.color-off {
  /* Maximum neutralization: even overdue + indigo go to ink */
  --status-done: var(--ink-3);
  --status-done-bg: transparent;
  --status-active: var(--ink-3);
  --status-active-bg: transparent;
  --status-overdue: var(--ink);
  --status-overdue-bg: transparent;
  --primary: var(--ink);
  --primary-bg: transparent;
  --ws-perfectionist: var(--ink-3);
  --ws-perfectionist-bg: transparent;
  --ws-anxious: var(--ink-3);
  --ws-anxious-bg: transparent;
  --ws-self-directed: var(--ink-3);
  --ws-self-directed-bg: transparent;
}
body.color-minimal {
  /* Overdue (rose) + brand indigo + status-done (emerald) retain saturation;
     status-active (amber) + working-style chips neutralize. Adopted 2026-05-12
     (D1=A): module surfaces gain at-a-glance "what's done vs in-progress vs
     overdue" scan that Minimal previously collapsed to overdue-only. */
  --status-active: var(--ink-3);
  --status-active-bg: transparent;
  --ws-perfectionist: var(--ink-3);
  --ws-perfectionist-bg: transparent;
  --ws-anxious: var(--ink-3);
  --ws-anxious-bg: transparent;
  --ws-self-directed: var(--ink-3);
  --ws-self-directed-bg: transparent;
}
/* color-status: default, no overrides needed — locked palette renders as-is */
body.color-status-plus {
  /* Working-style chips at full saturation */
  /* Status palette already at full sat in default mode; this mode adds working-style */
}
body.color-full {
  /* Restore decorative tints, secondary colors, v1-style loud */
  /* Implementation-specific — per-surface, add tints to elements you de-saturated */
}
```

```javascript
document.querySelectorAll('[data-color-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.remove('color-off', 'color-minimal', 'color-status', 'color-status-plus', 'color-full');
    document.body.classList.add(`color-${btn.dataset.colorMode}`);
    document.querySelectorAll('[data-color-mode]').forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
  });
});
```

The slider is **universal** — present on every surface, in the top-right of the header chrome (after the rail-toggle, before the design-notes toggle).

Default is **Status** so the team sees the locked palette first. They can dial up (Status+, Full) or down (Minimal, Off) for live comparison during the meeting.

**Spec history note:** v1 of this section specified 3 states (Full / Status / Minimal). Extended to 5 states 2026-05-10 to give the team a finer-grained spectrum during in-meeting A/B testing. Existing 3-state implementations on individual surfaces need 3→5 retrofit — flag as cohesiveness review item.

**Mode B redefinition (D1=A, 2026-05-12):** Mode B originally muted status-done green alongside status-active and working-style chips. Visual verification across 13 surfaces showed this collapsed the counselor's at-a-glance "what's done vs in-progress vs overdue" scan to overdue-only on module surfaces (highest-leverage) and zeroed completion-signal on dashboards. Empirical evidence supported letting status-done retain saturation in Mode B. CSS cost: ~35 lines deleted across the codebase. Per-surface override blocks that explicitly muted status-done elements in Minimal mode have been removed; status-active + WS-chip neutralizations remain.

### Pattern 5 — NEW: A/B toggle for ambiguous design choices (per-surface, where applicable)

Where a design call has two reasonable answers and the team didn't lock one, ship BOTH via a per-surface toggle in the page chrome. This applies to:

- **Dashboard 2 schools-switching:** toggle between Xiao's bubble-tabs (each school = a tab at top, page content fills below) and Roei's expand-inline (school list with click-to-expand inline). Default: bubble-tabs.
- **Document V2 compare-mode:** toggle between single-version-inline (just this draft, clean text) and comparative-inline (this draft vs prior draft, with track-changes highlighting). Default: single-version. Comparison is implicit on selecting a "compare with: [prior draft]" — no separate "Track Changes" button.

Implementation pattern (use Pattern 4's CSS class swap as the model):
```html
<div class="ab-toggle" role="radiogroup" aria-label="School switching mode">
  <button data-ab-mode="bubbles" aria-pressed="true">Bubble tabs</button>
  <button data-ab-mode="inline">Expand inline</button>
</div>
```

Body class swap shows/hides the corresponding UI. Same JS pattern as Pattern 4.

For the **tab navigation A/B (horizontal vs sidebar)** — this is a STRUCTURAL change (the page layout fundamentally rearranges). Ship as **2 SEPARATE FILES** for Dashboard 1 (`dashboard-1-tabs-horizontal.html` and `dashboard-1-tabs-sidebar.html`) instead of an in-page toggle. (See the per-surface section below.)

### Pattern 6 — Demo-note box

**Purpose:** Visual container for demo/dev metadata that's NOT product copy — page-purpose statements, demo-only hints, dev affordance explanations. Separates "scaffolding" content from "product content" so reviewers can tell what's real product UI vs what's there to explain the demo.

**When to use:**
- Page-purpose subtitle for a surface (e.g., "For planning the week — what's happening today, what's coming up, what's overdue.")
- Demo-only affordance hints (e.g., "Use the slider above to compare color modes A-E")
- Dev callouts that orient reviewers but aren't shipping product copy

**Visual treatment:** Compact pill shape with dashed left-border + "DEMO" mono tag. Color-mode-invariant (stays neutral gray in all 5 modes — does not respond to the color slider).

**Canonical implementation:** see `dashboard-1-tabs-horizontal.html` lines ~614-658 (`.demo-note-box` + child elements).

**Skeleton CSS:**

```css
.demo-note-box {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 8px;
  background: #f0f2f5;
  border: 1px dashed var(--line-2);
  border-left: 3px dashed var(--ink-3);
  border-radius: 4px;
}
.demo-note-box .demo-note-label {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  flex-shrink: 0;
  padding: 1px 5px;
}
.demo-note-box .demo-note-text {
  font-style: italic;
  white-space: nowrap;
}
.demo-note-box .demo-note-text strong {
  font-style: normal;
  font-weight: 600;
  color: var(--ink-2);
}
body.color-off .demo-note-box { background: #f3f4f6; }
```

**Skeleton markup:**

```html
<div class="demo-note-box">
  <span class="demo-note-label">DEMO</span>
  <span class="demo-note-text">For <strong>X</strong> — what we're showing here.</span>
</div>
```

**Placement guidance:** Top of the content area, between breadcrumb and design-notes toggle. Or in the top chrome (left of the color-slider). Vertically centered, sized to content (don't stretch full-width).

**Status:** Introduced 2026-05-13 R2.5. Portable to other surfaces. Propagation TBD pending review.

---

## DROP LIST (clarified)

Still no:
- Snooze / Defer / Undo buttons (action-with-undo affordance class)
- Keyboard shortcut hints (no `<kbd>`)
- Mass-action UI
- Pulse animations / status pip cycling
- Drag interactions
- REAL filtering, REAL autocomplete, REAL search backend (visible affordances OK; backend ops NOT)

NEW for v2:
- NO Fraunces (drop entirely)
- NO multi-color status (one color per state)
- NO right-rail persistent profile (profile moves to top, collapsible)
- NO essay-specific task stages on tasks (they're on the document entity)
- NO "Track Changes" toggle button on Doc V2 (comparison is implicit on draft-pair selection)
- NO "Tracking changes" event type on Calendar (3 types only: Meetings / Tasks / Deadlines)

ALLOWED for v2 (loosened from v1 — visible affordances only):
- Multi-student selector chips (visually toggle, mock data)
- Page-level search input (visually highlights matching rows on type, no real fuzzy match)
- Filter dropdowns (mocked)
- View-mode toggles (Pattern 5)
- Color-intensity slider (Pattern 4)
- **Send-for-review buttons** (document-workflow primitive — confirmed kept per 5/12 team review, bm-g03w.1.10). Distinct from the dropped "Snooze / Defer / Undo" affordance class — send-for-review is a real product action, not an action-with-undo demo affordance.

---

## Per-surface targets (v2)

Each entry below names the surface, its page-purpose statement, the key changes from v1, and what to focus on. Subagents should re-read this section for their assigned surface before starting.

### Dashboard 1 (TWO files for tab-nav A/B)

**Page purpose:** *This page is for: a consultant orienting on one student — what's urgent, what's the school landscape, who is this person.*

**Roei's verdict at 5/10:** "This feels right." Direction is correct.

**KEY CHANGES from v1:**
- Profile card → TOP of page (collapsible), NOT right rail
- Right rail can still exist for OTHER context (e.g., today's calendar) but profile is NOT in it
- Tab navigation goes UNDER student name (HORIZONTAL tabs) — variant A
  - Sub-section nav (Schools / Tasks / Snapshots / Documents / Meetings / Notes) lives in horizontal tab strip
- Variant B: same content, but tabs stay in left sidebar (the v1 pattern). Used for A/B comparison.
- Recent Activity → split into TWO sections: "Recent Activity" (auto-events only — snapshots, status changes, notifications) and "Recent Notes" (manual)
- Color discipline (3-color status palette only)
- Font: all-Geist (drop Fraunces)
- Apply Patterns 1, 2, 4 (color slider). Pattern 3 = preserve existing overlay if present.

**Files to write:**
1. `dashboard-1-tabs-horizontal.html` — horizontal-tabs version (PRIMARY — what Roei said)
2. `dashboard-1-tabs-sidebar.html` — sidebar-tabs version (A/B alt)

Both files share content; only the nav structure differs.

### Dashboard 2 — Schools-first (ONE file, with toggle)

**Page purpose:** *This page is for: a consultant looking at one student's full college landscape — where each school stands, what's in flight per school.*

**KEY CHANGES from v1:**
- Profile → TOP, collapsible (NOT right rail)
- Right rail killed — no replacement context here
- **Pattern 5 toggle: Schools-switching mode** — Bubble-tabs (default) vs Expand-inline
  - Bubble-tabs mode: row of bubble-tabs at top, one per school. Click a bubble = page content fills with that school's detail (essays, status, deadlines, recent activity).
  - Expand-inline mode: schools list as cards, click to expand inline (the v1 grid pattern, with click-to-expand instead of navigate).
- "Recent Activity" section CUT (Roei: "I don't know that the schools list needs a recent activity")
- Color discipline (3-color status, no purples/oranges noise)
- All-Geist
- Patterns 1 (no rail; toggle absent), 2, 4, 5

### Dashboard 3 — REFRAME as Tasks Page (rename file?)

**Page purpose:** *This page is for: a consultant viewing all tasks for one student — pipeline visualization with school-deadline context.*

**KEY CHANGES from v1:**
- This is NOT a dashboard variant. Roei + Xiao both said: "this is just the task page" / "an approximation of what the tasks view really is."
- Reframe and rename the file conceptually (file path stays `dashboard-3-deadline-timeline.html` for the v1-diff comparison, but the page identity shifts to "single-student tasks view")
- The current 12-week timeline strip → KEEP as the school-deadline context band. Xiao: "on the task page itself, to have the deadlines present. Because that will keep them motivated."
- The current time-bucket grouping → KEEP (this is a tasks list grouped by time-bucket — useful)
- Universal task statuses (Not started / In progress / Awaiting review / Stuck / Done) on each task — drop essay-specific stages
- Profile → TOP (collapsible). Drop right rail.
- Cut multi-block deadline strip if Xiao called it visually overwhelming — re-evaluate the timeline weight
- Color discipline (3-color status)
- All-Geist
- Patterns 1, 2, 4

### Students 1 — filterable table (POLISH via resume of original agent)

**Page purpose:** *This page is for: a consultant triaging across all students — who needs my attention now, filterable by stage / school / round / urgency.*

**KEY CHANGES from v1:**
- Consolidate the duplicate filter bar (currently 2 rows of saved-views; Xiao + Alex flagged as repeating)
- Drop saved-views from left sidebar (already in top filter strip)
- Add page-level **search input** (visually highlights matching rows; no real fuzzy match)
- Add **multi-student selector** (chips that visually toggle on click, mock data — no real backend)
- Customizable columns concept (columns visible: Stage, Upcoming Deadlines, Upcoming Tasks, Next Meeting, Working Style — show/hide hint via a column-settings affordance)
- Color discipline
- All-Geist
- Patterns 1 (no rail), 2, 4

### Cross-tasks Kanban (POLISH via resume — but significant changes)

**Page purpose:** *This page is for: a consultant triaging the work pipeline — what's stuck where across (some or all) students, what needs my review.*

**KEY CHANGES from v1:**
- **Column rewrite** — replace 6 essay-specific stages with 5 universal task statuses: **Not started / In progress / Awaiting review / Stuck / Done**
- Card hierarchy: **Student → Title → Due → supplemental** (re-order all card content)
- Add **left-border accent + horizontal divider** to each card (per Roei diagnostic — the v1 cards lacked these and looked "less nice" than the cut students-3 Kanban)
- Use full student names consistently OR a single avatar treatment uniformly (current v1 mixes initials and names — pick one)
- Add **multi-student selector** in top chrome (chips: All / Selected / Just [student]) — visible toggle, mock data
- Add **quick-view filter chips** above the board: "Overdue" / "Due this week" / "Awaiting me" — clickable, visually filter via CSS (mock)
- "Bulk apply" → REMOVE from this surface (Roei: belongs on Students view, in the create-task flow)
- Color discipline
- All-Geist
- Patterns 2, 4

**Filter chip naming: "Needs my action" vs "Awaiting me"** — INTENTIONAL SPLIT, not drift.

- `cross-tasks-kanban.html` uses **"Needs my action"** because it has an "Awaiting review" Kanban column — using "Awaiting me" as a filter chip would collide visually with the column label and confuse "things waiting on me" vs "things in the Awaiting Review column." The kanban file has a design note (around line 2239) explaining the rename.
- All other surfaces (`cross-tasks-list`, `today-homepage`, `students-1-filterable-table`, etc.) use **"Awaiting me"** because they don't have an "Awaiting review" column to collide with.

Both filter chips mean the same thing semantically (tasks where the user is the next actor). The lexical split is purely to avoid visual collision on the kanban surface.

Future surfaces: use "Awaiting me" by default. Only switch to "Needs my action" if the surface introduces an "Awaiting review" column.

### Cross-tasks List (POLISH via resume — small update)

**Page purpose:** *This page is for: same as Kanban, but list-shape — for consultants who prefer dense scannable rows.*

**KEY CHANGES from v1:**
- Apply **universal task statuses** (5 stages) — replace any essay-specific stage references
- Apply **card hierarchy** (Student → Title → Due → supplemental) where applicable in row layout
- Don't deep-iterate — Roei said the list view should structurally derive from the locked Kanban. Apply the easy wins now (statuses + hierarchy + color discipline + all-Geist + Patterns 4) and defer deeper rework.

### Calendar Week (POLISH via resume)

**Page purpose:** *This page is for: a consultant planning the week — what's happening today, what's coming up, what's overdue.*

**KEY CHANGES from v1:**
- Drop snapshot/tracking-changes event type (3 event types only: Meetings / Tasks / Deadlines)
- Drop all-day events
- Consolidate the duplicate event-type filter (currently shown twice)
- Trim density (Roei: "in general, this is a little overwhelming visually")
- Color discipline (3 status colors)
- All-Geist
- Patterns 1 (today rail OK), 2, 4

### Calendar Month (POLISH via resume)

**Page purpose:** *This page is for: a consultant scanning the month for school deadlines and cross-cutting events.*

**KEY CHANGES from v1:**
- Default content = **school deadlines + cross-cutting events ONLY** (not tasks)
- Tasks opt-in via filter (filter chip in top chrome turns task display on)
- Don't try to cram (Roei: "month views are pretty limited, just sort of inherently")
- Cut the mini-calendar in left rail (redundant with main grid)
- Cut garbled eyebrow if still present
- Color discipline (3 status colors)
- All-Geist
- Patterns 1 (right rail can hold "upcoming this month" summary), 2, 4

### Document V1 — side-by-side (POLISH via resume)

**Page purpose:** *This page is for: a consultant comparing two essay drafts side-by-side — usable for in-depth revision review.*

**KEY CHANGES from v1:**
- DROP profile card from right rail (it's not the focus on this view; Alex flagged it as overwhelming)
- Side-by-side becomes a TOGGLABLE view, NOT the default — see Document V2's toggle pattern
- Inline comments (anchored to highlighted text) — match Roei's existing in-app pattern
- Color discipline
- All-Geist
- Patterns 1 (no rail), 2, 4

Note: V1 may end up subordinate to V2 (which is "the right one" per Roei). If iteration time is tight, prioritize V2 polish over V1.

### Document V2 — stacked diff (POLISH via resume)

**Page purpose:** *This page is for: a consultant reviewing essay history — see one draft cleanly, OR see what changed between two drafts inline.*

**KEY CHANGES from v1:**
- DROP explicit "Track Changes" toggle button (Roei: comparison is implicit on draft-pair selection)
- Add **Pattern 5 toggle: Compare mode** — Single version (default) vs Comparative inline
  - Single version mode: just the selected draft, clean text, no diff highlighting
  - Comparative inline mode: selected draft vs prior draft, with inline track-changes highlighting
- Version history strip at top: KEEP (Alex liked it, Xiao called out the dates positively)
- Comments anchored inline to text positions: KEEP (Roei: "I think this is right")
- Resolved-comment treatment: KEEP (Xiao liked the "resolved by Maya in draft N" attribution)
- Drop "Major vs Minor rewrites" tagging (Roei: "I think it's unimportant right now")
- Right rail can hold the comments thread or be dropped — your call, justify in the design notes
- Color discipline
- All-Geist
- Patterns 1, 2, 4, 5

### Module — REBUILD (2 NEW files + 1 dashboard section)

**v1 had ONE module file.** v2 splits the work:

**File 1: `module-admin-assignment.html`** — admin-side
- **Page purpose:** *This page is for: a consultant assigning learning modules to students — building a custom track from the preset library.*
- Drag-and-drop module assignment UI (visible affordance — chips/cards that look draggable, with hover tooltips explaining the action)
- Preset library on the left (modules categorized: Building Your Profile / Researching Schools / Application Strategy / Essays & Supplements)
- Center: assigned modules for the selected student (e.g., Maya Chen) — sequence-orderable visually
- Right: optional preview of the selected module
- Use OG admin mockups (`~/code/edtech/mockups/admin/learning-path.html`, `module-library.html`) as IA reference
- Re-skin to v2 aesthetic family
- Patterns 2, 4

**File 2: `module-student-sample.html`** — student-facing
- **Page purpose:** *This page is for: a consultant showing what a student sees — module section overview + lesson with at least one video example, one quiz example, and one resource example.*
- Single page demonstrating: section overview ("Building Your Profile" with 4 modules) + lesson view inside one module + at least one video block + one quiz block + one resource block (PDF/link)
- Use OG student-side mockups (`~/code/edtech/mockups/student/screen-section-overview.html`, `screen-exercise.html`, `screen-quiz.html`) as IA + content reference
- Roei's praise of the OG module aesthetic ("looks really, really good") — use those visuals as baseline
- Re-skin to v2 family (all-Geist, 3-status palette, Patterns 1+2+4)
- The right-side lesson card should be COLLAPSIBLE per Alex's feedback ("takes up a lot of space")

**Dashboard section: per-student progress** — rendered as a section ON the student dashboard (Dashboard 1), NOT a standalone file
- Content: which modules are assigned to this student, % progress on each, current lesson
- Top progress bar with bubbles per Xiao's request: "if it was just a top bar that showed a bubble, and then the name of the module, and where they are in that track"
- This adds to Dashboard 1's content but doesn't change its layout fundamentally

**v1 module file** — keep it openable but mark superseded in the index. The 2 new files supersede.

---

## Self-validation requirement (CRITICAL)

Same as wave 2 — every subagent must Playwright-screenshot their own output AND READ the screenshot to verify the design lands. Do NOT return without empirical visual confirmation.

```bash
mkdir -p /tmp/conf-screenshots
cat > /tmp/screenshot-mine.js << 'EOF'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('file://[YOUR HTML PATH]', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/conf-screenshots/[YOUR FILENAME].png', fullPage: true });
  await browser.close();
})();
EOF
node /tmp/screenshot-mine.js
```

After writing, READ the PNG (you're multimodal). If something doesn't land — the structural rework is invisible, the color slider doesn't render, profile-on-top is misaligned — do ONE more edit pass + re-screenshot. Max 2 iterations. Then return.

---

## Build instruction

- Each subagent gets ONE file (or 2 if they're explicitly assigned the Dashboard-1 A/B pair).
- Refer to `git show v1-pre-meeting:mockups/conference/explorations/[your filename].html` to see the v1 starting state for diff comparison if needed.
- Inline all CSS + JS per file — keep self-contained.
- Reference SHARED-SPEC v2 (this file) for all locked decisions.
- Honor the "What is this page for?" statement — every element must serve it.

## Output expectation

After writing your file:
1. Run `ls -la <your file path>` to confirm size + existence
2. Self-validate via Playwright screenshot
3. Return: 3-5 bullets on strongest design choices (especially: how you applied the 5/10-meeting locks vs v1) + your page-purpose statement + screenshot path + any deviations from spec with rationale.
