/* ===========================================================================
 * DEMO DATA — Conference mockup demo (IECA Baltimore 2026-05-18)
 *
 * Source spec: /Users/alexgj/basic-memory/lms project/conference prep/
 *              Xiao Demo Data — Full Notion Export.md
 *              (Notion page 3583b4d2-253e-806b-91a3-db09152d530b, exported 2026-05-14)
 *
 * Anchored to Tuesday, December 15, 2026 — the cycle moment where every realistic
 * outcome state co-exists (ED admits, REA denials, deferrals + LOCIs, QB matches,
 * QB non-matches, intakes, junior onboarding). Xiao's spec called this "Monday
 * after the early-round results week"; calendar reality is Tuesday. Specific
 * school decision dates (Penn ED 12/13, Stanford REA 12/12, Yale REA 12/14, etc.)
 * are real release dates and kept verbatim.
 *
 * --- Mapping to Prisma schema (~/code/edtech/prisma/schema/) -----------------
 * - consultants  → Consultant + User (1:1)
 * - schools      → NEW — Prisma has no School model yet. Future migration.
 * - students     → Student + User (1:1)
 * - projects     → Project (per-student per-school application)
 * - projectItems → ProjectItem (essays/forms/portfolios)
 *                  type enum extends Prisma's: SUPPLEMENT | PERSONAL_STATEMENT
 *                  | ACTIVITY_LIST | FORM | PORTFOLIO | LOCI | OTHER
 *                  (FORM, PORTFOLIO, LOCI not in current Prisma enum)
 *                  ProjectItem.status is a string field; not in Prisma yet
 *                  (Prisma would either derive from tasks or add a new enum)
 * - tasks        → Task
 * - meetings     → Meeting
 * - documents    → Document
 * - snapshots    → Snapshot (comments + suggestions as JSON)
 *
 * --- Expansion beyond Xiao's spec --------------------------------------------
 * - Stars (6): verbatim from spec — every school, project item, task, meeting,
 *   essay seed Xiao wrote.
 * - Backgrounds (9): Xiao wrote one-line + school list + last/next meeting.
 *   Expanded with 3-5 plausible tasks per background, derived from Xiao's
 *   stage status and description.
 * - Maya's Yale Short Answer 2: 12 snapshots (her perfectionist 12-draft arc),
 *   drafts 9-12 have actual contentText for inline-diff demo; drafts 1-8 are
 *   metadata only.
 * - Priya's JHU Why Major: one snapshot with full 6-comment thread for the
 *   engagement-loop demo.
 *
 * --- Naming conventions ------------------------------------------------------
 * IDs: stable readable strings, snake_case:
 *   stu_priya          (student)
 *   sch_penn           (school)
 *   con_xiao           (consultant)
 *   proj_priya_penn    (project = a student's application to a school)
 *   item_priya_penn_loci (project item = an essay/form/portfolio)
 *   task_priya_loci_submit (task)
 *   mtg_priya_2026_12_13 (meeting)
 *   doc_maya_yale_sa2  (document)
 *   snap_maya_yale_sa2_d12 (snapshot)
 *
 * Dates: ISO 8601 throughout. Date-only when time isn't meaningful;
 *        full timestamp when meeting times matter.
 *
 * --- Reconciliation notes for mockup wiring chat -----------------------------
 * Current V3 mockup HTML uses different last names for some students
 * (Priya Mehta vs Priya Venkataraman, Maya Chen vs Maya Okafor-Brennan, etc.)
 * and shows Maya as Yale REA Deferred (this data file uses Xiao's canonical:
 * RISD ED Deferred + Yale RD active). Wiring chat must update mockup HTML to
 * match this data file (Xiao's spec is canonical).
 * ========================================================================== */

