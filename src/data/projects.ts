export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  problem: string;
  summary: string;
  /** Outcome line shown on the card, as published on the previous site. */
  result?: string;
  loom?: string;
  liveUrl?: string;
  /**
   * Per-system demos, for a project that bundles several. The old site gave
   * each of these its own card and video; the rebuild collapsed them into one
   * project and only carried a single demo across.
   */
  demos?: { title: string; desc: string; result?: string; url: string }[];
  intro: string;
  body: string[];
  shots: Shot[];
  portraitShots?: boolean;
  facts?: { label: string; items: string[] }[];
};

export const automationProjects: Project[] = [
  {
    slug: "liquidity-hq",
    title: "LiquidityHQ",
    tags: ["Next.js", "Grok (xAI)", "Live SaaS"],
    cover: "/assets/liquidity-hq-sc-1.webp",
    coverAlt: "LiquidityHQ dashboard",
    problem:
      "Retail traders drowning in scattered market data across a dozen tabs, acting too late.",
    summary:
      "A live SaaS product I built and run. Scores squeeze setups and whale activity across 50 coins in real time, with Grok reading 35 signals to give a direct trade bias. Built with my multi-agent Claude Code team.",
    liveUrl: "https://liquidity-hq.com",
    intro:
      "A live SaaS product I built and run: crypto trading intelligence for retail traders. Squeeze scores, whale alerts, AI analysis, and macro events in one dashboard, with a free tier and a $25/mo Pro plan.",
    body: [
      "LiquidityHQ solves a real problem for retail crypto traders: too much market data scattered across too many places to act on before a move has already happened. It pulls live price, funding, and order-flow data across 50 coins, scores squeeze setups and whale activity in real time, and hands a trader one dashboard instead of a dozen open tabs.",
      "The AI layer runs on Grok (xAI). Pick a coin, hit Analyze, and it reads 35 live signals, including funding rate, CVD, open interest trend, squeeze score, whale flow, and GEX, then returns a direct, actionable trade bias instead of raw numbers to interpret yourself. A separate news pipeline classifies breaking geopolitical headlines from 12+ sources for how they would move crypto, with roughly a 1 minute lag from publish to alert.",
      "It is built around a real pricing model, not a demo: a free tier covering the dashboard, morning briefing, news feed, and limited AI analyses, plus a $25/mo Pro tier that adds Telegram alerts, unlimited price alerts, and deeper AI usage.",
      "I built it with a multi-agent Claude Code team I run daily. Developer, QA and PM/DevOps agents pick up GitHub issues, write and test the code, and promote it from dev to staging to production. The QA agent writes the check before the feature exists and proves it fails on a bad build, so a passing test means something. I review the work and approve anything that touches the live database or ships visually.",
    ],
    shots: [
      {
        src: "/assets/liquidity-hq-sc-1.webp",
        alt: "LiquidityHQ landing page: read the map, hunt the stops",
      },
      {
        src: "/assets/liquidity-hq-sc-2.webp",
        alt: "LiquidityHQ feature grid: AI Arena, Telegram Alerts, Morning Briefing, News Feed, Whale Tracker, Squeeze Scanner",
      },
      {
        src: "/assets/liquidity-hq-sc-3.webp",
        alt: "LiquidityHQ pricing: Free and Pro tiers",
      },
      {
        src: "/assets/liquidity-hq-sc-4.webp",
        alt: "LiquidityHQ AI Arena: live chart with Grok analysis",
      },
    ],
    facts: [
      {
        label: "What it does",
        items: [
          "AI Arena: Grok analysis on 35 signals",
          "Squeeze Scanner across all 50 coins",
          "Whale Tracker on Binance and Bybit",
          "Telegram alerts",
          "Morning briefing: macro and ETF flows",
          "News feed: 12+ sources, auto-classified",
        ],
      },
      {
        label: "Built with",
        items: [
          "Next.js",
          "Supabase",
          "Grok (xAI) API",
          "Binance API",
          "Bybit API",
          "Telegram Bot API",
          "Render",
          "Claude Code agent team",
        ],
      },
      {
        label: "By the numbers",
        items: [
          "50 coins tracked",
          "35 signal types",
          "12+ news sources",
          "About 1 min from headline to alert",
        ],
      },
    ],
  },
  {
    slug: "crm-growth-suite",
    title: "Omnichannel CRM AI Growth Suite",
    tags: ["Vapi", "n8n", "GoHighLevel", "OpenAI", "Supabase"],
    cover: "/assets/cs5_prop_connect.webp",
    coverAlt: "Omnichannel CRM AI Growth Suite",
    problem:
      "Leads slipping through the cracks across calls, forms, and follow-ups, with no single system catching them.",
    summary:
      "5 systems unified into one B2B automation machine: Dead Lead Reactivation, a missed-call voice receptionist, PropConnect's voice agent, Smart Lead Routing, and an AI Appointment Setter.",
    loom: "https://www.loom.com/embed/ef471b9fd61e4978b25b4bbd7f44b342",
    demos: [
      {
        title: "PropConnect AI Voice Agent",
        desc: "AI voice agent handling inbound real estate calls 24/7. It qualifies leads and books viewings automatically.",
        result: "Under 5-second response time",
        url: "https://www.loom.com/embed/ef471b9fd61e4978b25b4bbd7f44b342",
      },
      {
        title: "Smart Lead Routing System",
        desc: "Scores leads High/Medium/Low, generates personalized replies, and routes them to the right CRM pipeline in seconds.",
        result: "Routed in under 2 seconds",
        url: "https://www.loom.com/embed/ac73a668c366408798b56963c4835e0a",
      },
      {
        title: "AI Appointment Setter",
        desc: "“Alex”, an AI voice agent that qualifies leads and books property viewings, with instant CRM sync.",
        result: "Booked in under 5 seconds",
        url: "https://www.loom.com/embed/c6ad99c6f2b848e99f99853f8c5ce489",
      },
      {
        title: "AI Voice Receptionist for Missed Calls",
        desc: "AI voice agent that captures caller information, answers questions, and books appointments when the business cannot pick up the phone.",
        url: "https://www.youtube.com/embed/MrMQjHjfgtA",
      },
      {
        title: "Dead Lead Reactivation Engine",
        desc: "Engaging old, neglected leads via personalized AI conversations to recover lost revenue.",
        url: "https://www.youtube.com/embed/sOgKiULP4Bg",
      },
    ],
    intro:
      "Five automation systems unified into one B2B growth machine, covering every point where a lead can go cold: dead lists, missed calls, inbound calls, routing, and booking.",
    body: [
      "Most businesses lose leads in the gaps between tools. A call comes in after hours and goes to voicemail. A form fill sits in a pipeline with no follow-up. An old list of dead leads never gets touched again. Each gap is small, and together they are most of the pipeline.",
      "This suite closes all 5 gaps at once. Dead Lead Reactivation works old lists back into conversations. A voice receptionist catches missed calls instead of letting them go to voicemail. PropConnect's voice agent answers inbound real estate calls in under 5 seconds, qualifies the lead, and books the viewing. Smart Lead Routing scores each lead High, Medium, or Low, writes a personalized reply, and routes it to the right pipeline in under 2 seconds. The AI Appointment Setter books viewings around the clock with instant CRM sync.",
      "The pieces run on asynchronous webhook triggers, contact syncing loops, and native CRM booking automations, so each system feeds the others instead of standing alone.",
    ],
    shots: [
      { src: "/assets/cs5_prop_connect.webp", alt: "PropConnect AI Voice Agent" },
      { src: "/assets/cs09_lead_route_cover.webp", alt: "Smart Lead Routing System" },
      {
        src: "/assets/cs_8_voice_appointment_setter.webp",
        alt: "AI Appointment Setter",
      },
    ],
    facts: [
      {
        label: "Components",
        items: [
          "Dead Lead Reactivation Engine",
          "PropConnect AI Voice Agent",
          "AI Voice Receptionist for missed calls",
          "Smart Lead Routing System",
          "AI Appointment Setter",
        ],
      },
      {
        label: "Built with",
        items: ["Vapi", "n8n", "GoHighLevel", "OpenAI", "Supabase"],
      },
    ],
  },
  {
    slug: "project-sentinel",
    result:
      "Zero data loss on a forced crash-and-recover test, zero duplicate alerts under load",
    title: "Project Sentinel",
    loom: "https://www.youtube.com/embed/1CxYP9RIuHc",
    tags: ["FastAPI", "React", "Computer Vision", "Real-Time Alerts"],
    cover: "/assets/project-sentinel-cover.webp",
    coverAlt: "Project Sentinel operator console showing live alarms and camera feed",
    problem:
      "Security alarm systems that drown operators in false positives, or silently drop real threats when events arrive in bursts.",
    summary:
      "A real-time alarm monitoring prototype I built end to end: WebSocket ingestion under bursty load, a computer vision camera worker, AI triage with fallbacks and a spend cap, a live dashboard, and pattern-based escalation.",
    intro:
      "A real-time alarm monitoring prototype, built for a technical assessment for a security company: ingestion, computer vision, AI triage, and escalation, all designed to degrade safely instead of failing silently.",
    body: [
      "Security alarm platforms live or die on two things: never missing a real threat, and never burying operators under noise. Project Sentinel is a prototype that takes on both, end to end.",
      "Events arrive over a WebSocket feed that bursts unpredictably. A camera worker runs object detection (YOLO26n on ONNX) on a separate process so video never blocks ingestion. Every event gets a rule-based severity first, then an AI triage pass classifies it as a real or false positive with a one-line action, backed by a hard spend cap and a rules-based fallback if the model is slow, down, or returns something unusable.",
      "The store never loses an alarm: writes go through a write-behind SQLite layer with replay, verified by killing the backend mid-stream and confirming zero loss on restart. Under bursty load, the pipeline tracks received, accepted, rejected, and duplicate counts separately, so nothing silently disappears. Escalation rules were tuned against real volume: 18 pattern-based incidents raised out of 3,356 simulated alarms.",
    ],
    shots: [
      {
        src: "/assets/project-sentinel-cover.webp",
        alt: "Project Sentinel operator console showing live alarms and camera feed",
      },
    ],
    facts: [
      {
        label: "Reliability patterns",
        items: [
          "Bursty WebSocket ingestion with accept/reject/duplicate accounting",
          "AI triage with rule-based fallback and a hard spend cap",
          "Write-behind SQLite persistence with crash-tested replay",
          "Pattern-based escalation tuned against real alarm volume",
        ],
      },
      {
        label: "Built with",
        items: ["FastAPI", "React", "Python", "YOLO26n / ONNX", "SQLite"],
      },
    ],
  },
  {
    slug: "reconciliation-pipeline",
    result: "Zero duplicates, zero data loss, automatic recovery after a forced real outage",
    title: "Reconciliation Pipeline & Resilience Engine",
    loom: "https://www.youtube.com/embed/FxTpqahnpJY",
    tags: ["FastAPI", "n8n", "OpenAI", "Python"],
    cover: "/assets/reconciliation-pipeline.webp",
    coverAlt: "Reconciliation Pipeline and Resilience Engine",
    problem:
      "Bookkeeping automation that breaks quietly: duplicate charges slip through and one outage takes the whole run down.",
    summary:
      "An ingestion service with idempotency-key protection and a circuit breaker that stops calling a failing downstream step instead of retrying blindly.",
    intro:
      "A FastAPI ingestion service and n8n pipeline built around a simple idea: automation that fails loudly and safely beats automation that fails silently.",
    body: [
      "Bookkeeping automation breaks in specific, expensive ways. The same charge gets processed twice because a webhook fired twice. An AI classification gets trusted blindly and lands in the ledger wrong. One downstream outage takes the entire run down with it.",
      "This pipeline is built against all three. The FastAPI ingestion service enforces idempotency keys, rejecting duplicate processing within a TTL window and returning a 409 instead of silently double-counting. Items flow into an n8n-orchestrated pipeline that classifies and routes them through OpenAI.",
      "The resilience layer is a circuit breaker that tracks failure rate and stops calling a failing downstream step rather than hammering it with retries. When the dependency recovers, the circuit closes again. The result is a pipeline that degrades in a controlled way instead of collapsing.",
    ],
    shots: [
      {
        src: "/assets/reconciliation-pipeline.webp",
        alt: "Reconciliation pipeline architecture",
      },
    ],
    facts: [
      {
        label: "Reliability patterns",
        items: [
          "Idempotency keys with TTL window",
          "409 on duplicate submission",
          "Circuit breaker on failure rate",
          "Controlled degradation, not collapse",
        ],
      },
      { label: "Built with", items: ["FastAPI", "Python", "n8n", "OpenAI"] },
    ],
  },
  {
    slug: "messenger-chatbot",
    result: "24/7 coverage, replies in seconds instead of hours",
    title: "Multi-Branch AI Messenger Chatbot",
    tags: ["n8n", "OpenAI", "Supabase", "Meta Graph API"],
    cover: "/assets/cs1_portfolio_cover.webp",
    coverAlt: "Multi-Branch AI Messenger Chatbot",
    problem:
      "Branches fielding inquiries by hand, with replies taking hours and no consistent coverage.",
    summary:
      "A router agent classifies each incoming conversation and dispatches it to a specialist sub-agent, answering instantly across every branch, 24/7.",
    loom: "https://www.loom.com/embed/8166869bf3cb434da542254be79b5d19",
    intro:
      "An AI chatbot handling customer inquiries and bookings across multiple branches of a motorcycle service business, built as a router with specialist sub-agents rather than one monolithic bot.",
    body: [
      "A multi-branch service business was losing sales to slow replies. Inquiries arrived on Messenger at all hours, staff answered them by hand between other work, and response times stretched into hours. By the time someone replied, the customer had often gone elsewhere.",
      "Rather than one bot trying to do everything, I built a Master Router Agent that classifies each incoming conversation and dispatches it to a specialized sub-agent: parts and compatibility lookup, pricing, order status, or general inquiry. Each sub-agent has a narrower job and its own context boundaries, which makes it far more accurate than a single catch-all prompt.",
      "Context is passed between agents using thread identifiers, so a specialist picking up a conversation gets the relevant history without reprocessing everything. Retrieval-augmented generation (RAG) over a Supabase pgvector store grounds answers in real product and compatibility data instead of letting the model guess. The system routes between model tiers based on task complexity, keeping cost proportional to difficulty: the cheap model handles the high-frequency classification and routing path, the larger model is reserved for the calls that genuinely need reasoning over messy input, and Claude handles the long-context work. The rule is the smallest model that clears the accuracy bar for that step, not one model for the whole system.",
      // John's own account: Meta's webhook payload shape varies by message
      // type and changes when Meta updates the API. Keep this to what he
      // described - do not add invented detection details.
      "The part that bites you in production is payload shape. Meta's webhook does not send one structure: a plain text message, a photo, a video and a sticker or emoji each arrive shaped differently, and those shapes change when Meta updates the API. Any handler that assumes the structure it saw yesterday will break on a customer sending a photo instead of a sentence. So the ingestion layer validates message type before routing and handles each type explicitly, rather than reaching for a field that may not be there.",
    ],
    shots: [
      {
        src: "/assets/cs1_portfolio_cover.webp",
        alt: "Multi-Branch AI Messenger Chatbot",
      },
    ],
    facts: [
      {
        label: "Architecture",
        items: [
          "Master Router Agent for classification",
          "Specialist sub-agents per intent",
          "Thread-based context passing",
          "RAG retrieval over a Supabase pgvector store",
          "Model-tier routing by task complexity",
        ],
      },
      {
        label: "Built with",
        items: ["n8n", "OpenAI", "Supabase", "Meta Graph API"],
      },
    ],
  },
];

