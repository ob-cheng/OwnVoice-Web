import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { CTAButton } from "./CTAButton";
import { Monitor, Github } from "lucide-react";
import { useShouldReduceMotion, blurReveal } from "../lib/motion-variants";

export function FinalCTA() {
  const reduce = useShouldReduceMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasPulsed, setHasPulsed] = useState(false);

  useEffect(() => {
    if (isInView && !hasPulsed) {
      const timer = setTimeout(() => setHasPulsed(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasPulsed]);

  return (
    <section className="px-6 py-[72px] md:py-[120px]">
      <div
        ref={ref}
        className="max-w-[980px] mx-auto bg-ov-bg-surface border border-ov-border-subtle rounded-[20px] py-16 md:py-20 px-8 text-center"
      >
        <motion.h2
          initial={reduce ? {} : blurReveal.hidden}
          whileInView={blurReveal.visible}
          transition={reduce ? { duration: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          className="text-ov-text-primary mb-4"
          style={{
            fontSize: "clamp(26px, 4.5vw, 40px)",
            fontWeight: 600, lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Take Back Control of Your Voice.
        </motion.h2>

        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-ov-text-secondary mb-10 mx-auto"
          style={{ fontSize: "17px", lineHeight: 1.55, maxWidth: "460px" }}
        >
          Free, open-source, and built for people who value their privacy.
        </motion.p>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <motion.div
              animate={isInView && !hasPulsed && !reduce ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CTAButton variant="primary" size="large" href="/download" ariaLabel="Download OwnVoice for Windows">
                <Monitor size={19} />
                Download for Windows
              </CTAButton>
            </motion.div>
            <CTAButton variant="secondary" size="large" href="https://github.com" ariaLabel="Explore OwnVoice source code on GitHub">
              <Github size={19} />
              Explore on GitHub
            </CTAButton>
          </div>
          <span className="text-ov-text-muted" style={{ fontSize: "14px" }}>
            macOS support coming soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