window.DEMO_DATA = {
  // ============================================================
  // META
  // ============================================================
  meta: {
    anchor: "2026-12-15",
    anchorDayOfWeek: "Tuesday",
    anchorNote: "Xiao's spec called this 'Monday after results week'; calendar reality is Tuesday. Specific school decision dates are real release dates and unchanged.",
    schemaVersion: "1.0.0",
    generated: "2026-05-15",
    sourceSpec: "Notion page 3583b4d2-253e-806b-91a3-db09152d530b (Xiao Demo Data — Full Notion Export)",
    consultantId: "con_xiao",
    knownDiscrepancies: [
      "USC anchor count: Xiao's spec declared 'USC ×11 (8 active + 3 withdrawn)' but her per-student detail for Roya (NotStarted) and Layla (junior draft) also include USC. Actual count in this data: 13 applicants (10 active + 3 withdrawn). Wiring chat decides whether to drop Roya/Layla USC to match spec anchor target of 11.",
      "Cornell ×12 (9 active + 3 withdrawn) ✓ matches spec",
      "NYU ×8 (7 active + 1 withdrawn) ✓ matches spec",
    ],
  },

  // ============================================================
  // CONSULTANTS
  // ============================================================
  consultants: [
    {
      id: "con_xiao",
      firstName: "Xiao",
      lastName: "Jiang",
      initials: "XJ",
      email: "xiao@xjconsulting.com",
      studentCount: 15,
    },
  ],

  // ============================================================
  // SCHOOLS
  // First-class entity. Prisma has no School model yet — schools currently
  // live as Project.name. Future migration adds School + Project.schoolId.
  // ============================================================
  schools: [
    // Ivy + peer
    { id: "sch_penn",         name: "University of Pennsylvania",            short: "Penn",         brand: "#01256e", city: "Philadelphia, PA",         anchor: false },
    { id: "sch_yale",         name: "Yale University",                       short: "Yale",         brand: "#00356b", city: "New Haven, CT",            anchor: false },
    { id: "sch_princeton",    name: "Princeton University",                  short: "Princeton",    brand: "#ee7f00", city: "Princeton, NJ",            anchor: false },
    { id: "sch_harvard",      name: "Harvard University",                    short: "Harvard",      brand: "#a51c30", city: "Cambridge, MA",            anchor: false },
    { id: "sch_columbia",     name: "Columbia University",                   short: "Columbia",     brand: "#002d62", city: "New York, NY",             anchor: false },
    { id: "sch_brown",        name: "Brown University",                      short: "Brown",        brand: "#4e3629", city: "Providence, RI",           anchor: false },
    { id: "sch_dartmouth",    name: "Dartmouth College",                     short: "Dartmouth",    brand: "#00693e", city: "Hanover, NH",              anchor: false },
    { id: "sch_cornell",      name: "Cornell University",                    short: "Cornell",      brand: "#b31b1b", city: "Ithaca, NY",               anchor: true  }, // 12 applicants (9 active + 3 withdrawn)
    // Other elite
    { id: "sch_stanford",     name: "Stanford University",                   short: "Stanford",     brand: "#8c1515", city: "Stanford, CA",             anchor: false },
    { id: "sch_mit",          name: "Massachusetts Institute of Technology", short: "MIT",          brand: "#750014", city: "Cambridge, MA",            anchor: false },
    { id: "sch_caltech",      name: "California Institute of Technology",    short: "Caltech",      brand: "#ff6c0c", city: "Pasadena, CA",             anchor: false },
    { id: "sch_uchicago",     name: "University of Chicago",                 short: "UChicago",     brand: "#800000", city: "Chicago, IL",              anchor: false },
    { id: "sch_duke",         name: "Duke University",                       short: "Duke",         brand: "#003087", city: "Durham, NC",               anchor: false },
    { id: "sch_jhu",          name: "Johns Hopkins University",              short: "Hopkins",      brand: "#002d72", city: "Baltimore, MD",            anchor: false },
    { id: "sch_northwestern", name: "Northwestern University",               short: "Northwestern", brand: "#4e2a84", city: "Evanston, IL",             anchor: false },
    { id: "sch_cmu",          name: "Carnegie Mellon University",            short: "CMU SCS",      brand: "#c41230", city: "Pittsburgh, PA",           anchor: false },
    { id: "sch_rice",         name: "Rice University",                       short: "Rice",         brand: "#002469", city: "Houston, TX",              anchor: false },
    { id: "sch_notre_dame",   name: "University of Notre Dame",              short: "Notre Dame",   brand: "#0c2340", city: "Notre Dame, IN",           anchor: false },
    { id: "sch_vanderbilt",   name: "Vanderbilt University",                 short: "Vanderbilt",   brand: "#866d4b", city: "Nashville, TN",            anchor: false },
    { id: "sch_emory",        name: "Emory University",                      short: "Emory",        brand: "#012169", city: "Atlanta, GA",              anchor: false },
    { id: "sch_georgetown",   name: "Georgetown University",                 short: "Georgetown",   brand: "#041e42", city: "Washington, DC",           anchor: false },
    { id: "sch_gwu",          name: "George Washington University",          short: "GWU",          brand: "#033c5a", city: "Washington, DC",           anchor: false },
    // Anchor + big-state
    { id: "sch_usc",          name: "University of Southern California",     short: "USC",          brand: "#990000", city: "Los Angeles, CA",          anchor: true  }, // 11 applicants (8 active + 3 withdrawn)
    { id: "sch_nyu",          name: "New York University",                   short: "NYU",          brand: "#57068c", city: "New York, NY",             anchor: true  }, // 8 applicants
    { id: "sch_umich",        name: "University of Michigan",                short: "UMich",        brand: "#00274c", city: "Ann Arbor, MI",            anchor: false },
    { id: "sch_uva",          name: "University of Virginia",                short: "UVA",          brand: "#232d4b", city: "Charlottesville, VA",      anchor: false },
    { id: "sch_unc",          name: "UNC Chapel Hill",                       short: "UNC",          brand: "#4b9cd3", city: "Chapel Hill, NC",          anchor: false },
    { id: "sch_ut_austin",    name: "University of Texas at Austin",         short: "UT Austin",    brand: "#bf5700", city: "Austin, TX",               anchor: false },
    { id: "sch_tamu",         name: "Texas A&M University",                  short: "Texas A&M",    brand: "#500000", city: "College Station, TX",      anchor: false },
    { id: "sch_utep",         name: "UTEP",                                  short: "UTEP",         brand: "#ff8200", city: "El Paso, TX",              anchor: false },
    // UC system
    { id: "sch_berkeley",     name: "UC Berkeley",                           short: "Berkeley",     brand: "#003262", city: "Berkeley, CA",             anchor: false },
    { id: "sch_ucla",         name: "UCLA",                                  short: "UCLA",         brand: "#2774ae", city: "Los Angeles, CA",          anchor: false },
    { id: "sch_ucsd",         name: "UC San Diego",                          short: "UCSD",         brand: "#182b49", city: "La Jolla, CA",             anchor: false },
    { id: "sch_ucsb",         name: "UC Santa Barbara",                      short: "UCSB",         brand: "#003660", city: "Santa Barbara, CA",        anchor: false },
    // Florida / state
    { id: "sch_umiami",       name: "University of Miami",                   short: "UMiami",       brand: "#005030", city: "Coral Gables, FL",         anchor: false },
    { id: "sch_uf",           name: "University of Florida",                 short: "UF",           brand: "#fa4616", city: "Gainesville, FL",          anchor: false },
    { id: "sch_fsu",          name: "Florida State University",              short: "FSU",          brand: "#782f40", city: "Tallahassee, FL",          anchor: false },
    { id: "sch_penn_state",   name: "Penn State University",                 short: "Penn State",   brand: "#041e42", city: "University Park, PA",      anchor: false },
    { id: "sch_uw",           name: "University of Washington",              short: "UW",           brand: "#4b2e83", city: "Seattle, WA",              anchor: false },
    { id: "sch_gatech",       name: "Georgia Institute of Technology",       short: "GT",           brand: "#b3a369", city: "Atlanta, GA",              anchor: false },
    { id: "sch_purdue",       name: "Purdue University",                     short: "Purdue",       brand: "#ceb888", city: "West Lafayette, IN",       anchor: false },
    // NE smaller
    { id: "sch_lehigh",       name: "Lehigh University",                     short: "Lehigh",       brand: "#502d0e", city: "Bethlehem, PA",            anchor: false },
    { id: "sch_njit",         name: "NJIT",                                  short: "NJIT",         brand: "#b22234", city: "Newark, NJ",               anchor: false },
    { id: "sch_stevens",      name: "Stevens Institute of Technology",       short: "Stevens",      brand: "#a32638", city: "Hoboken, NJ",              anchor: false },
    { id: "sch_rutgers",      name: "Rutgers University",                    short: "Rutgers",      brand: "#cc0033", city: "New Brunswick, NJ",        anchor: false },
    { id: "sch_bu",           name: "Boston University",                     short: "BU",           brand: "#cc0000", city: "Boston, MA",               anchor: false },
    { id: "sch_bc",           name: "Boston College",                        short: "BC",           brand: "#98002e", city: "Chestnut Hill, MA",        anchor: false },
    { id: "sch_northeastern", name: "Northeastern University",               short: "Northeastern", brand: "#c8102e", city: "Boston, MA",               anchor: false },
    { id: "sch_tufts",        name: "Tufts University",                      short: "Tufts",        brand: "#3e8ede", city: "Medford, MA",              anchor: false },
    { id: "sch_smfa",         name: "Tufts SMFA combined",                   short: "SMFA",         brand: "#418fde", city: "Boston, MA",               anchor: false },
    // LACs
    { id: "sch_williams",     name: "Williams College",                      short: "Williams",     brand: "#500082", city: "Williamstown, MA",         anchor: false },
    { id: "sch_amherst",      name: "Amherst College",                       short: "Amherst",      brand: "#3f1f69", city: "Amherst, MA",              anchor: false },
    { id: "sch_pomona",       name: "Pomona College",                        short: "Pomona",       brand: "#20457c", city: "Claremont, CA",            anchor: false },
    { id: "sch_wesleyan",     name: "Wesleyan University",                   short: "Wesleyan",     brand: "#d72331", city: "Middletown, CT",           anchor: false },
    { id: "sch_bowdoin",      name: "Bowdoin College",                       short: "Bowdoin",      brand: "#003a70", city: "Brunswick, ME",            anchor: false },
    { id: "sch_bates",        name: "Bates College",                         short: "Bates",        brand: "#881124", city: "Lewiston, ME",             anchor: false },
    { id: "sch_middlebury",   name: "Middlebury College",                    short: "Middlebury",   brand: "#003594", city: "Middlebury, VT",           anchor: false },
    { id: "sch_holy_cross",   name: "College of the Holy Cross",             short: "Holy Cross",   brand: "#6b1f8c", city: "Worcester, MA",            anchor: false },
    // Art schools
    { id: "sch_risd",         name: "Rhode Island School of Design",         short: "RISD",         brand: "#9b1c36", city: "Providence, RI",           anchor: false },
    { id: "sch_pratt",        name: "Pratt Institute",                       short: "Pratt",        brand: "#1d6363", city: "Brooklyn, NY",             anchor: false },
    { id: "sch_mica",         name: "Maryland Institute College of Art",     short: "MICA",         brand: "#fbb040", city: "Baltimore, MD",            anchor: false },
    { id: "sch_bard",         name: "Bard College",                          short: "Bard",         brand: "#9c1818", city: "Annandale-on-Hudson, NY",  anchor: false },
    { id: "sch_washu",        name: "Washington University in St. Louis",    short: "WashU",        brand: "#a51417", city: "St. Louis, MO",            anchor: false },
    // Other
    { id: "sch_syracuse",     name: "Syracuse University",                   short: "Syracuse",     brand: "#f76900", city: "Syracuse, NY",             anchor: false },
    { id: "sch_tulane",       name: "Tulane University",                     short: "Tulane",       brand: "#006c3a", city: "New Orleans, LA",          anchor: false },
    { id: "sch_hawaii_pacific",name:"Hawaii Pacific University",             short: "Hawaii Pacific",brand:"#00837d",city: "Honolulu, HI",              anchor: false },
    { id: "sch_wake_forest",  name: "Wake Forest University",                short: "Wake Forest",  brand: "#9e7e38", city: "Winston-Salem, NC",        anchor: false },
    { id: "sch_wayne_state",  name: "Wayne State University",                short: "Wayne State",  brand: "#004b35", city: "Detroit, MI",              anchor: false },
    { id: "sch_msu",          name: "Michigan State University",             short: "MSU",          brand: "#18453b", city: "East Lansing, MI",         anchor: false },
  ],

  // ============================================================
  // STUDENTS
  // 6 stars (deep) + 9 backgrounds (shallow per spec, expanded with tasks)
  // ============================================================
  students: [
    // ----- STAR 1: Priya Venkataraman -----
    {
      id: "stu_priya",
      consultantId: "con_xiao",
      firstName: "Priya",
      lastName: "Venkataraman",
      initials: "PV",
      classOf: 2027,
      highSchool: "Westview HS (public, Edison NJ)",
      major: "Biomedical Engineering",
      majorTrack: "pre-med pathway",
      gpaUnweighted: 4.0,
      gpaWeighted: 4.62,
      sat: 1570,
      citizenship: "US Citizen",
      hooks: [],
      competitiveness: "balanced; reach-heavy ED, safeties solid",
      stage: "Submitting",
      workingStyle: ["Perfectionist"],
      dec15Status: "Penn ED → DEFERRED 12/13. LOCI submitted 12/15. 8 RDs in active drafting; adapting Penn supplements for other engineering programs.",
      oneLine: "Bio-engineering ED-Penn-deferred; LOCI submitted; 8 RD apps adapting Penn supplements through engineering programs.",
      region: "Edison, NJ",
      schoolCount: 11,
    },

    // ----- STAR 2: Jackson Reilly -----
    {
      id: "stu_jackson",
      consultantId: "con_xiao",
      firstName: "Jackson",
      lastName: "Reilly",
      initials: "JR",
      classOf: 2027,
      highSchool: "Hartfield Country Day (private, Wellesley MA)",
      major: "Government / Sociology (undecided)",
      gpaUnweighted: 3.71,
      gpaWeighted: 4.04,
      sat: 1380,
      citizenship: "US Citizen",
      hooks: ["Recruited Athlete (D1 lacrosse, midfielder)"],
      competitiveness: "balanced; recruit-driven",
      stage: "Cycle done",
      workingStyle: [],
      dec15Status: "Princeton REA + athletic commit / ACCEPTED 12/12. Cycle done. All other apps Withdrawn. NLI window opens Feb.",
      oneLine: "D1 lacrosse recruit; Princeton REA admit + athletic commit; cycle done; all other apps withdrawn 12/13.",
      region: "Wellesley, MA",
      schoolCount: 8,
    },

    // ----- STAR 3: Maya Okafor-Brennan -----
    {
      id: "stu_maya",
      consultantId: "con_xiao",
      firstName: "Maya",
      lastName: "Okafor-Brennan",
      initials: "MO",
      classOf: 2027,
      highSchool: "Brookmere Academy (private progressive K-12, Brooklyn NY)",
      major: "Studio Art (painting + printmaking)",
      gpaUnweighted: 3.84,
      gpaWeighted: 4.07,
      sat: 1490,
      satNote: "post-retake; was 1450 in March",
      citizenship: "US Citizen",
      hooks: [],
      competitiveness: "reach-heavy; portfolio carrying the application",
      stage: "Submitting",
      workingStyle: ["Perfectionist", "Stress-anxious"],
      dec15Status: "RISD ED → DEFERRED 12/15. LOCI in prep (must ship by 12/19). 9 RDs in active drafting/revision. Perfectionist on Yale Short Answer 2 (draft 12, refusing to ship). Meeting cadence bumped to twice-weekly.",
      oneLine: "Studio-art portfolio carrying it; RISD ED deferred 12/15; 9 RDs drafting; Yale SA2 on draft 12, perfectionist intervention in play.",
      region: "Brooklyn, NY",
      schoolCount: 12,
      meetingCadence: "twice-weekly through Jan 1; daily Slack check-ins on draft handoffs",
    },

    // ----- STAR 4: Daniel Reyes -----
    {
      id: "stu_daniel",
      consultantId: "con_xiao",
      firstName: "Daniel",
      lastName: "Reyes",
      initials: "DR",
      classOf: 2027,
      highSchool: "Frontera HS (public Title-I, El Paso TX)",
      major: "Mechanical / Industrial Engineering",
      gpaUnweighted: 3.96,
      gpaWeighted: 4.51,
      sat: 1450,
      satNote: "June retake; was 1380 in March",
      citizenship: "US Citizen",
      hooks: ["First-generation", "National Hispanic Recognition Program (NHRP)", "Pell-eligible"],
      competitiveness: "reach-heavy via QB; financial aid was gating filter",
      stage: "Cycle done",
      workingStyle: [],
      dec15Status: "QB Match → ACCEPTED to Stanford 12/1. Cycle done. All other QB partners and non-QB apps withdrawn (binding match).",
      oneLine: "First-gen + Hispanic + Pell-eligible; QB Match to Stanford 12/1; cycle done.",
      region: "El Paso, TX",
      schoolCount: 16,
    },

    // ----- STAR 5: Tianyu (Tony) Lin -----
    {
      id: "stu_tony",
      consultantId: "con_xiao",
      firstName: "Tony",
      lastName: "Lin",
      preferredFirstName: "Tony",
      legalFirstName: "Tianyu",
      initials: "TL",
      classOf: 2027,
      highSchool: "Westbury Academy (private boarding, CT; transferred 11th grade from Shanghai International Academy)",
      major: "Computer Science (theoretical / ML; computational biology long-term)",
      gpaUnweighted: 3.92,
      gpaWeighted: 4.45,
      sat: 1530,
      toefl: 115,
      citizenship: "Chinese (PRC), F-1 visa",
      hooks: ["International"],
      competitiveness: "reach-heavy; strong technical resume",
      stage: "Submitting",
      workingStyle: ["Self-directed"],
      dec15Status: "Yale REA → ACCEPTED 12/14 (non-binding). Keeping 13 RD apps live because CMU SCS and MIT remain personal-fit priorities. Mid-revision on most CS supplements; Yale acceptance lifted morale, did not collapse the workload.",
      oneLine: "International CS reach; Yale REA admit non-binding; CMU SCS + MIT remain personal priorities so still grinding 13 RDs.",
      region: "CT (boarding); home Shanghai, China",
      schoolCount: 18, // UC counted as 1, otherwise 21
    },

    // ----- STAR 6: Roya Karimi -----
    {
      id: "stu_roya",
      consultantId: "con_xiao",
      firstName: "Roya",
      lastName: "Karimi",
      initials: "RK",
      classOf: 2027,
      highSchool: "Saxonbury School (private boarding, NJ)",
      major: "International Relations / Government (Middle East focus, policy-track)",
      gpaUnweighted: 3.95,
      gpaWeighted: 4.41,
      sat: 1530,
      satBreakdown: "770 EBRW / 760 Math",
      citizenship: "US Citizen (Iranian-American; both parents emigrated Tehran 1998)",
      hooks: [],
      competitiveness: "reach-heavy; resume strong, prior consultant work was weak",
      stage: "Regrouping",
      workingStyle: ["Self-directed"],
      dec15Status: "Princeton SPIA REA → DENIED 12/12. Fired prior consultant 12/14. Intake with Xiao 12/15. Common App PS being rewritten from scratch. Activity list being redone. School list being rebuilt. 17 days to Jan 1.",
      oneLine: "Iranian-American IR/policy; Princeton SPIA denied 12/12; fired prior consultant 12/14; INTAKE 12/15 — 17 days to Jan 1, full restart.",
      region: "NJ (boarding); family in NJ",
      schoolCount: 14, // UC counted as 1, otherwise 17
      meetingCadence: "3x/week (M/W/F) through 1/1; emergency Slack channel for draft turnarounds",
    },

    // ----- BACKGROUND: Marcus Chen -----
    {
      id: "stu_marcus",
      consultantId: "con_xiao",
      firstName: "Marcus",
      lastName: "Chen",
      initials: "MC",
      classOf: 2027,
      highSchool: "Lakeside School (private, Seattle)",
      major: "Computer Science",
      gpaUnweighted: 3.88,
      sat: 1520,
      citizenship: "US Citizen",
      hooks: ["Legacy (Stanford)"],
      competitiveness: "reach-heavy",
      stage: "Regrouping",
      workingStyle: ["Anxious-parent-driven"],
      dec15Status: "Stanford REA → DENIED 12/12. Added 4 schools to RD list 12/13-15 (BU, BC, Tufts, GT).",
      oneLine: "Stanford legacy denied REA; mom taking it harder than he is; school list expansion driven by anxiety, not strategy. Xiao's job this week is calming the parents.",
      region: "Seattle, WA",
      schoolCount: 15,
    },

    // ----- BACKGROUND: Eliana Brooks -----
    {
      id: "stu_eliana",
      consultantId: "con_xiao",
      firstName: "Eliana",
      lastName: "Brooks",
      initials: "EB",
      classOf: 2027,
      highSchool: "Marlborough School (private, LA)",
      major: "Communications / Media Studies",
      gpaUnweighted: 3.92,
      sat: 1500,
      citizenship: "US Citizen",
      hooks: [],
      competitiveness: "balanced",
      stage: "Submitting",
      workingStyle: [],
      dec15Status: "UChicago EA → ACCEPTED 12/13. RDs in late polish.",
      oneLine: "LA media kid; UChicago EA admit in hand (non-binding); RD round in late polish, Northwestern Medill is the stretch.",
      region: "Los Angeles, CA",
      schoolCount: 9,
    },

    // ----- BACKGROUND: Hassan Mohammed -----
    {
      id: "stu_hassan",
      consultantId: "con_xiao",
      firstName: "Hassan",
      lastName: "Mohammed",
      initials: "HM",
      classOf: 2027,
      highSchool: "Newark Tech (NJ public)",
      major: "Mechanical Engineering",
      gpaUnweighted: 4.0,
      gpaWeighted: 4.65,
      sat: 1410,
      citizenship: "US Citizen",
      hooks: ["First-gen (Somali-American)", "QB Finalist"],
      competitiveness: "reach-heavy via QB; non-QB safeties solid",
      stage: "Submitting",
      workingStyle: [],
      dec15Status: "QB Match NON-MATCH 12/1. RD round to QB partners + non-QB. Safeties already in (NJIT Honors full-ride, Stevens priority, Rutgers Engineering Honors).",
      oneLine: "First-gen Somali-American engineer; QB non-match was hard but safety net is locked; grinding RDs with QB Finalist status as a real boost.",
      region: "Newark, NJ",
      schoolCount: 12,
    },

    // ----- BACKGROUND: Caroline Vandermeer -----
    {
      id: "stu_caroline",
      consultantId: "con_xiao",
      firstName: "Caroline",
      lastName: "Vandermeer",
      initials: "CV",
      classOf: 2027,
      highSchool: "Greenwich Academy (private, CT)",
      major: "Art History / Museum Studies",
      gpaUnweighted: 3.78,
      sat: 1410,
      citizenship: "US Citizen",
      hooks: ["Legacy (Brown)"],
      competitiveness: "balanced; legacy boost",
      stage: "Submitting",
      workingStyle: ["Anxious-parent-driven"],
      dec15Status: "Brown ED → DEFERRED 12/13. LOCI submitted 12/15. RDs polishing.",
      oneLine: "Brown legacy deferred from ED; LOCI shipped; LAC RDs polishing, mom is taking it harder than she is.",
      region: "Greenwich, CT",
      schoolCount: 8,
    },

    // ----- BACKGROUND: Min-jun Park -----
    {
      id: "stu_minjun",
      consultantId: "con_xiao",
      firstName: "Min-jun",
      lastName: "Park",
      initials: "MP",
      classOf: 2027,
      highSchool: "Korea International School Seoul (international)",
      major: "Economics / Finance",
      gpaUnweighted: 3.91,
      sat: 1490,
      toefl: 110,
      citizenship: "Korean national, F-1 visa",
      hooks: ["International (Korean national)"],
      competitiveness: "reach-heavy",
      stage: "Cycle done",
      workingStyle: [],
      dec15Status: "Wharton ED → ACCEPTED 12/13. Cycle DONE. All other apps Withdrawn 12/13.",
      oneLine: "Wharton ED admit; cycle wrapped. F-1 visa transition + housing forms only remaining work.",
      region: "Seoul, South Korea",
      schoolCount: 11,
    },

    // ----- BACKGROUND: Sophia Castillo -----
    {
      id: "stu_sophia",
      consultantId: "con_xiao",
      firstName: "Sophia",
      lastName: "Castillo",
      initials: "SC",
      classOf: 2027,
      highSchool: "Coral Reef Senior HS (public, Miami)",
      major: "Pre-Med (Biology)",
      gpaUnweighted: 3.85,
      sat: 1390,
      citizenship: "US Citizen",
      hooks: ["First-gen (Cuban-American)"],
      competitiveness: "reach-balanced",
      stage: "Submitting",
      workingStyle: [],
      dec15Status: "UMiami ED1 deferred 12/12. LOCI submitted 12/15. Penn State Rolling admit in hand. UF + FSU EA pending. RDs in finishing polish.",
      oneLine: "First-gen Cuban-American premed; UMiami ED deferral was a surprise but Penn State safety in hand; LOCI shipped, awaiting FSU EA 12/17, RDs polishing.",
      region: "Miami, FL",
      schoolCount: 11,
    },

    // ----- BACKGROUND: Henry Whitaker -----
    {
      id: "stu_henry",
      consultantId: "con_xiao",
      firstName: "Henry",
      lastName: "Whitaker",
      initials: "HW",
      classOf: 2027,
      highSchool: "Phillips Exeter (NH boarding)",
      major: "History / Political Theory",
      gpaUnweighted: 3.95,
      sat: 1560,
      citizenship: "US Citizen",
      hooks: [],
      competitiveness: "reach-heavy",
      stage: "Regrouping",
      workingStyle: [],
      dec15Status: "Yale REA → DENIED 12/14. Ivy RD round in active polish.",
      oneLine: "Exeter humanities kid; Yale REA denial sober but composed; Ivy RD round in late polish, Princeton + Columbia drafts strong.",
      region: "NH (boarding)",
      schoolCount: 9,
    },

    // ----- BACKGROUND: Eric Tanaka -----
    {
      id: "stu_eric",
      consultantId: "con_xiao",
      firstName: "Eric",
      lastName: "Tanaka",
      initials: "ET",
      classOf: 2027,
      highSchool: "Punahou School (private, Honolulu)",
      major: "Engineering (Mech / Civil undecided)",
      gpaUnweighted: 3.83,
      sat: 1450,
      citizenship: "US Citizen",
      hooks: ["Recruited Athlete (D3 swimming)"],
      competitiveness: "balanced; recruit-supported at Williams",
      stage: "Submitting",
      workingStyle: [],
      dec15Status: "Hawaii Pacific Rolling admit in hand. MIT EA awaiting (result 12/16). D3 swim coach pre-read positive at Williams (formal coach support letter on file). RDs shipping.",
      oneLine: "Punahou D3 swim recruit; Hawaii Pacific safety in hand; MIT EA result drops 12/16; Williams coach pre-read is the realistic top.",
      region: "Honolulu, HI",
      schoolCount: 8,
    },

    // ----- BACKGROUND: Layla Abdi (Junior, class of 2028) -----
    {
      id: "stu_layla",
      consultantId: "con_xiao",
      firstName: "Layla",
      lastName: "Abdi",
      initials: "LA",
      classOf: 2028,
      highSchool: "Detroit Renaissance HS (public)",
      major: "Public Health / Epidemiology",
      gpaUnweighted: 3.97,
      psat: 1450,
      psatNote: "Junior PSAT; NMSF cutoff TBD",
      citizenship: "US Citizen",
      hooks: ["First-gen (Somali-American)"],
      competitiveness: "early stage; building",
      stage: "Building",
      workingStyle: [],
      dec15Status: "Junior, Intake (early-bird; most juniors don't start until spring). BSQ in progress; summer research lined up at UMich for summer 2027.",
      oneLine: "First-gen Somali-American junior; proactive starter, BSQ in progress, summer research lined up at UMich for summer 2027.",
      region: "Detroit, MI",
      schoolCount: 10,
    },
  ],

  // ============================================================
  // PROJECTS (per-student per-school applications)
  // status values: Drafting | Submitted | InReview | Revising | NotStarted
  //                | Open | Done | Withdrawn | Accepted | Denied | Deferred
  // round values:  ED | ED1 | REA | EA | RD | UC | Rolling | DIR
  // ============================================================
  projects: [
    // ===== Priya (11 schools) =====
    { id: "proj_priya_penn",        studentId: "stu_priya", schoolId: "sch_penn",        program: "BE single-degree",   round: "ED",      status: "Deferred",  decisionDate: "2026-12-13", deadline: "2026-11-01", isTopChoice: true,  isPinned: true  },
    { id: "proj_priya_cornell",     studentId: "stu_priya", schoolId: "sch_cornell",     program: "Engineering",        round: "RD",      status: "Drafting",  deadline: "2027-01-02"                                                                          },
    { id: "proj_priya_umich",       studentId: "stu_priya", schoolId: "sch_umich",       program: "Engineering",        round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01"                                              },
    { id: "proj_priya_mit",         studentId: "stu_priya", schoolId: "sch_mit",         program: null,                 round: "RD",      status: "Drafting",  deadline: "2027-01-04"                                                                          },
    { id: "proj_priya_jhu",         studentId: "stu_priya", schoolId: "sch_jhu",         program: "BME",                round: "RD",      status: "Drafting",  deadline: "2027-01-02"                                                                          },
    { id: "proj_priya_duke",        studentId: "stu_priya", schoolId: "sch_duke",        program: "Pratt Engineering",  round: "RD",      status: "Drafting",  deadline: "2027-01-02"                                                                          },
    { id: "proj_priya_northwestern",studentId: "stu_priya", schoolId: "sch_northwestern",program: "McCormick",          round: "RD",      status: "Drafting",  deadline: "2027-01-01"                                                                          },
    { id: "proj_priya_columbia",    studentId: "stu_priya", schoolId: "sch_columbia",    program: "Engineering",        round: "RD",      status: "Drafting",  deadline: "2027-01-01"                                                                          },
    { id: "proj_priya_nyu",         studentId: "stu_priya", schoolId: "sch_nyu",         program: "Tandon",             round: "RD",      status: "Drafting",  deadline: "2027-01-05"                                                                          },
    { id: "proj_priya_usc",         studentId: "stu_priya", schoolId: "sch_usc",         program: "Viterbi",            round: "RD",      status: "Drafting",  deadline: "2027-01-10"                                                                          },
    { id: "proj_priya_rutgers",     studentId: "stu_priya", schoolId: "sch_rutgers",     program: "Engineering Honors", round: "Rolling", status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-12-01", note: "admit pending"                       },

    // ===== Jackson (8 schools — Princeton accepted, all others withdrawn) =====
    { id: "proj_jackson_princeton",    studentId: "stu_jackson", schoolId: "sch_princeton",   program: null, round: "REA",     status: "Accepted",  decisionDate: "2026-12-12", deadline: "2026-11-01", isTopChoice: true, isPinned: true, note: "Athletic commit, treated as ED-equivalent" },
    { id: "proj_jackson_jhu",          studentId: "stu_jackson", schoolId: "sch_jhu",         program: null, round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_jackson_notre_dame",   studentId: "stu_jackson", schoolId: "sch_notre_dame",  program: null, round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_jackson_uva",          studentId: "stu_jackson", schoolId: "sch_uva",         program: null, round: "EA",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_jackson_penn",         studentId: "stu_jackson", schoolId: "sch_penn",        program: null, round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_jackson_cornell",      studentId: "stu_jackson", schoolId: "sch_cornell",     program: null, round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_jackson_usc",          studentId: "stu_jackson", schoolId: "sch_usc",         program: null, round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13", note: "never submitted" },
    { id: "proj_jackson_holy_cross",   studentId: "stu_jackson", schoolId: "sch_holy_cross",  program: null, round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13", note: "never submitted; was lax safety" },

    // ===== Maya (12 schools) =====
    { id: "proj_maya_risd",        studentId: "stu_maya", schoolId: "sch_risd",        program: null,                round: "ED",      status: "Deferred",  decisionDate: "2026-12-15", deadline: "2026-11-01", isTopChoice: true, isPinned: true, note: "LOCI due to RISD admissions by 12/19" },
    { id: "proj_maya_mica",        studentId: "stu_maya", schoolId: "sch_mica",        program: null,                round: "EA",      status: "Submitted", submittedAt: "2026-11-15", deadline: "2026-11-15", note: "result late Feb" },
    { id: "proj_maya_pratt",       studentId: "stu_maya", schoolId: "sch_pratt",       program: null,                round: "Rolling", status: "Accepted",  decisionDate: "2026-12-03", note: "Presidential Merit Scholarship, $28K/yr" },
    { id: "proj_maya_yale",        studentId: "stu_maya", schoolId: "sch_yale",        program: "Art",               round: "RD",      status: "Revising",  deadline: "2027-01-02", note: "Short Answer 2 on draft 12" },
    { id: "proj_maya_brown",       studentId: "stu_maya", schoolId: "sch_brown",       program: "Visual Arts",       round: "RD",      status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_maya_washu",       studentId: "stu_maya", schoolId: "sch_washu",       program: "Sam Fox",           round: "RD",      status: "Revising",  deadline: "2027-01-02" },
    { id: "proj_maya_wesleyan",    studentId: "stu_maya", schoolId: "sch_wesleyan",    program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_maya_cornell",     studentId: "stu_maya", schoolId: "sch_cornell",     program: "Arts & Sciences",   round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_maya_nyu",         studentId: "stu_maya", schoolId: "sch_nyu",         program: "Tisch Studio",      round: "RD",      status: "Submitted", submittedAt: "2026-11-30", deadline: "2026-11-30" },
    { id: "proj_maya_smfa",        studentId: "stu_maya", schoolId: "sch_smfa",        program: "combined-degree",   round: "RD",      status: "Drafting",  deadline: "2027-01-15" },
    { id: "proj_maya_usc",         studentId: "stu_maya", schoolId: "sch_usc",         program: "Roski",             round: "RD",      status: "Drafting",  deadline: "2027-01-10" },
    { id: "proj_maya_bard",        studentId: "stu_maya", schoolId: "sch_bard",        program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-01" },

    // ===== Daniel (16 schools — Stanford QB Match accepted, rest withdrawn) =====
    { id: "proj_daniel_stanford",     studentId: "stu_daniel", schoolId: "sch_stanford",   program: null,             round: "RD",      status: "Accepted",  decisionDate: "2026-12-01", deadline: "2026-09-27", isTopChoice: true, isPinned: true, note: "QB Match (binding)" },
    { id: "proj_daniel_yale",         studentId: "stu_daniel", schoolId: "sch_yale",       program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #2" },
    { id: "proj_daniel_princeton",    studentId: "stu_daniel", schoolId: "sch_princeton",  program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #3" },
    { id: "proj_daniel_pomona",       studentId: "stu_daniel", schoolId: "sch_pomona",     program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #4" },
    { id: "proj_daniel_williams",     studentId: "stu_daniel", schoolId: "sch_williams",   program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #5" },
    { id: "proj_daniel_penn",         studentId: "stu_daniel", schoolId: "sch_penn",       program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #6" },
    { id: "proj_daniel_rice",         studentId: "stu_daniel", schoolId: "sch_rice",       program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #7" },
    { id: "proj_daniel_notre_dame",   studentId: "stu_daniel", schoolId: "sch_notre_dame", program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #8" },
    { id: "proj_daniel_vanderbilt",   studentId: "stu_daniel", schoolId: "sch_vanderbilt", program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #9" },
    { id: "proj_daniel_usc",          studentId: "stu_daniel", schoolId: "sch_usc",        program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #10" },
    { id: "proj_daniel_northwestern", studentId: "stu_daniel", schoolId: "sch_northwestern",program: null,            round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #11" },
    { id: "proj_daniel_mit",          studentId: "stu_daniel", schoolId: "sch_mit",        program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "QB rank #12" },
    { id: "proj_daniel_ut_austin",    studentId: "stu_daniel", schoolId: "sch_ut_austin",  program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01" },
    { id: "proj_daniel_cornell",      studentId: "stu_daniel", schoolId: "sch_cornell",    program: "Engineering",    round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01", note: "was in drafting; withdrawn at QB Match" },
    { id: "proj_daniel_tamu",         studentId: "stu_daniel", schoolId: "sch_tamu",       program: null,             round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-01" },
    { id: "proj_daniel_utep",         studentId: "stu_daniel", schoolId: "sch_utep",       program: "Honors",         round: "Rolling", status: "Withdrawn", withdrawnAt: "2026-12-01", note: "full-ride safety" },

    // ===== Tony (18 — UC counted as 1) =====
    { id: "proj_tony_yale",         studentId: "stu_tony", schoolId: "sch_yale",         program: null,                round: "REA",     status: "Accepted",  decisionDate: "2026-12-14", deadline: "2026-11-01", isTopChoice: true, isPinned: true, note: "non-binding REA" },
    { id: "proj_tony_mit",          studentId: "stu_tony", schoolId: "sch_mit",          program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-04", note: "top personal priority despite Yale admit" },
    { id: "proj_tony_stanford",     studentId: "stu_tony", schoolId: "sch_stanford",     program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_tony_princeton",    studentId: "stu_tony", schoolId: "sch_princeton",    program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_tony_cmu",          studentId: "stu_tony", schoolId: "sch_cmu",          program: "SCS",               round: "RD",      status: "Revising",  deadline: "2027-01-02", note: "real top choice for CS curriculum depth" },
    { id: "proj_tony_uchicago",     studentId: "stu_tony", schoolId: "sch_uchicago",     program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_tony_penn",         studentId: "stu_tony", schoolId: "sch_penn",         program: "CIS",               round: "RD",      status: "Drafting",  deadline: "2027-01-05" },
    { id: "proj_tony_cornell",      studentId: "stu_tony", schoolId: "sch_cornell",      program: "CIS",               round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_tony_columbia",     studentId: "stu_tony", schoolId: "sch_columbia",     program: "SEAS",              round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_tony_northwestern", studentId: "stu_tony", schoolId: "sch_northwestern", program: "McCormick",         round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_tony_caltech",      studentId: "stu_tony", schoolId: "sch_caltech",      program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-05", note: "Caltech REA was an option but Tony used his single-choice early at Yale" },
    { id: "proj_tony_jhu",          studentId: "stu_tony", schoolId: "sch_jhu",          program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_tony_duke",         studentId: "stu_tony", schoolId: "sch_duke",         program: null,                round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_tony_umich",        studentId: "stu_tony", schoolId: "sch_umich",        program: "CS",                round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01", note: "permitted under Yale REA; result late Jan" },
    { id: "proj_tony_gatech",       studentId: "stu_tony", schoolId: "sch_gatech",       program: "CS",                round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01", note: "permitted under Yale REA; result 1/11" },
    { id: "proj_tony_purdue",       studentId: "stu_tony", schoolId: "sch_purdue",       program: "CS",                round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01", note: "permitted under Yale REA; result Jan" },
    { id: "proj_tony_northeastern", studentId: "stu_tony", schoolId: "sch_northeastern", program: "CS",                round: "RD",      status: "Drafting",  deadline: "2027-01-01", note: "private; could not file EA under Yale REA single-choice rule" },
    { id: "proj_tony_uc",           studentId: "stu_tony", schoolId: "sch_berkeley",     program: "EECS (+UCLA/UCSD/UCSB also; UC application)", round: "UC", status: "Submitted", submittedAt: "2026-11-30", deadline: "2026-11-30", note: "UC application covers Berkeley/UCLA/UCSD/UCSB; results March", ucCampuses: ["sch_berkeley","sch_ucla","sch_ucsd","sch_ucsb"] },

    // ===== Roya (14 — UC counted as 1, 17 if expanded) =====
    { id: "proj_roya_princeton",    studentId: "stu_roya", schoolId: "sch_princeton",    program: "SPIA",              round: "REA",     status: "Denied",    decisionDate: "2026-12-12", deadline: "2026-11-01", note: "under prior consultant" },
    { id: "proj_roya_georgetown",   studentId: "stu_roya", schoolId: "sch_georgetown",   program: "SFS, International Politics", round: "RD", status: "NotStarted", deadline: "2027-01-10", isTopChoice: true, isPinned: true, note: "Xiao's #1 fit recommendation" },
    { id: "proj_roya_yale",         studentId: "stu_roya", schoolId: "sch_yale",         program: "EP&E",              round: "RD",      status: "NotStarted",deadline: "2027-01-02", note: "target #2" },
    { id: "proj_roya_brown",        studentId: "stu_roya", schoolId: "sch_brown",        program: "Political Science / IR", round: "RD", status: "NotStarted",deadline: "2027-01-01" },
    { id: "proj_roya_columbia",     studentId: "stu_roya", schoolId: "sch_columbia",     program: "CC, Political Science", round: "RD",  status: "NotStarted",deadline: "2027-01-01" },
    { id: "proj_roya_penn",         studentId: "stu_roya", schoolId: "sch_penn",         program: "PPE",               round: "RD",      status: "NotStarted",deadline: "2027-01-05" },
    { id: "proj_roya_tufts",        studentId: "stu_roya", schoolId: "sch_tufts",        program: "IR",                round: "RD",      status: "NotStarted",deadline: "2027-01-01" },
    { id: "proj_roya_cornell",      studentId: "stu_roya", schoolId: "sch_cornell",      program: "Government / Brooks",round: "RD",     status: "NotStarted",deadline: "2027-01-02" },
    { id: "proj_roya_jhu",          studentId: "stu_roya", schoolId: "sch_jhu",          program: "International Studies BA/MA", round: "RD", status: "NotStarted", deadline: "2027-01-02" },
    { id: "proj_roya_usc",          studentId: "stu_roya", schoolId: "sch_usc",          program: "International Relations", round: "RD", status: "NotStarted", deadline: "2027-01-10" },
    { id: "proj_roya_umich",        studentId: "stu_roya", schoolId: "sch_umich",        program: "Political Science / Public Policy", round: "RD", status: "NotStarted", deadline: "2027-02-01" },
    { id: "proj_roya_nyu",          studentId: "stu_roya", schoolId: "sch_nyu",          program: "CAS Political Science", round: "RD",  status: "NotStarted",deadline: "2027-01-05", note: "under review by Xiao 12/16" },
    { id: "proj_roya_gwu",          studentId: "stu_roya", schoolId: "sch_gwu",          program: "Elliott School",    round: "RD",      status: "NotStarted",deadline: "2027-01-05", note: "no GWU EA filed; would have violated Princeton REA single-choice rule" },
    { id: "proj_roya_uc",           studentId: "stu_roya", schoolId: "sch_berkeley",     program: "Political Science (+UCLA/UCSD/UCSB)", round: "UC", status: "Submitted", submittedAt: "2026-11-30", deadline: "2026-11-30", note: "submitted under prior consultant; Xiao reviewing PIQ adequacy", ucCampuses: ["sch_berkeley","sch_ucla","sch_ucsd","sch_ucsb"] },

    // ===== Marcus (15 schools — Stanford REA denied; +4 added 12/13-15) =====
    { id: "proj_marcus_stanford",     studentId: "stu_marcus", schoolId: "sch_stanford",     program: null, round: "REA",     status: "Denied",   decisionDate: "2026-12-12", deadline: "2026-11-01" },
    { id: "proj_marcus_mit",          studentId: "stu_marcus", schoolId: "sch_mit",          program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-04" },
    { id: "proj_marcus_cmu",          studentId: "stu_marcus", schoolId: "sch_cmu",          program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_marcus_berkeley",     studentId: "stu_marcus", schoolId: "sch_berkeley",     program: "CS",  round: "UC",     status: "Submitted",submittedAt: "2026-11-30", deadline: "2026-11-30", ucCampuses: ["sch_berkeley","sch_ucla"] },
    { id: "proj_marcus_ucla",         studentId: "stu_marcus", schoolId: "sch_ucla",         program: "CS",  round: "UC",     status: "Submitted",submittedAt: "2026-11-30", deadline: "2026-11-30" },
    { id: "proj_marcus_usc",          studentId: "stu_marcus", schoolId: "sch_usc",          program: "CS", round: "RD",      status: "Drafting",  deadline: "2027-01-10" },
    { id: "proj_marcus_cornell",      studentId: "stu_marcus", schoolId: "sch_cornell",      program: "CS", round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_marcus_nyu",          studentId: "stu_marcus", schoolId: "sch_nyu",          program: "CS", round: "RD",      status: "Drafting",  deadline: "2027-01-05" },
    { id: "proj_marcus_umich",        studentId: "stu_marcus", schoolId: "sch_umich",        program: "CS", round: "EA",      status: "Submitted",submittedAt: "2026-11-01", deadline: "2026-11-01" },
    { id: "proj_marcus_northwestern", studentId: "stu_marcus", schoolId: "sch_northwestern", program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_marcus_uw",           studentId: "stu_marcus", schoolId: "sch_uw",           program: "CS", round: "Rolling", status: "Drafting",  deadline: "2026-11-15", note: "originally planned EA Nov 15; pushed to rolling after Stanford denial" },
    { id: "proj_marcus_bu",           studentId: "stu_marcus", schoolId: "sch_bu",           program: "CS", round: "RD",      status: "NotStarted",deadline: "2027-01-05", addedAt: "2026-12-13", isRecentAdd: true },
    { id: "proj_marcus_bc",           studentId: "stu_marcus", schoolId: "sch_bc",           program: null, round: "RD",      status: "NotStarted",deadline: "2027-01-01", addedAt: "2026-12-14", isRecentAdd: true },
    { id: "proj_marcus_tufts",        studentId: "stu_marcus", schoolId: "sch_tufts",        program: "CS", round: "RD",      status: "NotStarted",deadline: "2027-01-01", addedAt: "2026-12-14", isRecentAdd: true },
    { id: "proj_marcus_gatech",       studentId: "stu_marcus", schoolId: "sch_gatech",       program: "Engineering", round: "RD", status: "NotStarted", deadline: "2027-01-04", addedAt: "2026-12-15", isRecentAdd: true },

    // ===== Eliana (9 schools — UChicago EA admit) =====
    { id: "proj_eliana_uchicago",    studentId: "stu_eliana", schoolId: "sch_uchicago",    program: null, round: "EA",      status: "Accepted",  decisionDate: "2026-12-13", deadline: "2026-11-01", isTopChoice: true, isPinned: true, note: "non-binding EA" },
    { id: "proj_eliana_nyu",         studentId: "stu_eliana", schoolId: "sch_nyu",         program: null, round: "RD",      status: "Revising",  deadline: "2027-01-05" },
    { id: "proj_eliana_northwestern",studentId: "stu_eliana", schoolId: "sch_northwestern",program: "Medill", round: "RD",  status: "Revising",  deadline: "2027-01-01", note: "stretch — Medill is goal" },
    { id: "proj_eliana_vanderbilt",  studentId: "stu_eliana", schoolId: "sch_vanderbilt",  program: null, round: "RD",      status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_eliana_emory",       studentId: "stu_eliana", schoolId: "sch_emory",       program: null, round: "RD",      status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_eliana_bu",          studentId: "stu_eliana", schoolId: "sch_bu",          program: "COM", round: "RD",      status: "Revising",  deadline: "2027-01-05" },
    { id: "proj_eliana_tulane",      studentId: "stu_eliana", schoolId: "sch_tulane",      program: null, round: "EA",      status: "Submitted", submittedAt: "2026-11-15", deadline: "2026-11-15", note: "result late Dec" },
    { id: "proj_eliana_syracuse",    studentId: "stu_eliana", schoolId: "sch_syracuse",    program: "Newhouse", round: "RD",status: "Submitted", submittedAt: "2026-11-15", deadline: "2026-11-15", note: "priority submitted" },
    { id: "proj_eliana_usc",         studentId: "stu_eliana", schoolId: "sch_usc",         program: null, round: "RD",      status: "Revising",  deadline: "2027-01-10" },

    // ===== Hassan (12 — QB non-match; safeties admitted) =====
    { id: "proj_hassan_mit",        studentId: "stu_hassan", schoolId: "sch_mit",        program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-04" },
    { id: "proj_hassan_stanford",   studentId: "stu_hassan", schoolId: "sch_stanford",   program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_hassan_princeton",  studentId: "stu_hassan", schoolId: "sch_princeton",  program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_hassan_penn",       studentId: "stu_hassan", schoolId: "sch_penn",       program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-05" },
    { id: "proj_hassan_cornell",    studentId: "stu_hassan", schoolId: "sch_cornell",    program: "Engineering",    round: "RD",      status: "Drafting",  deadline: "2027-01-02" },
    { id: "proj_hassan_caltech",    studentId: "stu_hassan", schoolId: "sch_caltech",    program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-05" },
    { id: "proj_hassan_usc",        studentId: "stu_hassan", schoolId: "sch_usc",        program: "Viterbi",        round: "RD",      status: "Drafting",  deadline: "2027-01-10" },
    { id: "proj_hassan_umich",      studentId: "stu_hassan", schoolId: "sch_umich",      program: "Engineering",    round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01" },
    { id: "proj_hassan_lehigh",     studentId: "stu_hassan", schoolId: "sch_lehigh",     program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_hassan_njit",       studentId: "stu_hassan", schoolId: "sch_njit",       program: "Honors",         round: "Rolling", status: "Accepted",  decisionDate: "2026-11-15", note: "full ride" },
    { id: "proj_hassan_stevens",    studentId: "stu_hassan", schoolId: "sch_stevens",    program: null,             round: "Rolling", status: "Accepted",  decisionDate: "2026-11-22", note: "priority round" },
    { id: "proj_hassan_rutgers",    studentId: "stu_hassan", schoolId: "sch_rutgers",    program: "Engineering Honors", round: "Rolling", status: "Accepted", decisionDate: "2026-12-01", note: "NJ resident priority" },

    // ===== Caroline (8 — Brown ED deferred) =====
    { id: "proj_caroline_brown",      studentId: "stu_caroline", schoolId: "sch_brown",      program: null, round: "ED", status: "Deferred",  decisionDate: "2026-12-13", deadline: "2026-11-01", isTopChoice: true, isPinned: true, note: "deferred from ED; LOCI in flight" },
    { id: "proj_caroline_williams",   studentId: "stu_caroline", schoolId: "sch_williams",   program: null, round: "RD", status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_caroline_bowdoin",    studentId: "stu_caroline", schoolId: "sch_bowdoin",    program: null, round: "RD", status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_caroline_bates",      studentId: "stu_caroline", schoolId: "sch_bates",      program: null, round: "RD", status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_caroline_middlebury", studentId: "stu_caroline", schoolId: "sch_middlebury", program: null, round: "RD", status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_caroline_nyu",        studentId: "stu_caroline", schoolId: "sch_nyu",        program: null, round: "RD", status: "Revising",  deadline: "2027-01-05" },
    { id: "proj_caroline_wesleyan",   studentId: "stu_caroline", schoolId: "sch_wesleyan",   program: null, round: "RD", status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_caroline_usc",        studentId: "stu_caroline", schoolId: "sch_usc",        program: null, round: "RD", status: "Drafting",  deadline: "2027-01-10" },

    // ===== Min-jun (11 schools — Wharton ED admit; rest withdrawn) =====
    { id: "proj_minjun_penn",        studentId: "stu_minjun", schoolId: "sch_penn",        program: "Wharton",     round: "ED",      status: "Accepted",  decisionDate: "2026-12-13", deadline: "2026-11-01", isTopChoice: true, isPinned: true },
    { id: "proj_minjun_nyu",         studentId: "stu_minjun", schoolId: "sch_nyu",         program: "Stern",       round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_cornell",     studentId: "stu_minjun", schoolId: "sch_cornell",     program: null,          round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_usc",         studentId: "stu_minjun", schoolId: "sch_usc",         program: "Marshall",    round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_berkeley",    studentId: "stu_minjun", schoolId: "sch_berkeley",    program: "Haas",        round: "UC",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_umich",       studentId: "stu_minjun", schoolId: "sch_umich",       program: "Ross",        round: "EA",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_bc",          studentId: "stu_minjun", schoolId: "sch_bc",          program: "Carroll",     round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_emory",       studentId: "stu_minjun", schoolId: "sch_emory",       program: null,          round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_vanderbilt",  studentId: "stu_minjun", schoolId: "sch_vanderbilt",  program: null,          round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_northeastern",studentId: "stu_minjun", schoolId: "sch_northeastern",program: null,          round: "EA",      status: "Withdrawn", withdrawnAt: "2026-12-13" },
    { id: "proj_minjun_bu",          studentId: "stu_minjun", schoolId: "sch_bu",          program: null,          round: "RD",      status: "Withdrawn", withdrawnAt: "2026-12-13" },

    // ===== Sophia (11 schools — UMiami ED1 deferred) =====
    { id: "proj_sophia_umiami",     studentId: "stu_sophia", schoolId: "sch_umiami",     program: null,             round: "ED1",     status: "Deferred",  decisionDate: "2026-12-12", deadline: "2026-11-01", isTopChoice: true, isPinned: true, note: "LOCI submitted 12/15" },
    { id: "proj_sophia_penn",       studentId: "stu_sophia", schoolId: "sch_penn",       program: null,             round: "RD",      status: "Revising",  deadline: "2027-01-05" },
    { id: "proj_sophia_cornell",    studentId: "stu_sophia", schoolId: "sch_cornell",    program: null,             round: "RD",      status: "Revising",  deadline: "2027-01-02" },
    { id: "proj_sophia_brown",      studentId: "stu_sophia", schoolId: "sch_brown",      program: null,             round: "RD",      status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_sophia_tufts",      studentId: "stu_sophia", schoolId: "sch_tufts",      program: null,             round: "RD",      status: "Revising",  deadline: "2027-01-01" },
    { id: "proj_sophia_bu",         studentId: "stu_sophia", schoolId: "sch_bu",         program: null,             round: "RD",      status: "Revising",  deadline: "2027-01-05" },
    { id: "proj_sophia_usc",        studentId: "stu_sophia", schoolId: "sch_usc",        program: null,             round: "RD",      status: "Drafting",  deadline: "2027-01-10" },
    { id: "proj_sophia_uf",         studentId: "stu_sophia", schoolId: "sch_uf",         program: null,             round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01", note: "result late Jan" },
    { id: "proj_sophia_fsu",        studentId: "stu_sophia", schoolId: "sch_fsu",        program: null,             round: "EA",      status: "Submitted", submittedAt: "2026-10-15", deadline: "2026-10-15", note: "result 12/17" },
    { id: "proj_sophia_penn_state", studentId: "stu_sophia", schoolId: "sch_penn_state", program: null,             round: "Rolling", status: "Accepted",  decisionDate: "2026-11-15" },
    { id: "proj_sophia_vanderbilt", studentId: "stu_sophia", schoolId: "sch_vanderbilt", program: null,             round: "RD",      status: "Revising",  deadline: "2027-01-01" },

    // ===== Henry (9 — Yale REA denied) =====
    { id: "proj_henry_yale",     studentId: "stu_henry", schoolId: "sch_yale",     program: null, round: "REA", status: "Denied",   decisionDate: "2026-12-14", deadline: "2026-11-01" },
    { id: "proj_henry_princeton",studentId: "stu_henry", schoolId: "sch_princeton",program: null, round: "RD",  status: "Revising", deadline: "2027-01-01", isTopChoice: true, isPinned: true },
    { id: "proj_henry_harvard",  studentId: "stu_henry", schoolId: "sch_harvard",  program: null, round: "RD",  status: "Revising", deadline: "2027-01-01" },
    { id: "proj_henry_columbia", studentId: "stu_henry", schoolId: "sch_columbia", program: null, round: "RD",  status: "Revising", deadline: "2027-01-01" },
    { id: "proj_henry_brown",    studentId: "stu_henry", schoolId: "sch_brown",    program: null, round: "RD",  status: "Drafting", deadline: "2027-01-01" },
    { id: "proj_henry_cornell",  studentId: "stu_henry", schoolId: "sch_cornell",  program: null, round: "RD",  status: "Drafting", deadline: "2027-01-02" },
    { id: "proj_henry_williams", studentId: "stu_henry", schoolId: "sch_williams", program: null, round: "RD",  status: "Drafting", deadline: "2027-01-01" },
    { id: "proj_henry_amherst",  studentId: "stu_henry", schoolId: "sch_amherst",  program: null, round: "RD",  status: "Drafting", deadline: "2027-01-01" },
    { id: "proj_henry_uva",      studentId: "stu_henry", schoolId: "sch_uva",      program: null, round: "EA",  status: "Submitted",submittedAt: "2026-11-01", deadline: "2026-11-01" },

    // ===== Eric (8 schools — Hawaii Pacific Rolling admit; MIT EA awaiting) =====
    { id: "proj_eric_mit",            studentId: "stu_eric", schoolId: "sch_mit",            program: null, round: "EA",      status: "Submitted", submittedAt: "2026-11-01", deadline: "2026-11-01", note: "result 12/16" },
    { id: "proj_eric_williams",       studentId: "stu_eric", schoolId: "sch_williams",       program: null, round: "RD",      status: "Revising",  deadline: "2027-01-01", isTopChoice: true, isPinned: true, note: "D3 swim coach pre-read positive; coach support letter on file" },
    { id: "proj_eric_tufts",          studentId: "stu_eric", schoolId: "sch_tufts",          program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_eric_bowdoin",        studentId: "stu_eric", schoolId: "sch_bowdoin",        program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-01" },
    { id: "proj_eric_usc",            studentId: "stu_eric", schoolId: "sch_usc",            program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-10" },
    { id: "proj_eric_ucla",           studentId: "stu_eric", schoolId: "sch_ucla",           program: null, round: "UC",      status: "Submitted", submittedAt: "2026-11-30", deadline: "2026-11-30" },
    { id: "proj_eric_hawaii_pacific", studentId: "stu_eric", schoolId: "sch_hawaii_pacific", program: null, round: "Rolling", status: "Accepted",  decisionDate: "2026-11-03" },
    { id: "proj_eric_nyu",            studentId: "stu_eric", schoolId: "sch_nyu",            program: null, round: "RD",      status: "Drafting",  deadline: "2027-01-05" },

    // ===== Layla (10 — Junior, draft only) =====
    { id: "proj_layla_cornell",      studentId: "stu_layla", schoolId: "sch_cornell",      program: null, round: "RD", status: "NotStarted", deadline: "2028-01-02", isDraft: true },
    { id: "proj_layla_jhu",          studentId: "stu_layla", schoolId: "sch_jhu",          program: null, round: "RD", status: "NotStarted", deadline: "2028-01-02", isDraft: true },
    { id: "proj_layla_northwestern", studentId: "stu_layla", schoolId: "sch_northwestern", program: null, round: "RD", status: "NotStarted", deadline: "2028-01-01", isDraft: true },
    { id: "proj_layla_emory",        studentId: "stu_layla", schoolId: "sch_emory",        program: null, round: "RD", status: "NotStarted", deadline: "2028-01-01", isDraft: true },
    { id: "proj_layla_wake_forest",  studentId: "stu_layla", schoolId: "sch_wake_forest",  program: null, round: "RD", status: "NotStarted", deadline: "2028-01-01", isDraft: true },
    { id: "proj_layla_umich",        studentId: "stu_layla", schoolId: "sch_umich",        program: null, round: "EA", status: "NotStarted", deadline: "2027-11-01", isDraft: true },
    { id: "proj_layla_wayne_state",  studentId: "stu_layla", schoolId: "sch_wayne_state",  program: null, round: "RD", status: "NotStarted", deadline: "2028-02-01", isDraft: true },
    { id: "proj_layla_msu",          studentId: "stu_layla", schoolId: "sch_msu",          program: null, round: "RD", status: "NotStarted", deadline: "2028-02-01", isDraft: true },
    { id: "proj_layla_usc",          studentId: "stu_layla", schoolId: "sch_usc",          program: null, round: "RD", status: "NotStarted", deadline: "2028-01-15", isDraft: true },
    { id: "proj_layla_brown",        studentId: "stu_layla", schoolId: "sch_brown",        program: null, round: "RD", status: "NotStarted", deadline: "2028-01-01", isDraft: true },
  ],

  // ============================================================
  // PROJECT ITEMS (essays / forms / portfolios on projects)
  // Stars: verbatim from Xiao's spec (deep schools detailed).
  // Backgrounds: minimal (mostly just the locked Common App PS).
  // type values: SUPPLEMENT | PERSONAL_STATEMENT | ACTIVITY_LIST
  //              | FORM | PORTFOLIO | LOCI | OTHER
  // status values: Submitted | Drafting | InReview | Revising
  //                | NotStarted | Open | Done
  // ============================================================
  projectItems: [
    // ----- Priya Deep School 1: Penn (LOCI + ED-locked) -----
    { id: "item_priya_penn_loci",     projectId: "proj_priya_penn",   name: "Penn LOCI",                            type: "LOCI",              wordLimit: 200, status: "Submitted", dueDate: "2026-12-15", submittedAt: "2026-12-15" },
    { id: "item_priya_penn_ps",       projectId: "proj_priya_penn",   name: "Common App Personal Statement",        type: "PERSONAL_STATEMENT", status: "Submitted", note: "locked from ED filing" },
    { id: "item_priya_penn_acts",     projectId: "proj_priya_penn",   name: "Common App Activities List",           type: "ACTIVITY_LIST",     status: "Submitted", note: "locked from ED filing" },
    { id: "item_priya_penn_whymajor", projectId: "proj_priya_penn",   name: "Penn Why Major (BE focus)",            type: "SUPPLEMENT",         status: "Submitted", note: "locked from ED filing" },
    // ----- Priya Deep School 2: JHU BME (RD active) -----
    { id: "item_priya_jhu_whyjhu",    projectId: "proj_priya_jhu",    name: "JHU Why Hopkins",                      type: "SUPPLEMENT",        wordLimit: 300, status: "Drafting",  dueDate: "2027-01-02" },
    { id: "item_priya_jhu_whymajor",  projectId: "proj_priya_jhu",    name: "JHU Why Major (BME)",                  type: "SUPPLEMENT",                          status: "InReview",  dueDate: "2027-01-02", note: "adapted from Penn Why Major" },
    { id: "item_priya_jhu_trait",     projectId: "proj_priya_jhu",    name: "JHU Personal Trait Essay",             type: "SUPPLEMENT",        wordLimit: 300, status: "NotStarted",dueDate: "2027-01-02" },
    { id: "item_priya_jhu_midyear",   projectId: "proj_priya_jhu",    name: "Mid-Year Report request (Mrs. Choi)",  type: "FORM",                                status: "Open",      dueDate: "2027-01-15" },

    // ----- Jackson Deep School: Princeton (closed, Submitted) -----
    { id: "item_jackson_princeton_ps",    projectId: "proj_jackson_princeton", name: "Common App Personal Statement",      type: "PERSONAL_STATEMENT", status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_jackson_princeton_why",   projectId: "proj_jackson_princeton", name: "Princeton Why Princeton",            type: "SUPPLEMENT",         wordLimit: 250, status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_jackson_princeton_ec",    projectId: "proj_jackson_princeton", name: "Princeton Extracurricular Essay",    type: "SUPPLEMENT",         wordLimit: 150, status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_jackson_princeton_div",   projectId: "proj_jackson_princeton", name: "Princeton Diversity/Identity Essay", type: "SUPPLEMENT",         wordLimit: 250, status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_jackson_princeton_quotes",projectId: "proj_jackson_princeton", name: "Princeton 'Three quotes' mini-prompts",type: "SUPPLEMENT",                       status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_jackson_princeton_acts",  projectId: "proj_jackson_princeton", name: "Common App Activities List",         type: "ACTIVITY_LIST",                    status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_jackson_princeton_coach", projectId: "proj_jackson_princeton", name: "Coach Hannigan recommendation",      type: "FORM",                              status: "Submitted", submittedAt: "2026-11-01" },

    // ----- Maya Deep School 1: RISD (LOCI prep + portfolio polish) -----
    { id: "item_maya_risd_loci",        projectId: "proj_maya_risd",  name: "RISD LOCI",                        type: "LOCI",      wordLimit: 300, status: "Drafting",  dueDate: "2026-12-19" },
    { id: "item_maya_risd_portfolio",   projectId: "proj_maya_risd",  name: "RISD SlideRoom Portfolio (20 pieces)", type: "PORTFOLIO",             status: "Submitted", note: "locked from ED filing" },
    { id: "item_maya_risd_why",         projectId: "proj_maya_risd",  name: "RISD 'Why' Statement",             type: "SUPPLEMENT",                status: "Submitted", note: "locked from ED filing" },
    { id: "item_maya_risd_update",      projectId: "proj_maya_risd",  name: "RISD Updated Materials Form (LOCI artifacts)", type: "FORM",          status: "Open",      dueDate: "2026-12-19" },
    // ----- Maya Deep School 2: Yale Art (RD revising heavy) -----
    { id: "item_maya_yale_portfolio",   projectId: "proj_maya_yale",  name: "Yale Art Portfolio (10-20 images via SlideRoom)", type: "PORTFOLIO",   status: "Revising",  dueDate: "2027-01-02" },
    { id: "item_maya_yale_whymajor",    projectId: "proj_maya_yale",  name: "Yale Why Major (Art)",             type: "SUPPLEMENT",                status: "Revising",  dueDate: "2027-01-02" },
    { id: "item_maya_yale_sa1",         projectId: "proj_maya_yale",  name: "Yale Short Answer 1",              type: "SUPPLEMENT",                status: "InReview",  dueDate: "2027-01-02" },
    { id: "item_maya_yale_sa2",         projectId: "proj_maya_yale",  name: "Yale Short Answer 2",              type: "SUPPLEMENT", wordLimit: 125, status: "Revising",  dueDate: "2027-01-02", note: "Draft 12 — perfectionist intervention in play", documentId: "doc_maya_yale_sa2" },
    { id: "item_maya_yale_sa3",         projectId: "proj_maya_yale",  name: "Yale Short Answer 3",              type: "SUPPLEMENT",                status: "Drafting",  dueDate: "2027-01-02" },

    // ----- Daniel Deep School: Stanford via QB (closed) -----
    { id: "item_daniel_stanford_ps",        projectId: "proj_daniel_stanford", name: "Common App Personal Statement",   type: "PERSONAL_STATEMENT", status: "Submitted", submittedAt: "2026-09-27" },
    { id: "item_daniel_stanford_roommate",  projectId: "proj_daniel_stanford", name: "Stanford Roommate Essay",         type: "SUPPLEMENT",         status: "Submitted", submittedAt: "2026-09-27" },
    { id: "item_daniel_stanford_matters",   projectId: "proj_daniel_stanford", name: "Stanford 'What matters to you'",  type: "SUPPLEMENT",         status: "Submitted", submittedAt: "2026-09-27" },
    { id: "item_daniel_stanford_shorts",    projectId: "proj_daniel_stanford", name: "Stanford Short Answers (5x)",     type: "SUPPLEMENT",         status: "Submitted", submittedAt: "2026-09-27" },
    { id: "item_daniel_stanford_qbapp",     projectId: "proj_daniel_stanford", name: "QB Match Application",            type: "FORM",               status: "Submitted", submittedAt: "2026-09-27" },
    { id: "item_daniel_stanford_qbfin",     projectId: "proj_daniel_stanford", name: "QB Financial Aid Documentation",  type: "FORM",               status: "Submitted", submittedAt: "2026-09-27" },

    // ----- Tony Deep School 1: CMU SCS (top personal priority RD) -----
    { id: "item_tony_cmu_whycmu",   projectId: "proj_tony_cmu", name: "CMU SCS Why CMU",           type: "SUPPLEMENT", wordLimit: 300, status: "Revising",  dueDate: "2027-01-02" },
    { id: "item_tony_cmu_aboutme",  projectId: "proj_tony_cmu", name: "CMU 'Tell us about yourself'",type: "SUPPLEMENT", wordLimit: 300, status: "InReview",  dueDate: "2027-01-02" },
    { id: "item_tony_cmu_sa3",      projectId: "proj_tony_cmu", name: "CMU Short Answer 3",        type: "SUPPLEMENT", wordLimit: 200, status: "Drafting",  dueDate: "2027-01-02" },
    { id: "item_tony_cmu_portfolio",projectId: "proj_tony_cmu", name: "CMU CS Optional Programming Portfolio link", type: "FORM", status: "Open", dueDate: "2027-01-02" },
    // ----- Tony Deep School 2: MIT (dream school RD) -----
    { id: "item_tony_mit_world",    projectId: "proj_tony_mit", name: "MIT 'World you come from'", type: "SUPPLEMENT", wordLimit: 200, status: "Drafting",  dueDate: "2027-01-04" },
    { id: "item_tony_mit_field",    projectId: "proj_tony_mit", name: "MIT 'Field of study'",      type: "SUPPLEMENT", wordLimit: 200, status: "Drafting",  dueDate: "2027-01-04" },
    { id: "item_tony_mit_pleasure", projectId: "proj_tony_mit", name: "MIT 'Pleasure activity'",   type: "SUPPLEMENT", wordLimit: 200, status: "NotStarted",dueDate: "2027-01-04" },
    { id: "item_tony_mit_contrib",  projectId: "proj_tony_mit", name: "MIT Contribution Essay",    type: "SUPPLEMENT", wordLimit: 200, status: "NotStarted",dueDate: "2027-01-04" },
    { id: "item_tony_mit_maker",    projectId: "proj_tony_mit", name: "MIT Maker Portfolio (BiAo app)", type: "PORTFOLIO",          status: "Drafting",  dueDate: "2027-01-04" },

    // ----- Roya Deep School 1: Georgetown SFS (RD target #1 in rebuild) -----
    { id: "item_roya_georgetown_why",  projectId: "proj_roya_georgetown", name: "Georgetown Why Georgetown / Why SFS",  type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-10" },
    { id: "item_roya_georgetown_intel",projectId: "proj_roya_georgetown", name: "Georgetown 'Significant intellectual experience'", type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-10" },
    { id: "item_roya_georgetown_sfs",  projectId: "proj_roya_georgetown", name: "Georgetown SFS-specific essay (international affairs)", type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-10" },
    { id: "item_roya_acts",            projectId: "proj_roya_georgetown", name: "Common App Activities List (REDO)",   type: "ACTIVITY_LIST", status: "Drafting", dueDate: "2027-01-02", note: "full rebuild" },
    { id: "item_roya_ps",              projectId: "proj_roya_georgetown", name: "Common App Personal Statement (REWRITE)", type: "PERSONAL_STATEMENT", status: "Drafting", dueDate: "2027-01-02", note: "full restart" },
    // ----- Roya Deep School 2: Yale (RD target #2) -----
    { id: "item_roya_yale_whymajor",   projectId: "proj_roya_yale", name: "Yale Why Major (EP&E or Political Science)", type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-02" },
    { id: "item_roya_yale_sa1",        projectId: "proj_roya_yale", name: "Yale Short Answer 1", type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-02" },
    { id: "item_roya_yale_sa2",        projectId: "proj_roya_yale", name: "Yale Short Answer 2", type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-02" },
    { id: "item_roya_yale_sa3",        projectId: "proj_roya_yale", name: "Yale Short Answer 3", type: "SUPPLEMENT", status: "NotStarted", dueDate: "2027-01-02" },

    // ----- Background placeholders (light: just locked CommonApp PS for each ED/REA result) -----
    { id: "item_marcus_stanford_ps",     projectId: "proj_marcus_stanford",  name: "Common App Personal Statement", type: "PERSONAL_STATEMENT", status: "Submitted", note: "submitted with REA" },
    { id: "item_eliana_uchicago_ps",     projectId: "proj_eliana_uchicago",  name: "Common App Personal Statement", type: "PERSONAL_STATEMENT", status: "Submitted", note: "submitted with EA" },
    { id: "item_eliana_uchicago_unc",    projectId: "proj_eliana_uchicago",  name: "UChicago 'Uncommon' Essay",     type: "SUPPLEMENT",         status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_caroline_brown_loci",    projectId: "proj_caroline_brown",   name: "Brown LOCI",                    type: "LOCI", wordLimit: 200, status: "Submitted", submittedAt: "2026-12-15" },
    { id: "item_minjun_penn_ps",         projectId: "proj_minjun_penn",      name: "Common App Personal Statement", type: "PERSONAL_STATEMENT", status: "Submitted", note: "submitted with Wharton ED" },
    { id: "item_minjun_penn_whywharton", projectId: "proj_minjun_penn",      name: "Wharton Why Wharton",           type: "SUPPLEMENT",         status: "Submitted", submittedAt: "2026-11-01" },
    { id: "item_sophia_umiami_loci",     projectId: "proj_sophia_umiami",    name: "UMiami LOCI",                   type: "LOCI", wordLimit: 250, status: "Submitted", submittedAt: "2026-12-15" },
    { id: "item_henry_yale_ps",          projectId: "proj_henry_yale",       name: "Common App Personal Statement", type: "PERSONAL_STATEMENT", status: "Submitted", note: "submitted with REA" },
    { id: "item_hassan_qbapp",           projectId: "proj_hassan_mit",       name: "QB Match Application + Financial",type: "FORM",             status: "Submitted", submittedAt: "2026-09-27", note: "QB Finalist (non-match)" },
  ],

  // ============================================================
  // TASKS
  // Stars: verbatim from Xiao's spec.
  // Backgrounds: 3-5 plausible tasks each, synthesized from spec one-line.
  // ============================================================
  tasks: [
    // ===== Priya (10 tasks per spec) =====
    { id: "task_priya_loci_submit",     studentId: "stu_priya",   projectId: "proj_priya_penn",   projectItemId: "item_priya_penn_loci", title: "Submit Penn LOCI",                                          status: "Done",       dueDate: "2026-12-15", assignee: "Student" },
    { id: "task_priya_adapt_jhu",       studentId: "stu_priya",   projectId: "proj_priya_jhu",    projectItemId: "item_priya_jhu_whymajor", title: "Adapt Penn Why Major for JHU BME",                       status: "In Progress", dueDate: "2026-12-18", assignee: "Student" },
    { id: "task_priya_adapt_duke",      studentId: "stu_priya",   projectId: "proj_priya_duke",   title: "Adapt Penn Why Major for Duke Pratt",                       status: "Open",       dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_priya_adapt_nu",        studentId: "stu_priya",   projectId: "proj_priya_northwestern", title: "Adapt Penn Why Major for Northwestern McCormick",     status: "Open",       dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_priya_adapt_trait",     studentId: "stu_priya",   projectId: "proj_priya_jhu",    projectItemId: "item_priya_jhu_trait", title: "Adapt Penn Community Essay for JHU Personal Trait",         status: "Open",       dueDate: "2026-12-20", assignee: "Student" },
    { id: "task_priya_loci_debrief",    studentId: "stu_priya",                                   title: "Send Penn LOCI debrief notes to parents",                   status: "Done",       dueDate: "2026-12-15", assignee: "Xiao" },
    { id: "task_priya_jhu_mock",        studentId: "stu_priya",   projectId: "proj_priya_jhu",    title: "Schedule mock JHU interview",                               status: "Open",       dueDate: "2026-12-22", assignee: "Xiao" },
    { id: "task_priya_mehta_letter",    studentId: "stu_priya",                                   title: "Confirm Dr. Mehta research letter forwarded to all RD portals", status: "In Progress", dueDate: "2026-12-19", assignee: "Xiao" },
    { id: "task_priya_usc_why",         studentId: "stu_priya",   projectId: "proj_priya_usc",    title: "USC Viterbi Why Major draft 1",                             status: "Open",       dueDate: "2026-12-27", assignee: "Student" },
    { id: "task_priya_columbia_why",    studentId: "stu_priya",   projectId: "proj_priya_columbia", title: "Columbia Engineering 'Why Columbia' draft 1",              status: "Open",       dueDate: "2026-12-29", assignee: "Student" },
    { id: "task_priya_final_ps_check",  studentId: "stu_priya",                                   title: "Final Common App PS check before RD round",                 status: "Done",       dueDate: "2026-12-08", assignee: "Xiao" },

    // ===== Jackson (8 tasks per spec) =====
    { id: "task_jackson_submit_rea",    studentId: "stu_jackson", projectId: "proj_jackson_princeton", title: "Submit Princeton REA app",                              status: "Done",       dueDate: "2026-10-30", assignee: "Student" },
    { id: "task_jackson_withdraw_apps", studentId: "stu_jackson",                                  title: "Withdraw Hopkins / Notre Dame / UVA / Penn / Cornell apps", status: "Done",       dueDate: "2026-12-13", assignee: "Student" },
    { id: "task_jackson_nli_confirm",   studentId: "stu_jackson",                                  title: "Email coach to confirm NLI signing date",                   status: "Done",       dueDate: "2026-12-13", assignee: "Student" },
    { id: "task_jackson_senior_2nd",    studentId: "stu_jackson",                                  title: "Maintain senior-year transcript (2nd semester)",             status: "Open",       dueDate: "2027-06-15", assignee: "Student", note: "ongoing" },
    { id: "task_jackson_midyear",       studentId: "stu_jackson",                                  title: "Mid-year report request to Mr. Devlin",                     status: "Open",       dueDate: "2027-01-05", assignee: "Xiao" },
    { id: "task_jackson_final_trans",   studentId: "stu_jackson",                                  title: "Final transcript request post-graduation",                  status: "Open",       dueDate: "2027-06-05", assignee: "Student" },
    { id: "task_jackson_orient",        studentId: "stu_jackson",                                  title: "Princeton orientation deposit + housing form",              status: "Open",       dueDate: "2027-05-01", assignee: "Student" },
    { id: "task_jackson_thankyou",      studentId: "stu_jackson",                                  title: "Send thank-you note to Coach Hannigan + Mr. Devlin",        status: "Done",       dueDate: "2026-12-13", assignee: "Student" },

    // ===== Maya (9 tasks per spec) =====
    { id: "task_maya_loci_draft",       studentId: "stu_maya",    projectId: "proj_maya_risd",    projectItemId: "item_maya_risd_loci", title: "Draft RISD LOCI",                                            status: "In Progress", dueDate: "2026-12-19", assignee: "Student" },
    { id: "task_maya_recipes_repull",   studentId: "stu_maya",    projectId: "proj_maya_risd",    title: "Re-pull 'Recipes' monotype #2 and #3 (higher contrast, for LOCI updated portfolio)", status: "In Progress", dueDate: "2026-12-19", assignee: "Student" },
    { id: "task_maya_stop_yale_sa2",    studentId: "stu_maya",    projectId: "proj_maya_yale",    projectItemId: "item_maya_yale_sa2", title: "Stop editing Yale Short Answer 2 (draft 12 → final, NO MORE REVISIONS)", status: "Open", dueDate: "2026-12-22", assignee: "Student", isIntervention: true, isPinned: true, pinAuthor: "XJ", pinDate: "2026-12-13", pinNote: "Don't let her over-edit again — give her a 90-min window, kill the doc, move on. Two more drafts won't help." },
    { id: "task_maya_adapt_brown",      studentId: "stu_maya",    projectId: "proj_maya_brown",   title: "Adapt Yale Why Major for Brown Visual Arts",                status: "Open",       dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_maya_adapt_washu",      studentId: "stu_maya",    projectId: "proj_maya_washu",   title: "Adapt Yale Why Major for Wash U Sam Fox",                   status: "Open",       dueDate: "2026-12-28", assignee: "Student" },
    { id: "task_maya_wesleyan_draft",   studentId: "stu_maya",    projectId: "proj_maya_wesleyan",title: "Wesleyan supplement draft 1",                               status: "Open",       dueDate: "2026-12-27", assignee: "Student" },
    { id: "task_maya_usc_roski",        studentId: "stu_maya",    projectId: "proj_maya_usc",     title: "USC Roski 'Why' supplement draft 1",                        status: "Open",       dueDate: "2026-12-30", assignee: "Student" },
    { id: "task_maya_cornell_as",       studentId: "stu_maya",    projectId: "proj_maya_cornell", title: "Cornell A&S supplement draft 1",                            status: "Open",       dueDate: "2026-12-29", assignee: "Student" },
    { id: "task_maya_tsuga_recs",       studentId: "stu_maya",                                    title: "Confirm Ms. Tsuga submits SlideRoom portfolio rec for all RD schools", status: "In Progress", dueDate: "2026-12-26", assignee: "Xiao" },

    // ===== Daniel (8 tasks per spec) =====
    { id: "task_daniel_qbapp_submit",   studentId: "stu_daniel",  projectId: "proj_daniel_stanford", projectItemId: "item_daniel_stanford_qbapp", title: "Submit QB Match application",                          status: "Done",       dueDate: "2026-09-27", assignee: "Student" },
    { id: "task_daniel_qb_result",      studentId: "stu_daniel",  projectId: "proj_daniel_stanford", title: "Receive QB Match result",                                  status: "Done",       dueDate: "2026-12-01", assignee: "Student" },
    { id: "task_daniel_qb_withdraw",    studentId: "stu_daniel",                                  title: "Withdraw all QB partner + non-QB apps (per QB binding rules)", status: "Done",     dueDate: "2026-12-01", assignee: "Xiao" },
    { id: "task_daniel_thankyou",       studentId: "stu_daniel",                                  title: "Send thank-you to Mr. Salazar (counselor) and MESA coach",  status: "Done",       dueDate: "2026-12-03", assignee: "Student" },
    { id: "task_daniel_midyear",        studentId: "stu_daniel",                                  title: "Mid-year report request to Mr. Salazar",                     status: "Open",       dueDate: "2027-01-15", assignee: "Xiao" },
    { id: "task_daniel_housing",        studentId: "stu_daniel",                                  title: "Stanford housing + orientation forms",                       status: "Open",       dueDate: "2027-05-01", assignee: "Student" },
    { id: "task_daniel_pell",           studentId: "stu_daniel",                                  title: "Confirm Pell + QB scholarship coverage with Stanford financial aid office", status: "In Progress", dueDate: "2027-01-10", assignee: "Student" },
    { id: "task_daniel_final_trans",    studentId: "stu_daniel",                                  title: "Final transcript post-graduation",                           status: "Open",       dueDate: "2027-06-15", assignee: "Student" },

    // ===== Tony (8 tasks per spec) =====
    { id: "task_tony_yale_debrief",     studentId: "stu_tony",    projectId: "proj_tony_yale",    title: "Receive Yale REA result + family debrief",                  status: "Done",       dueDate: "2026-12-14", assignee: "Xiao" },
    { id: "task_tony_adapt_cmu",        studentId: "stu_tony",    projectId: "proj_tony_cmu",     projectItemId: "item_tony_cmu_whycmu", title: "Adapt Yale Why Major draft for CMU SCS Why CMU",            status: "In Progress", dueDate: "2026-12-19", assignee: "Student" },
    { id: "task_tony_adapt_penn",       studentId: "stu_tony",    projectId: "proj_tony_penn",    title: "Adapt Yale Why Major for UPenn CIS",                        status: "Open",       dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_tony_mit_maker",        studentId: "stu_tony",    projectId: "proj_tony_mit",     projectItemId: "item_tony_mit_maker",  title: "MIT Maker Portfolio: BiAo app demo video + technical README", status: "In Progress", dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_tony_caltech_submit",   studentId: "stu_tony",    projectId: "proj_tony_caltech", title: "Submit Caltech RD supplement",                              status: "Open",       dueDate: "2026-12-30", assignee: "Student" },
    { id: "task_tony_tsinghua",         studentId: "stu_tony",                                    title: "Tsinghua research letter forwarding to MIT + CMU + Caltech",status: "In Progress", dueDate: "2026-12-22", assignee: "Xiao" },
    { id: "task_tony_usaco",            studentId: "stu_tony",                                    title: "USACO January contest registration",                        status: "Done",       dueDate: "2026-12-12", assignee: "Student" },
    { id: "task_tony_westbury_trans",   studentId: "stu_tony",                                    title: "Westbury mid-year transcript request to Ms. Yang",         status: "Open",       dueDate: "2027-01-08", assignee: "Xiao" },

    // ===== Roya (13 tasks per spec — Dec 15 - Jan 10 sprint) =====
    { id: "task_roya_intake",           studentId: "stu_roya",                                    title: "Intake meeting + BSQ delivered",                            status: "Done",       dueDate: "2026-12-15", assignee: "Xiao" },
    { id: "task_roya_audit_prior",      studentId: "stu_roya",                                    title: "Audit prior consultant's UC PIQs + Princeton SPIA materials (what's salvageable vs. scrap)", status: "In Progress", dueDate: "2026-12-17", assignee: "Xiao" },
    { id: "task_roya_bsq_readback",     studentId: "stu_roya",                                    title: "BSQ readback session",                                      status: "Open",       dueDate: "2026-12-17", assignee: "Xiao" },
    { id: "task_roya_schoollist",       studentId: "stu_roya",                                    title: "School list draft v1 (from Xiao)",                          status: "Open",       dueDate: "2026-12-19", assignee: "Xiao" },
    { id: "task_roya_ps_topics",        studentId: "stu_roya",                                    title: "PS topic exploration: 3 free-writes due",                   status: "Open",       dueDate: "2026-12-20", assignee: "Student" },
    { id: "task_roya_acts_redo",        studentId: "stu_roya",    projectItemId: "item_roya_acts",title: "Activity list redo (draft 1)",                              status: "Open",       dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_roya_ps_draft1",        studentId: "stu_roya",    projectItemId: "item_roya_ps", title: "PS draft 1 (full rewrite)",                                  status: "Open",       dueDate: "2026-12-24", assignee: "Student" },
    { id: "task_roya_recs_forward",     studentId: "stu_roya",                                    title: "Confirm Mr. Tehrani (AP Comp Gov) and Ms. Lassiter (AP US History) recommendations are forwarded to all RD portals", status: "Open", dueDate: "2026-12-22", assignee: "Xiao" },
    { id: "task_roya_yale_why",         studentId: "stu_roya",    projectId: "proj_roya_yale",    projectItemId: "item_roya_yale_whymajor", title: "Yale Why Major draft 1",                                    status: "Open",       dueDate: "2026-12-27", assignee: "Student" },
    { id: "task_roya_commonapp_drive", studentId: "stu_roya",                                    title: "Common App test-drive (run through every prompt)",          status: "Open",       dueDate: "2026-12-29", assignee: "Student" },
    { id: "task_roya_georgetown_why",  studentId: "stu_roya",    projectId: "proj_roya_georgetown", projectItemId: "item_roya_georgetown_why", title: "Georgetown SFS Why SFS draft 1",                            status: "Open",       dueDate: "2027-01-03", assignee: "Student" },
    { id: "task_roya_wave1_ship",       studentId: "stu_roya",                                    title: "First wave RD apps shipping (Yale, Brown, Columbia, UPenn, Tufts, JHU, NYU, USC, UMich, Cornell)", status: "Open", dueDate: "2027-01-01", assignee: "Student" },
    { id: "task_roya_wave2_ship",       studentId: "stu_roya",                                    title: "Second wave (Georgetown SFS)",                              status: "Open",       dueDate: "2027-01-10", assignee: "Student" },

    // ===== Backgrounds (3-5 synthesized tasks each from one-line + Dec 15 status) =====
    // ---- Marcus (Stanford REA denied, +4 schools added, anxious-parent) ----
    { id: "task_marcus_stanford_debrief",   studentId: "stu_marcus", projectId: "proj_marcus_stanford", title: "Stanford REA denial debrief — mom on call",                     status: "Done",       dueDate: "2026-12-13", assignee: "Xiao" },
    { id: "task_marcus_parent_calm",        studentId: "stu_marcus",                                  title: "Reality-check call with parents — school list stability check", status: "In Progress", dueDate: "2026-12-16", assignee: "Xiao" },
    { id: "task_marcus_bu_draft",           studentId: "stu_marcus", projectId: "proj_marcus_bu",    title: "BU supplement draft 1",                                          status: "Open",       dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_marcus_bc_draft",           studentId: "stu_marcus", projectId: "proj_marcus_bc",    title: "BC supplement draft 1",                                          status: "Open",       dueDate: "2026-12-24", assignee: "Student" },
    { id: "task_marcus_adapt_tufts",        studentId: "stu_marcus", projectId: "proj_marcus_tufts", title: "Adapt Stanford materials for Tufts supplement",                  status: "Open",       dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_marcus_gt_draft",           studentId: "stu_marcus", projectId: "proj_marcus_gatech", title: "GT supplement draft 1",                                         status: "Open",       dueDate: "2026-12-28", assignee: "Student" },

    // ---- Eliana (UChicago EA admit; RD polish; Medill stretch) ----
    { id: "task_eliana_uchicago_celebrate", studentId: "stu_eliana", projectId: "proj_eliana_uchicago", title: "UChicago acceptance debrief + family call",                   status: "Done",       dueDate: "2026-12-13", assignee: "Xiao" },
    { id: "task_eliana_medill_polish",      studentId: "stu_eliana", projectId: "proj_eliana_northwestern", title: "Northwestern Medill — stretch essay polish round 2",        status: "In Progress", dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_eliana_vandy_revise",       studentId: "stu_eliana", projectId: "proj_eliana_vanderbilt", title: "Vanderbilt 'Why Vandy' — final revise",                       status: "Open",       dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_eliana_emory_revise",       studentId: "stu_eliana", projectId: "proj_eliana_emory", title: "Emory supplement — final revise",                                  status: "Open",       dueDate: "2026-12-28", assignee: "Student" },
    { id: "task_eliana_tulane_wait",        studentId: "stu_eliana", projectId: "proj_eliana_tulane", title: "Tulane EA result watch (late Dec release)",                       status: "Open",       dueDate: "2026-12-28", assignee: "Xiao" },

    // ---- Hassan (QB non-match; safeties locked; grinding RDs) ----
    { id: "task_hassan_qbnm_debrief",       studentId: "stu_hassan",                                title: "QB non-match debrief + reframe with QB Finalist credential",     status: "Done",       dueDate: "2026-12-04", assignee: "Xiao" },
    { id: "task_hassan_mit_draft",          studentId: "stu_hassan", projectId: "proj_hassan_mit",   title: "MIT 'World you come from' draft 1",                              status: "In Progress", dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_hassan_stanford_draft",     studentId: "stu_hassan", projectId: "proj_hassan_stanford", title: "Stanford Roommate Essay draft 1",                              status: "Open",       dueDate: "2026-12-24", assignee: "Student" },
    { id: "task_hassan_caltech_supp",       studentId: "stu_hassan", projectId: "proj_hassan_caltech", title: "Caltech RD supplement draft",                                   status: "Open",       dueDate: "2026-12-29", assignee: "Student" },

    // ---- Caroline (Brown ED deferred; LOCI shipped; LAC RDs polishing) ----
    { id: "task_caroline_brown_debrief",    studentId: "stu_caroline", projectId: "proj_caroline_brown", title: "Brown ED deferral debrief — mom dynamic",                    status: "Done",       dueDate: "2026-12-13", assignee: "Xiao" },
    { id: "task_caroline_loci_send",        studentId: "stu_caroline", projectId: "proj_caroline_brown", projectItemId: "item_caroline_brown_loci", title: "Brown LOCI — final pass + ship",                            status: "Done",       dueDate: "2026-12-15", assignee: "Xiao" },
    { id: "task_caroline_williams_polish",  studentId: "stu_caroline", projectId: "proj_caroline_williams", title: "Williams supplement — final polish",                     status: "In Progress", dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_caroline_lac_pass",         studentId: "stu_caroline",                                title: "LAC quality pass — Bowdoin/Bates/Middlebury supplements",       status: "Open",       dueDate: "2026-12-28", assignee: "Student" },
    { id: "task_caroline_loci_debrief",     studentId: "stu_caroline", projectId: "proj_caroline_brown", title: "Send Brown LOCI debrief notes to parents",                       status: "Done",       dueDate: "2026-12-15", assignee: "Xiao" },

    // ---- Min-jun (Wharton ED admit; cycle done; visa transition only) ----
    { id: "task_minjun_celebrate",          studentId: "stu_minjun", projectId: "proj_minjun_penn",  title: "Wharton acceptance celebration call (family KST 9pm)",          status: "Done",       dueDate: "2026-12-13", assignee: "Xiao" },
    { id: "task_minjun_withdraws",          studentId: "stu_minjun",                                 title: "Withdraw all other RD/EA/UC apps (10 schools)",                 status: "Done",       dueDate: "2026-12-13", assignee: "Student" },
    { id: "task_minjun_visa",               studentId: "stu_minjun",                                 title: "Penn F-1 visa transition forms + DS-2019 paperwork",            status: "Open",       dueDate: "2027-01-12", assignee: "Student" },
    { id: "task_minjun_housing",            studentId: "stu_minjun",                                 title: "Penn housing form + orientation deposit",                       status: "Open",       dueDate: "2027-05-01", assignee: "Student" },
    { id: "task_minjun_midyear",            studentId: "stu_minjun",                                 title: "Penn mid-year report request to KIS-Seoul counselor",           status: "Open",       dueDate: "2027-01-15", assignee: "Xiao" },
    { id: "task_minjun_final_trans",        studentId: "stu_minjun",                                 title: "Final transcript request post-graduation",                      status: "Open",       dueDate: "2027-06-15", assignee: "Student" },

    // ---- Sophia (UMiami ED deferred; Penn State safety; FSU EA 12/17; RDs polishing) ----
    { id: "task_sophia_umiami_debrief",     studentId: "stu_sophia", projectId: "proj_sophia_umiami", title: "UMiami ED1 deferral debrief",                                  status: "Done",       dueDate: "2026-12-13", assignee: "Xiao" },
    { id: "task_sophia_loci_send",          studentId: "stu_sophia", projectId: "proj_sophia_umiami", projectItemId: "item_sophia_umiami_loci", title: "UMiami LOCI — final pass + ship",                              status: "Done",       dueDate: "2026-12-15", assignee: "Xiao" },
    { id: "task_sophia_fsu_wait",           studentId: "stu_sophia", projectId: "proj_sophia_fsu",   title: "FSU EA result watch (12/17 release)",                          status: "Open",       dueDate: "2026-12-17", assignee: "Xiao" },
    { id: "task_sophia_rd_polish",          studentId: "stu_sophia",                                 title: "RD polish round — Penn/Cornell/Brown/Tufts/Vanderbilt supplements", status: "In Progress", dueDate: "2026-12-28", assignee: "Student" },
    { id: "task_sophia_premed_recs",        studentId: "stu_sophia",                                 title: "Confirm bio/chem teacher recs forwarded to all RD portals",     status: "Open",       dueDate: "2026-12-26", assignee: "Xiao" },
    { id: "task_sophia_loci_debrief",       studentId: "stu_sophia", projectId: "proj_sophia_umiami", title: "Send UMiami LOCI debrief notes to parents",                      status: "Done",       dueDate: "2026-12-15", assignee: "Xiao" },

    // ---- Henry (Yale REA denied; Ivy RD round late polish) ----
    { id: "task_henry_yale_debrief",        studentId: "stu_henry", projectId: "proj_henry_yale",   title: "Yale REA denial debrief + RD prioritization",                  status: "Done",       dueDate: "2026-12-14", assignee: "Xiao" },
    { id: "task_henry_princeton_polish",    studentId: "stu_henry", projectId: "proj_henry_princeton", title: "Princeton supplement — late-polish round (strong draft)",      status: "In Progress", dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_henry_columbia_polish",     studentId: "stu_henry", projectId: "proj_henry_columbia", title: "Columbia supplement — late-polish round",                       status: "In Progress", dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_henry_harvard_polish",      studentId: "stu_henry", projectId: "proj_henry_harvard", title: "Harvard supplement — late-polish round",                         status: "Open",       dueDate: "2026-12-28", assignee: "Student" },

    // ---- Eric (D3 swim recruit; Hawaii Pacific in hand; MIT EA result 12/16; Williams coach pre-read) ----
    { id: "task_eric_mit_wait",             studentId: "stu_eric", projectId: "proj_eric_mit",      title: "MIT EA result watch (12/16 release)",                          status: "Open",       dueDate: "2026-12-16", assignee: "Xiao" },
    { id: "task_eric_williams_coach",       studentId: "stu_eric", projectId: "proj_eric_williams", title: "Williams swim coach final check-in + submission confirm",       status: "In Progress", dueDate: "2026-12-22", assignee: "Xiao" },
    { id: "task_eric_tufts_draft",          studentId: "stu_eric", projectId: "proj_eric_tufts",    title: "Tufts supplement draft 1",                                      status: "Open",       dueDate: "2026-12-26", assignee: "Student" },
    { id: "task_eric_bowdoin_draft",        studentId: "stu_eric", projectId: "proj_eric_bowdoin",  title: "Bowdoin supplement draft 1",                                    status: "Open",       dueDate: "2026-12-28", assignee: "Student" },

    // ---- Layla (Junior, intake) ----
    { id: "task_layla_intake",              studentId: "stu_layla",                                 title: "Intake meeting + BSQ delivered",                               status: "Done",       dueDate: "2026-12-12", assignee: "Xiao" },
    { id: "task_layla_bsq_complete",        studentId: "stu_layla",                                 title: "Complete BSQ (Background & Story Questionnaire)",              status: "In Progress", dueDate: "2026-12-19", assignee: "Student" },
    { id: "task_layla_brainstorm_hooks",    studentId: "stu_layla",                                 title: "Junior brainstorm: 3 candidate hooks for narrative arc",       status: "Open",       dueDate: "2026-12-22", assignee: "Student" },
    { id: "task_layla_summer_research",     studentId: "stu_layla",                                 title: "Summer program research — top 8 candidates for 2027",          status: "Open",       dueDate: "2027-01-10", assignee: "Student" },
    { id: "task_layla_ap_planning",         studentId: "stu_layla",                                 title: "AP course planning conversation — what to take senior year",   status: "Open",       dueDate: "2027-01-15", assignee: "Xiao" },
  ],

  // ============================================================
  // MEETINGS
  // Per Xiao's spec: each student has last + next meeting around Dec 15.
  // Stars get standing cadence noted; backgrounds get singular events.
  // ============================================================
  meetings: [
    // ----- Priya -----
    { id: "mtg_priya_2026_12_13", studentId: "stu_priya", consultantId: "con_xiao", startTime: "2026-12-13T16:00:00", endTime: "2026-12-13T17:00:00", label: "Post-deferral debrief", notes: "Called within 2 hrs of Penn deferral decision. LOCI strategy planning." },
    { id: "mtg_priya_2026_12_17", studentId: "stu_priya", consultantId: "con_xiao", startTime: "2026-12-17T10:30:00", endTime: "2026-12-17T11:15:00", label: "LOCI follow-up + RD adaptation kickoff", notes: "Perfectionist. LOCI in flight." },

    // ----- Jackson -----
    { id: "mtg_jackson_2026_12_13", studentId: "stu_jackson", consultantId: "con_xiao", startTime: "2026-12-13T15:00:00", endTime: "2026-12-13T16:00:00", label: "Post-Princeton acceptance celebration call" },
    { id: "mtg_jackson_2027_01_15", studentId: "stu_jackson", consultantId: "con_xiao", startTime: "2027-01-15T14:00:00", endTime: "2027-01-15T15:00:00", label: "Mid-year check-in, transcript review" },

    // ----- Maya (twice-weekly cadence Tu/Fr 7pm through 1/1) -----
    { id: "mtg_maya_2026_12_15_prep",      studentId: "stu_maya", consultantId: "con_xiao", startTime: "2026-12-15T10:00:00", endTime: "2026-12-15T10:45:00", label: "Maya — LOCI prep",            notes: "Internal prep block — review Maya's RISD LOCI before 4pm meeting", isInternalPrep: true },
    { id: "mtg_maya_2026_12_15",           studentId: "stu_maya", consultantId: "con_xiao", startTime: "2026-12-15T16:00:00", endTime: "2026-12-15T17:00:00", label: "Post-deferral debrief",        notes: "RISD ED Deferred 12/15. Agreed to twice-weekly cadence through Jan 1.", isFlagship: true },
    { id: "mtg_maya_2026_12_18",           studentId: "stu_maya", consultantId: "con_xiao", startTime: "2026-12-18T19:00:00", endTime: "2026-12-18T20:00:00", label: "LOCI draft review + Yale SA2 hard-stop intervention", notes: "Standing Tu/Fr 7pm cadence." },
    { id: "mtg_maya_2026_12_22",           studentId: "stu_maya", consultantId: "con_xiao", startTime: "2026-12-22T19:00:00", endTime: "2026-12-22T20:00:00", label: "Standing Tu" },
    { id: "mtg_maya_2026_12_29",           studentId: "stu_maya", consultantId: "con_xiao", startTime: "2026-12-29T19:00:00", endTime: "2026-12-29T20:00:00", label: "Standing Tu (Christmas-week makeup)" },

    // ----- Daniel -----
    { id: "mtg_daniel_2026_12_01", studentId: "stu_daniel", consultantId: "con_xiao", startTime: "2026-12-01T19:00:00", endTime: "2026-12-01T20:00:00", label: "QB Match Day call (family + Mr. Salazar joined)" },
    { id: "mtg_daniel_2027_01_11", studentId: "stu_daniel", consultantId: "con_xiao", startTime: "2027-01-11T14:00:00", endTime: "2027-01-11T15:00:00", label: "Mid-year check-in, transition planning" },

    // ----- Tony (family debrief 12/14 9pm EST) -----
    { id: "mtg_tony_2026_12_14", studentId: "stu_tony", consultantId: "con_xiao", startTime: "2026-12-14T21:00:00", endTime: "2026-12-14T22:00:00", label: "Yale acceptance debrief (family Zoom 9pm EST)" },
    { id: "mtg_tony_2026_12_18", studentId: "stu_tony", consultantId: "con_xiao", startTime: "2026-12-18T15:00:00", endTime: "2026-12-18T16:00:00", label: "CMU + MIT supplement coordination" },

    // ----- Roya (3x/week M/W/F cadence through 1/1) -----
    { id: "mtg_roya_2026_12_15",  studentId: "stu_roya", consultantId: "con_xiao", startTime: "2026-12-15T13:00:00", endTime: "2026-12-15T14:30:00", label: "Intake",                                  notes: "Intake meeting + BSQ delivered. 17 days to Jan 1. Full restart.", isFlagship: true },
    { id: "mtg_roya_2026_12_17",  studentId: "stu_roya", consultantId: "con_xiao", startTime: "2026-12-17T09:00:00", endTime: "2026-12-17T09:45:00", label: "BSQ readback + prior-work audit",        notes: "Self-directed, restart RD list strategy" },
    { id: "mtg_roya_2026_12_18",  studentId: "stu_roya", consultantId: "con_xiao", startTime: "2026-12-18T09:00:00", endTime: "2026-12-18T09:45:00", label: "Standing F — school list lock + PS direction" },
    { id: "mtg_roya_2026_12_21",  studentId: "stu_roya", consultantId: "con_xiao", startTime: "2026-12-21T09:00:00", endTime: "2026-12-21T09:45:00", label: "Standing M" },

    // ----- Marcus -----
    { id: "mtg_marcus_2026_12_13", studentId: "stu_marcus", consultantId: "con_xiao", startTime: "2026-12-13T18:00:00", endTime: "2026-12-13T19:00:00", label: "Stanford REA denial debrief (mom on call)" },
    { id: "mtg_marcus_2026_12_16", studentId: "stu_marcus", consultantId: "con_xiao", startTime: "2026-12-16T11:30:00", endTime: "2026-12-16T12:30:00", label: "School list re-stabilization", notes: "Stanford REA · Denied. Anxious-parent dynamic, prep softer framing." },

    // ----- Eliana -----
    { id: "mtg_eliana_2026_12_13", studentId: "stu_eliana", consultantId: "con_xiao", startTime: "2026-12-13T15:00:00", endTime: "2026-12-13T16:00:00", label: "UChicago acceptance call" },
    { id: "mtg_eliana_2026_12_17", studentId: "stu_eliana", consultantId: "con_xiao", startTime: "2026-12-17T14:00:00", endTime: "2026-12-17T15:00:00", label: "Medill polish + RD review" },

    // ----- Hassan -----
    { id: "mtg_hassan_2026_12_04", studentId: "stu_hassan", consultantId: "con_xiao", startTime: "2026-12-04T16:00:00", endTime: "2026-12-04T17:00:00", label: "QB non-match debrief + RD list reframe" },
    { id: "mtg_hassan_2026_12_19", studentId: "stu_hassan", consultantId: "con_xiao", startTime: "2026-12-19T14:00:00", endTime: "2026-12-19T15:00:00", label: "RD list lock + supplement schedule" },

    // ----- Caroline -----
    { id: "mtg_caroline_2026_12_13", studentId: "stu_caroline", consultantId: "con_xiao", startTime: "2026-12-13T16:00:00", endTime: "2026-12-13T17:00:00", label: "Brown ED deferral post-decision (mom dynamic)" },
    { id: "mtg_caroline_2026_12_18", studentId: "stu_caroline", consultantId: "con_xiao", startTime: "2026-12-18T09:30:00", endTime: "2026-12-18T10:15:00", label: "Brown LOCI + LAC supplement review", notes: "Anxious-parent. LOCI submitted, awaiting response." },

    // ----- Min-jun (family KST evening) -----
    { id: "mtg_minjun_2026_12_13", studentId: "stu_minjun", consultantId: "con_xiao", startTime: "2026-12-13T07:00:00", endTime: "2026-12-13T08:00:00", label: "Wharton acceptance call (family Zoom 9pm KST)" },
    { id: "mtg_minjun_2027_01_12", studentId: "stu_minjun", consultantId: "con_xiao", startTime: "2027-01-12T07:00:00", endTime: "2027-01-12T07:30:00", label: "Visa + transition planning" },

    // ----- Sophia -----
    { id: "mtg_sophia_2026_12_13", studentId: "stu_sophia", consultantId: "con_xiao", startTime: "2026-12-13T17:00:00", endTime: "2026-12-13T18:00:00", label: "UMiami ED1 deferral debrief" },
    { id: "mtg_sophia_2026_12_19", studentId: "stu_sophia", consultantId: "con_xiao", startTime: "2026-12-19T14:00:00", endTime: "2026-12-19T14:45:00", label: "FSU EA result follow-up + RD polish" },

    // ----- Henry -----
    { id: "mtg_henry_2026_12_14", studentId: "stu_henry", consultantId: "con_xiao", startTime: "2026-12-14T18:00:00", endTime: "2026-12-14T19:00:00", label: "Yale REA denial debrief" },
    { id: "mtg_henry_2026_12_18", studentId: "stu_henry", consultantId: "con_xiao", startTime: "2026-12-18T14:00:00", endTime: "2026-12-18T15:00:00", label: "Strategy reset", notes: "Post Yale REA denial. Re-prioritize RD list, supplements review." },

    // ----- Eric -----
    { id: "mtg_eric_2026_12_08", studentId: "stu_eric", consultantId: "con_xiao", startTime: "2026-12-08T14:00:00", endTime: "2026-12-08T15:00:00", label: "Pre-MIT-EA-result check-in" },
    { id: "mtg_eric_2026_12_17", studentId: "stu_eric", consultantId: "con_xiao", startTime: "2026-12-17T14:00:00", endTime: "2026-12-17T15:00:00", label: "Post-MIT-EA-result debrief" },

    // ----- Layla -----
    { id: "mtg_layla_2026_12_12", studentId: "stu_layla", consultantId: "con_xiao", startTime: "2026-12-12T15:00:00", endTime: "2026-12-12T16:00:00", label: "Junior intake (Class of 2028 first meeting)" },
    { id: "mtg_layla_2026_12_19", studentId: "stu_layla", consultantId: "con_xiao", startTime: "2026-12-19T15:00:00", endTime: "2026-12-19T16:00:00", label: "BSQ readback" },
  ],

  // ============================================================
  // DOCUMENTS
  // Flagship: Maya Yale SA2 (12 drafts) + Priya JHU Why Major (6-comment thread).
  // Others: light placeholders for stars' active essays.
  // ============================================================
  documents: [
    // Maya's flagship Yale SA2 — 12 drafts
    { id: "doc_maya_yale_sa2",          studentId: "stu_maya",    projectItemId: "item_maya_yale_sa2", title: "Yale — Short Answer 2", subtitle: "'What is something about which you have changed your mind in the last three years? What changed it?'", promptLimit: 125, snapshotCount: 12, lastEditedAt: "2026-12-13T18:30:00", lastEditedBy: "stu_maya", openCommentCount: 3 },
    // Priya's JHU Why Major — flagship for engagement-loop demo
    { id: "doc_priya_jhu_whymajor",     studentId: "stu_priya",   projectItemId: "item_priya_jhu_whymajor", title: "JHU — Why Major (BME)", subtitle: "Adapted from Penn Why Major; reframing around Hopkins BME design teams + INBT undergrad track.", snapshotCount: 2, lastEditedAt: "2026-12-15T11:20:00", lastEditedBy: "con_xiao", openCommentCount: 1 },
    // Other star docs — placeholders
    { id: "doc_priya_penn_loci",        studentId: "stu_priya",   projectItemId: "item_priya_penn_loci",     title: "Penn LOCI",                          snapshotCount: 4, lastEditedAt: "2026-12-15T13:00:00", lastEditedBy: "stu_priya" },
    { id: "doc_maya_risd_loci",         studentId: "stu_maya",    projectItemId: "item_maya_risd_loci",      title: "RISD LOCI",                          snapshotCount: 2, lastEditedAt: "2026-12-14T22:00:00", lastEditedBy: "stu_maya" },
    { id: "doc_maya_yale_whymajor",     studentId: "stu_maya",    projectItemId: "item_maya_yale_whymajor",  title: "Yale — Why Major (Art)",             snapshotCount: 7, lastEditedAt: "2026-12-12T16:00:00", lastEditedBy: "stu_maya" },
    { id: "doc_tony_cmu_whycmu",        studentId: "stu_tony",    projectItemId: "item_tony_cmu_whycmu",     title: "CMU SCS — Why CMU",                  snapshotCount: 5, lastEditedAt: "2026-12-13T11:00:00", lastEditedBy: "stu_tony" },
    { id: "doc_tony_mit_maker",         studentId: "stu_tony",    projectItemId: "item_tony_mit_maker",      title: "MIT Maker Portfolio — BiAo app demo", snapshotCount: 2, lastEditedAt: "2026-12-13T18:00:00", lastEditedBy: "stu_tony" },
    { id: "doc_jackson_princeton_ps",   studentId: "stu_jackson", projectItemId: "item_jackson_princeton_ps", title: "Princeton — Personal Statement",     snapshotCount: 8, lastEditedAt: "2026-10-31T22:00:00", lastEditedBy: "stu_jackson", note: "submitted final" },
    { id: "doc_daniel_stanford_ps",     studentId: "stu_daniel",  projectItemId: "item_daniel_stanford_ps",  title: "Stanford — Personal Statement",      snapshotCount: 6, lastEditedAt: "2026-09-26T20:00:00", lastEditedBy: "stu_daniel", note: "submitted final" },
    { id: "doc_roya_ps",                studentId: "stu_roya",    projectItemId: "item_roya_ps",             title: "Common App — Personal Statement (REWRITE)", snapshotCount: 0, lastEditedAt: "2026-12-15T20:00:00", lastEditedBy: "stu_roya", note: "full restart in progress" },
    { id: "doc_caroline_brown_loci",    studentId: "stu_caroline",projectItemId: "item_caroline_brown_loci", title: "Brown LOCI",                         snapshotCount: 3, lastEditedAt: "2026-12-15T10:00:00", lastEditedBy: "con_xiao", note: "submitted final" },
    { id: "doc_sophia_umiami_loci",     studentId: "stu_sophia",  projectItemId: "item_sophia_umiami_loci",  title: "UMiami LOCI",                        snapshotCount: 3, lastEditedAt: "2026-12-15T12:00:00", lastEditedBy: "con_xiao", note: "submitted final" },
  ],

  // ============================================================
  // SNAPSHOTS
  // Maya Yale SA2: 12 drafts. Drafts 9-12 have contentText (inline-diff demo).
  // Drafts 1-8 are metadata only. Comments + suggestions on draft 10-12.
  // Priya JHU Why Major: 1 snapshot with full 6-comment thread.
  // Others: light snapshot metadata only.
  // ============================================================
  snapshots: [
    // Maya Yale SA2 — drafts 1-8 (metadata only)
    { id: "snap_maya_yale_sa2_d1",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 1",  createdAt: "2026-11-14T19:00:00", wordCount: 87,  diffFromPrev: null },
    { id: "snap_maya_yale_sa2_d2",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 2",  createdAt: "2026-11-17T20:00:00", wordCount: 108, diffFromPrev: "+21 from v1" },
    { id: "snap_maya_yale_sa2_d3",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 3",  createdAt: "2026-11-21T18:30:00", wordCount: 119, diffFromPrev: "+11 from v2" },
    { id: "snap_maya_yale_sa2_d4",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 4",  createdAt: "2026-11-24T21:00:00", wordCount: 125, diffFromPrev: "+6 from v3" },
    { id: "snap_maya_yale_sa2_d5",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 5",  createdAt: "2026-11-28T19:15:00", wordCount: 131, diffFromPrev: "+6 from v4" },
    { id: "snap_maya_yale_sa2_d6",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 6",  createdAt: "2026-12-01T20:30:00", wordCount: 124, diffFromPrev: "-7 from v5" },
    { id: "snap_maya_yale_sa2_d7",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 7",  createdAt: "2026-12-04T19:45:00", wordCount: 124, diffFromPrev: "±0 from v6 (line edits only)" },
    { id: "snap_maya_yale_sa2_d8",  documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 8",  createdAt: "2026-12-08T18:30:00", wordCount: 190, diffFromPrev: "+66 from v7",
      contentText: "I used to think identity was a thing you chose. My mom collected Ankara fabric — orange-and-cobalt remnants my grandmother brought from Lagos — and stacked them in a chest in the closet. For years I thought of them the way I thought of an old camera lens or a cumin jar: pieces of someone else, that I could pick up and use if I wanted, or leave there. \n\nThen I started painting. I was supposed to be working on a self-portrait, and I kept getting the eyes wrong. One night I pulled an Ankara scrap out of the chest, taped it to my easel, and tried to paint over the shape of it. I couldn't see the cloth past the oil any more. The pattern bled through the skin like it had been there the whole time. \n\nFamily isn't something you carry in a chest. It's something that's in the face before you start. I had been trying to make a painting about myself the way you make an argument, by stating it. The cloth had been making the argument all along — I just hadn't been letting it." },
    // Draft 9 — GAP (skipped by Maya, doesn't exist; v1-mockup shows gap marker)
    // Draft 10 — actual draft text with diff vs Draft 8 (this is what document-v1 / v2 inline-diff demo uses)
    { id: "snap_maya_yale_sa2_d10", documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 10", createdAt: "2026-12-10T16:48:00", wordCount: 168, diffFromPrev: "-22 from v8 (24 added, 46 cut; no v9 — skipped)",
      contentText: "I used to think identity was a thing you chose, the way you chose a major or a paint color. My mom collected Ankara fabric — indigo and saffron remnants my grandmother brought from Lagos — and stacked them in a chest in the closet. For years I called it heritage and left it there. \n\nThen I started painting. I kept getting my own face wrong. One night I pulled an Ankara scrap out of the chest, taped it to my easel, and tried to paint over the shape of it. The cloth bled through the skin. The pattern was older than the portrait. I had been painting an answer; the cloth made it a question. \n\nFamily isn't something you choose to carry. It's already in the face. I used to think I'd be the one to compose myself out of pieces. Now I think the pieces have always been composing me. The painting only stops being a still-life once I admit which voice is in it.",
      changesByAuthor: { maya: 24, xiao: 2 },
      changeCount: 26,
      comments: [
        { id: "cmt_d8_xiao_1", author: "con_xiao", role: "Consultant", timestamp: "2026-12-08T12:34:00", body: "Love the Ankara scraps image, but the opening still reads as a thesis statement. Yale wants the shift mid-essay, not announced upfront. Can you let the cloth do the arguing earlier?", anchorQuote: "identity was a thing you chose" },
        { id: "cmt_d8_maya_1", author: "stu_maya", role: "Student", timestamp: "2026-12-09T08:15:00", body: "ok ill try opening on the chest instead and let the cloth come in by paragraph 2", anchorQuote: null },
        { id: "cmt_d8_xiao_2", author: "con_xiao", role: "Consultant", timestamp: "2026-12-09T09:02:00", body: "Yes — and lean into the painting moment as the pivot. That's where the change actually happens. The 'orange-and-cobalt' line is doing too much; consider trimming.", anchorQuote: "orange-and-cobalt remnants" },
        { id: "cmt_d8_maya_2", author: "stu_maya", role: "Student", timestamp: "2026-12-09T21:43:00", body: "trimming orange-and-cobalt — i'll try 'indigo and saffron' which actually matches the fabric more accurately anyway", anchorQuote: null },
        { id: "cmt_d8_xiao_3", author: "con_xiao", role: "Consultant", timestamp: "2026-12-10T11:15:00", body: "Better. Two specific suggestions inline. Also: 'whose family is in any given face' is your strongest line — protect it. Make sure draft 10 keeps it or its DNA.", suggestionCount: 2 },
        { id: "cmt_d8_maya_3", author: "stu_maya", role: "Student", timestamp: "2026-12-10T16:48:00", body: "kept the DNA but reframed slightly — 'Family isn't something you choose to carry. It's already in the face.' tighter i think", anchorQuote: "Family isn't something you carry" },
        { id: "cmt_d8_xiao_4", author: "con_xiao", role: "Consultant", timestamp: "2026-12-10T18:02:00", body: "That's the version. Close the thread for now and let me re-read fresh tomorrow before SA1/SA3 work.", anchorQuote: null },
      ]
    },
    { id: "snap_maya_yale_sa2_d11", documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 11", createdAt: "2026-12-12T19:00:00", wordCount: 134, diffFromPrev: "-34 from v10 (line trims)",
      contentText: "I used to think identity was a thing you chose. My mom collected Ankara fabric — indigo and saffron remnants my grandmother brought from Lagos — and stacked them in a chest in the closet. For years I called it heritage and left it there. \n\nThen I started painting. I kept getting my own face wrong. One night I pulled an Ankara scrap out of the chest, taped it to my easel, and tried to paint over the shape of it. The cloth bled through the skin. The pattern was older than the portrait. I had been painting an answer; the cloth made it a question. \n\nFamily isn't something you choose to carry. It's already in the face. The painting only stops being a still-life once I admit which voice is in it.",
      changeCount: 7
    },
    { id: "snap_maya_yale_sa2_d12", documentId: "doc_maya_yale_sa2", triggeredById: "stu_maya", label: "Draft 12 (perfectionist hold — refusing to ship; 13 words over limit)", createdAt: "2026-12-13T18:30:00", wordCount: 133, diffFromPrev: "-1 from v11 (article + preposition tweaks)", isCurrent: true,
      contentText: "I used to think identity was a thing you chose. My mom collected Ankara fabric — indigo and saffron remnants my grandmother brought from Lagos — and stacked them in a chest in the closet. For years I called it heritage and left it there. \n\nThen I started painting. I kept getting my own face wrong. One night I pulled the Ankara scrap from the chest, taped it to my easel, and tried to paint over the shape of it. The cloth bled through the skin. The pattern was older than the portrait. I had been painting an answer; the cloth made it a question. \n\nFamily isn't something you choose to carry. It's already in the face. The painting only stops being a still-life once I admit which voice is in it.",
      changeCount: 2,
      interventionNote: "Xiao 12/13 pin: 'Don't let her over-edit again — give her a 90-min window, kill the doc, move on. Two more drafts won't help.'"
    },

    // Priya JHU Why Major — 1 snapshot with full 6-comment thread
    { id: "snap_priya_jhu_d2", documentId: "doc_priya_jhu_whymajor", triggeredById: "stu_priya", label: "Draft 2 (adapted from Penn Why Major)", createdAt: "2026-12-15T11:20:00", wordCount: 206, diffFromPrev: "+89 from v1",
      contentText: "When I first walked into the Singh Center for Nanotechnology my junior summer, I was looking for a research home, not a bioengineering identity. I left that summer with both. My USABO Semifinalist work on cellular signal transduction had taught me to ask molecular-scale questions; what Penn's Bioengineering program offered me was the engineering vocabulary to design solutions at that scale.\n\nHopkins offers something I couldn't find anywhere else I'm applying: BME design teams as the spine of the undergraduate curriculum, not an elective layer on top of it. The yearlong Design Teams sequence, embedded with INBT's translational research focus, would let me work the way I already work — across the bench-to-clinic seam that the BMES Annual Meeting abstract I co-authored last spring lives in.\n\nProf. Hai-Quan Mao's tissue scaffold work at INBT is the specific reason I'm writing this essay tonight. His group's polymer-based nerve regeneration scaffolds bridge exactly the kind of materials-and-biology question I want to spend four years on. Combined with Hopkins's Pre-Health Advising structure — explicit, individualized, and accountable in ways that match how I work — Hopkins's BME track isn't a backup to Penn. It's a different answer to the same question, and one I want to commit to fully.",
      changesByAuthor: { priya: 80, xiao: 9 },
      changeCount: 89,
      comments: [
        { id: "cmt_priya_jhu_1", author: "con_xiao", role: "Consultant", timestamp: "2026-12-14T16:20:00", body: "Strong adaptation from the Penn draft. Two things: (1) the opening still feels Penn-shaped — can you re-anchor in a Hopkins-specific moment? Even hypothetical works if you don't have a campus visit. (2) Mao's lab is the right specificity hook; keep it.", anchorQuote: "When I first walked into the Singh Center" },
        { id: "cmt_priya_jhu_2", author: "stu_priya", role: "Student", timestamp: "2026-12-14T22:05:00", body: "ok i'll try a new opener — maybe the BMES abstract? that's already in the essay anyway and it's not Penn-specific. or the moment from the Hopkins virtual info session about Design Teams. lmk which lands better", anchorQuote: null },
        { id: "cmt_priya_jhu_3", author: "con_xiao", role: "Consultant", timestamp: "2026-12-15T08:42:00", body: "BMES is better — it shows the researcher identity is YOURS, not something Penn gave you. The info session feels distant. Reframe paragraph 1 around the BMES moment.", anchorQuote: "the BMES Annual Meeting abstract" },
        { id: "cmt_priya_jhu_4", author: "stu_priya", role: "Student", timestamp: "2026-12-15T09:30:00", body: "got it. also — the Pre-Health Advising line: am i overselling? feels a little brown-nosey reading it back", anchorQuote: "Pre-Health Advising structure" },
        { id: "cmt_priya_jhu_5", author: "con_xiao", role: "Consultant", timestamp: "2026-12-15T10:15:00", body: "It's borderline. The 'explicit, individualized, and accountable' is the kind of language they'd write about themselves — which works for Hopkins because they DO emphasize this. But cut 'in ways that match how I work' — too much performative self-awareness. Just let the institutional fact stand.", anchorQuote: "accountable in ways that match how I work" },
        { id: "cmt_priya_jhu_6", author: "stu_priya", role: "Student", timestamp: "2026-12-15T11:20:00", body: "cut. shipping draft 3 with both changes tonight before mock interview tomorrow", anchorQuote: null },
      ]
    },
  ],
};
