import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Scale } from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";
import { useShouldReduceMotion } from "../lib/motion-variants";

const ACCENT = "#30D158";

const SUMMARY_ITEMS = [
  {
    title: "Freedom to Use",
    description:
      "You can use OwnVoice for any purpose — personal, commercial, educational, or governmental — with no restrictions, fees, or approval needed.",
  },
  {
    title: "Freedom to Modify",
    description:
      "The full source code is available. You can inspect how every feature works, fix bugs, add capabilities, or adapt OwnVoice to your own workflow.",
  },
  {
    title: "Share Alike",
    description:
      "If you distribute a modified version of OwnVoice, you must release your changes under the same GPL-3.0 license — keeping the ecosystem open for everyone.",
  },
  {
    title: "No Warranty",
    description:
      "OwnVoice is provided as-is, without warranty of any kind. We stand behind the quality of our work, but the license does not guarantee fitness for any particular purpose.",
  },
];

const LICENSE_SECTIONS = [
  {
    heading: "Preamble",
    body: "OwnVoice is free software released under the GNU General Public License, version 3.0 (GPL-3.0). The GPL was designed to guarantee your freedom to share and change all versions of a program — to make sure it remains free software for all its users. When we say \"free,\" we mean freedom, not price. The GPL-3.0 ensures that you have the freedom to run, study, share, and modify the software, and that these freedoms are preserved for everyone who receives a copy.",
  },
  {
    heading: "Terms and Conditions",
    body: "You may copy and distribute verbatim copies of OwnVoice's source code as you receive it, in any medium, provided that you conspicuously and appropriately publish a copyright notice and disclaimer of warranty on each copy, keep intact all notices referring to this license and to the absence of any warranty, and give any other recipients of the program a copy of this license along with the program. You may charge a fee for the physical act of transferring a copy, and you may offer warranty protection in exchange for a fee.",
  },
  {
    heading: "Definitions",
    body: "\"The Program\" refers to OwnVoice and any copyrightable work licensed under the GPL-3.0. \"Source Code\" means the preferred form of the work for making modifications to it. \"Object Code\" means any non-source form of the work. \"Modified Version\" means any work containing the Program or a portion of it, either verbatim or with modifications and/or translated into another language. \"Propagate\" means to do anything with the work that requires permission under applicable copyright law, except executing it on a computer or modifying a private copy. \"Convey\" means any kind of propagation that enables other parties to make or receive copies.",
  },
  {
    heading: "Grant of Rights",
    body: "Subject to the terms of the GPL-3.0, you are granted a worldwide, royalty-free, non-exclusive license to use, copy, modify, merge, and distribute OwnVoice and its source code. You may create derivative works based on OwnVoice and distribute those derivative works, provided they are also licensed under GPL-3.0. You retain full ownership of any original code you write, but the combined work must remain under the same license. This grant of rights applies to all versions of OwnVoice's source code, whether obtained from us directly or from any other authorized source.",
  },
  {
    heading: "Conditions",
    body: "Your rights under this license are conditional on compliance with the following: (a) You must include a prominent notice in any modified files stating that you changed them, along with the date of the change. (b) You must license the entire modified work under GPL-3.0 at no charge to third parties. (c) You must make the complete corresponding source code available when you distribute the object code. (d) You must preserve all copyright notices, license texts, and warranty disclaimers. (e) You may not impose any further restrictions on the exercise of the rights granted under this license — including patents, DRM, or additional contractual obligations.",
  },
  {
    heading: "Limitation of Liability",
    body: "OwnVoice is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY — without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. In no event, unless required by applicable law or agreed to in writing, shall any contributor be liable to you for damages, including any general, special, incidental, or consequential damages arising out of the use or inability to use the program. The entire risk as to the quality and performance of the program is with you. Should the program prove defective, you assume the cost of all necessary servicing, repair, or correction.",
  },
  {
    heading: "Third-Party Components",
    body: "OwnVoice incorporates several open-source libraries and AI models, each governed by their own licenses. A complete list of third-party components, their respective licenses, and attribution notices is included in the THIRD-PARTY-NOTICES file distributed with the source code. Your use of these components is subject to their individual license terms in addition to the GPL-3.0. We have taken care to include only components with licenses compatible with the GPL-3.0.",
  },
  {
    heading: "Termination",
    body: "You may not propagate or modify OwnVoice except as expressly provided under this license. Any attempt otherwise to propagate or modify it is void, and will automatically terminate your rights under this license. However, if you cease all violation of this license, then your rights are reinstated provisionally — and permanently, if the copyright holder does not notify you of the violation within 60 days of cessation. Termination of your rights does not terminate the licenses of parties who have received copies or rights from you under this license, so long as they remain in full compliance.",
  },
];

export function LicensePage() {
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
            <Scale size={28} strokeWidth={1.5} />
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
            License<span style={{ color: ACCENT }}>.</span>
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
            <BrandLogo /> is open-source software. Here&apos;s what that means
            for you — and how you can use, modify, and share it.
          </motion.p>
        </div>
      </section>

      {/* ---- "In Plain English" summary cards ---- */}
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
            In Plain English
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUMMARY_ITEMS.map((item, i) => (
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

      {/* ---- Full License Text ---- */}
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
            Full License Text
          </motion.p>

          <div className="space-y-10">
            {LICENSE_SECTIONS.map((section, i) => (
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