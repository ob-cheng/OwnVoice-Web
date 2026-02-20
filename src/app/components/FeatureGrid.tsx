import { motion, useInView } from "motion/react";
import { SectionWrapper } from "./SectionWrapper";
import { Cpu, Mic, Layers, Cloud, Lock } from "lucide-react";
import { useShouldReduceMotion, scaleSubtle } from "../lib/motion-variants";
import type { ReactNode } from "react";
import { useRef, useState, useEffect, useMemo } from "react";

/* ---------- Mini Visual: Local Processing ---------- */
function MiniLocalProcessor() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 1200);
    return () => clearInterval(timer);
  }, [isInView]);

  const stages = ["Listening...", "Processing...", "Transcribing...", "Done"];
  const colors = [
    "var(--ov-text-muted)",
    "var(--ov-accent)",
    "var(--ov-accent)",
    "var(--ov-accent-hover)",
  ];

  return (
    <div ref={ref} className="mt-4 p-3 bg-ov-bg-elevated rounded-[8px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 rounded-full transition-all duration-300"
              style={{
                height: step >= i ? "12px" : "6px",
                backgroundColor:
                  step >= i ? "var(--ov-accent)" : "var(--ov-border-subtle)",
              }}
            />
          ))}
        </div>
        <span className="text-ov-text-muted" style={{ fontSize: "10px" }}>
          LOCAL
        </span>
      </div>
      <span
        className="transition-colors duration-200"
        style={{ fontSize: "11px", color: colors[step] }}
      >
        {stages[step]}
      </span>
    </div>
  );
}

/* ---------- Mini Visual: Waveform Transcription ---------- */
function MiniWaveform() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setProgress((p) => (p >= 20 ? 0 : p + 1));
    }, 150);
    return () => clearInterval(timer);
  }, [isInView]);

  const bars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        height: Math.sin(i * 0.8) * 8 + 10,
      })),
    []
  );

  return (
    <div ref={ref} className="mt-4 p-3 bg-ov-bg-elevated rounded-[8px]">
      <div className="flex items-end gap-[2px] h-6 mb-2">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-all duration-100"
            style={{
              height: `${bar.height}px`,
              backgroundColor:
                i < progress
                  ? "var(--ov-accent)"
                  : "var(--ov-border-subtle)",
              opacity: i < progress ? 0.7 : 0.3,
            }}
          />
        ))}
      </div>
      <span className="text-ov-accent" style={{ fontSize: "10px", fontWeight: 500 }}>
        ownvoice-engine
      </span>
    </div>
  );
}

