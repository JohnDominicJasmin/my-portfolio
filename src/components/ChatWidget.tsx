"use client";

import { useEffect, useRef, useState } from "react";
import { chatWebhookUrl } from "@/data/site";

/**
 * Floating chat for the sales page.
 *
 * Renders nothing at all when `chatWebhookUrl` is empty, so an unconfigured
 * site never ships a button that goes nowhere.
 *
 * Wire format — matches n8n's Chat Trigger node (hosted: "When chat message
 * received"), which is the fastest backend to stand this up on:
 *
 *   POST <chatWebhookUrl>
 *   { "action": "sendMessage", "sessionId": "<uuid>", "chatInput": "<text>" }
 *
 *   200 { "output": "<reply text>" }
 *
 * The reply is read from `output`, then `text`, then `message`, so a hand-rolled
 * endpoint that returns any of those works without changing this file. The n8n
 * webhook must allow this origin via its CORS setting, or the browser blocks it.
 */

type Message = { role: "you" | "them"; text: string };

const GREETING =
  "Ask me anything about automating your business. This is the same kind of system I'd build for you, so you're talking to the product.";

function newSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "them", text: GREETING },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const sessionId = useRef<string>("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!sessionId.current) sessionId.current = newSessionId();
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, sending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!chatWebhookUrl) return null;

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;

    setDraft("");
    setFailed(false);
    setMessages((m) => [...m, { role: "you", text }]);
    setSending(true);

    try {
      const res = await fetch(chatWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: sessionId.current,
          chatInput: text,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply =
        typeof data === "string"
          ? data
          : data?.output ?? data?.text ?? data?.message;

      if (!reply) throw new Error("empty reply");

      setMessages((m) => [...m, { role: "them", text: String(reply) }]);
    } catch {
      setFailed(true);
      setMessages((m) => [
        ...m,
        {
          role: "them",
          text: "That didn't get through. Email johndominicjasmin@gmail.com and I'll answer it myself.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="l-chat__toggle"
        aria-expanded={open}
        aria-controls="site-chat"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Ask a question"}
      </button>

      <div
        id="site-chat"
        className="l-chat"
        hidden={!open}
        role="dialog"
        aria-label="Chat"
      >
        <header className="l-chat__head">
          <span className="l-dot l-dot--sm" aria-hidden="true" />
          <span className="l-chat__title">Answering now, not tomorrow</span>
        </header>

        <div className="l-chat__log" ref={logRef} aria-live="polite">
          {messages.map((m, i) => (
            <p key={i} className={`l-chat__msg l-chat__msg--${m.role}`}>
              {m.text}
            </p>
          ))}
          {sending ? (
            <p className="l-chat__msg l-chat__msg--them l-chat__typing">
              Thinking&hellip;
            </p>
          ) : null}
        </div>

        <form
          className="l-chat__form"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <label className="l-sr" htmlFor="site-chat-input">
            Your message
          </label>
          <textarea
            id="site-chat-input"
            ref={inputRef}
            className="l-chat__input"
            rows={2}
            value={draft}
            placeholder="What would you want it to handle?"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <button
            type="submit"
            className="l-chat__send"
            disabled={sending || !draft.trim()}
          >
            Send
          </button>
        </form>

        {failed ? (
          <p className="l-chat__note">Connection failed. Email works.</p>
        ) : null}
      </div>
    </>
  );
}
