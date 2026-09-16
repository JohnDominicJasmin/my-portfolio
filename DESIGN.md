# Design direction

**Written by Claude on 2026-09-16 by reading the built site, not by inventing a style.** Every value below was measured from the live pages. John owns this file: correct anything that does not match what you meant, and it becomes the direction future work reads first.

## What this is

A one-man automation studio site that does two jobs at once: it sells an AI front desk to service businesses, and it stands as the proof-of-work link on job applications. The reader is either an owner who lost a call last night, an agency that needs a build kept running, or a hiring manager checking whether the work is real.

## Dials

`Dial: ENERGY 2 / RHYTHM 2 / MOTION 1`

- **ENERGY 2.** Confident but not loud. A serif display headline carries each page; everything else stays quiet.
- **RHYTHM 2.** Consistent structure with deliberate breaks: dark ground, reversed cream bands at the moments that need to feel like evidence.
- **MOTION 1.** Hover states, one scrolling ticker and the flow diagram. Nothing else moves, and everything that does stops under `prefers-reduced-motion`.

## Palette

| Token | Value | Job |
|---|---|---|
| `--l-ink` | `#12100d` | The ground. Everything sits on it. |
| `--l-raised` | `#1c1915` | Panels and menus that lift off the ground. |
| `--l-cream` | `#f2efe9` | The reversal band. Used only where the page needs to feel like evidence. |
| `--l-amber` | `#d99a3d` | The single accent: the CTA, the live link, the one thing to look at. |
| `--l-amber-ink` | `#8a5a11` | The accent as text on cream, because the brighter amber measures 3.12:1 and fails AA. |
| `--l-mint` | `#4ec9a5` | Positive figures only. |
| `--l-rust` | `#a04b4b` | Loss figures only. |

Three core colors plus one accent. Neutrals do not count. Any new color needs a reason written in this file first.

## Type

- **Instrument Serif** for display: headlines and the numbers that matter.
- **IBM Plex Sans** for body.
- **IBM Plex Mono** for labels, eyebrows and timestamps, uppercase with 1.3 to 2.4px tracking.

The uppercase mono label is the site's signature. It marks a label, never a sentence. Anything longer than about six words goes in sentence case in the body face.

## Structure

- Dark ground by default. Cream bands mark the two or three places where proof lives (the before and after table, the pricing, the FAQ).
- One focal point per screen: the headline, then the single amber CTA.
- Sections use a three-step rhythm rather than one padding for everything: `--l-sec-sm` for supporting sections, `--l-sec` for standard, `--l-sec-lg` for the ones that need air.
- Radii come from tokens only: `--l-r-xs` 4px, `--l-r-sm` 8px, `--l-r-lg` 16px, and full pills for buttons.

## Voice

Plain, specific, no buzzwords. The reader is an owner, not a CTO. Say what the system does and what it costs them when it is missing. Client outcomes appear in the client's own words, in italics, and demos are labelled Demo. No invented numbers, ever.

## Non-negotiables

- No em dashes anywhere in copy.
- Every claim is real or it does not ship.
- WCAG AA contrast on every pairing, verified by computation, not by eye.
- 44px touch targets and a working keyboard path on every page.