/* ---------- Mini Visual: Model Browser ---------- */
function MiniModelBrowser() {
  const models = [
    { name: "ownvoice-large", downloads: "2.1M" },
    { name: "ownvoice-medium", downloads: "890K" },
    { name: "ownvoice-small", downloads: "1.4M" },
  ];

  return (
    <div className="mt-4 p-3 bg-ov-bg-elevated rounded-[8px] space-y-1.5">
      {models.map((m) => (
        <div key={m.name} className="flex items-center justify-between">
          <span className="text-ov-text-secondary" style={{ fontSize: "10px" }}>
            {m.name}
          </span>
          <span className="text-ov-text-muted" style={{ fontSize: "9px" }}>
            {m.downloads}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Mini Visual: API Toggle ---------- */
function MiniApiToggle() {
  const [isCloud, setIsCloud] = useState(false);

  return (
    <div className="mt-4 p-3 bg-ov-bg-elevated rounded-[8px]">
      <div className="flex items-center justify-between">
        <span
          className="text-ov-text-secondary"
          style={{ fontSize: "10px" }}
        >
          {isCloud ? "Cloud API" : "Local Model"}
        </span>
        <button
          onClick={() => setIsCloud(!isCloud)}
          className="w-8 h-4 rounded-full transition-colors duration-200 relative cursor-pointer"
          style={{
            backgroundColor: isCloud
              ? "var(--ov-accent)"
              : "var(--ov-border-subtle)",
          }}
          aria-label="Toggle API mode"
        >
          <div
            className="absolute top-0.5 w-3 h-3 rounded-full bg-ov-text-primary transition-all duration-200"
            style={{ left: isCloud ? "calc(100% - 14px)" : "2px" }}
          />
        </button>
      </div>
      <div
        className="mt-1.5 flex items-center gap-1"
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: isCloud
              ? "var(--ov-accent-hover)"
              : "var(--ov-accent)",
          }}
        />
        <span
          className="text-ov-text-muted"
          style={{ fontSize: "9px" }}
        >
          {isCloud ? "$0.06/min — pay as you go" : "Free — unlimited"}
        </span>
      </div>
    </div>
  );
}

/* ---------- Mini Visual: Open Source ---------- */
function MiniGitGraph() {
  const commits = [
    { hash: "a3f2c1d", msg: "feat: add batch mode", time: "2h ago" },
    { hash: "b8e4f2a", msg: "fix: memory leak", time: "5h ago" },
    { hash: "c1d9e3b", msg: "docs: update README", time: "1d ago" },
  ];

  return (
    <div className="mt-4 p-3 bg-ov-bg-elevated rounded-[8px] space-y-1.5">
      {commits.map((c) => (
        <div key={c.hash} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ov-accent flex-shrink-0" />
          <span className="text-ov-accent" style={{ fontSize: "9px", fontFamily: "monospace" }}>
            {c.hash}
          </span>
          <span className="text-ov-text-muted truncate" style={{ fontSize: "9px" }}>
            {c.msg}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Features Data ---------- */
const features: {
  icon: ReactNode;
  label: string;
  desc: string;
  visual: ReactNode;
}[] = [
  {
    icon: <Cpu size={24} />,
    label: "Local-first AI transcription",
    desc: "All processing happens on your machine. No cloud dependency required.",
    visual: <MiniLocalProcessor />,
  },
  {
    icon: <Mic size={24} />,
    label: "Advanced AI speech recognition",
    desc: "State-of-the-art speech recognition, running entirely locally.",
    visual: <MiniWaveform />,
  },
  {
    icon: <Layers size={24} />,
    label: "HuggingFace model integration",
    desc: "Access thousands of community models effortlessly.",
    visual: <MiniModelBrowser />,
  },
  {
    icon: <Cloud size={24} />,
    label: "Optional OpenAI & Azure API",
    desc: "Use cloud APIs only if you choose to, on your terms.",
    visual: <MiniApiToggle />,
  },
  {
    icon: <Lock size={24} />,
    label: "100% open-source",
    desc: "Inspect, modify, and contribute. Full transparency always.",
    visual: <MiniGitGraph />,
  },
];

export function FeatureGrid() {
  const reduce = useShouldReduceMotion();

  return (
    <SectionWrapper title="Meet OwnVoice." id="features">
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={reduce ? {} : scaleSubtle.hidden}
            whileInView={reduce ? {} : scaleSubtle.visible(index * 0.08)}
            viewport={{ once: true, amount: 0.2 }}
            className="group bg-ov-bg-surface rounded-[16px] p-6 text-left border border-ov-border-subtle transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_18px_rgba(0,0,0,0.18)] flex flex-col"
          >
            <div className="w-10 h-10 rounded-[10px] bg-ov-accent-soft flex items-center justify-center text-ov-accent mb-4 transition-transform duration-[180ms] group-hover:scale-[1.03] group-hover:rotate-[2deg]">
              {feature.icon}
            </div>
            <h3
              className="text-ov-text-primary mb-1.5"
              style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.4 }}
            >
              {feature.label}
            </h3>
            <p
              className="text-ov-text-secondary flex-1"
              style={{ fontSize: "13px", lineHeight: 1.5 }}
            >
              {feature.desc}
            </p>
            {feature.visual}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}