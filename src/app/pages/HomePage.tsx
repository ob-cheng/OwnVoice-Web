import { HeroSection } from "../components/HeroSection";
import { StaggerText } from "../components/StaggerText";
import { StatCards } from "../components/StatCards";
import { Declaration } from "../components/Declaration";
import { LocalModeSection } from "../components/LocalModeSection";
import { AgenticSection } from "../components/AgenticSection";
import { TransparencySection } from "../components/TransparencySection";
import { ComparisonTable } from "../components/ComparisonTable";
import { FounderSection } from "../components/FounderSection";
import { FinalCTA } from "../components/FinalCTA";

export function HomePage() {
  return (
    <>
      <HeroSection />

      <StaggerText
        id="reality"
        title="Every Word You Speak Goes Somewhere."
        lines={[
          "Most AI dictation apps send your voice to the cloud.",
          "Your meetings. Your ideas. Your private conversations.",
          "Stored. Processed. Logged.",
          "You don't know where. You don't know for how long.",
        ]}
      />

      <StatCards />

      <Declaration />

      <LocalModeSection />

      <AgenticSection />

      <TransparencySection />

      <ComparisonTable />

      <FounderSection />

      <FinalCTA />
    </>
  );
}
