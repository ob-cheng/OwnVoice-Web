import { motion } from "motion/react";
import { useShouldReduceMotion } from "../lib/motion-variants";

/* ---------- SVG Logo Icons ---------- */
function OpenAIIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.28 9.37a6.45 6.45 0 0 0-.55-5.3A6.52 6.52 0 0 0 14.7.64a6.47 6.47 0 0 0-4.88-2.2h-.05a6.47 6.47 0 0 0-6.14 4.41 6.45 6.45 0 0 0-2.85 3.1 6.52 6.52 0 0 0 .8 6.85 6.45 6.45 0 0 0 .55 5.3A6.52 6.52 0 0 0 9.3 21.56a6.47 6.47 0 0 0 4.88 2.2h.05a6.47 6.47 0 0 0 6.14-4.41 6.45 6.45 0 0 0 2.85-3.1 6.52 6.52 0 0 0-.8-6.85l-.14-.03Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M12 7.5v9M8.5 10.5 12 7.5l3.5 3M8.5 13.5 12 16.5l3.5-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodexIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M9 8 6 12l3 4M15 8l3 4-3 4M13 7l-2 10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.34Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.51c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M6.42 13.9A6.01 6.01 0 0 1 6.1 12c0-.66.11-1.3.32-1.9V7.5H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.5l3.36-2.6Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12 5.98c1.47 0 2.78.5 3.82 1.5l2.86-2.87A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.94 5.5l3.36 2.6c.78-2.36 2.98-4.12 5.58-4.12Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function AntigravityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M12 16V8M9 11l3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function OpenCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2-2 2.5.99.5 2 1 2 2.5v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2 2 2.5-1 .5-2 1-2 2.5v2c0 2-1 3-3 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

const logos = [
  { name: "OpenAI", icon: <OpenAIIcon /> },
  { name: "Codex", icon: <CodexIcon /> },
  { name: "Google", icon: <GoogleIcon /> },
  { name: "Antigravity", icon: <AntigravityIcon /> },
  { name: "OpenCode", icon: <OpenCodeIcon /> },
];

function LogoItem({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <span
      className="flex items-center gap-2.5 flex-shrink-0 select-none text-ov-text-muted"
      style={{
        fontSize: "15px",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      <span className="flex-shrink-0 opacity-60">{icon}</span>
      {name}
    </span>
  );
}

export function LogoTicker() {
  const reduce = useShouldReduceMotion();

  // Duplicate logos enough times for seamless loop
  const allLogos = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
  ];

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.8 }}
      className="py-10 overflow-hidden"
    >
      <p
        className="text-center text-ov-text-muted mb-6"
        style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em" }}
      >
        POWERED BY
      </p>
      <div className="relative max-w-[980px] mx-auto">
        {/* Fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--ov-bg-primary), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--ov-bg-primary), transparent)",
          }}
        />

        <div
          className="flex items-center gap-12"
          style={{
            animation: reduce ? "none" : "ticker 25s linear infinite",
            width: "max-content",
          }}
        >
          {allLogos.map((logo, i) => (
            <LogoItem
              key={`${logo.name}-${i}`}
              name={logo.name}
              icon={logo.icon}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}
