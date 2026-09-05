import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Declared per route rather than in the root layout, so each page only
 * preloads the faces it actually uses: the sales page needs the three below,
 * /cv and /work need the two after them.
 */

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const salesFonts = `${instrumentSerif.variable} ${plexSans.variable} ${plexMono.variable}`;
export const cvFonts = `${inter.variable} ${jetbrainsMono.variable}`;
