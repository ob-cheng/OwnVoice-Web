import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Zap, MessageSquare } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { useShouldReduceMotion } from "../lib/motion-variants";

/* ================================================================
   Colors — sampled from Claude Code terminal
   ================================================================ */
const C = {
  bg: "#1E1E1E",
  accent: "#D4845A",
  text: "#D4D4D4",
  muted: "#6A6A6A",
  border: "#D4845A",
  codeBg: "#1E1E1E",
} as const;

/* ================================================================
   Animation data — OwnVoice-themed conversation
   ================================================================ */
const voiceCommand =
  "Hey can you refactor the audio pipeline to support real-time streaming? Right now it buffers the entire recording before transcribing and I want it to process chunks as they come in so users see words appearing live.";

type AgentLine =
  | { type: "action"; label: string; file: string }
  | { type: "detail"; text: string }
  | { type: "response"; text: string }
  | { type: "spacer" }
  | { type: "separator" }
  | { type: "dotSeparator" }
  | { type: "code"; lineNum: string; text: string };

const agentLines: AgentLine[] = [
  { type: "action", label: "Read", file: "src/audio/pipeline.ts" },
  { type: "detail", text: "   Read 342 lines" },
  { type: "spacer" },
  {
    type: "response",
    text: "I'll refactor the audio pipeline to use a streaming architecture with chunked processing. Each chunk will be transcribed incrementally so words appear in real time.",
  },
  { type: "spacer" },
  { type: "action", label: "Update", file: "src/audio/pipeline.ts" },
  { type: "separator" },
  { type: "detail", text: " Edit file src/audio/pipeline.ts" },
  { type: "dotSeparator" },
  { type: "code", lineNum: " 47", text: "  async *streamChunks(input: AudioBuffer) {" },
  { type: "code", lineNum: " 48", text: '    const chunkSize = this.config.chunkMs ?? 500;' },
  { type: "code", lineNum: " 49", text: "    for await (const chunk of this.splitter.iterate(input, chunkSize)) {" },
  { type: "code", lineNum: " 50", text: "      yield this.transcriber.processChunk(chunk);" },
];

/* ================================================================
   Unicode pixel robot (Claude mascot) — rendered as text
   ================================================================ */
const robotLines = ["▐▛███▜▌", "▝▜█████▛▘", " ▘▘ ▝▝"];

/* ================================================================
   Floating Recording Widget — smaller version for terminal overlay
   ================================================================ */
function MiniRecordingWidget({ visible }: { visible: boolean }) {
  const reduce = useShouldReduceMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !visible) return;
    const timer = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(timer);
  }, [reduce, visible]);

  const barCount = 9;

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

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full border border-[rgba(255,255,255,0.06)]"
      style={{ backgroundColor: "#1C1E22" }}
    >
      {/* Stop button — red circle, white square */}
      <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-[2px] bg-white" />
      </div>

      {/* Waveform bars */}
      <div className="flex items-center gap-[3px] h-[20px]">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: `${Math.round(h * 20)}px`,
              minHeight: "3px",
              backgroundColor: "rgba(255,255,255,0.85)",
              transition: "height 100ms ease-out",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ================================================================
   Claude Code Terminal — faithful 1:1 recreation
   ================================================================ */
function AgenticTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useShouldReduceMotion();

  const [phase, setPhase] = useState<
    "idle" | "typing" | "processing" | "done"
  >("idle");
  const [voiceCharIdx, setVoiceCharIdx] = useState(0);
  const [responseLineIdx, setResponseLineIdx] = useState(0);
  const animStarted = useRef(false);

  /* Reset all animation state back to idle */
  const resetAnimation = useCallback(() => {
    setPhase("idle");
    setVoiceCharIdx(0);
    setResponseLineIdx(0);
    animStarted.current = false;
  }, []);

  const startAnimation = useCallback(() => {
    if (animStarted.current) return;
    animStarted.current = true;

    if (reduce) {
      setPhase("done");
      setVoiceCharIdx(voiceCommand.length);
      setResponseLineIdx(agentLines.length);
      return;
    }

    setTimeout(() => {
      setPhase("typing");
      let ci = 0;
      const typeTimer = setInterval(() => {
        ci += 2;
        if (ci > voiceCommand.length) ci = voiceCommand.length;
        setVoiceCharIdx(ci);
        if (ci >= voiceCommand.length) {
          clearInterval(typeTimer);
          setTimeout(() => {
            setPhase("processing");
            let li = 0;
            // Initial delay for "thinking" indicator, then lines stream in
            setTimeout(() => {
              const lineTimer = setInterval(() => {
                li++;
                setResponseLineIdx(li);
                if (li >= agentLines.length) {
                  clearInterval(lineTimer);
                  setTimeout(() => setPhase("done"), 300);
                }
              }, 400);
            }, 900);
          }, 600);
        }
      }, 35);
    }, 1400);
  }, [reduce]);

  /* Loop: after "done", wait then reset and replay */
  useEffect(() => {
    if (phase !== "done" || reduce) return;
    const loopTimer = setTimeout(() => {
      resetAnimation();
    }, 3500);
    return () => clearTimeout(loopTimer);
  }, [phase, reduce, resetAnimation]);

  useEffect(() => {
    if (isInView) startAnimation();
  }, [isInView, startAnimation]);

  /* Restart animation after reset (when phase returns to idle while in view) */
  useEffect(() => {
    if (isInView && phase === "idle" && !animStarted.current) {
      startAnimation();
    }
  }, [isInView, phase, startAnimation]);

  const mono: React.CSSProperties = {
    fontFamily:
      "'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', monospace",
    fontSize: 12,
    lineHeight: 1.65,
  };

  /* Full-width separator line using ─ */
  const solidSep = "─".repeat(80);
  const dotSep = "╌".repeat(80);

  return (
    <div className="relative">
      {/* Floating recording widget — positioned above terminal */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: -20 }}
      >
        <MiniRecordingWidget visible={phase === "typing"} />
      </div>

      <div
        ref={ref}
        className="rounded-[10px] overflow-hidden w-full relative"
        style={{ backgroundColor: C.bg, ...mono, height: 560, minWidth: 540, display: "flex", flexDirection: "column" }}
      >
        {/* ╭─── Claude Code v2.1.12 ────────────────────╮ */}
        <div
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            margin: "16px 16px 0 16px",
            position: "relative",
          }}
        >
          {/* Legend title — LEFT aligned on top border */}
          <div
            style={{
              position: "absolute",
              top: -10,
              left: 16,
              backgroundColor: C.bg,
              padding: "0 8px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: C.border }}>───</span>
            <span style={{ color: C.accent, fontSize: 12 }}>
              {" "}
              Claude Code v2.1.12{" "}
            </span>
            <span style={{ color: C.border }}>
              ──────────────────────────────
            </span>
          </div>

          {/* Two-column layout with vertical divider */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              paddingTop: 20,
              paddingBottom: 16,
              minHeight: 200,
            }}
          >
            {/* Left column */}
            <div
              style={{
                borderRight: `1px solid ${C.border}`,
                paddingLeft: 20,
                paddingRight: 16,
              }}
            >
              {/* Welcome — centered */}
              <div className="text-center" style={{ marginBottom: 12 }}>
                <p style={{ color: C.text, fontSize: 12 }}>Welcome back, Tianen</p>
              </div>

              {/* Unicode robot — centered */}
              <div
                className="text-center"
                style={{ marginBottom: 12, lineHeight: 1.3 }}
              >
                {robotLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color: C.accent,
                      fontSize: 14,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Model info — left aligned */}
              <p
                style={{
                  color: C.text,
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                Opus 4.5 · Claude Team · OwnVoice
              </p>

              {/* Path */}
              <p style={{ color: C.text, fontSize: 12 }}>~/Dev/ownvoice</p>
            </div>

            {/* Right column */}
            <div style={{ paddingLeft: 16, paddingRight: 20 }}>
              <p
                style={{
                  color: C.accent,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                Tips for getting
              </p>
              <p
                style={{
                  color: C.accent,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                started
              </p>
              <p
                style={{
                  color: C.text,
                  fontSize: 12,
                  marginBottom: 2,
                }}
              >
                Run /init to create…
              </p>
              <p
                style={{
                  color: C.text,
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                Note: You have launche…
              </p>

              {/* Separator */}
              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  marginBottom: 8,
                }}
              />

              <p
                style={{
                  color: C.accent,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Recent activity
              </p>
              <p style={{ color: C.muted, fontSize: 12 }}>No recent activity</p>
            </div>
          </div>
        </div>

        {/* ---- Prompt + Response area (below the box) ---- */}
        <div style={{ padding: "20px 20px 24px 20px", textAlign: "left", flex: 1, minHeight: 0, overflow: "hidden" }}>
          {/* Animations for streaming */}
          <style>{`
            @keyframes cc-stream {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes cc-think-dot {
              0%, 80%, 100% { opacity: 0.25; }
              40% { opacity: 1; }
            }
          `}</style>

          {/* Prompt line */}
          <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            <span style={{ color: C.accent, fontWeight: 700 }}>❯</span>
            <span style={{ color: C.text }}> </span>

            {/* Idle: blinking cursor */}
            {phase === "idle" && (
              <span
                className="inline-block align-middle"
                style={{
                  width: 8,
                  height: 17,
                  backgroundColor: C.accent,
                  animation: "cc-blink 1s step-end infinite",
                }}
              />
            )}

            {/* Typing (dictation): chars appear as voice-to-text + cursor */}
            {phase === "typing" && (
              <>
                <span style={{ color: C.text }}>
                  {voiceCommand.slice(0, voiceCharIdx)}
                </span>
                <span
                  className="inline-block align-middle"
                  style={{
                    width: 8,
                    height: 17,
                    backgroundColor: C.accent,
                    animation: "cc-blink 1s step-end infinite",
                  }}
                />
              </>
            )}

            {/* Processing / Done: full command */}
            {(phase === "processing" || phase === "done") && (
              <span style={{ color: C.text }}>{voiceCommand}</span>
            )}
          </div>

          {/* Thinking indicator — brief pause before AI generates */}
          {phase === "processing" && responseLineIdx === 0 && (
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: C.accent,
                    display: "inline-block",
                    animation: `cc-think-dot 1.2s ease-in-out ${d * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Agent response — streamed in line by line */}
          {responseLineIdx > 0 && (
            <div style={{ marginTop: 8 }}>
              {agentLines.slice(0, responseLineIdx).map((line, i) => {
                const isNew = i === responseLineIdx - 1 && phase === "processing";
                const streamStyle: React.CSSProperties = isNew
                  ? { animation: "cc-stream 0.35s ease-out both" }
                  : {};

                if (line.type === "spacer") {
                  return <div key={i} style={{ height: 6 }} />;
                }

                if (line.type === "action") {
                  return (
                    <div key={i} style={streamStyle}>
                      <span style={{ color: C.accent, fontWeight: 600 }}>
                        {line.label}
                      </span>
                      <span style={{ color: C.text }}>(</span>
                      <span style={{ color: C.text }}>{line.file}</span>
                      <span style={{ color: C.text }}>)</span>
                    </div>
                  );
                }

                if (line.type === "detail") {
                  return (
                    <div
                      key={i}
                      style={{
                        color: C.muted,
                        whiteSpace: "pre",
                        ...streamStyle,
                      }}
                    >
                      {line.text}
                    </div>
                  );
                }

                if (line.type === "response") {
                  return (
                    <div
                      key={i}
                      style={{
                        color: C.text,
                        whiteSpace: "pre-wrap",
                        ...streamStyle,
                      }}
                    >
                      {line.text}
                    </div>
                  );
                }

                if (line.type === "separator") {
                  return (
                    <div
                      key={i}
                      className="overflow-hidden"
                      style={{
                        color: C.border,
                        opacity: 0.5,
                        userSelect: "none",
                        ...streamStyle,
                      }}
                    >
                      {solidSep}
                    </div>
                  );
                }

                if (line.type === "dotSeparator") {
                  return (
                    <div
                      key={i}
                      className="overflow-hidden"
                      style={{
                        color: C.border,
                        opacity: 0.4,
                        userSelect: "none",
                        ...streamStyle,
                      }}
                    >
                      {dotSep}
                    </div>
                  );
                }

                if (line.type === "code") {
                  return (
                    <div
                      key={i}
                      style={{ whiteSpace: "pre", ...streamStyle }}
                    >
                      <span style={{ color: C.muted }}>{line.lineNum}</span>
                      <span style={{ color: C.text }}>{line.text}</span>
                    </div>
                  );
                }

                return null;
              })}

              {/* Blinking cursor during generation */}
              {phase === "processing" && responseLineIdx < agentLines.length && (
                <span
                  className="inline-block"
                  style={{
                    width: 8,
                    height: 17,
                    marginTop: 4,
                    backgroundColor: C.accent,
                    animation: "cc-blink 1s step-end infinite",
                  }}
                />
              )}
            </div>
          )}

          {/* Done — new prompt */}
          {phase === "done" && (
            <div style={{ marginTop: 8 }}>
              <span style={{ color: C.accent, fontWeight: 700 }}>❯</span>
              <span style={{ color: C.text }}> </span>
              <span
                className="inline-block align-middle"
                style={{
                  width: 8,
                  height: 17,
                  backgroundColor: C.accent,
                  animation: "cc-blink 1s step-end infinite",
                }}
              />
            </div>
          )}
        </div>

        <style>{`
          @keyframes cc-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>

        {/* Bottom fade-out overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: `linear-gradient(to bottom, transparent, ${C.bg})`,
            pointerEvents: "none",
            borderRadius: "0 0 10px 10px",
          }}
        />
      </div>
    </div>
  );
}

/* ================================================================
   Benefits
   ================================================================ */
const benefits = [
  {
    icon: <Zap size={20} />,
    title: "Built for your coding tools",
    description:
      "OwnVoice pastes directly into Cursor, Claude Code, Copilot, and more — so you can command a fleet of AI agents with your voice instead of your keyboard.",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "Speak it, ship it",
    description:
      "Describe entire features out loud and let agents handle the rest. Richer context in, better code out — no typing bottleneck.",
  },
];

/* ================================================================
   Main Section
   ================================================================ */
export function AgenticSection() {
  const reduce = useShouldReduceMotion();

  return (
    <SectionWrapper
      title="Faster Agentic Workflows."
      subtitle="Use OwnVoice with Cursor, Claude Code, Copilot, or any other agentic coding app — without touching your keyboard."
      id="agentic"
      icon={<Zap size={28} strokeWidth={1.5} />}
      accentColor="#FF9F0A"
    >
      <div className="mt-14 flex flex-col lg:flex-row items-start gap-14 max-w-[960px] mx-auto">
        {/* Left: benefits — vertically centered */}
        <div className="flex-1 space-y-10 text-left order-2 lg:order-1 lg:self-center">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={
                reduce ? {} : { opacity: 0, y: 10, filter: "blur(4px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "rgba(255,159,10,0.12)",
                  color: "#FF9F0A",
                }}
              >
                {benefit.icon}
              </div>
              <div>
                <p
                  className="text-ov-text-primary mb-1.5"
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {benefit.title}
                </p>
                <p
                  className="text-ov-text-muted"
                  style={{ fontSize: "15px", lineHeight: 1.6 }}
                >
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Claude Code terminal */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduce ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.15 }}
          className="flex-[1.3] w-full order-1 lg:order-2 min-w-0"
        >
          <AgenticTerminal />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}