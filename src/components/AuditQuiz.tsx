"use client";

import { useRef, useState } from "react";
import { auditWebhookUrl, booking, email } from "@/data/site";

/**
 * The audit quiz: a branching questionnaire that ends in a written
 * recommendation from the same stack this page is selling.
 *
 * Built as a graph rather than a list. Each step names the next one, and an
 * option can override that, so answering "they ring" asks about the phone and
 * answering "Messenger only" never does. Nobody is walked through questions
 * that cannot apply to them.
 *
 * Two delivery paths, deliberately separate. The recommendation comes back
 * from n8n and is only ever read on screen. The lead itself goes to Netlify
 * Forms, so if n8n is asleep or OpenAI fails, the enquiry still reaches the
 * inbox. Every answer and the generated text ride along as hidden fields.
 *
 * The form is always rendered, hidden until the result is on screen. Netlify
 * parses forms out of the deployed HTML at build time, so a form that only
 * mounts after an interaction is never registered and every submission 404s.
 * For the same reason every possible field is rendered every time, empty when
 * that branch was not taken.
 */

type Opt = {
  label: string;
  /** Jump somewhere other than the step's own `next`. */
  next?: string;
  /** Reveals a text box so they are never forced into a wrong answer. */
  other?: boolean;
};

type Field =
  | { kind: "single"; options: Opt[] }
  | { kind: "multi"; options: Opt[] }
  | { kind: "select"; options: Opt[]; placeholder: string }
  | { kind: "text" };

type Node = {
  id: string;
  /** Short label for the trail of answers above the current question. */
  short: string;
  q: string;
  hint?: string;
  field: Field;
  next?: string | ((picked: string[]) => string);
};

const NODES: Node[] = [
  {
    id: "business",
    short: "Business",
    q: "First, what do you do?",
    field: {
      kind: "single",
      options: [
        { label: "Shop or service centre" },
        { label: "Salon, clinic or spa" },
        { label: "Property or lettings" },
        { label: "Trades and home services" },
        { label: "Restaurant, cafe or food" },
        { label: "Something else", other: true },
      ],
    },
    next: "channels",
  },
  {
    id: "channels",
    short: "They reach you by",
    q: "How do customers reach you?",
    hint: "Pick everything that applies.",
    field: {
      kind: "multi",
      options: [
        { label: "They ring" },
        { label: "Messenger or Instagram" },
        { label: "WhatsApp or SMS" },
        { label: "A form on the website" },
        { label: "Email" },
        { label: "They walk in" },
        { label: "Somewhere else", other: true },
      ],
    },
    next: (picked) => (picked.includes("They ring") ? "phone" : "volume"),
  },
  {
    id: "phone",
    short: "When the phone rings",
    q: "What happens when nobody can answer the phone?",
    field: {
      kind: "single",
      options: [
        { label: "It goes to voicemail" },
        { label: "It just rings out" },
        { label: "Someone stops what they are doing" },
        { label: "An answering service takes it" },
        { label: "Something else", other: true },
      ],
    },
    next: "volume",
  },
  {
    id: "volume",
    short: "Enquiries a week",
    q: "Roughly how many enquiries come in a week?",
    hint: "A guess is fine. It changes what is worth building.",
    field: {
      kind: "select",
      placeholder: "Choose a range",
      options: [
        { label: "Under 20 a week" },
        { label: "20 to 50 a week" },
        { label: "50 to 200 a week" },
        { label: "More than 200 a week" },
        { label: "No idea, we have never counted" },
      ],
    },
    next: "when",
  },
  {
    id: "when",
    short: "Worst times",
    q: "When do you miss the most enquiries?",
    hint: "Pick everything that applies.",
    field: {
      kind: "multi",
      options: [
        { label: "After hours" },
        { label: "Weekends" },
        { label: "While we are with a customer" },
        { label: "Public holidays" },
        { label: "Honestly, all the time" },
      ],
    },
    next: "job",
  },
  {
    id: "job",
    short: "Hand over first",
    q: "Which of these would you hand over tomorrow?",
    hint: "Pick everything that applies.",
    field: {
      kind: "multi",
      options: [
        { label: "Answering the same questions" },
        { label: "Booking and rescheduling" },
        { label: "Chasing people for a reply" },
        { label: "Sending quotes" },
        { label: "Going back to old customers" },
        { label: "Copying details between apps" },
        { label: "Something else", other: true },
      ],
    },
    next: "tools",
  },
  {
    id: "tools",
    short: "Running on",
    q: "What do you use to keep track of it all?",
    hint: "Pick everything that applies. Pen and paper is a real answer.",
    field: {
      kind: "multi",
      options: [
        { label: "Google Calendar" },
        { label: "Facebook or Messenger" },
        { label: "WhatsApp Business" },
        { label: "A CRM" },
        { label: "Spreadsheets" },
        { label: "Pen and paper" },
        { label: "Something else", other: true },
      ],
    },
    next: "problem",
  },
  {
    id: "problem",
    short: "In your words",
    q: "Anything else about where it goes wrong?",
    hint: "Optional. The answers above are already enough.",
    field: { kind: "text" },
  },
];

