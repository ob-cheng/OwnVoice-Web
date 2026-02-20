import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";
import { useShouldReduceMotion } from "../lib/motion-variants";

const ACCENT = "#30D158";

const COMMITMENT_ITEMS = [
  {
    title: "Local First",
    description:
      "All speech recognition and transcription happens entirely on your device. Your audio never leaves your machine — not even temporarily.",
  },
  {
    title: "No Tracking",
    description:
      "OwnVoice contains no analytics SDKs, no tracking pixels, and no behavioral profiling. We don't know how you use the app, and we prefer it that way.",
  },
  {
    title: "No Cloud Storage",
    description:
      "Your recordings, transcriptions, and personal data are stored locally on your device. We operate no cloud infrastructure that processes or retains your content.",
  },
  {
    title: "Your Data, Your Control",
    description:
      "Everything OwnVoice creates lives in a folder you can see, move, back up, or delete. There are no hidden caches, no remote syncs, and no account required.",
  },
];

const PRIVACY_SECTIONS = [
  {
    heading: "Information We Collect",
    body: "OwnVoice is designed to collect as little information as possible. The desktop application collects no personal data whatsoever — no account creation, no email addresses, no usage telemetry. When you visit this website, our hosting provider may log standard web server information (IP address, browser type, pages visited) for security and operational purposes. We do not combine this data with any other source or use it for profiling.",
  },
  {
    heading: "How Your Data Is Processed",
    body: "By default, all speech-to-text processing is performed locally on your device using open-source AI models that run without an internet connection. Your audio input is processed in real time, converted to text, and immediately discarded from memory. Transcriptions are saved only to your local file system, in a location you choose. When using the default local mode, no audio or text data ever transits through our servers or any third-party service. If you choose to enable a cloud-based API provider, see section 04 below.",
  },
  {
    heading: "Third-Party Services",
    body: "OwnVoice may periodically check for software updates by contacting our update server. This request includes only the application version number and your operating system — no personally identifiable information. We do not integrate any third-party analytics, advertising, or crash reporting services. The AI models used for local transcription are bundled with the application and do not communicate externally.",
  },
  {
    heading: "Optional Cloud API Usage",
    body: "OwnVoice gives you the option to connect your own API key for third-party cloud speech or language services such as OpenAI, Microsoft Azure, Google Cloud, or others. If you choose to enable a cloud provider, your audio and/or transcription data will be transmitted directly from your device to that provider's servers. In this case, your data is subject to the privacy policy and terms of the provider you selected — not ours. OwnVoice does not route this data through our infrastructure, does not store your API keys on our servers, and has no access to the data you exchange with these providers. We strongly recommend reviewing the privacy policy of any cloud provider before enabling this feature. This is always an explicit opt-in; OwnVoice will never send data to a cloud API without your deliberate configuration.",
  },
  {
    heading: "Cookies & Local Storage",
    body: "The OwnVoice website uses only essential cookies required for basic site functionality (such as remembering your theme preference). We do not use advertising cookies, third-party tracking cookies, or fingerprinting technologies. The desktop application uses your operating system's standard preferences storage for settings like language selection and window position — no data is stored in the cloud.",
  },
  {
    heading: "Data Retention",
    body: "Because OwnVoice does not collect personal data through the application, there is no user data for us to retain or delete on our end. Transcriptions and recordings on your device are retained until you choose to delete them. Standard web server logs for this website are automatically purged after 30 days. We have no mechanism to access, retrieve, or reconstruct any content you create with OwnVoice.",
  },
  {
    heading: "Your Rights",
    body: "Regardless of your jurisdiction, we believe you have the right to know exactly what data exists about you — and with OwnVoice, the answer is: effectively none. If you are located in the EU, UK, California, or another region with data protection legislation, you have formal rights to access, correct, delete, and port your data. Since we store no personal data server-side, these rights are inherently fulfilled. If you have enabled a cloud API provider, your rights regarding data shared with that provider are governed by their policies.",
  },
  {
    heading: "Children's Privacy",
    body: "OwnVoice does not knowingly collect any personal information from anyone, including children under the age of 13. Because the application processes all data locally and requires no account creation, there is no mechanism through which a child's data could be transmitted to us.",
  },
  {
    heading: "Changes to This Policy",
    body: "If we make material changes to this privacy policy, we will update the effective date at the top of this page and publish a summary of changes in our GitHub repository's changelog. For significant changes, we will also include a notice in the application's update notes. We encourage you to review this page periodically, though given our approach to data — collecting none — changes are expected to be infrequent.",
  },
];

