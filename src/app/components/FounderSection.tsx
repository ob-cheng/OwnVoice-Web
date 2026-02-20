import { motion, useInView } from "motion/react";
import { SectionWrapper } from "./SectionWrapper";
import { Github, Linkedin, Heart, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import founderPhoto from "../../assets/0b29b1bc4772199803ec616043dfce150644a615.png";
import { useShouldReduceMotion, scaleSubtle } from "../lib/motion-variants";
import { useRef, useEffect, useCallback } from "react";

const FOUNDER_IMAGE = founderPhoto;

/* ========== 3-D Tech Stack Orbit ========== */

const RING_CONFIG = [
  { radiusX: 105, radiusY: 40, speed: 0.0055, dir: 1 },   // inner — CW
  { radiusX: 168, radiusY: 62, speed: 0.0035, dir: -1 },  // outer — CCW
];

const TECHS: { label: string; ring: number; startAngle: number }[] = [
  // Inner ring
  { label: "Whisper", ring: 0, startAngle: 0 },
  { label: "Python", ring: 0, startAngle: 90 },
  { label: "React", ring: 0, startAngle: 180 },
  { label: "PySide6", ring: 0, startAngle: 270 },
  // Outer ring
  { label: "faster-whisper", ring: 1, startAngle: 0 },
  { label: "Vite", ring: 1, startAngle: 72 },
  { label: "Tailwind", ring: 1, startAngle: 144 },
  { label: "Radix UI", ring: 1, startAngle: 216 },
  { label: "NumPy", ring: 1, startAngle: 288 },
];

const CENTER_Z = 5; // items behind center: z < 5, in front: z > 5

const ORBIT_STYLE = `
@keyframes ov-center-glow {
  0%, 100% { box-shadow: 0 0 24px rgba(48,209,88,0.14), 0 0 64px rgba(48,209,88,0.05); }
  50%      { box-shadow: 0 0 32px rgba(48,209,88,0.24), 0 0 90px rgba(48,209,88,0.09); }
}
`;

function TechStackOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const anglesRef = useRef<number[]>(
    TECHS.map((t) => (t.startAngle * Math.PI) / 180)
  );
  const rafRef = useRef<number>(0);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const reduce = useShouldReduceMotion();

  const animate = useCallback(() => {
    const angles = anglesRef.current;
    for (let i = 0; i < TECHS.length; i++) {
      const tech = TECHS[i];
      const ring = RING_CONFIG[tech.ring];
      angles[i] += ring.speed * ring.dir;

      const el = itemRefs.current[i];
      if (!el) continue;

      const cos = Math.cos(angles[i]);
      const sin = Math.sin(angles[i]);
      const x = cos * ring.radiusX;
      const y = sin * ring.radiusY;

      // depth: sin → 1 = nearest (bottom of ellipse), -1 = farthest (top)
      const depth = sin; // [-1, 1]
      const nd = (depth + 1) / 2; // normalise to [0, 1]

      const scale = 0.62 + 0.38 * nd;
      const opacity = 0.18 + 0.82 * nd;
      const blur = (1 - nd) * 1.2; // subtle back-blur
      const zIndex = Math.round(nd * 10);

      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.filter = blur > 0.2 ? `blur(${blur}px)` : "none";
      el.style.zIndex = `${zIndex}`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (reduce || !isInView) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduce, isInView, animate]);

  // For reduced-motion: render static positions once
  useEffect(() => {
    if (!reduce || !isInView) return;
    const angles = anglesRef.current;
    for (let i = 0; i < TECHS.length; i++) {
      const tech = TECHS[i];
      const ring = RING_CONFIG[tech.ring];
      const el = itemRefs.current[i];
      if (!el) continue;
      const cos = Math.cos(angles[i]);
      const sin = Math.sin(angles[i]);
      const x = cos * ring.radiusX;
      const y = sin * ring.radiusY;
      const nd = (sin + 1) / 2;
      const scale = 0.62 + 0.38 * nd;
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = "1";
      el.style.filter = "none";
      el.style.zIndex = `${Math.round(nd * 10)}`;
    }
  }, [reduce, isInView]);

  const containerSize = (RING_CONFIG[1].radiusX + 50) * 2;

  return (
    <>
      <style>{ORBIT_STYLE}</style>
      <div
        ref={containerRef}
        className="flex items-center justify-center"
        style={{ width: "100%", maxWidth: `${containerSize}px`, margin: "0 auto" }}
      >
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : reduce ? {} : { opacity: 0, scale: 0.9 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
        >
          {/* --- Elliptical track lines --- */}
          {RING_CONFIG.map((ring, ri) => (
            <svg
              key={ri}
              className="absolute top-1/2 left-1/2"
              style={{
                width: `${ring.radiusX * 2}px`,
                height: `${ring.radiusY * 2}px`,
                transform: "translate(-50%, -50%)",
                overflow: "visible",
              }}
            >
              <ellipse
                cx={ring.radiusX}
                cy={ring.radiusY}
                rx={ring.radiusX}
                ry={ring.radiusY}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                strokeDasharray={ri === 0 ? "none" : "3 6"}
              />
            </svg>
          ))}

          {/* --- Center logo mark --- */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: "68px",
              height: "68px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle at 40% 40%, rgba(48,209,88,0.14), rgba(10,132,255,0.06) 70%, transparent)",
              border: "1px solid rgba(48,209,88,0.16)",
              zIndex: CENTER_Z,
              animation: reduce ? "none" : "ov-center-glow 4s ease-in-out infinite",
            }}
          >
            <span
              style={{
                fontSize: "21px",
                fontWeight: 700,
                color: "#F5F7FA",
                letterSpacing: "-0.03em",
              }}
            >
              OV<span style={{ color: "#30D158" }}>.</span>
            </span>
          </div>

          {/* --- Orbiting tech pills --- */}
          {TECHS.map((tech, i) => (
            <div
              key={tech.label}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                opacity: 0,
                willChange: "transform, opacity, filter",
                pointerEvents: "none",
              }}
            >
              <span
                className="block whitespace-nowrap select-none"
                style={{
                  fontSize: "11px",
                  fontWeight: 550,
                  color:
                    tech.ring === 0
                      ? "var(--ov-text-secondary)"
                      : "var(--ov-text-muted)",
                  background:
                    tech.ring === 0
                      ? "var(--ov-bg-elevated)"
                      : "var(--ov-bg-surface)",
                  border: `1px solid ${
                    tech.ring === 0
                      ? "var(--ov-border-subtle)"
                      : "rgba(255,255,255,0.035)"
                  }`,
                  borderRadius: "8px",
                  padding: "4px 10px",
                  letterSpacing: "0.01em",
                  backdropFilter: "blur(8px)",
                }}
              >
                {tech.label}
              </span>
            </div>
          ))}

          {/* --- Subtle label --- */}
          <motion.span
            initial={reduce ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : reduce ? {} : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.9 }}
            className="absolute text-ov-text-muted text-center w-full"
            style={{
              bottom: "-4px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}
          >
            Tech Stack
          </motion.span>
        </motion.div>
      </div>
    </>
  );
}