const BY_ID: Record<string, Node> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

/** One answer: the chosen labels, plus whatever they typed under "other". */
type Answer = { picked: string[]; other: string };

const EMPTY: Answer = { picked: [], other: "" };

function display(a: Answer | undefined): string {
  if (!a) return "";
  const bits = a.picked.filter((p) => p !== "Something else" && p !== "Somewhere else");
  if (a.other.trim()) bits.push(a.other.trim());
  return bits.join(", ");
}

export default function AuditQuiz() {
  const [nodeId, setNodeId] = useState("business");
  const [trail, setTrail] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  const sessionRef = useRef<string>("");
  const resultRef = useRef<HTMLDivElement>(null);

  function sessionId() {
    if (!sessionRef.current) {
      sessionRef.current =
        globalThis.crypto?.randomUUID?.() ??
        `a-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    return sessionRef.current;
  }

  const node = BY_ID[nodeId];
  const answer = answers[nodeId] ?? EMPTY;
  const done = Boolean(result);

  const wantsOther = node.field.kind !== "text" &&
    node.field.options.some((o) => o.other && answer.picked.includes(o.label));

  function setAnswer(next: Answer) {
    setAnswers((a) => ({ ...a, [nodeId]: next }));
  }

  function advance(from: Node, picked: string[]) {
    const opt =
      from.field.kind === "single"
        ? from.field.options.find((o) => o.label === picked[0])
        : undefined;
    const target =
      opt?.next ??
      (typeof from.next === "function" ? from.next(picked) : from.next);
    if (!target) return;
    setTrail((t) => [...t, from.id]);
    setNodeId(target);
  }

  function back() {
    setTrail((t) => {
      if (t.length === 0) return t;
      setNodeId(t[t.length - 1]);
      return t.slice(0, -1);
    });
  }

  function choose(label: string) {
    const opt =
      node.field.kind !== "text"
        ? node.field.options.find((o) => o.label === label)
        : undefined;
    const next = { picked: [label], other: opt?.other ? answer.other : "" };
    setAnswer(next);
    // An "other" pick needs the text box before it can move on.
    if (!opt?.other) advance(node, [label]);
  }

  function toggle(label: string) {
    const has = answer.picked.includes(label);
    const picked = has
      ? answer.picked.filter((p) => p !== label)
      : [...answer.picked, label];
    setAnswer({ picked, other: has ? "" : answer.other });
  }

  const canContinue =
    node.field.kind === "text" ||
    (answer.picked.length > 0 && (!wantsOther || answer.other.trim().length > 0));

  async function submit() {
    if (busy) return;
    setBusy(true);

    // Every answered step, in the order they were asked. The workflow formats
    // this, so adding a question here never needs a change over there.
    const answered = [...trail, nodeId]
      .map((id) => ({ q: BY_ID[id]?.q ?? id, a: display(answers[id]) }))
      .filter((row) => row.a);

    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 45_000);

    let text =
      "I could not reach the assistant just now, but your answers are still going straight to John. Leave your details below and he will come back to you himself.";

    try {
      if (auditWebhookUrl) {
        const res = await fetch(auditWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abort.signal,
          body: JSON.stringify({
            sessionId: sessionId(),
            answers: answered,
            problem: display(answers.problem),
          }),
        });
        const data = res.ok ? await res.json().catch(() => ({})) : {};
        const reply = data.output ?? data.text ?? data.message ?? null;
        if (reply) text = String(reply);
      }
    } catch {
      // Silent on purpose: the fallback already says the useful thing, and the
      // lead path does not depend on this call.
    } finally {
      clearTimeout(timer);
      setResult(text);
      setBusy(false);
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
      );
    }
  }

  function restart() {
    setAnswers({});
    setTrail([]);
    setResult("");
    setNodeId("business");
  }

  return (
    <div className="l-quiz" id="audit">
      <div className="l-quiz__head">
        <span className="l-eyebrow">Two minutes, no call needed</span>
        <h2 className="l-h2">Tell me where they are slipping away.</h2>
        <p className="l-quiz__lede">
          A few questions, and the next one depends on your last answer. You get
          back the one thing I would build first for a business like yours, and
          why.
        </p>
      </div>

      <div className="l-quiz__panel">
        {!done ? (
          <>
            {trail.length > 0 ? (
              <ol className="l-quiz__trail">
                {trail.map((id) => (
                  <li key={id}>
                    <span>{BY_ID[id]?.short}</span>
                    <b>{display(answers[id]) || "skipped"}</b>
                  </li>
                ))}
              </ol>
            ) : null}

            <fieldset className="l-quiz__set">
              <legend className="l-quiz__q">{node.q}</legend>
              {node.hint ? <p className="l-quiz__hint">{node.hint}</p> : null}

              {node.field.kind === "single" ? (
                <div className="l-quiz__opts">
                  {node.field.options.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      className={`l-quiz__opt${answer.picked.includes(o.label) ? " is-on" : ""}`}
                      onClick={() => choose(o.label)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              ) : null}

              {node.field.kind === "multi" ? (
                <div className="l-quiz__chips">
                  {node.field.options.map((o) => {
                    const on = answer.picked.includes(o.label);
                    return (
                      <button
                        key={o.label}
                        type="button"
                        className={`l-quiz__chip${on ? " is-on" : ""}`}
                        aria-pressed={on}
                        onClick={() => toggle(o.label)}
                      >
                        <span className="l-quiz__tick" aria-hidden="true">
                          {on ? "✓" : ""}
                        </span>
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {node.field.kind === "select" ? (
                <>
                  <label className="l-quiz__sr" htmlFor={`sel-${node.id}`}>
                    {node.q}
                  </label>
                  <select
                    id={`sel-${node.id}`}
                    className="l-quiz__select"
                    value={answer.picked[0] ?? ""}
                    onChange={(e) => setAnswer({ picked: e.target.value ? [e.target.value] : [], other: "" })}
                  >
                    <option value="">{node.field.placeholder}</option>
                    {node.field.options.map((o) => (
                      <option key={o.label} value={o.label}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </>
              ) : null}

              {node.field.kind === "text" ? (
                <>
                  <label className="l-quiz__sr" htmlFor="q-problem">
                    Describe the problem in your own words
                  </label>
                  <textarea
                    id="q-problem"
                    className="l-quiz__text"
                    rows={4}
                    value={answer.other}
                    onChange={(e) => setAnswer({ picked: [], other: e.target.value })}
                    placeholder="In your own words. One or two lines is plenty."
                    maxLength={800}
                  />
                </>
              ) : null}

              {wantsOther ? (
                <>
                  <label className="l-quiz__sr" htmlFor={`other-${node.id}`}>
                    Tell me in your own words
                  </label>
                  <input
                    id={`other-${node.id}`}
                    className="l-quiz__other"
                    type="text"
                    value={answer.other}
                    maxLength={160}
                    placeholder="Type it here instead"
                    onChange={(e) => setAnswer({ picked: answer.picked, other: e.target.value })}
                  />
                </>
              ) : null}

              <div className="l-quiz__actions">
                {node.field.kind === "text" ? (
                  <button
                    type="button"
                    className="l-btn l-btn--solid"
                    onClick={submit}
                    disabled={busy}
                  >
                    {busy ? "Reading your answers…" : "Show me what to fix first"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="l-btn l-btn--solid"
                    onClick={() => advance(node, answer.picked)}
                    disabled={!canContinue}
                  >
                    Continue
                  </button>
                )}
                {trail.length > 0 ? (
                  <button type="button" className="l-quiz__back" onClick={back}>
                    Back
                  </button>
                ) : null}
              </div>
            </fieldset>
          </>
        ) : (
          <div className="l-quiz__result" ref={resultRef} aria-live="polite">
            <span className="l-quiz__stamp">What I would build first</span>
            {result
              .split("\n")
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            <button type="button" className="l-quiz__back" onClick={restart}>
              Answer again
            </button>
          </div>
        )}
      </div>

      {/* Always in the HTML so Netlify registers it at deploy time, and every
          field every time so a branch nobody took still has its column. */}
      <div className="l-quiz__capture" hidden={!done}>
        <p className="l-quiz__lede">
          Want the specifics? Leave your details and I will come back with what
          this would actually take for your setup.
        </p>

        <form
          name="audit-quiz"
          method="POST"
          action="/thanks"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="l-form__grid"
        >
          <input type="hidden" name="form-name" value="audit-quiz" />
          <p className="l-form__pot" aria-hidden="true">
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          {NODES.map((n) => (
            <input
              key={n.id}
              type="hidden"
              name={n.short}
              value={display(answers[n.id])}
            />
          ))}
          <input
            type="hidden"
            name="what the assistant told them"
            value={result}
          />

          <div className="l-field">
            <label htmlFor="q-name">Name</label>
            <input id="q-name" name="name" type="text" required autoComplete="name" />
          </div>

          <div className="l-field">
            <label htmlFor="q-email">Email</label>
            <input id="q-email" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="l-field l-field--wide">
            <div className="l-field__head">
              <label htmlFor="q-phone">Phone or WhatsApp</label>
              <span className="l-field__opt">optional</span>
            </div>
            <input id="q-phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="l-field--wide">
            <button type="submit" className="l-btn l-btn--solid l-form__send">
              Send it over
            </button>
            <p className="l-form__note">
              Goes straight to me with your answers attached. Or{" "}
              <a
                href={booking.href}
                {...(booking.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                book the call
              </a>{" "}
              and skip the typing. Prefer email?{" "}
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
