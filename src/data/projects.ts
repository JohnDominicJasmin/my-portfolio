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
    cover: "/assets/liquidity-hq-sc-1.png",
    coverAlt: "LiquidityHQ dashboard",
    problem:
      "Retail traders drowning in scattered market data across a dozen tabs, acting too late.",
    summary:
      "A live SaaS product I built and run. Scores squeeze setups and whale activity across 50 coins in real time, with Grok reading 35 signals to give a direct trade bias. Free tier plus a $25/mo Pro plan, with paying users.",
    liveUrl: "https://liquidity-hq.com",
    intro:
      "A live SaaS product I built and run: AI-powered crypto trading intelligence for retail traders. Squeeze scores, whale alerts, AI analysis, and macro events in one dashboard. Free tier plus a $25/mo Pro plan, with real paying users.",
    body: [
      "LiquidityHQ solves a real problem for retail crypto traders: too much market data scattered across too many places to act on before a move has already happened. It pulls live price, funding, and order-flow data across 50 coins, scores squeeze setups and whale activity in real time, and hands a trader one dashboard instead of a dozen open tabs.",
      "The AI layer runs on Grok (xAI). Pick a coin, hit Analyze, and it reads 35 live signals, including funding rate, CVD, open interest trend, squeeze score, whale flow, and GEX, then returns a direct, actionable trade bias instead of raw numbers to interpret yourself. A separate news pipeline classifies breaking geopolitical headlines from 12+ sources for how they would move crypto, with roughly a one minute lag from publish to alert.",
      "It shipped with a real pricing model, not a demo: a free tier covering the dashboard, morning briefing, news feed, and limited AI analyses, plus a $25/mo Pro tier that unlocks Telegram alerts, unlimited price alerts, and deeper AI usage.",
    ],
    shots: [
      {
        src: "/assets/liquidity-hq-sc-1.png",
        alt: "LiquidityHQ landing page: read the map, hunt the stops",
      },
      {
        src: "/assets/liquidity-hq-sc-2.png",
        alt: "LiquidityHQ feature grid: AI Arena, Telegram Alerts, Morning Briefing, News Feed, Whale Tracker, Squeeze Scanner",
      },
      {
        src: "/assets/liquidity-hq-sc-3.png",
        alt: "LiquidityHQ pricing: Free and Pro tiers",
      },
      {
        src: "/assets/liquidity-hq-sc-4.png",
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
          "Grok (xAI) API",
          "Binance API",
          "Bybit API",
          "Telegram Bot API",
          "Render",
        ],
      },
      {
        label: "By the numbers",
        items: [
          "50 coins tracked",
          "35 signal types",
          "Free plus $25/mo Pro",
          "Real paying users",
        ],
      },
    ],
  },
  {
    slug: "crm-growth-suite",
    title: "Omnichannel CRM AI Growth Suite",
    tags: ["Vapi", "n8n", "GoHighLevel", "OpenAI", "Supabase"],
    cover: "/assets/cs5_prop_connect.png",
    coverAlt: "Omnichannel CRM AI Growth Suite",
    problem:
      "Leads slipping through the cracks across calls, forms, and follow-ups, with no single system catching them.",
    summary:
      "Five systems unified into one B2B automation machine: Dead Lead Reactivation, a missed-call voice receptionist, PropConnect's voice agent, Smart Lead Routing, and an AI Appointment Setter.",
    loom: "https://www.loom.com/embed/ef471b9fd61e4978b25b4bbd7f44b342",
    demos: [
      {
        title: "PropConnect AI Voice Agent",
        desc: "AI voice agent handling inbound real estate calls 24/7 — qualifies leads and books viewings automatically.",
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
        desc: "“Alex” — AI voice agent that qualifies leads and books property viewings, with instant CRM sync.",
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
        desc: "Engaging old, neglected leads via personalized AI-powered conversations to recover lost revenue.",
        url: "https://www.youtube.com/embed/sOgKiULP4Bg",
      },
    ],
    intro:
      "Five automation systems unified into one B2B growth machine, covering every point where a lead can go cold: dead lists, missed calls, inbound calls, routing, and booking.",
    body: [
      "Most businesses lose leads in the gaps between tools. A call comes in after hours and goes to voicemail. A form fill sits in a pipeline with no follow-up. An old list of dead leads never gets touched again. Each gap is small, and together they are most of the pipeline.",
      "This suite closes all five gaps at once. Dead Lead Reactivation works old lists back into conversations. A voice receptionist catches missed calls instead of letting them go to voicemail. PropConnect's voice agent answers inbound real estate calls in under five seconds, qualifies the lead, and books the viewing. Smart Lead Routing scores each lead High, Medium, or Low, writes a personalized reply, and routes it to the right pipeline in under two seconds. The AI Appointment Setter books viewings around the clock with instant CRM sync.",
      "The pieces run on asynchronous webhook triggers, contact syncing loops, and native CRM booking automations, so each system feeds the others instead of standing alone.",
    ],
    shots: [
      { src: "/assets/cs5_prop_connect.png", alt: "PropConnect AI Voice Agent" },
      { src: "/assets/cs09_lead_route_cover.png", alt: "Smart Lead Routing System" },
      {
        src: "/assets/cs_8_voice_appointment_setter.png",
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
    // Copy below is lifted from the old site's own entry for this system, not
    // rewritten — the only claims here are the ones you already published.
    slug: "solar-roi-calculator",
    result: "Estimate delivered in under 2 minutes",
    title: "Solar ROI Calculator",
    loom: "https://www.loom.com/embed/4a3c7aafba9d4442af246000afa6a97b",
    tags: ["n8n", "OpenAI", "React Native", "Supabase"],
    cover: "/assets/cs3_solar_roi_cover.png",
    coverAlt: "Solar ROI Calculator",
    problem:
      "Manual ROI estimates slowing down solar sales conversations.",
    summary:
      "Cross-platform app delivering solar ROI estimates with automated lead capture and pipeline management.",
    intro:
      "A cross-platform app that turns a solar sales conversation into a number the customer can see, then captures the lead and moves it into the pipeline without anyone retyping it.",
    body: [
      "Solar sales stall at the estimate. A prospect asks what it would save them, and the answer needs a spreadsheet, a follow-up call, or both — by which point the conversation has cooled.",
      "The app produces the ROI estimate on the spot, then hands the lead straight to the pipeline: captured, recorded, and routed without a manual step in between.",
    ],
    shots: [
      {
        src: "/assets/cs3_solar_roi_cover.png",
        alt: "Solar ROI Calculator",
      },
    ],
    facts: [
      {
        label: "Built with",
        items: ["n8n", "OpenAI", "React Native", "Supabase"],
      },
      { label: "Result", items: ["Estimate delivered in under 2 minutes"] },
    ],
  },
  {
    slug: "reconciliation-pipeline",
    result: "Zero duplicates, zero data loss, automatic recovery after a forced real outage",
    title: "Reconciliation Pipeline & Resilience Engine",
    loom: "https://www.youtube.com/embed/FxTpqahnpJY",
    tags: ["FastAPI", "n8n", "OpenAI", "Python"],
    cover: "/assets/reconciliation-pipeline.png",
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
        src: "/assets/reconciliation-pipeline.png",
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
    cover: "/assets/cs1_portfolio_cover.png",
    coverAlt: "Multi-Branch AI Messenger Chatbot",
    problem:
      "Branches fielding inquiries by hand, with replies taking hours and no consistent coverage.",
    summary:
      "A router agent classifies each incoming conversation and dispatches it to a specialist sub-agent, answering instantly across every branch, 24/7.",
    loom: "https://www.loom.com/embed/893b8d1747d14f79be7aebfcd1a8a3a8",
    intro:
      "An AI chatbot handling customer inquiries and bookings across multiple branches of a motorcycle service business, built as a router with specialist sub-agents rather than one monolithic bot.",
    body: [
      "A multi-branch service business was losing sales to slow replies. Inquiries arrived on Messenger at all hours, staff answered them by hand between other work, and response times stretched into hours. By the time someone replied, the customer had often gone elsewhere.",
      "Rather than one bot trying to do everything, I built a Master Router Agent that classifies each incoming conversation and dispatches it to a specialized sub-agent: parts and compatibility lookup, pricing, order status, or general inquiry. Each sub-agent has a narrower job and its own context boundaries, which makes it far more accurate than a single catch-all prompt.",
      "Context is passed between agents using thread identifiers, so a specialist picking up a conversation gets the relevant history without reprocessing everything. A Supabase vector store handles retrieval for product and compatibility data. The system routes between model tiers based on task complexity, keeping cost proportional to difficulty.",
    ],
    shots: [
      {
        src: "/assets/cs1_portfolio_cover.png",
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
          "Supabase vector store for retrieval",
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
    cover: "/assets/cyclistance-sc-1.png",
    coverAlt: "Cyclistance app",
    problem: "Cyclists stranded with no fast way to call for roadside help.",
    summary:
      "Dynamic state management, low-latency database sync, and peer-to-peer mapping connect a stranded cyclist to the nearest available helper in a few taps.",
    intro:
      "An Android app that connects stranded cyclists with roadside help in a few taps, sending the closest available helper straight to their exact GPS location.",
    body: [
      "A cyclist with a mechanical failure or an injury has no fast way to get help. Calling around wastes time, and describing your position on an unmarked stretch of road is its own problem.",
      "Cyclistance handles both. A rider requests assistance in a few taps and the app matches them with the nearest available helper, passing exact coordinates so there is no explaining involved. Under the hood it runs low-latency database sync loops and a peer-to-peer mapping grid, with live state kept consistent between both riders as the helper moves.",
    ],
    shots: [
      { src: "/assets/cyclistance-sc-1.png", alt: "Cyclistance screenshot 1" },
      { src: "/assets/cyclistance-sc-2.png", alt: "Cyclistance screenshot 2" },
      { src: "/assets/cyclistance-sc-3.png", alt: "Cyclistance screenshot 3" },
      { src: "/assets/cyclistance-sc-4.png", alt: "Cyclistance screenshot 4" },
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
    cover: "/assets/byahero-prev-sc.jpg",
    coverAlt: "Byahero app",
    problem: "Missing your stop because there is no heads-up before it arrives.",
    summary:
      "Real-time geolocation mapping, background processing, and geofencing alert commuters before their stop arrives.",
    intro:
      "An Android app that alerts commuters before their stop arrives, so falling asleep on the bus stops meaning a missed destination.",
    body: [
      "Commuters miss their stop for a simple reason: there is no warning before it arrives. On a long ride, that means staying alert the whole way or risking an overshoot, especially on routes without clear announcements.",
      "Byahero watches the route in the background and alerts the rider as their stop approaches. It runs real-time geolocation mapping with geofencing triggers and background processing, so the alert fires reliably even with the screen off. It also carries lighter navigation and live weather so a rider can check conditions without a second app.",
    ],
    shots: [
      { src: "/assets/byahero-sc-1.jpg", alt: "Byahero screenshot 1" },
      { src: "/assets/byahero-sc-2.jpg", alt: "Byahero screenshot 2" },
      { src: "/assets/byahero-sc-3.jpg", alt: "Byahero screenshot 3" },
      { src: "/assets/byahero-sc-4.jpg", alt: "Byahero screenshot 4" },
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
    note: "Engineered on the same semantic search, text embedding, and vector database routing architecture running in my production engines.",
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
      "n8n",
      "OpenAI",
      "Grok (xAI)",
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
    label: "Mobile & Backend",
    accent: false,
    items: [
      "Kotlin",
      "Android",
      "Jetpack Compose",
      "Firebase",
      "Java",
      "Next.js",
      "TypeScript",
      "SQL",
      "NoSQL",
      "Docker",
      "GIT",
      "Figma",
    ],
  },
];
