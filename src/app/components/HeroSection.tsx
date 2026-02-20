import { motion, useInView } from "motion/react";
import { CTAButton } from "./CTAButton";
import { Github, Monitor } from "lucide-react";
import { useShouldReduceMotion } from "../lib/motion-variants";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";

/* ---------- Floating Recording Widget ---------- */
function RecordingWidget() {
  const reduce = useShouldReduceMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(timer);
  }, [reduce]);

  const barCount = 12;

  const barHeights = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const phase = tick * 0.3 + i * 0.65;
      const wave1 = Math.sin(phase) * 0.3;
      const wave2 = Math.sin(phase * 1.6 + i * 0.4) * 0.18;
      const wave3 = Math.cos(phase * 0.5 + i * 1.1) * 0.12;
      const height = 0.35 + wave1 + wave2 + wave3;
      return Math.max(0.18, Math.min(1, height));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div
      className="inline-flex items-center gap-3.5 pl-3 pr-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.06)]"
      style={{ backgroundColor: "#1C1E22" }}
    >
      {/* Stop button — red circle, white square */}
      <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
        <div className="w-3 h-3 rounded-[3px] bg-white" />
      </div>

      {/* Waveform bars */}
      <div className="flex items-center gap-[4px] h-[28px]">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-[3.5px] rounded-full"
            style={{
              height: `${Math.round(h * 28)}px`,
              minHeight: "4px",
              backgroundColor: "rgba(255,255,255,0.85)",
              transition: "height 100ms ease-out",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Live Transcription Demo ---------- */
const transcriptWords = [
  "Let's", "go", "over", "the", "quarterly", "results",
  "before", "the", "board", "meeting", "tomorrow.",
  "Revenue", "grew", "18%", "and", "we", "need",
  "to", "finalize", "the", "projections\u2026",
];

function LiveTranscriptionDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useShouldReduceMotion();
  const [visibleWords, setVisibleWords] = useState(0);
  const allDone = visibleWords >= transcriptWords.length;

  useEffect(() => {
    if (!isInView) return;
    if (reduce) { setVisibleWords(transcriptWords.length); return; }
    const startDelay = setTimeout(() => {
      let count = 0;
      const timer = setInterval(() => {
        count++;
        if (count > transcriptWords.length) { clearInterval(timer); return; }
        setVisibleWords(count);
      }, 130);
      return () => clearInterval(timer);
    }, 800);
    return () => clearTimeout(startDelay);
  }, [isInView, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Transcript card */}
      <div className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-ov-border-subtle">
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: "var(--ov-accent)",
                animation: allDone ? "none" : "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
              }}
            />
            <span className="text-ov-text-muted" style={{ fontSize: "14px", fontWeight: 500 }}>
              {allDone ? "Transcription complete" : "Transcribing\u2026"}
            </span>
          </div>
          <span
            className="text-ov-accent px-2.5 py-0.5 rounded-full"
            style={{
              fontSize: "11px", fontWeight: 600,
              backgroundColor: "var(--ov-accent-soft)",
              letterSpacing: "0.05em",
            }}
          >
            LOCAL
          </span>
        </div>

        {/* Transcript body */}
        <div className="px-6 py-6 min-h-[110px]">
          <p style={{ fontSize: "17px", lineHeight: 1.8 }}>
            {transcriptWords.slice(0, visibleWords).map((word, i) => {
              const isCurrent = i === visibleWords - 1 && !allDone;
              return (
                <span key={i}>
                  <span style={{
                    color: isCurrent ? "var(--ov-text-primary)" : "var(--ov-text-secondary)",
                    transition: "color 120ms ease",
                  }}>
                    {word}
                  </span>{" "}
                </span>
              );
            })}
            {!allDone && visibleWords > 0 && (
              <span
                className="inline-block w-[2px] h-[16px] bg-ov-accent align-middle"
                style={{ animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite" }}
              />
            )}
          </p>
        </div>

        {/* Card footer */}
        <div className="px-6 py-3 border-t border-ov-border-subtle flex items-center justify-between">
          <span className="text-ov-text-muted" style={{ fontSize: "13px" }}>
            Processing on your device
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-ov-accent" />
            <span className="text-ov-text-muted" style={{ fontSize: "13px" }}>
              No data sent
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Privacy Dot Mosaic ---------- */
function PrivacyMosaic() {
  const [isRevealed, setIsRevealed] = useState(false);
  const reduce = useShouldReduceMotion();

  const dots = useMemo(() => {
    const cols = 16;
    const rows = 5;
    return Array.from({ length: cols * rows }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 55;
      return {
        left: ((col + 0.5) / cols) * 100,
        top: ((row + 0.5) / rows) * 100,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        scatterDelay: Math.random() * 0.18,
        breatheDur: 2.2 + Math.random() * 2.3,
        breatheDelay: Math.random() * 3,
        size: 2.5 + Math.random() * 2.5,
      };
    });
  }, []);

  const toggle = useCallback(() => setIsRevealed((r) => !r), []);

  return (
    <span
      className="relative inline-block cursor-pointer select-none"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-label="Privacy — hover to reveal"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") toggle();
      }}
    >
      {/* Actual text — always in DOM for layout, opacity toggled */}
      <span
        style={{
          opacity: isRevealed ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      >
        Privacy
      </span>

      {/* Dot mosaic overlay */}
      <span
        className="absolute inset-0 overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        {dots.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              backgroundColor: "var(--ov-text-primary)",
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              ...(isRevealed
                ? {
                    opacity: 0,
                    transform: `translate(calc(-50% + ${dot.dx}px), calc(-50% + ${dot.dy}px)) scale(0.4)`,
                    transition: `opacity 0.45s ease ${dot.scatterDelay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${dot.scatterDelay}s`,
                    animation: "none",
                  }
                : {
                    animation: reduce
                      ? "none"
                      : `mosaic-breathe ${dot.breatheDur}s ease-in-out ${dot.breatheDelay}s infinite`,
                  }),
            }}
          />
        ))}
      </span>

      <style>{`
        @keyframes mosaic-breathe {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </span>
  );
}

/* ---------- Hero Section ---------- */
export function HeroSection() {
  const reduce = useShouldReduceMotion();

  const variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 8 },
    visible: {
      opacity: 1, filter: "blur(0px)", y: 0,
      transition: { duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <header className="px-6 pt-[140px] md:pt-[180px] pb-[72px] md:pb-[100px]" role="banner">
      <div className="max-w-[980px] mx-auto">
        {/* Text content — centered */}
        <div className="text-center max-w-[800px] mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-ov-text-primary"
            style={{
              fontSize: "clamp(36px, 6.5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
            }}
          >
            Your Voice. Your <PrivacyMosaic />.
            <br />
            <span className="text-ov-accent" style={{ fontStyle: "italic" }}>Your Choice.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-ov-text-secondary max-w-[520px] mx-auto"
            style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.55 }}
          >
            Transcribe speech with powerful AI — without giving up your privacy.
          </motion.p>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-5"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <CTAButton variant="primary" href="/download" ariaLabel="Download OwnVoice for Windows">
                <Monitor size={17} />
                Download for Windows
              </CTAButton>
              <CTAButton variant="secondary" href="https://github.com" ariaLabel="View OwnVoice source code on GitHub">
                <Github size={17} />
                View on GitHub
              </CTAButton>
            </div>
            <span className="text-ov-text-muted" style={{ fontSize: "13px" }}>
              macOS support coming soon
            </span>
          </motion.div>
        </div>

        {/* Demo — full-width layout with recording widget + transcript */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center gap-5 max-w-[680px] mx-auto"
        >
          <RecordingWidget />
          <LiveTranscriptionDemo />
        </motion.div>
      </div>
    </header>
  );
}