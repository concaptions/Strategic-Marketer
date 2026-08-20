import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyCta } from "@/components/sticky-cta";
import { ExitIntent } from "@/components/exit-intent";
import { AgencyContent } from "./agency-content";

/* The concept doc gives ONE approved line for this page (the H1 inside
   AgencyContent) and the licensing idea (Content Velocity + IdeoLab
   technology). Everything else is PLACEHOLDER copy to fill the layout -
   Zuria 2026-08-20: "jo content given hai wo likho, baki dummy" - and will
   be replaced when the client provides the real content. Popups (sticky CTA
   + exit intent) and scroll reveals mirror the homepage. */

export const metadata: Metadata = {
  title: "For Agencies | Strategic Marketer",
  description:
    "Bring proven AI-powered solutions to your clients without building the technology, systems and support infrastructure yourself.",
};

export default function ForAgenciesPage() {
  return (
    <>
      <SiteHeader />
      <AgencyContent />
      <SiteFooter />
      <StickyCta />
      <ExitIntent />
    </>
  );
}
