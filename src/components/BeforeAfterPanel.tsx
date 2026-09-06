/**
 * The same 9:40pm inquiry, played out both ways, side by side.
 *
 * This was a toggle. It rendered one panel at a time and swapped on click,
 * which removed the version you were meant to be comparing against — a
 * before/after where the before is gone by the time you read the after.
 * Both columns now render together, so the contrast is on screen instead of
 * held in the reader's head. No state, so no client island.
 */

const panels = [
  {
    key: "before",
    tag: "WITHOUT THE SYSTEM",
    label: "TUESDAY, 9:40PM",
    headline: "The slow version",
    outcome: "They booked whoever answered first. You never knew they called.",
    outcomeTone: "var(--l-rust)",
    steps: [
      {
        time: "21:40",
        text: "Customer calls after hours. Nobody picks up and it goes to voicemail.",
      },
      {
        time: "21:41",
        text: "They do not leave a message. Most people never do.",
      },
      {
        time: "21:43",
        text: "They search again and call the next business on the list.",
      },
      {
        time: "09:15",
        text: "Next morning your team starts the day with no idea it happened.",
      },
    ],
  },
  {
    key: "after",
    tag: "WITH IT",
    label: "TUESDAY, 9:40PM",
    headline: "The same night, automated",
    outcome: "Booked before your competitor even knew there was a lead.",
    outcomeTone: "var(--l-mint)",
    steps: [
      {
        time: "21:40",
        text: "Call answered in under 5 seconds. Nobody on your team is awake.",
      },
      {
        time: "21:41",
        text: "It asks what they need, how urgent it is, and where they are.",
      },
      {
        time: "21:42",
        text: "Job booked into the calendar, confirmation sent to the customer.",
      },
      {
        time: "09:00",
        text: "Your team opens the day to a booked job and a full summary.",
      },
    ],
  },
] as const;

export default function BeforeAfterPanel() {
  return (
    <div className="l-compare">
      {panels.map((panel) => (
        <div className={`l-panel l-panel--${panel.key}`} key={panel.key}>
          <div className="l-panel__tag">{panel.tag}</div>
          <div className="l-panel__label">{panel.label}</div>
          <h3 className="l-panel__headline">{panel.headline}</h3>

          <div className="l-panel__steps">
            {panel.steps.map((step) => (
              <div className="l-step" key={step.time + step.text}>
                <span className="l-step__time">{step.time}</span>
                <span className="l-step__text">{step.text}</span>
              </div>
            ))}
          </div>

          <p className="l-panel__outcome" style={{ color: panel.outcomeTone }}>
            {panel.outcome}
          </p>
        </div>
      ))}
    </div>
  );
}
