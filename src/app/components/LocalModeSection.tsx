import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  WifiOff,
  CheckCircle2,
  BookType,
  LayoutGrid,
  Globe,
  ClipboardCopy,
  Keyboard,
  Cpu,
  Laptop,
  Cloud,
  Check,
  Shield,
  Plus,
  ChevronDown,
  Command,
} from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { BrandLogo } from "./BrandLogo";
import { useShouldReduceMotion } from "../lib/motion-variants";

/* ---------- Steps ---------- */
const steps = [
  {
    label: "Download the model once",
    detail: "~1.5 GB, runs offline forever",
  },
  { label: "Transcribe offline", detail: "No internet connection required" },
  {
    label: "Export & share locally",
    detail: "Your files never leave your machine",
  },
];

/* ---------- Feature Cards Data ---------- */
const featureCards = [
  {
    icon: <BookType size={20} />,
    title: "Your vocabulary. Learned.",
    description:
      "Add names, acronyms, and industry jargon. OwnVoice nails them every single time.",
    tag: null,
  },
  {
    icon: <LayoutGrid size={20} />,
    title: "Modes for every moment.",
    description:
      "Switch between tone, structure, and formatting presets. Perfect text, instantly.",
    tag: null,
  },
  {
    icon: <Globe size={20} />,
    title: "90+ languages. One app.",
    description:
      "Speak in any language or dialect. Translate everything to English with a single toggle.",
    tag: null,
  },
  {
    icon: <ClipboardCopy size={20} />,
    title: "Paste-free by design.",
    description:
      "Transcripts land directly in your active app. No clipboard gymnastics required.",
    tag: null,
  },
  {
    icon: <Cpu size={20} />,
    title: "Your voice. Your choice.",
    description:
      "Use the local model for total privacy — or connect APIs when you choose.",
    tag: null,
  },
  {
    icon: <Keyboard size={20} />,
    title: "Shortcuts for everything.",
    description:
      "Launch, dictate, and control OwnVoice without ever reaching for your mouse.",
    tag: null,
  },
];

/* ---------- Local / Cloud Features ---------- */
const localFeatures = [
  { text: "100% offline processing", detail: "Nothing leaves your machine" },
  {
    text: "Zero cloud dependency",
    detail: "Works without any internet connection",
  },
  { text: "No usage limits", detail: "Transcribe as much as you want" },
  { text: "Free forever", detail: "Open-source, no hidden costs" },
];

const cloudFeatures = [
  {
    text: "Switch to API mode anytime",
    detail: "One toggle, instant access",
  },
  {
    text: "As low as $0.06 per minute",
    detail: "Pay only for what you use",
  },
  {
    text: "No subscriptions required",
    detail: "No monthly fees, no lock-in",
  },
  {
    text: "Still end-to-end encrypted",
    detail: "Your data stays protected in transit",
  },
];

