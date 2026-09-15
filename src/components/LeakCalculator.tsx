"use client";

import { useId, useState } from "react";
import { booking, email } from "@/data/site";
import { money, offer } from "@/data/offer";

/**
 * Client island: the Missed-Call Leak Check.
 *
 * The owner puts in their own numbers and sees what unanswered calls cost
 * them. Nothing here is an industry average: the defaults are a starting
 * point to change, and the page says so. Borrowing a competitor's "$X per
 * missed call" figure would be a claim this business never measured.
 *
 * Renders at the default values, so the no-JS and pre-hydration view is a
 * finished calculation rather than an empty box.
 */

const WEEKS_PER_MONTH = 52 / 12;

type Defaults = { calls: number; job: number; rate: number };

function toNumber(value: string, max: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}

export default function LeakCalculator({
  defaults = { calls: 5, job: 400, rate: 30 },
  jobLabel = "Average job value (USD)",
}: {
  defaults?: Defaults;
  jobLabel?: string;
}) {
  const id = useId();
  const [calls, setCalls] = useState(defaults.calls);
  const [job, setJob] = useState(defaults.job);
  const [rate, setRate] = useState(defaults.rate);

  const missedMonth = Math.round(calls * WEEKS_PER_MONTH);
  const lostJobs = (calls * WEEKS_PER_MONTH * rate) / 100;
  const lostMonth = lostJobs * job;
  const lostYear = lostMonth * 12;

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    offer.checkName,
  )}&body=${encodeURIComponent(
    `My numbers: about ${calls} missed calls a week, ${money.format(job)} a job, ${rate}% of them would have booked.\n\n`,
  )}`;

  return (
    <div className="l-leak" id="leak-check">
      <div className="l-center" style={{ marginBottom: 34 }}>
        <span className="l-eyebrow">{offer.checkName}</span>
        <h2 className="l-h2">What unanswered calls are costing you.</h2>
        <p className="l-lede">
          Put in your own numbers. No industry averages, just yours.
        </p>
      </div>

      <div className="l-leak__panel">
        <div className="l-leak__inputs">
          <div className="l-field">
            <label htmlFor={`${id}-calls`}>Calls you miss in a week</label>
            <input
              id={`${id}-calls`}
              type="number"
              inputMode="numeric"
              min={0}
              max={500}
              value={calls}
              onChange={(e) => setCalls(toNumber(e.target.value, 500))}
            />
          </div>

          <div className="l-field">
            <label htmlFor={`${id}-job`}>{jobLabel}</label>
            <input
              id={`${id}-job`}
              type="number"
              inputMode="numeric"
              min={0}
              max={1000000}
              step={50}
              value={job}
              onChange={(e) => setJob(toNumber(e.target.value, 1000000))}
            />
          </div>

          <div className="l-field">
            <label htmlFor={`${id}-rate`}>
              Of those calls, how many would have booked: {rate}%
            </label>
            <input
              id={`${id}-rate`}
              className="l-leak__range"
              type="range"
              min={0}
              max={100}
              step={5}
              value={rate}
              onChange={(e) => setRate(toNumber(e.target.value, 100))}
            />
          </div>
        </div>

        <div className="l-leak__out" aria-live="polite">
          <div className="l-leak__big">{money.format(lostMonth)}</div>
          <div className="l-leak__small">walking out the door every month</div>
          <p className="l-leak__line">
            About {missedMonth} missed calls a month, and{" "}
            {Math.round(lostJobs * 10) / 10} of them jobs you never hear about.
            That is {money.format(lostYear)} a year.
          </p>
          <div className="l-leak__cta">
            <a
              className="l-btn l-btn--solid"
              href={booking.href}
              {...(booking.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Book the free {offer.checkName}
            </a>
            <a className="l-btn l-btn--ghost" href={mailto}>
              Email me these numbers
            </a>
          </div>
        </div>
      </div>

      <p className="l-leak__note">
        The defaults are only a starting point. Change them to your own numbers.
        On the call we check them against your real phone records.
      </p>
    </div>
  );
}
