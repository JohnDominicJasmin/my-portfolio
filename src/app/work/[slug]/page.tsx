import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shots from "@/components/Shots";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { allProjects } from "@/data/projects";
import { cvFonts } from "../../fonts";
import "../../portfolio.css";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | John Dominic Jasmin`,
    description: project.summary,
  };
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className={`cv-root ${cvFonts}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
      <section className="detail-hero">
        <div className="container">
          <span className="eyebrow">Case study</span>
          <h1 className="detail-hero__title">{project.title}</h1>
          <p className="detail-hero__intro">{project.intro}</p>
          <div className="hero__ctas" style={{ justifyContent: "flex-start" }}>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Visit live site →
              </a>
            ) : null}
            <Link href="/cv#portfolio" className="btn btn--ghost">
              Back to work
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Shots shots={project.shots} portrait={project.portraitShots} />

          {project.demos ? (
            <div className="systems">
              <span className="eyebrow">Demos</span>
              <h2 className="section__title">Each system, running</h2>
              <div className="systems__list">
                {project.demos.map((demo) => (
                  <article className="system" key={demo.title}>
                    <div>
                      <h3 className="system__title">{demo.title}</h3>
                      <p className="system__desc">{demo.desc}</p>
                    </div>
                    <div className="system__side">
                      {demo.result ? (
                        <span className="system__result">{demo.result}</span>
                      ) : null}
                      <a
                        className="btn btn--link"
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch demo &rarr;
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="detail__body">
            <div className="detail__prose">
              <span className="eyebrow">The problem</span>
              <p style={{ fontWeight: 500, color: "var(--ink)" }}>
                {project.problem}
              </p>
              {project.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="detail__aside">
              {(project.facts ?? []).map((fact) => (
                <div key={fact.label}>
                  <h3>{fact.label}</h3>
                  <div className="skills__list">
                    {fact.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </div>
  );
}
