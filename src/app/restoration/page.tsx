import NichePage, { type NicheContent } from "@/components/NichePage";
import { salesFonts } from "../fonts";
import { pageMeta } from "../metadata";
import "../sales.css";
import "../chat.css";
import "../offer.css";

export const metadata = pageMeta({
  title: "AI Front Desk for Restoration Companies | John Dominic Jasmin",
  description:
    "Water through the ceiling at 3am. The AI answers the calls you miss, takes the details your estimator needs, and sends emergencies to your on-call crew.",
  path: "/restoration",
});

const content: NicheContent = {
  slug: "restoration",
  flag: "Built for water damage and restoration",
  title: (
    <>
      Water through the ceiling at 3am.{" "}
      <em>The first company to answer gets the job.</em>
    </>
  ),
  sub: "The AI answers the calls you miss, takes down what your estimator needs, and sends the emergencies to your on-call crew straight away.",
  notFor:
    "Built for restoration companies. Not dentists, not lawyers, not a generic call center script.",
  handlesTitle: "It knows what a restoration call sounds like.",
  handles: [
    {
      label: "Active water",
      title: "Burst pipe, flooding, water still coming in",
      body: "Flagged as an emergency. Your on-call crew gets an alert with the address and what is happening, straight away.",
      alert: true,
    },
    {
      label: "Sewage and mold",
      title: "Triaged, not just logged",
      body: "It asks what your dispatcher would ask, so the worst jobs are at the top when you pick up your phone.",
    },
    {
      label: "Insurance claims",
      title: "Details taken on the first call",
      body: "Carrier, claim number and cause of loss are written down, so your estimator is not stuck playing phone tag.",
    },
    {
      label: "Coverage questions",
      title: "Never promised, always passed on",
      body: "It never tells a caller what their policy covers. Those questions go to your team.",
    },
    {
      label: "Storm weeks",
      title: "Every caller gets an answer",
      body: "When the calls stack up, each one is answered. Nobody hears a busy tone or a full voicemail box.",
    },
    {
      label: "Inspections",
      title: "Booked into your calendar",
      body: "Visits that are not emergencies go straight into the calendar, with a reminder sent before you arrive.",
    },
  ],
  intake: {
    eyebrow: "What it asks",
    title: "The questions your estimator would ask.",
    items: [
      "Name, phone number and property address",
      "What happened: burst pipe, appliance, storm or sewage",
      "Whether water is still coming in right now",
      "How long the water has been there",
      "Which rooms or floors are affected",
      "Insurance carrier and claim number, if they have one",
    ],
    note: "It never tells a caller what their policy covers. Coverage questions always go to your team.",
  },
  around: [
    {
      label: "Backup mode",
      title: "Your phone rings first",
      body: "The AI only answers the calls you miss or cannot take. You keep your number. It is a call-forwarding setting, not a new line.",
    },
    {
      label: "On call",
      title: "Your crew gets the details, not a voicemail",
      body: "Name, address and what is happening arrive as an alert on the on-call phone, so the callback starts with answers.",
      alert: true,
    },
    {
      label: "Knows its limits",
      title: "It escalates instead of guessing",
      body: "Anything outside what it knows goes to your team with the whole conversation attached.",
    },
    {
      label: "Your team",
      title: "Anyone can take over",
      body: "Your office can step into any conversation at any time, and the AI steps back.",
    },
  ],
  calc: { calls: 3, job: 2500, rate: 40, jobLabel: "Average job value (USD)" },
  faqs: [
    {
      q: "Do you handle insurance questions?",
      a: "It takes down the carrier and claim number so your estimator has them. It never says what a policy covers. Those questions always go to your team.",
    },
    {
      q: "What happens when water is still coming in?",
      a: "The call is flagged as an emergency and your on-call crew gets an alert with the address and the details straight away, instead of a voicemail in the morning.",
    },
    {
      q: "Does it work with my job management software?",
      a: "Today it books into Google Calendar or GoHighLevel. If you run Jobber, Housecall Pro or another system, tell me on the call and we will look at connecting it for your setup.",
    },
  ],
  ctaTitle: "How many emergency calls went to voicemail last month?",
};

export default function RestorationPage() {
  return (
    <div className={salesFonts}>
      <NichePage content={content} />
    </div>
  );
}
