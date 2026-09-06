import type { Metadata } from "next";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import ProjectList from "@/components/ProjectList";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  automationProjects,
  capabilities,
  mobileProjects,
  skillGroups,
} from "@/data/projects";
import { cvFonts } from "../fonts";
import { pageMeta } from "../metadata";
import "../portfolio.css";
import "../chat.css";

export const metadata: Metadata = pageMeta({
  title: "CV — John Dominic Jasmin | AI Automation Engineer",
  description:
    "AI automation systems, a live SaaS product, and six years of production engineering. Work, skills and case studies for John Dominic Jasmin.",
  path: "/cv",
});

export default function CvPage() {
  return (
    <div className={`cv-root ${cvFonts}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
      <section className="hero">
        <div className="container">
          <span className="eyebrow">AI Automation Engineer</span>
          <h1 className="hero__title">I build the systems businesses run on.</h1>
          <p className="hero__sub">
            AI chatbots, voice agents and lead-routing pipelines running for
            real businesses, a live SaaS product of my own with paying users,
            and six years of production Android in Kotlin behind all of it.
          </p>
          {/* A recruiter's first three questions were unanswerable anywhere on
              this page: where are they, can I hire them, how long have they
              done this. The PDF had it; the page is what gets scanned. */}
          <ul className="hero__facts">
            <li>Philippines &middot; GMT+8</li>
            <li>6 years in production</li>
            <li>Open to remote, available now</li>
          </ul>
          <div className="hero__ctas">
            <a href="#portfolio" className="btn btn--primary">
              See the work
            </a>
            <a href="/assets/resume.pdf" className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Download resume (PDF)
            </a>
          </div>
          <div className="hero__links">
            <a
              href="https://www.linkedin.com/in/john-dominic-jasmin-56645a1b0"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/JohnDominicJasmin"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:johndominicjasmin@gmail.com">Email</a>
            <Link href="/">Automation services</Link>
          </div>
        </div>
      </section>

      <section id="about" className="section section--band">
        <div className="container">
          <div className="about__grid">
            <div>
              <span className="eyebrow">About</span>
              <h2 className="section__title">Get to know me</h2>
            </div>
            <div className="about__body">
              <p>
                I&apos;m John Dominic, an{" "}
                <strong>AI Automation Engineer</strong>. Most of my work is
                building intelligent automation for businesses: AI chatbots,
                voice agents, lead-routing pipelines, and full workflow
                automation, running in production for real clients.
              </p>
              <p>
                I also build and run <strong>LiquidityHQ</strong>, my own live
                SaaS product with paying users, so I know what it takes to ship
                and operate something real, not just prototype it.
              </p>
              <p>
                Underneath all of it is six years of production software
                engineering, including{" "}
                <strong>Android development in Kotlin</strong>. That background
                is why these systems are built to be reliable and
                well-architected, not just demoed once and abandoned.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <span className="eyebrow">Skills</span>
          <h2 className="section__title">What I work with</h2>
          <p className="section__lede">
            Two toolsets, one goal: ship reliable systems fast.
          </p>
          <div className="skills__groups">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="skills__label">{group.label}</p>
                <div className="skills__list">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`chip${group.accent ? " chip--accent" : ""}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section section--band">
        <div className="container">
          <span className="eyebrow">Track 01</span>
          <h2 className="section__title">AI Automation</h2>
          <p className="section__lede">
            Systems running for real businesses, plus a SaaS product of my own.
            Each one replaced a specific manual process.
          </p>
          <ProjectList projects={automationProjects} />
        </div>
      </section>

      <section id="mobile" className="section">
        <div className="container">
          <span className="eyebrow">Track 02</span>
          <h2 className="section__title">Mobile Projects</h2>
          <p className="section__lede">
            Android apps built end to end, from idea to release, in Kotlin.
          </p>
          <ProjectList projects={mobileProjects} />
        </div>
      </section>

      <section id="capabilities" className="section section--band">
        <div className="container">
          <span className="eyebrow">Capabilities</span>
          <h2 className="section__title">Patterns I have already built</h2>
          {/* Was "Ready-to-deploy frameworks / Engineered by experience, not
              theory" — a recruiter reads a menu of things you would like to
              sell, not things you have done, and slogans get discounted. Each
              group below already cites the architecture it came out of. */}
          <p className="section__lede">
            Each group below came out of a system that shipped and is running.
            The note under each one is the architecture it was built on.
          </p>
          <div className="caps">
            {capabilities.map((cap) => (
              <div key={cap.num} className="cap">
                <span className="cap__num">{cap.num}</span>
                <h3 className="cap__title">{cap.title}</h3>
                <ul className="cap__items">
                  {cap.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="cap__note">{cap.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="contact__grid">
            <div>
              <span className="eyebrow">Get in touch</span>
              <h2 className="section__title">Let&apos;s build something.</h2>
              <p className="section__lede" style={{ marginBottom: 0 }}>
                Hiring for AI automation, or want any of the systems above
                walked through? Tell me what you&apos;re building.
              </p>
              <div className="contact__links">
                <a href="mailto:johndominicjasmin@gmail.com">
                  johndominicjasmin@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/john-dominic-jasmin-56645a1b0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/JohnDominicJasmin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Had no honeypot and no action, so it fell through to Netlify's
                own success page. Now matches the sales form: spam trap, and it
                lands on /thanks. */}
            <form
              name="contact"
              method="POST"
              action="/thanks"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="form"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="form__pot" aria-hidden="true">
                <label>
                  Leave this empty
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} required />
              </div>
              <button type="submit" className="btn btn--primary">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />

      <ChatWidget variant="cv" />
    </div>
  );
}