export function PrivacyPage() {
  const reduce = useShouldReduceMotion();

  const transition = (delay: number) => ({
    duration: reduce ? 0 : 0.7,
    delay: reduce ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <div className="min-h-screen pt-[48px]">
      {/* ---- Hero / Header ---- */}
      <section className="px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-[680px] mx-auto">
          {/* Back link */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition(0)}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200 mb-10"
              style={{ fontSize: "13px" }}
            >
              <ArrowLeft size={14} strokeWidth={1.6} />
              Back to home
            </Link>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition(0.05)}
            className="mb-4"
            style={{ color: ACCENT }}
          >
            <Shield size={28} strokeWidth={1.5} />
          </motion.div>

          {/* Accent bar */}
          <motion.div
            initial={reduce ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={transition(0.1)}
            style={{
              width: "32px",
              height: "3px",
              borderRadius: "2px",
              backgroundColor: ACCENT,
              marginBottom: "20px",
              transformOrigin: "left",
            }}
          />

          {/* Title */}
          <motion.h1
            initial={reduce ? {} : { opacity: 0, filter: "blur(10px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={transition(0.15)}
            className="text-ov-text-primary mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Privacy<span style={{ color: ACCENT }}>.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.22)}
            className="text-ov-text-secondary"
            style={{
              fontSize: "17px",
              lineHeight: 1.65,
              maxWidth: "480px",
            }}
          >
            <BrandLogo /> was built with one belief: your voice is yours.
            Here&apos;s exactly how we protect it.
          </motion.p>

          {/* Effective date */}
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(0.28)}
            className="text-ov-text-muted mt-4"
            style={{ fontSize: "13px" }}
          >
            Effective date: February 20, 2026
          </motion.p>
        </div>
      </section>

      {/* ---- "Our Commitments" summary cards ---- */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-[680px] mx-auto">
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(0.3)}
            className="text-ov-text-muted mb-6"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Our Commitments
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMMITMENT_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition(0.35 + i * 0.06)}
                className="rounded-xl p-5"
                style={{
                  background: "var(--ov-bg-surface)",
                  border: "1px solid var(--ov-border-subtle)",
                }}
              >
                <p
                  className="text-ov-text-primary mb-2"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  {item.title}
                </p>
                <p
                  className="text-ov-text-muted"
                  style={{ fontSize: "13px", lineHeight: 1.6 }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      {/* ---- Full Policy Text ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[680px] mx-auto">
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={transition(0)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-ov-text-muted mb-8"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Full Privacy Policy
          </motion.p>

          <div className="space-y-10">
            {PRIVACY_SECTIONS.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={transition(0.05)}
                viewport={{ once: true, amount: 0.15 }}
              >
                <h2
                  className="text-ov-text-primary mb-3"
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span
                    className="text-ov-text-muted"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      marginRight: "8px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <p
                  className="text-ov-text-secondary"
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    paddingLeft: "30px",
                  }}
                >
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <div className="max-w-[680px] mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "var(--ov-border-subtle)" }}
        />
      </div>

      <section className="px-6 py-14 md:py-20">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition(0)}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-[680px] mx-auto flex items-center justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            <ArrowLeft size={14} strokeWidth={1.6} />
            Back to home
          </Link>
        </motion.div>
      </section>
    </div>
  );
}