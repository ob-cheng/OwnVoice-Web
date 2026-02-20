import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  blurReveal,
  useShouldReduceMotion,
} from "../lib/motion-variants";
import { Mic, Upload, HardDrive, Share2, HelpCircle } from "lucide-react";

interface StaggerTextProps {
  id: string;
  title: string;
  lines: string[];
}

/* ---------- Data Journey Flow ---------- */
const journeySteps = [
  {
    icon: <Mic size={17} />,
    label: "Your Device",
    detail: "You speak into an app",
    color: "var(--ov-accent)",
    bgColor: "var(--ov-accent-soft)",
  },
  {
    icon: <Upload size={17} />,
    label: "Uploaded to Cloud",
    detail: "Audio leaves your machine",
    color: "#B45309",
    bgColor: "rgba(180,83,9,0.12)",
  },
  {
    icon: <HardDrive size={17} />,
    label: "Stored on Their Servers",
    detail: "Retention period unknown",
    color: "#B45309",
    bgColor: "rgba(180,83,9,0.12)",
  },
  {
    icon: <Share2 size={17} />,
    label: "Shared with Third Parties",
    detail: "Analytics, partners, others",
    color: "var(--ov-text-muted)",
    bgColor: "rgba(107,114,128,0.10)",
  },
  {
    icon: <HelpCircle size={17} />,
    label: "Then What?",
    detail: "You may never know",
    color: "var(--ov-text-muted)",
    bgColor: "rgba(107,114,128,0.10)",
  },
];

function DataJourneyFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [activeStep, setActiveStep] = useState(-1);
  const reduce = useShouldReduceMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setActiveStep(journeySteps.length - 1);
      return;
    }
    let step = -1;
    const timer = setInterval(() => {
      step++;
      if (step >= journeySteps.length) {
        clearInterval(timer);
        return;
      }
      setActiveStep(step);
    }, 700);
    return () => clearInterval(timer);
  }, [isInView, reduce]);

  return (
    <div
      ref={ref}
      className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-ov-border-subtle">
        <span
          className="text-ov-text-secondary"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          Where does your voice data go?
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                activeStep >= 1 ? "#B45309" : "var(--ov-text-muted)",
              opacity: activeStep >= 1 ? 1 : 0.4,
            }}
          />
          <span className="text-ov-text-muted" style={{ fontSize: "12px" }}>
            {activeStep >= 1 ? "Data in transit" : "Waiting"}
          </span>
        </div>
      </div>

      {/* Flow steps */}
      <div className="p-5 space-y-0">
        {journeySteps.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          const isLast = i === journeySteps.length - 1;

          return (
            <div key={step.label}>
              <div
                className="flex items-center gap-3.5"
                style={{
                  opacity: isActive ? 1 : 0.18,
                  transition: "opacity 400ms ease",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: isActive
                      ? step.bgColor
                      : "var(--ov-bg-elevated)",
                    color: isActive ? step.color : "var(--ov-border-subtle)",
                    boxShadow: isCurrent
                      ? `0 0 0 2px ${step.bgColor}`
                      : "none",
                    transition: "all 300ms ease",
                  }}
                >
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isActive
                        ? "var(--ov-text-primary)"
                        : "var(--ov-border-subtle)",
                      transition: "color 200ms ease",
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: isActive
                        ? "var(--ov-text-muted)"
                        : "var(--ov-border-subtle)",
                      transition: "color 200ms ease",
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>

              {!isLast && (
                <div className="ml-[17px] py-1">
                  <div
                    className="w-px h-[16px]"
                    style={{
                      backgroundColor: isActive
                        ? "var(--ov-border-subtle)"
                        : "var(--ov-bg-elevated)",
                      transition: "background-color 300ms ease",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom message */}
      <div
        className="px-5 pb-5"
        style={{
          opacity: activeStep >= journeySteps.length - 1 ? 1 : 0,
          transition: "opacity 600ms ease 200ms",
        }}
      >
        <div
          className="rounded-[10px] px-4 py-3 flex items-start gap-2.5"
          style={{ backgroundColor: "rgba(107,114,128,0.08)" }}
        >
          <HelpCircle
            size={14}
            className="text-ov-text-muted flex-shrink-0 mt-0.5"
          />
          <p
            className="text-ov-text-muted"
            style={{ fontSize: "13px", lineHeight: 1.55 }}
          >
            Once your voice data leaves your device, you lose control over how
            it's stored, used, or shared.
          </p>
        </div>
      </div>
    </div>
  );
}

export function StaggerText({ id, title, lines }: StaggerTextProps) {
  const reduce = useShouldReduceMotion();
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      className="py-[72px] md:py-[120px] px-6"
      aria-labelledby={titleId}
    >
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.08 }}
        className="max-w-[980px] mx-auto"
      >
        {/* Two-column grid: text left, visualization right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left column — title + lines */}
          <div>
            <motion.h2
              id={titleId}
              initial={reduce ? {} : blurReveal.hidden}
              whileInView={blurReveal.visible}
              transition={reduce ? { duration: 0 } : undefined}
              viewport={{ once: true, amount: 0.2 }}
              className="text-ov-text-primary mb-8"
              style={{
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </motion.h2>

            <div className="space-y-4">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={
                    reduce ? {} : { opacity: 0, y: 10, filter: "blur(6px)" }
                  }
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: reduce ? 0 : 0.6,
                    delay: reduce ? 0 : i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-ov-text-secondary"
                  style={{ fontSize: "17px", lineHeight: 1.65 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right column — data journey visualization */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <DataJourneyFlow />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
