/**
 * Unified blog preview: hash routing (#all | #main-* | #sub-*)
 * + mock data. Not wired to production config.
 */

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** @type {Record<string, string[]>} */
const categoryTree = {
  Investment: ["Bitcoin", "Real Estate", "Stock Market", "Value Investing"],
  Career: [
    "Tech Innovation",
    "Industry News",
    "Workplace Insights",
    "PhD Possibilities",
    "Medical AI",
  ],
};

/** Mock posts — mirrors real tags/dates loosely */
const mockPosts = [
  {
    file: "20260122phd_career_transition.html",
    title: "PhD to industry: what I wish I had optimized earlier",
    date: "2026-01-22",
    summary:
      "A framework for choosing problems, managers, and comp—without losing the thread of what you actually want to build.",
    tags: ["Workplace Insights"],
  },
  {
    file: "20260103rad_linter_clinical_sglang_advantage.html",
    title: "Why sglang matters for clinical LLM serving",
    date: "2026-01-03",
    summary:
      "Latency budgets in hospital workflows are unforgiving; batching and memory layout matter.",
    tags: ["Tech Innovation", "Medical AI"],
  },
  {
    file: "20251230btc_yield_spread_crash.html",
    title: "BTC yield spread and the crash window",
    date: "2025-12-30",
    summary: "Carry, funding, and when the market prices dislocations faster than narratives.",
    tags: ["Bitcoin", "Stock Market"],
  },
  {
    file: "llm_hospital_rad_linter.html",
    title: "Radiology linter in production: from demo to QA loop",
    date: "2025-12-10",
    summary: "Benchmarks vs. real reports—and how we measured trust with clinicians.",
    tags: ["Tech Innovation", "Medical AI"],
  },
  {
    file: "btc_2026_prediction.html",
    title: "BTC 2026: standing at the cycle inflection",
    date: "2025-12-18",
    summary: "Stablecoin risk, technical structure, and historical rhythm in one frame.",
    tags: ["Bitcoin", "Value Investing"],
  },
  {
    file: "buffett_munger_weekend_reflection.html",
    title: "Buffett/Munger weekend: notes to self",
    date: "2025-06-07",
    summary: "Patience as a system, not a mood—highway listening notes.",
    tags: ["Value Investing"],
  },
];

function parseHash() {
  const raw = (window.location.hash || "#all").replace(/^#/, "").trim();
  if (!raw || raw === "all") return { mode: "all" };
  if (raw.startsWith("main-")) {
    const slug = raw.slice(5);
    const main = Object.keys(categoryTree).find((k) => slugify(k) === slug);
    return main ? { mode: "main", main } : { mode: "all" };
  }
  if (raw.startsWith("sub-")) {
    const slug = raw.slice(4);
    const allSubs = Object.values(categoryTree).flat();
    const sub = allSubs.find((s) => slugify(s) === slug);
    return sub ? { mode: "sub", sub } : { mode: "all" };
  }
  return { mode: "all" };
}

/**
 * @param {{ mode: string, main?: string, sub?: string }} view
 * @returns {typeof mockPosts}
 */
function filterPosts(view) {
  const sorted = [...mockPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  if (view.mode === "all") return sorted;
  if (view.mode === "sub" && view.sub) {
    return sorted.filter((p) => p.tags.includes(view.sub));
  }
  if (view.mode === "main" && view.main) {
    const subs = categoryTree[view.main] || [];
    return sorted.filter((p) => p.tags.some((t) => subs.includes(t)));
  }
  return sorted;
}

function primaryTag(post, view) {
  if (view.mode === "sub" && view.sub) return view.sub;
  const subs = Object.values(categoryTree).flat();
  const hit = post.tags.find((t) => subs.includes(t));
  return hit || post.tags[0] || "";
}

function renderNav(view) {
  const allEl = document.getElementById("nav-all-link");
  if (allEl) {
    allEl.classList.toggle("is-active", view.mode === "all");
    allEl.setAttribute("href", "#all");
  }

  const groupsEl = document.getElementById("nav-groups");
  if (!groupsEl) return;
  groupsEl.innerHTML = "";

  for (const [main, subs] of Object.entries(categoryTree)) {
    const group = document.createElement("div");
    group.className = "nav-group";

    const title = document.createElement("div");
    title.className = "nav-group-title";
    title.textContent = main;

    const pills = document.createElement("div");
    pills.className = "nav-pills";

    const mainSlug = `main-${slugify(main)}`;
    const mainA = document.createElement("a");
    mainA.href = `#${mainSlug}`;
    mainA.className = "nav-main-only";
    mainA.textContent = "All in " + main;
    const mainActive =
      view.mode === "main" && view.main === main;
    mainA.classList.toggle("is-active", mainActive);
    pills.appendChild(mainA);

    subs.forEach((sub) => {
      const a = document.createElement("a");
      a.href = `#sub-${slugify(sub)}`;
      a.textContent = sub;
      const subActive = view.mode === "sub" && view.sub === sub;
      a.classList.toggle("is-active", subActive);
      pills.appendChild(a);
    });

    group.appendChild(title);
    group.appendChild(pills);
    groupsEl.appendChild(group);
  }
}

function renderTimeline(posts, view) {
  const root = document.getElementById("timeline");
  const titleEl = document.getElementById("timeline-title");
  if (!root || !titleEl) return;

  if (view.mode === "main" && view.main) {
    titleEl.textContent = `Timeline · ${view.main} (all sub-topics)`;
  } else if (view.mode === "sub" && view.sub) {
    titleEl.textContent = `Timeline · ${view.sub}`;
  } else {
    titleEl.textContent = "Timeline · everything (newest first)";
  }

  root.innerHTML = "";

  if (posts.length === 0) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.textContent = "No posts in this filter (mock data is sparse on purpose).";
    root.appendChild(p);
    return;
  }

  posts.forEach((post) => {
    const art = document.createElement("article");
    art.className = "tl-item";

    const meta = document.createElement("p");
    meta.className = "meta";
    const time = document.createElement("time");
    time.dateTime = post.date;
    time.textContent = formatDate(post.date);
    meta.appendChild(time);
    const read = document.createElement("span");
    read.textContent = " · example";
    meta.appendChild(read);

    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    a.href = `../../posts/${post.file}`;
    a.textContent = post.title;
    h2.appendChild(a);

    const ex = document.createElement("p");
    ex.className = "excerpt";
    ex.textContent = post.summary;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = primaryTag(post, view);

    art.appendChild(meta);
    art.appendChild(h2);
    art.appendChild(ex);
    if (tag.textContent) art.appendChild(tag);

    root.appendChild(art);
  });
}

function formatDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function updateDek(view) {
  const dek = document.getElementById("blog-dek");
  if (!dek) return;
  if (view.mode === "all") {
    dek.textContent =
      "Pick a category below, or stay here for the full timeline—newest first.";
  } else if (view.mode === "main" && view.main) {
    dek.textContent = `Showing every post tagged under “${view.main}” (any sub-topic).`;
  } else if (view.mode === "sub" && view.sub) {
    dek.textContent = `Showing only posts tagged “${view.sub}”.`;
  }
}

function apply() {
  const view = parseHash();
  const posts = filterPosts(view);
  renderNav(view);
  renderTimeline(posts, view);
  updateDek(view);
}

window.addEventListener("hashchange", apply);
document.addEventListener("DOMContentLoaded", apply);