export const mobileProjects: Project[] = [
  {
    slug: "cyclistance",
    title: "Cyclistance",
    tags: ["Android", "Kotlin", "Firebase", "Google Maps API"],
    cover: "/assets/cyclistance-sc-1.webp",
    coverAlt: "Cyclistance app",
    problem: "Cyclists stranded with no fast way to call for roadside help.",
    summary:
      "A stranded rider taps once and the nearest available helper gets their exact GPS location, no directions to explain. Both positions stay live on the map as help gets closer.",
    intro:
      "An Android app that connects stranded cyclists with roadside help in a few taps, sending the closest available helper straight to their exact GPS location.",
    body: [
      "A cyclist with a mechanical failure or an injury has no fast way to get help. Calling around wastes time, and describing your position on an unmarked stretch of road is its own problem.",
      "Cyclistance handles both. A rider requests assistance in a few taps and the app matches them with the nearest available helper, passing exact coordinates so there is no explaining involved. Under the hood it runs low-latency database sync loops and a peer-to-peer mapping grid, with live state kept consistent between both riders as the helper moves.",
    ],
    shots: [
      { src: "/assets/cyclistance-sc-1.webp", alt: "Cyclistance screenshot 1" },
      { src: "/assets/cyclistance-sc-2.webp", alt: "Cyclistance screenshot 2" },
      { src: "/assets/cyclistance-sc-3.webp", alt: "Cyclistance screenshot 3" },
      { src: "/assets/cyclistance-sc-4.webp", alt: "Cyclistance screenshot 4" },
    ],
    portraitShots: true,
    facts: [
      {
        label: "Built with",
        items: [
          "Kotlin",
          "Android",
          "Firebase",
          "Google Maps API",
          "Android Studio",
        ],
      },
    ],
  },
  {
    slug: "byahero",
    title: "Byahero",
    tags: ["Android", "Kotlin", "Google Maps API"],
    cover: "/assets/byahero-prev-sc.webp",
    coverAlt: "Byahero app",
    problem: "Missing your stop because there is no heads-up before it arrives.",
    summary:
      "Set your stop and relax. The app watches the route in the background and wakes you before you arrive, even with the screen off, so a long ride no longer ends in an overshoot.",
    intro:
      "An Android app that alerts commuters before their stop arrives, so falling asleep on the bus stops meaning a missed destination.",
    body: [
      "Commuters miss their stop for a simple reason: there is no warning before it arrives. On a long ride, that means staying alert the whole way or risking an overshoot, especially on routes without clear announcements.",
      "Byahero watches the route in the background and alerts the rider as their stop approaches. It runs real-time geolocation mapping with geofencing triggers and background processing, so the alert fires reliably even with the screen off. It also carries lighter navigation and live weather so a rider can check conditions without a second app.",
    ],
    shots: [
      { src: "/assets/byahero-sc-1.webp", alt: "Byahero screenshot 1" },
      { src: "/assets/byahero-sc-2.webp", alt: "Byahero screenshot 2" },
      { src: "/assets/byahero-sc-3.webp", alt: "Byahero screenshot 3" },
      { src: "/assets/byahero-sc-4.webp", alt: "Byahero screenshot 4" },
    ],
    portraitShots: true,
    facts: [
      {
        label: "Built with",
        items: [
          "Kotlin",
          "Android",
          "Google Maps API",
          "Geofencing",
          "Android Studio",
        ],
      },
    ],
  },
];

