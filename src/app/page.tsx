import type { Metadata } from "next";
import CvPage from "./cv/page";
import { pageMeta } from "./metadata";

// The root shows the CV: most visitors right now are recruiters. The business
// and partner pages stay live at /business, /hvac, /restoration and /partners,
// shared by direct link only. Canonical points at /cv so the two URLs don't
// compete as duplicates.
export const metadata: Metadata = pageMeta({
  title: "John Dominic Jasmin | AI Automation Engineer",
  description:
    "AI automation systems, a live SaaS product, and 6 years of production engineering. Work, skills and case studies for John Dominic Jasmin.",
  path: "/cv",
});

export default CvPage;
