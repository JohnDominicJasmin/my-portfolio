import type { Metadata } from "next";
import Link from "next/link";
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
import "../portfolio.css";

export const metadata: Metadata = {
  title: "CV — John Dominic Jasmin | AI Automation Engineer",
  description:
    "Work history, skills, and projects for John Dominic Jasmin: AI automation systems, a live SaaS product, and six years of production Android engineering in Kotlin.",
};

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
            AI chatbots, voice agents, and lead-routing pipelines that work while
            you sleep, plus a live SaaS product of my own and production Android
            apps built in Kotlin that don&apos;t break.
          </p>
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
                automation. The result is less manual work and faster scaling.
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
            Each one built to kill a specific bottleneck.
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
          <h2 className="section__title">Ready-to-deploy frameworks</h2>
          <p className="section__lede">
            Engineered by experience, not theory. Every capability below maps
            directly to a system I have built and shipped.
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
                Automating a workflow, or need a senior Android developer on your
                team? Tell me what you&apos;re working on.
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

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              className="form"
            >
              <input type="hidden" name="form-name" value="contact" />
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
    </div>
  );
}
