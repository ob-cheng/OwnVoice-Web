import { motion } from "motion/react";
import type { ReactNode } from "react";
import { blurReveal, useShouldReduceMotion } from "../lib/motion-variants";

interface SectionWrapperProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  center?: boolean;
  id?: string;
  ariaLabelledBy?: string;
  /** Optional icon rendered above the accent bar */
  icon?: ReactNode;
  /** Per-section accent color — defaults to OwnVoice blue */
  accentColor?: string;
}

const DEFAULT_ACCENT = "var(--ov-accent)";

export function SectionWrapper({
  title,
  subtitle,
  children,
  center = true,
  id,
  ariaLabelledBy,
  icon,
  accentColor = DEFAULT_ACCENT,
}: SectionWrapperProps) {
  const reduce = useShouldReduceMotion();
  const titleId = ariaLabelledBy || (id ? `${id}-title` : undefined);

  return (
    <section
      id={id}
      className="py-[72px] md:py-[120px] px-6"
      aria-labelledby={titleId}
    >
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.08 }}
        className={`max-w-[980px] mx-auto ${center ? "text-center" : ""}`}
      >
        {title && (
          <>
            {/* Icon — semantic section identifier */}
            {icon && (
              <motion.div
                initial={reduce ? {} : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={center ? "flex justify-center" : ""}
                style={{ marginBottom: 14, color: accentColor }}
              >
                {icon}
              </motion.div>
            )}

            {/* Accent bar — Apple-style visual anchor */}
            <motion.div
              initial={reduce ? {} : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: icon ? 0.05 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
              className={center ? "mx-auto" : ""}
              style={{
                width: 32,
                height: 3,
                borderRadius: 2,
                backgroundColor: accentColor,
                marginBottom: 20,
                transformOrigin: "center",
              }}
            />

            <motion.h2
              id={titleId}
              initial={reduce ? {} : blurReveal.hidden}
              whileInView={blurReveal.visible}
              transition={reduce ? { duration: 0 } : undefined}
              viewport={{ once: true, amount: 0.2 }}
              className="text-ov-text-primary mb-5"
              style={{
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              {(() => {
                // Strip trailing period for processing, we'll re-add it accented
                const hasPeriod = title.endsWith(".");
                const base = hasPeriod ? title.slice(0, -1) : title;

                // Split on "OwnVoice" and render surrounding text slightly dimmer
                const parts = base.split(/(OwnVoice)/);
                return (
                  <>
                    {parts.map((part, i) =>
                      part === "OwnVoice" ? (
                        <span key={i} style={{ color: "#FFFFFF" }}>
                          {part}
                        </span>
                      ) : (
                        <span key={i} style={{ opacity: 0.85 }}>
                          {part}
                        </span>
                      )
                    )}
                    {hasPeriod && (
                      <span style={{ color: accentColor }}>.</span>
                    )}
                  </>
                );
              })()}
            </motion.h2>
          </>
        )}
        {subtitle && (
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-ov-text-secondary max-w-[560px] mx-auto"
            style={{ fontSize: "18px", lineHeight: 1.6, letterSpacing: "-0.005em" }}
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </motion.div>
    </section>
  );
}