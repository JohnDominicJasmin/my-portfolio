import NichePage, { type NicheContent } from "@/components/NichePage";
import { salesFonts } from "../fonts";
import { pageMeta } from "../metadata";
import "../sales.css";
import "../chat.css";
import "../offer.css";

export const metadata = pageMeta({
  title: "AI Front Desk for HVAC Companies | John Dominic Jasmin",
  description:
    "No heat at 2am and your phone goes to voicemail. The AI answers the calls you miss, flags the emergencies, and books the job into your calendar.",
  path: "/hvac",
});

const content: NicheContent = {
  slug: "hvac",
  flag: "Built for HVAC companies",
  title: (
    <>
      No heat at 2am. <em>They call until someone answers.</em>
    </>
  ),
  sub: "The AI answers the calls you miss, sorts the emergencies from the tune-ups, and books the job into your calendar. Your techs sleep. The phone does not go to voicemail.",
  notFor: "Built for heating and cooling calls. Not a generic answering script.",
  handlesTitle: "It knows the calls you get.",
  handles: [
    {
      label: "No heat, no cooling",
      title: "Flagged urgent, sent to your on-call tech",
      body: "It asks what your dispatcher would ask, then alerts whoever is on call with the address and the problem.",
      alert: true,
    },
    {
      label: "Gas smell or CO",
      title: "Told to get out and call 911",
      body: "A safety call never gets booked into next week. The caller is told what to do, and you are alerted straight away.",
      alert: true,
    },
    {
      label: "Tune-ups and quotes",
      title: "Booked into the right slot",
      body: "Routine work goes straight into your calendar, with a reminder sent before the visit.",
    },
    {
      label: "Maintenance plans",
      title: "Offered when it fits the call",
      body: "If you run a maintenance plan, it can mention it to the right callers, the way your best rep would.",
    },
    {
      label: "Heat-wave weeks",
      title: "Every caller gets an answer",
      body: "When the calls stack up, each one is answered at the same time. Nobody hears a busy tone.",
    },
    {
      label: "Everyday questions",
      title: "Answered, not just logged",
      body: "Hours, service areas, what happens on a visit: it answers from what you tell it, and hands anything else to your team.",
    },
  ],
  around: [
    {
      label: "Backup mode",
      title: "Your phone rings first",
      body: "The AI only answers the calls you miss or cannot take. You keep your number. It is a call-forwarding setting, not a new line.",
    },
    {
      label: "On call",
      title: "Your tech gets the details, not a voicemail",
      body: "Name, address and what is wrong arrive as an alert on the on-call phone, so the callback starts with answers.",
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
  calc: { calls: 5, job: 400, rate: 30, jobLabel: "Average ticket per job (USD)" },
  faqs: [
    {
      q: "What happens on a gas leak call?",
      a: "The caller is told to leave the building and call 911, and you get an alert straight away. It never books a safety call as a normal appointment.",
    },
    {
      q: "Does it work with ServiceTitan or Housecall Pro?",
      a: "Today it books into Google Calendar or GoHighLevel. If you run ServiceTitan, Housecall Pro or Jobber, tell me on the call and we will look at connecting it for your setup.",
    },
  ],
  ctaTitle: "How many calls went to voicemail last week?",
};

export default function HvacPage() {
  return (
    <div className={salesFonts}>
      <NichePage content={content} />
    </div>
  );
}
