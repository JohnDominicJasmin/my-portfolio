import Link from "next/link";
import { email } from "@/data/site";
import { salesFonts } from "../fonts";
import { pageMeta } from "../metadata";
import "../sales.css";
import "../offer.css";

export const metadata = pageMeta({
  title: "Privacy | John Dominic Jasmin",
  description:
    "What this site collects when you use a form, the quiz or the chat, where it goes, and how to have it deleted.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className={`sales ${salesFonts}`}>
      <main id="main" className="l-wrap">
        <article className="l-legal">
          <span className="l-eyebrow">Privacy</span>
          <h1>What happens to what you send.</h1>
          <p>Last updated September 16, 2026.</p>

          <h2>Who I am</h2>
          <p>
            This site belongs to John Dominic Jasmin, an automation engineer based
            in the Philippines. For anything on this page, email{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>

          <h2>What is collected</h2>
          <ul>
            <li>
              What you type into a form: your name, email, phone number, business
              or agency details and message.
            </li>
            <li>Your answers to the audit quiz, including a quiz you leave early.</li>
            <li>The messages you send to the chat assistant.</li>
            <li>Your booking details, if you book a call through the calendar link.</li>
            <li>
              Anonymous visit counts: which page was viewed, the site you came
              from, and your country and device type. This does not identify you.
            </li>
          </ul>

          <h2>Where it goes</h2>
          <ul>
            <li>
              Form submissions are stored by Netlify, which hosts this site, and
              sent to me.
            </li>
            <li>
              Quiz answers and chat messages go to my automation server and to an
              AI model provider, only to write the reply you see on screen.
            </li>
            <li>Calendar bookings are handled by Cal.com.</li>
            <li>
              Visit counts are measured by Cloudflare Web Analytics, which sets no
              cookies.
            </li>
          </ul>

          <h2>What it is used for</h2>
          <p>
            To reply to you, and to see where the site is unclear. It is never
            sold, never shared for anyone else&rsquo;s marketing, and never added
            to a mailing list.
          </p>

          <h2>Cookies</h2>
          <p>
            The site itself sets no advertising or tracking cookies. The embedded
            Loom video and the Cal.com booking page are run by those companies,
            under their own policies.
          </p>

          <h2>Deleting your details</h2>
          <p>
            Email me and I will delete what you sent. I keep inquiries only as
            long as it takes to follow up.
          </p>

          <p style={{ marginTop: 40 }}>
            <Link href="/">Back to the site</Link>
          </p>
        </article>
      </main>
    </div>
  );
}
