"use client";

import { useState } from "react";

/**
 * Client island: the WITHOUT / WITH replay of the same 9:40pm enquiry.
 * Everything around it on the sales page is static and stays on the server.
 */

const panels = {
  before: {
    label: "TUESDAY, 9:40PM",
    headline: "The slow version",
    outcome: "They booked whoever answered first. You never knew they called.",
    outcomeTone: "var(--l-rust)",
    steps: [
      {
        time: "21:40",
        tone: "var(--l-cream-muted)",
        text: "Customer calls after hours. It rings out and goes to voicemail.",
      },
      {
        time: "21:41",
        tone: "var(--l-cream-muted)",
        text: "They do not leave a message. Most people never do.",
      },
      {
        time: "21:43",
        tone: "var(--l-cream-muted)",
        text: "They search again and call the next business on the list.",
      },
      {
        time: "09:15",
        tone: "var(--l-cream-muted)",
        text: "Next morning your team starts the day with no idea it happened.",
      },
    ],
  },
  after: {
    label: "TUESDAY, 9:40PM",
    headline: "The same night, automated",
    outcome: "Booked before your competitor even knew there was a lead.",
    outcomeTone: "var(--l-mint)",
    steps: [
      {
        time: "21:40",
        tone: "var(--l-amber)",
        text: "Call answered in under five seconds. Nobody on your team is awake.",
      },
      {
        time: "21:41",
        tone: "var(--l-amber)",
        text: "It asks what they need, how urgent it is, and where they are.",
      },
      {
        time: "21:42",
        tone: "var(--l-amber)",
        text: "Job booked into the calendar, confirmation sent to the customer.",
      },
      {
        time: "09:00",
        tone: "var(--l-mint)",
        text: "Your team opens the day to a booked job and a full summary.",
      },
    ],
  },
} as const;

export default function BeforeAfterPanel() {
  // Opens on the WITHOUT panel deliberately: the click is what delivers the
  // contrast, so spending it on the good outcome wastes the argument.
  const [mode, setMode] = useState<"before" | "after">("before");
  const panel = panels[mode];

  return (
    <>
      <div className="l-toggle">
        <button
          type="button"
          aria-pressed={mode === "before"}
          onClick={() => setMode("before")}
        >
          WITHOUT THE SYSTEM
        </button>
        <button
          type="button"
          aria-pressed={mode === "after"}
          onClick={() => setMode("after")}
        >
          WITH IT
        </button>
      </div>

      <div className={`l-panel l-panel--${mode}`} aria-live="polite">
        <div className="l-panel__grid">
          <div>
            <div className="l-panel__label">{panel.label}</div>
            <div className="l-panel__headline">{panel.headline}</div>
          </div>
          <div>
            {panel.steps.map((step) => (
              <div className="l-step" key={step.time + step.text}>
                <span className="l-step__time" style={{ color: step.tone }}>
                  {step.time}
                </span>
                <span className="l-step__text">{step.text}</span>
              </div>
            ))}
            <p className="l-panel__outcome" style={{ color: panel.outcomeTone }}>
              {panel.outcome}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
