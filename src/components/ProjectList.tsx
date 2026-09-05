"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [loom, setLoom] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!loom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLoom(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Move focus into the dialog, and hand it back to whatever opened it.
    openerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openerRef.current?.focus();
    };
  }, [loom]);

  return (
    <>
      <div className="projects">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className={`project${i === 0 ? " project--featured" : ""}`}
          >
            <div className="project__media">
              <img src={project.cover} alt={project.coverAlt} loading="lazy" />
            </div>
            <div className="project__body">
              <div className="project__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project__tag">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="project__title">{project.title}</h3>
              <div>
                <span className="project__problem-label">Problem</span>
                <p className="project__problem">{project.problem}</p>
              </div>
              <p className="project__desc">{project.summary}</p>
              {project.result ? (
                <div>
                  <span className="project__problem-label">Result</span>
                  <div className="project__result">{project.result}</div>
                </div>
              ) : null}
              <div className="project__actions">
                <Link href={`/work/${project.slug}`} className="btn btn--link">
                  More details →
                </Link>
                {project.loom ? (
                  <button
                    type="button"
                    className="btn btn--link"
                    onClick={() => setLoom(project.loom ?? null)}
                  >
                    Watch demo →
                  </button>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--link"
                  >
                    Visit live site →
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className={`modal${loom ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Demo video"
      >
        <div className="modal__backdrop" onClick={() => setLoom(null)} />
        <div className="modal__panel">
          <button
            type="button"
            ref={closeRef}
            className="modal__close"
            aria-label="Close video"
            onClick={() => setLoom(null)}
          >
            ✕
          </button>
          <div className="modal__video">
            {loom ? (
              <iframe
                src={loom}
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