/* ---------- Device Mockup ---------- */
function DeviceMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useShouldReduceMotion();
  const [isDone, setIsDone] = useState(false);

  /* Refs for direct DOM updates — avoids re-renders */
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const statusDotRef = useRef<HTMLDivElement>(null);

  /* Progress animation — direct DOM manipulation, single setState at end */
  useEffect(() => {
    if (!isInView || isDone) return;
    if (reduce) {
      // Instant finish for reduced-motion
      barsRef.current.forEach((bar) => {
        if (bar) {
          bar.style.backgroundColor = "var(--ov-accent)";
          bar.style.opacity = "0.75";
        }
      });
      if (progressTextRef.current) progressTextRef.current.textContent = "100%";
      if (statusTextRef.current) statusTextRef.current.textContent = "Transcribed 1:23";
      if (statusDotRef.current) statusDotRef.current.style.backgroundColor = "var(--ov-accent)";
      setIsDone(true);
      return;
    }

    let current = 0;
    let frame: number;
    let prevTime = 0;
    const totalBars = 48;

    const loop = (time: number) => {
      if (!prevTime) prevTime = time;
      const dt = time - prevTime;
      prevTime = time;

      // Smooth increment based on elapsed time (~2s total)
      current = Math.min(current + dt * 0.05, 100);
      const rounded = Math.round(current);

      // Update progress text
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${rounded}%`;
      }

      // Update bar active states
      const threshold = (current / 100) * totalBars;
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        if (i < threshold) {
          bar.style.backgroundColor = "var(--ov-accent)";
          bar.style.opacity = "0.75";
        }
      });

      if (current >= 100) {
        if (statusTextRef.current) statusTextRef.current.textContent = "Transcribed 1:23";
        if (statusDotRef.current) statusDotRef.current.style.backgroundColor = "var(--ov-accent)";
        setIsDone(true);
        return;
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isInView, isDone, reduce]);

  return (
    <div
      ref={ref}
      className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden w-full"
    >
      {/* Injected CSS keyframes for GPU-composited wave animation */}
      <style>{`
        @keyframes ov-wave {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ov-wave-bar { animation: none !important; }
        }
      `}</style>

      {/* Title bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-ov-border-subtle">
        <span
          className="text-ov-text-secondary"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <BrandLogo />
        </span>
        <div className="flex items-center gap-2 text-ov-text-muted">
          <WifiOff size={14} />
          <span style={{ fontSize: "13px" }}>Offline</span>
        </div>
      </div>

      {/* Waveform — pure CSS animation, no JS state */}
      <div className="px-6 py-6">
        <div className="flex items-end gap-[2.5px] h-16 mb-5">
          {Array.from({ length: 48 }).map((_, i) => {
            const baseHeight = Math.sin(i * 0.4) * 20 + 26;
            return (
              <div
                key={i}
                ref={(el) => { barsRef.current[i] = el; }}
                className="ov-wave-bar flex-1 rounded-full"
                style={{
                  height: `${baseHeight}px`,
                  minWidth: "2px",
                  backgroundColor: "var(--ov-border-subtle)",
                  opacity: 0.25,
                  transformOrigin: "bottom",
                  animation: reduce
                    ? "none"
                    : `ov-wave 1.8s ease-in-out ${i * 0.06}s infinite`,
                  willChange: "transform",
                }}
              />
            );
          })}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              ref={statusDotRef}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: "#B45309",
                transition: "background-color 200ms ease",
              }}
            />
            <span
              ref={statusTextRef}
              className="text-ov-text-secondary"
              style={{ fontSize: "15px" }}
              aria-live="polite"
            >
              Processing…
            </span>
          </div>
          <span
            ref={progressTextRef}
            className="text-ov-text-muted tabular-nums"
            style={{ fontSize: "15px" }}
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mini UI Previews for Feature Cards ---------- */

function VocabularyPreview() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const words = [
    { word: "OwnVoice", type: "Product" },
    { word: "Kubernetes", type: "Tech" },
    { word: "HIPAA", type: "Acronym" },
    { word: "Dr. Nguyen", type: "Name" },
  ];
  return (
    <div
      className="mt-3 rounded-[10px] overflow-hidden"
      style={{ backgroundColor: "var(--ov-bg-elevated)" }}
    >
      {/* Mini header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--ov-border-subtle)" }}
      >
        <span className="text-ov-text-secondary" style={{ fontSize: "12px", fontWeight: 500 }}>
          Custom Vocabulary
        </span>
        <div
          className="flex items-center justify-center w-5 h-5 rounded-full"
          style={{ backgroundColor: "var(--ov-accent-soft)" }}
        >
          <Plus size={10} className="text-ov-accent" />
        </div>
      </div>
      {/* Word list */}
      <div className="px-2 py-1.5">
        {words.map((w) => {
          const isActive = w.word === selectedWord;
          return (
            <div
              key={w.word}
              className="flex items-center py-[6px] px-2 rounded-[6px] cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: isActive ? "var(--ov-accent-soft)" : "transparent",
              }}
              onClick={() => setSelectedWord(isActive ? null : w.word)}
            >
              <span
                className="transition-colors duration-150"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: isActive ? "var(--ov-accent)" : "var(--ov-text-primary)",
                }}
              >
                {w.word}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModesPreview() {
  const [selected, setSelected] = useState("Professional");
  const modes = ["Professional", "Casual", "Technical", "Email"];
  return (
    <div
      className="mt-3 rounded-[10px] overflow-hidden flex-1 flex flex-col"
      style={{ backgroundColor: "var(--ov-bg-elevated)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--ov-border-subtle)" }}
      >
        <span className="text-ov-text-secondary" style={{ fontSize: "12px", fontWeight: 500 }}>
          Dictation Mode
        </span>
        <ChevronDown size={12} className="text-ov-text-muted" />
      </div>
      <div className="p-2.5 grid grid-cols-2 gap-1.5 flex-1 auto-rows-fr">
        {modes.map((name) => (
          <div
            key={name}
            className="rounded-[7px] px-2.5 py-[7px] text-center cursor-pointer transition-colors duration-150 flex items-center justify-center"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: name === selected ? "var(--ov-accent-soft)" : "var(--ov-bg-surface)",
              color: name === selected ? "var(--ov-accent)" : "var(--ov-text-secondary)",
            }}
            onClick={() => setSelected(name)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagesPreview() {
  const [selected, setSelected] = useState("EN");
  const langs = [
    { name: "English", code: "EN" },
    { name: "Español", code: "ES" },
    { name: "日本語", code: "JA" },
    { name: "Français", code: "FR" },
  ];
  return (
    <div
      className="mt-3 rounded-[10px] overflow-hidden"
      style={{ backgroundColor: "var(--ov-bg-elevated)" }}
    >
      <div
        className="flex items-center px-3 py-2 border-b"
        style={{ borderColor: "var(--ov-border-subtle)" }}
      >
        <span className="text-ov-text-secondary" style={{ fontSize: "12px", fontWeight: 500 }}>
          Language
        </span>
      </div>
      <div className="px-2 py-1.5">
        {langs.map((l) => {
          const isActive = l.code === selected;
          return (
            <div
              key={l.code}
              className="flex items-center justify-between py-[6px] px-2 rounded-[6px] cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: isActive ? "var(--ov-accent-soft)" : "transparent",
              }}
              onClick={() => setSelected(l.code)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-[6px] h-[6px] rounded-full transition-colors duration-150"
                  style={{
                    backgroundColor: isActive ? "var(--ov-accent)" : "var(--ov-border-subtle)",
                  }}
                />
                <span
                  className="transition-colors duration-150"
                  style={{
                    fontSize: "12px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--ov-text-primary)" : "var(--ov-text-secondary)",
                  }}
                >
                  {l.name}
                </span>
              </div>
              <span
                className="transition-colors duration-150"
                style={{
                  fontSize: "11px",
                  color: isActive ? "var(--ov-accent)" : "var(--ov-text-muted)",
                }}
              >
                {l.code}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DirectInputPreview() {
  return (
    <div
      className="mt-3 rounded-[10px] overflow-hidden flex-1 flex flex-col"
      style={{ backgroundColor: "var(--ov-bg-elevated)" }}
    >
      {/* Mini app titlebar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: "var(--ov-border-subtle)" }}
      >
        <div className="flex gap-[4px]">
          <div className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "#444" }} />
          <div className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "#444" }} />
          <div className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "#444" }} />
        </div>
        <span className="text-ov-text-muted" style={{ fontSize: "11px" }}>Notes.app</span>
      </div>
      {/* Typing simulation */}
      <div className="px-3 py-2.5 flex-1 flex flex-col justify-center gap-1">
        <p className="text-ov-text-secondary" style={{ fontSize: "12px", lineHeight: 1.5 }}>
          Meeting notes for Q3 review
        </p>
        <p style={{ fontSize: "12px", lineHeight: 1.5 }}>
          <span className="text-ov-accent">The team discussed roadmap priorities and agreed on…</span>
          <span
            className="inline-block w-[1px] h-[13px] ml-[1px] align-middle"
            style={{
              backgroundColor: "var(--ov-accent)",
              animation: "pulse 1s ease-in-out infinite",
            }}
          />
        </p>
        <div
          className="mt-1 flex items-center gap-1.5 rounded-full px-2.5 py-[4px] w-fit"
          style={{ backgroundColor: "var(--ov-accent-soft)" }}
        >
          <div
            className="w-[5px] h-[5px] rounded-full"
            style={{ backgroundColor: "var(--ov-accent)" }}
          />
          <span className="text-ov-accent" style={{ fontSize: "11px", fontWeight: 500 }}>
            Dictating directly
          </span>
        </div>
      </div>
    </div>
  );
}

function ShortcutsPreview() {
  const shortcuts = [
    { keys: ["Ctrl", "Space"], action: "Start / Stop" },
    { keys: ["Esc"], action: "Cancel" },
  ];
  return (
    <div
      className="mt-3 rounded-[10px] overflow-hidden flex-1 flex flex-col"
      style={{ backgroundColor: "var(--ov-bg-elevated)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--ov-border-subtle)" }}
      >
        <span className="text-ov-text-secondary" style={{ fontSize: "12px", fontWeight: 500 }}>
          Keyboard Shortcuts
        </span>
        <Command size={12} className="text-ov-text-muted" />
      </div>
      <div className="px-3 py-2 flex-1 flex flex-col justify-evenly">
        {shortcuts.map((s) => (
          <div
            key={s.action}
            className="flex items-center justify-between py-[6px]"
          >
            <span className="text-ov-text-secondary" style={{ fontSize: "12px" }}>
              {s.action}
            </span>
            <div className="flex items-center gap-[4px]">
              {s.keys.map((k) => (
                <span
                  key={k}
                  className="rounded-[5px] px-[7px] py-[2px]"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--ov-text-secondary)",
                    backgroundColor: "var(--ov-bg-surface)",
                    border: "1px solid var(--ov-border-subtle)",
                  }}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelChoicePreview() {
  const [selected, setSelected] = useState("Local Whisper");
  const models = [
    { name: "Local Whisper", icon: <Laptop size={13} /> },
    { name: "OpenAI API", icon: <Cloud size={13} /> },
    { name: "Azure Speech", icon: <Cloud size={13} /> },
  ];
  return (
    <div
      className="mt-3 rounded-[10px] overflow-hidden"
      style={{ backgroundColor: "var(--ov-bg-elevated)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--ov-border-subtle)" }}
      >
        <span className="text-ov-text-secondary" style={{ fontSize: "12px", fontWeight: 500 }}>
          Speech Engine
        </span>
        <Cpu size={12} className="text-ov-text-muted" />
      </div>
      <div className="px-2 py-1.5">
        {models.map((m) => {
          const isActive = m.name === selected;
          return (
            <div
              key={m.name}
              className="flex items-center gap-2.5 rounded-[7px] px-2.5 py-[8px] cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: isActive ? "var(--ov-accent-soft)" : "transparent",
              }}
              onClick={() => setSelected(m.name)}
            >
              {/* Radio indicator */}
              <div
                className="w-[14px] h-[14px] rounded-full flex items-center justify-center flex-shrink-0 transition-[border-color] duration-150"
                style={{
                  border: isActive
                    ? "2px solid var(--ov-accent)"
                    : "2px solid var(--ov-border-subtle)",
                }}
              >
                {isActive && (
                  <div
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: "var(--ov-accent)" }}
                  />
                )}
              </div>
              {/* Icon */}
              <div
                className="flex-shrink-0 transition-colors duration-150"
                style={{
                  color: isActive ? "var(--ov-accent)" : "var(--ov-text-muted)",
                }}
              >
                {m.icon}
              </div>
              {/* Name */}
              <p
                className="truncate transition-colors duration-150"
                style={{
                  fontSize: "12px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--ov-text-primary)" : "var(--ov-text-secondary)",
                }}
              >
                {m.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Feature Card Component ---------- */
function FeatureCard({
  icon,
  title,
  description,
  tag,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string | null;
  index: number;
}) {
  const reduce = useShouldReduceMotion();

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-ov-bg-surface border border-ov-border-subtle rounded-[14px] p-5 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 text-ov-accent"
          style={{
            backgroundColor: "var(--ov-bg-elevated)",
            border: "1px solid var(--ov-border-subtle)",
          }}
        >
          {icon}
        </div>
        <p
          className="text-ov-text-primary"
          style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.3 }}
        >
          {title}
        </p>
      </div>
      <p
        className="text-ov-text-muted text-left"
        style={{ fontSize: "14px", lineHeight: 1.55 }}
      >
        {description}
      </p>
      {/* Mini UI Preview */}
      <div className="flex-1 flex flex-col">
        {title === "Your vocabulary. Learned." && <VocabularyPreview />}
        {title === "Modes for every moment." && <ModesPreview />}
        {title === "90+ languages. One app." && <LanguagesPreview />}
        {title === "Paste-free by design." && <DirectInputPreview />}
        {title === "Shortcuts for everything." && <ShortcutsPreview />}
        {title === "Your voice. Your choice." && <ModelChoicePreview />}
      </div>
    </motion.div>
  );
}

/* ---------- Mode Toggle (Local / Cloud) — Two-column ---------- */
function ModeToggle() {
  const [isCloud, setIsCloud] = useState(false);
  const reduce = useShouldReduceMotion();

  const features = isCloud ? cloudFeatures : localFeatures;

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start max-w-[920px] mx-auto">
        {/* Left: text + toggle */}
        <div className="text-left">
          <h3
            className="text-ov-text-primary mb-3"
            style={{
              fontSize: "clamp(22px, 3.5vw, 32px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Need More Flexibility?
          </h3>
          <p
            className="text-ov-text-secondary mb-8"
            style={{ fontSize: "16px", lineHeight: 1.55 }}
          >
            Toggle between fully local and optional cloud API — always on your
            terms.
          </p>

          {/* Toggle */}
          <div className="flex items-center gap-5">
            <span
              className="transition-colors duration-200 flex items-center gap-2"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: !isCloud
                  ? "var(--ov-text-primary)"
                  : "var(--ov-text-muted)",
              }}
            >
              <Laptop size={17} />
              Local
            </span>

            <button
              role="switch"
              aria-checked={isCloud}
              aria-label={`Switch to ${isCloud ? "Local" : "Cloud"} mode`}
              onClick={() => setIsCloud(!isCloud)}
              className="relative w-[52px] h-[28px] rounded-full transition-colors duration-200 cursor-pointer focus:outline-[3px] focus:outline-ov-focus focus:outline-offset-2"
              style={{
                backgroundColor: isCloud
                  ? "var(--ov-accent)"
                  : "var(--ov-border-subtle)",
              }}
            >
              <motion.div
                className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white"
                animate={{ x: isCloud ? 26 : 3 }}
                transition={{
                  duration: reduce ? 0 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </button>

            <span
              className="transition-colors duration-200 flex items-center gap-2"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: isCloud
                  ? "var(--ov-text-primary)"
                  : "var(--ov-text-muted)",
              }}
            >
              <Cloud size={17} />
              Cloud API
            </span>
          </div>
        </div>

        {/* Right: feature panel */}
        <div className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden">
          {/* Panel header */}
          <div className="px-5 py-3.5 border-b border-ov-border-subtle flex items-center gap-3">
            {isCloud ? (
              <Cloud size={17} className="text-ov-accent" />
            ) : (
              <Laptop size={17} className="text-ov-accent" />
            )}
            <span
              className="text-ov-text-primary"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              {isCloud ? "Cloud API Mode" : "Local Mode"}
            </span>
          </div>

          {/* Feature grid — 2×2 for compact space usage */}
          <div className="p-4 overflow-hidden" style={{ height: 240 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isCloud ? "cloud" : "local"}
                initial={reduce ? {} : { opacity: 0, x: isCloud ? 8 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? {} : { opacity: 0, x: isCloud ? -8 : 8 }}
                transition={{
                  duration: reduce ? 0 : 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-2 gap-3"
              >
                {features.map((feat) => (
                  <div
                    key={feat.text}
                    className="rounded-[10px] p-3.5"
                    style={{ backgroundColor: "var(--ov-bg-elevated)" }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-full bg-ov-accent-soft flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-ov-accent" />
                      </div>
                      <p
                        className="text-ov-text-primary text-left"
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {feat.text}
                      </p>
                    </div>
                    <p
                      className="text-ov-text-muted text-left"
                      style={{ fontSize: "12px", lineHeight: 1.45 }}
                    >
                      {feat.detail}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom note */}
          <div className="px-5 py-3 border-t border-ov-border-subtle">
            <p className="text-ov-text-muted" style={{ fontSize: "12px" }}>
              {isCloud
                ? "Use your own API key — we never store your credentials."
                : "Everything runs on-device. Zero network requests."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Main Section ---------- */
export function LocalModeSection() {
  const reduce = useShouldReduceMotion();

  return (
    <SectionWrapper
      title="Meet OwnVoice."
      subtitle="Run everything on your own device."
      id="features"
      icon={<Shield size={28} strokeWidth={1.5} />}
      accentColor="#30D158"
    >
      {/* Scope green accent to this section so all var(--ov-accent) children resolve correctly */}
      <div
        style={{
          "--ov-accent": "#30D158",
          "--ov-accent-hover": "#5EE080",
          "--ov-accent-soft": "rgba(48,209,88,0.12)",
          "--ov-focus": "rgba(48,209,88,0.25)",
        } as React.CSSProperties}
      >
        {/* Device mockup + steps */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-14 max-w-[920px] mx-auto mt-14">
          {/* Mockup */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 flex justify-center w-full"
          >
            <DeviceMockup />
          </motion.div>

          {/* Steps */}
          <div className="flex-1 space-y-8 text-left">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={
                  reduce
                    ? {}
                    : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="mt-0.5 w-9 h-9 rounded-full bg-ov-accent-soft flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={18} className="text-ov-accent" />
                </div>
                <div>
                  <p
                    className="text-ov-text-primary"
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    className="text-ov-text-muted mt-1"
                    style={{ fontSize: "15px", lineHeight: 1.5 }}
                  >
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-20 max-w-[960px] mx-auto">
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-muted text-center mb-8"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            FEATURES
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {featureCards.map((card, i) => (
              <FeatureCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>

        {/* Mode Toggle (Local / Cloud) */}
        <div className="mt-24">
          <ModeToggle />
        </div>
      </div>
    </SectionWrapper>
  );
}