export const allProjects = [...automationProjects, ...mobileProjects];

export const capabilities = [
  {
    num: "01",
    title: "Revenue & Retention Automations",
    items: [
      "Dead Lead Reactivation",
      "AI Voice Receptionist",
      "Churn Prediction & Winback",
    ],
    note: "Backed by live asynchronous webhook triggers, contact syncing loops, and native CRM booking automations built inside GoHighLevel.",
  },
  {
    num: "02",
    title: "Enterprise Document & Knowledge AI",
    items: [
      "RFP & Tender Response Automation",
      "Contract Review Automation",
      "SOP & Training Doc Generator",
      "Product Listing Factory",
    ],
    note: "Engineered on the same retrieval-augmented generation (RAG) stack running in my production engines: text embedding, semantic search, and pgvector routing.",
  },
  {
    num: "03",
    title: "Operational Finance & Intelligence",
    items: [
      "Accounts Receivable & Payment Chasing",
      "Sales Call Quality Analysis",
      "Voice of Customer Feedback Mining",
    ],
    note: "Built on background processing, real-time database syncing, and transactional error-proofing developed across my Android apps and FastAPI backends.",
  },
];

export const skillGroups = [
  {
    label: "Automation & AI",
    accent: true,
    items: [
      "Claude Code",
      "Codex",
      "n8n",
      "Make",
      "Zapier",
      "OpenAI",
      "Claude API",
      "Grok (xAI)",
      "RAG",
      "pgvector",
      "MCP servers",
      "Self-hosted deployment",
      "Python",
      "FastAPI",
      "JavaScript",
      "Node.js",
      "REST API",
      "GoHighLevel",
      "Vapi",
      "Meta Graph API",
      "Supabase",
    ],
  },
  {
    label: "Web, Mobile & Backend",
    accent: false,
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "PostgreSQL",
      "Kotlin",
      "Android",
      "Jetpack Compose",
      "Firebase",
      "Java",
      "SQL",
      "NoSQL",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "GitLab CI",
      "Google Cloud (GCP)",
      "Cloudflare Workers",
      "Git",
      "Figma",
    ],
  },
];
