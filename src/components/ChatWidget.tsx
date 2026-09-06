"use client";

import { useEffect, useRef, useState } from "react";
import { booking, chatWebhookUrl, email } from "@/data/site";

/**
 * The chat launcher and panel. One component for both routes: it takes its
 * colours from CSS custom properties the page sets, so the sales page renders
 * it dark on amber and /cv renders it light on teal without a second copy.
 *
 * The backend is not wired yet. Until `chatWebhookUrl` is set, sending a
 * message returns a written fallback that says so and points at the two real
 * contact routes. That is deliberate: a chat box that silently does nothing
 * is worse than no chat box, and pretending an assistant is answering when
 * none is connected would be a lie to a visitor.
 */

type Msg = { role: "you" | "bot"; text: string };

const OPENER: Record<string, string> = {
  sales:
    "Ask me anything about the systems on this page: what they cost, how long a build takes, or whether one would suit your business.",
  cv: "Ask me about the projects, the stack behind any of them, or availability.",
};

export default function ChatWidget({
  variant = "sales",
}: {
  variant?: "sales" | "cv";
}) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const sessionRef = useRef<string>("");

  /**
   * Minted on first send, not during render. Generating it inline in the
   * component body both read a ref and called an impure function while
   * rendering, which React forbids.
   */
  function sessionId() {
    if (!sessionRef.current) {
      sessionRef.current =
        globalThis.crypto?.randomUUID?.() ??
        `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    return sessionRef.current;
  }

  // Escape closes, and focus goes back to the launcher that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      launcherRef.current?.focus();
    };
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, busy]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    setMsgs((m) => [...m, { role: "you", text }]);
    setDraft("");
    setBusy(true);

    if (!chatWebhookUrl) {
      // No backend yet. Say so rather than leaving the message hanging.
      setTimeout(() => {
        setMsgs((m) => [
          ...m,
          {
            role: "bot",
            text: "The assistant is not switched on yet, so nobody is reading this box. For anything real: book a free call, or email me and I answer myself, usually the same day.",
          },
        ]);
        setBusy(false);
      }, 500);
      return;
    }

    // The workflow runs on a host that sleeps when idle, so the first message
    // after a quiet spell can take a while to come back. Give it room, but
    // never leave the visitor watching a typing dot forever.
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 45_000);

    try {
      const res = await fetch(chatWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abort.signal,
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: sessionId(),
          chatInput: text,
          route: variant,
        }),
      });
      const data = res.ok ? await res.json().catch(() => ({})) : {};
      const reply =
        data.output ?? data.text ?? data.message ?? data.reply ?? null;
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text:
            reply ??
            "Something went wrong at my end. Email me and I will pick it up directly.",
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: "I could not reach the server. Email me and I will pick it up directly.",
        },
      ]);
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }

  return (
    <div className={`chatw chatw--${variant}${open ? " chatw--open" : ""}`}>
      {/* The launcher hides once the panel is up — it used to stay, which put a
          second, brighter close button on top of the conversation. The icon is
          a rule rather than a speech balloon; the balloon is the most generic
          mark this widget could wear and it matched nothing else on the page. */}
      <button
        ref={launcherRef}
        type="button"
        className="chatw__launch"
        aria-expanded={open}
        aria-controls="chatw-panel"
        onClick={() => setOpen(true)}
      >
        {/* Squared message mark, drawn rather than set as a glyph. The label is
            hidden under 520px and the button becomes a 52px tile, so whatever
            sits here has to carry the meaning on its own — a bare rule did not.
            Squared corners and a hairline stroke keep it away from the rounded
            balloon every other chat widget on the internet uses. */}
        <svg
          className="chatw__launch-icon"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2.75 3.25h14.5v10h-8.5l-3.75 3.5v-3.5H2.75z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className="chatw__launch-text">Ask a question</span>
      </button>

      <div
        id="chatw-panel"
        ref={panelRef}
        className="chatw__panel"
        role="dialog"
        aria-label="Chat"
        hidden={!open}
      >
        <div className="chatw__head">
          <div>
            <span className="chatw__title">John Dominic Jasmin</span>
            {/* Says "assistant", not "replies instantly", because the panel is
                headed with his name and a visitor would otherwise assume they
                are talking to him. */}
            <span className="chatw__status">
              {chatWebhookUrl
                ? "AI assistant · answers instantly"
                : "Not connected yet"}
            </span>
          </div>
          <button
            type="button"
            className="chatw__close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="chatw__log" ref={logRef} aria-live="polite">
          <div className="chatw__msg chatw__msg--bot">
            {OPENER[variant] ?? OPENER.sales}
          </div>

          {msgs.map((m, i) => (
            <div
              key={i}
              className={`chatw__msg chatw__msg--${m.role === "you" ? "you" : "bot"}`}
            >
              {m.text}
            </div>
          ))}

          {busy ? (
            <div className="chatw__msg chatw__typing">
              <span className="chatw__typing-label">Thinking</span>
              <span className="chatw__typing-bar" aria-hidden="true" />
            </div>
          ) : null}
        </div>

        <form className="chatw__form" onSubmit={send}>
          <label className="chatw__sr" htmlFor="chatw-input">
            Your message
          </label>
          <input
            id="chatw-input"
            ref={inputRef}
            className="chatw__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a question"
            autoComplete="off"
          />
          <button
            type="submit"
            className="chatw__send"
            disabled={busy || !draft.trim()}
          >
            Send
          </button>
        </form>

        <p className="chatw__foot">
          Prefer a person?{" "}
          <a
            href={booking.href}
            {...(booking.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a call
          </a>{" "}
          or <a href={`mailto:${email}`}>email me</a>.
        </p>
      </div>
    </div>
  );
}