/* ========== Founder Section ========== */

export function FounderSection() {
  const reduce = useShouldReduceMotion();

  return (
    <SectionWrapper
      title="Built by Engineers Who Care."
      id="founder"
      icon={<Heart size={28} strokeWidth={1.5} />}
      accentColor="#FF375F"
    >
      <div className="mt-16 max-w-[920px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Left: Portrait + Bio — editorial, warm */}
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-[360px]">
          <motion.div
            initial={reduce ? {} : scaleSubtle.hidden}
            whileInView={reduce ? {} : scaleSubtle.visible(0)}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Warm accent glow behind avatar */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-12px",
                  background:
                    "radial-gradient(circle, rgba(255,55,95,0.10) 0%, rgba(255,55,95,0.03) 60%, transparent 100%)",
                  filter: "blur(8px)",
                }}
              />
              <div
                className="relative w-[120px] h-[120px] md:w-[148px] md:h-[148px] rounded-full overflow-hidden"
                style={{
                  border: "1.5px solid rgba(255,55,95,0.15)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                <ImageWithFallback
                  src={FOUNDER_IMAGE}
                  alt="Portrait of Tianen Cheng, founder of OwnVoice."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Name */}
            <p
              className="text-ov-text-primary"
              style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Tianen Cheng
            </p>

            {/* Role — small, tracked, muted */}
            <p
              className="text-ov-text-muted"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                marginTop: "6px",
                textTransform: "uppercase",
              }}
            >
              Founder &amp; Lead Engineer
            </p>

            {/* Accent divider — ties to section accentColor */}
            <div
              className="mx-auto lg:mx-0"
              style={{
                width: "28px",
                height: "2px",
                borderRadius: "1px",
                background: "rgba(255,55,95,0.35)",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            />

            {/* Bio */}
            <p
              className="text-ov-text-secondary"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              Passionate about open systems and user autonomy — building the
              tools he wished existed.
            </p>

            {/* Quote — editorial treatment */}
            <p
              className="text-ov-text-muted"
              style={{ fontSize: "15px", lineHeight: 1.7, marginTop: "12px" }}
            >
              <span style={{ color: "rgba(255,55,95,0.45)", fontStyle: "normal" }}>
                &ldquo;
              </span>
              If it&apos;s your voice, it should stay yours.
              <span style={{ color: "rgba(255,55,95,0.45)", fontStyle: "normal" }}>
                &rdquo;
              </span>
            </p>

            {/* Social — icon-only, clean */}
            <div className="flex items-center gap-1.5 pt-6 justify-center lg:justify-start">
              {[
                {
                  href: "https://github.com",
                  label: "GitHub",
                  icon: <Github size={15} strokeWidth={1.6} />,
                },
                {
                  href: "https://www.linkedin.com/in/tianen-cheng",
                  label: "LinkedIn",
                  icon: <Linkedin size={15} strokeWidth={1.6} />,
                },
                {
                  href: "mailto:its_tianen@icloud.com?subject=OwnVoice%20feedback",
                  label: "Email",
                  icon: <Mail size={15} strokeWidth={1.6} />,
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="flex items-center justify-center rounded-full text-ov-text-muted transition-all duration-200 hover:text-ov-text-primary hover:bg-white/[0.04]"
                  style={{ width: "36px", height: "36px" }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: 3-D Tech Stack Orbit — slightly wider flex */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 0.8,
            delay: reduce ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full"
          style={{ flex: "1.2" }}
        >
          <TechStackOrbit />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}