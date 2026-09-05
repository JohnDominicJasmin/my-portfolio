"use client";

import { useEffect, useState } from "react";

/**
 * Client island: the four numbers that count up on load.
 *
 * Kept separate so the ~26 state updates during the animation repaint this row
 * alone, instead of the whole page including the flow diagram and every card.
 * Renders at its final values, so the no-JS and pre-hydration view is correct.
 */

const TARGETS = { seconds: 5, route: 2, hours: 24, years: 6 };

export default function Counters() {
  const [counts, setCounts] = useState(TARGETS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // No synchronous setState here — the first tick lands on the same low
    // values 42ms later, and seeding it in the effect body triggers a
    // cascading render (react-hooks/set-state-in-effect).
    const steps = 26;
    let i = 0;

    const timer = setInterval(() => {
      i += 1;
      const p = i / steps;
      if (p >= 1) {
        clearInterval(timer);
        setCounts(TARGETS);
        return;
      }
      const eased = 1 - Math.pow(1 - p, 3);
      setCounts({
        seconds: Math.max(1, Math.round(TARGETS.seconds * eased)),
        route: Math.max(1, Math.round(TARGETS.route * eased)),
        hours: Math.max(1, Math.round(TARGETS.hours * eased)),
        years: Math.max(1, Math.round(TARGETS.years * eased)),
      });
    }, 42);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="l-counters" aria-label="At a glance">
      <div className="l-counter">
        <div className="l-counter__value">&lt;{counts.seconds}s</div>
        <div className="l-counter__label">To answer a call</div>
      </div>
      <div className="l-counter">
        <div className="l-counter__value">&lt;{counts.route}s</div>
        <div className="l-counter__label">To score and route a lead</div>
      </div>
      <div className="l-counter">
        <div className="l-counter__value">{counts.hours}/7</div>
        <div className="l-counter__label">Coverage, no shifts</div>
      </div>
      <div className="l-counter">
        <div className="l-counter__value">{counts.years} yrs</div>
        <div className="l-counter__label">Engineering behind it</div>
      </div>
    </section>
  );
}
