import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Laptop, Cloud, Check } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { useShouldReduceMotion } from "../lib/motion-variants";

const localFeatures = [
  { text: "100% offline processing", detail: "Nothing leaves your machine" },
  { text: "Zero cloud dependency", detail: "Works without any internet connection" },
  { text: "No usage limits", detail: "Transcribe as much as you want" },
  { text: "Free forever", detail: "Open-source, no hidden costs" },
];

const cloudFeatures = [
  { text: "Switch to API mode anytime", detail: "One toggle, instant access" },
  { text: "As low as $0.06 per minute", detail: "Pay only for what you use" },
  { text: "No subscriptions required", detail: "No monthly fees, no lock-in" },
  { text: "Still end-to-end encrypted", detail: "Your data stays protected in transit" },
];

export function CloudModeSection() {
  const [isCloud, setIsCloud] = useState(false);
  const reduce = useShouldReduceMotion();

  const features = isCloud ? cloudFeatures : localFeatures;

  return (
    <SectionWrapper
      title="Need More Flexibility?"
      subtitle="Toggle between fully local and optional cloud API — always on your terms."
      id="cloud"
    >
      <div className="mt-14 max-w-[720px] mx-auto">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-5 mb-12">
          <span
            className="transition-colors duration-200 flex items-center gap-2"
            style={{
              fontSize: "16px", fontWeight: 500,
              color: !isCloud ? "var(--ov-text-primary)" : "var(--ov-text-muted)",
            }}
          >
            <Laptop size={18} />
            Local
          </span>

          <button
            role="switch"
            aria-checked={isCloud}
            aria-label={`Switch to ${isCloud ? "Local" : "Cloud"} mode`}
            onClick={() => setIsCloud(!isCloud)}
            className="relative w-[56px] h-[30px] rounded-full transition-colors duration-200 cursor-pointer focus:outline-[3px] focus:outline-ov-focus focus:outline-offset-2"
            style={{
              backgroundColor: isCloud ? "var(--ov-accent)" : "var(--ov-border-subtle)",
            }}
          >
            <motion.div
              className="absolute top-[3px] w-[24px] h-[24px] rounded-full bg-white"
              animate={{ x: isCloud ? 28 : 3 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>

          <span
            className="transition-colors duration-200 flex items-center gap-2"
            style={{
              fontSize: "16px", fontWeight: 500,
              color: isCloud ? "var(--ov-text-primary)" : "var(--ov-text-muted)",
            }}
          >
            <Cloud size={18} />
            Cloud API
          </span>
        </div>

        {/* Content panel */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden"
        >
          {/* Panel header */}
          <div className="px-7 py-5 border-b border-ov-border-subtle flex items-center gap-3">
            {isCloud ? (
              <Cloud size={20} className="text-ov-accent" />
            ) : (
              <Laptop size={20} className="text-ov-accent" />
            )}
            <span className="text-ov-text-primary" style={{ fontSize: "19px", fontWeight: 600 }}>
              {isCloud ? "Cloud API Mode" : "Local Mode"}
            </span>
          </div>

          {/* Feature list */}
          <div className="px-7 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={isCloud ? "cloud" : "local"}
                initial={reduce ? {} : { opacity: 0, x: isCloud ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? {} : { opacity: 0, x: isCloud ? -12 : 12 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                {features.map((feat) => (
                  <div key={feat.text} className="flex items-start gap-4">
                    <div className="mt-0.5 w-8 h-8 rounded-full bg-ov-accent-soft flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-ov-accent" />
                    </div>
                    <div>
                      <p className="text-ov-text-primary" style={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.4 }}>
                        {feat.text}
                      </p>
                      <p className="text-ov-text-muted mt-0.5" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                        {feat.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom summary */}
          <div className="px-7 py-4 border-t border-ov-border-subtle">
            <p className="text-ov-text-muted" style={{ fontSize: "14px" }}>
              {isCloud
                ? "Use your own API key — we never store your credentials."
                : "Everything runs on-device. Zero network requests."}
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
