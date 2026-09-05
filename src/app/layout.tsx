import type { Metadata } from "next";
import "./base.css";

export const metadata: Metadata = {
  title: "John Dominic Jasmin | AI Automation Engineer",
  description:
    "AI Automation Engineer. I build AI chatbots, voice agents, and lead-routing pipelines for businesses, and run LiquidityHQ, my own live SaaS product.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
