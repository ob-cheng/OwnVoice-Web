import { motion } from "motion/react";
import { SectionWrapper } from "./SectionWrapper";
import { Check, Minus, Cpu, DollarSign, Code, Layers, Shield, SlidersHorizontal } from "lucide-react";
import { useShouldReduceMotion } from "../lib/motion-variants";
import type { ReactNode } from "react";
import { BrandLogo } from "./BrandLogo";

const rows: {
  category: string;
  old: string;
  own: string;
  oldIcon: ReactNode;
  ownIcon: ReactNode;
}[] = [
  {
    category: "Processing",
    old: "Cloud-only",
    own: "Local-first",
    oldIcon: <Minus size={14} className="text-ov-text-muted" />,
    ownIcon: <Cpu size={14} style={{ color: "#64D2FF" }} />,
  },
  {
    category: "Cost",
    old: "$120+/year",
    own: "$0 self-host",
    oldIcon: <DollarSign size={14} className="text-ov-text-muted" />,
    ownIcon: <Check size={14} style={{ color: "#64D2FF" }} />,
  },
  {
    category: "Source code",
    old: "Closed source",
    own: "Open-source",
    oldIcon: <Minus size={14} className="text-ov-text-muted" />,
    ownIcon: <Code size={14} style={{ color: "#64D2FF" }} />,
  },
  {
    category: "Privacy",
    old: "Data sent to servers",
    own: "Never leaves device",
    oldIcon: <Minus size={14} className="text-ov-text-muted" />,
    ownIcon: <Shield size={14} style={{ color: "#64D2FF" }} />,
  },
  {
    category: "Flexibility",
    old: "Vendor lock-in",
    own: "API optional",
    oldIcon: <Minus size={14} className="text-ov-text-muted" />,
    ownIcon: <Layers size={14} style={{ color: "#64D2FF" }} />,
  },
];

export function ComparisonTable() {
  const reduce = useShouldReduceMotion();

  return (
    <SectionWrapper
      title="The Difference Is Control."
      id="comparison"
      icon={<SlidersHorizontal size={28} strokeWidth={1.5} />}
      accentColor="#64D2FF"
    >
      {/* Desktop table */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 max-w-[780px] mx-auto hidden sm:block"
      >
        <div className="overflow-hidden rounded-[16px] border border-ov-border-subtle">
          <table className="w-full border-collapse" role="table">
            <thead>
              <tr>
                <th
                  className="w-[140px] px-6 py-4 text-left border-b border-r border-ov-border-subtle bg-ov-bg-surface"
                  scope="col"
                >
                  <span className="text-ov-text-muted" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>
                    CATEGORY
                  </span>
                </th>
                <th className="px-6 py-4 text-left border-b border-r border-ov-border-subtle bg-ov-bg-surface" scope="col">
                  <span className="text-ov-text-muted" style={{ fontSize: "14px", fontWeight: 500 }}>
                    Traditional Apps
                  </span>
                </th>
                <th
                  className="px-6 py-4 text-left border-b border-ov-border-subtle bg-ov-bg-surface"
                  scope="col"
                  style={{ backgroundColor: "rgba(100, 210, 255, 0.04)" }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF" }}>
                    <BrandLogo />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="group"
                  style={{
                    borderBottom: index < rows.length - 1 ? "1px solid var(--ov-border-subtle)" : "none",
                  }}
                >
                  <td
                    className="px-6 py-4 border-r border-ov-border-subtle"
                    style={{ fontSize: "13px", fontWeight: 500, color: "var(--ov-text-muted)" }}
                  >
                    {row.category}
                  </td>
                  <td
                    className="px-6 py-4 border-r border-ov-border-subtle text-ov-text-muted"
                    style={{ fontSize: "15px" }}
                  >
                    <div className="flex items-center gap-2.5">
                      {row.oldIcon}
                      {row.old}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-ov-text-primary"
                    style={{ fontSize: "15px", fontWeight: 500, backgroundColor: "rgba(100, 210, 255, 0.04)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span style={{ color: "#64D2FF" }}>{row.ownIcon}</span>
                      {row.own}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.p
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-ov-text-muted text-center mt-7"
          style={{ fontSize: "15px" }}
        >
          Every advantage — without taking anything from you.
        </motion.p>
      </motion.div>

      {/* Mobile stacked cards */}
      <div className="mt-14 sm:hidden space-y-3 max-w-[440px] mx-auto">
        {rows.map((row, index) => (
          <motion.div
            key={index}
            initial={reduce ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.4,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-ov-bg-surface border border-ov-border-subtle rounded-[14px] p-5"
          >
            <span className="text-ov-text-muted mb-2.5 block" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em" }}>
              {row.category.toUpperCase()}
            </span>
            <div className="flex items-center gap-2.5 mb-2">
              {row.oldIcon}
              <span className="text-ov-text-muted line-through" style={{ fontSize: "15px" }}>
                {row.old}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {row.ownIcon}
              <span className="text-ov-text-primary" style={{ fontSize: "16px", fontWeight: 500 }}>
                {row.own}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}