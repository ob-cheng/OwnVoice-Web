import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { BrandLogo } from "./BrandLogo";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  blurReveal,
  useShouldReduceMotion,
} from "../lib/motion-variants";

/* ---------- Data ---------- */
const MONTHLY_COST = 12;
const YEARS = 5;

const chartData = Array.from({ length: YEARS * 12 + 1 }, (_, i) => ({
  month: i,
  label:
    i === 0
      ? "Now"
      : i % 12 === 0
        ? `Year ${i / 12}`
        : "",
  others: i * MONTHLY_COST,
  ownvoice: 0,
}));

// Only show ticked labels
const tickedData = chartData.filter(
  (d) => d.month === 0 || d.month % 12 === 0
);

/* ---------- Custom Tooltip ---------- */
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const month = payload[0]?.payload?.month ?? 0;
  const otherCost = payload[0]?.payload?.others ?? 0;
  const years = Math.floor(month / 12);
  const months = month % 12;
  const timeLabel =
    month === 0
      ? "Start"
      : years > 0 && months > 0
        ? `${years}y ${months}mo`
        : years > 0
          ? `${years} year${years > 1 ? "s" : ""}`
          : `${months} month${months > 1 ? "s" : ""}`;

  return (
    <div
      className="rounded-[10px] border border-ov-border-subtle px-4 py-3"
      style={{ backgroundColor: "var(--ov-bg-surface)" }}
    >
      <p className="text-ov-text-muted mb-1" style={{ fontSize: "12px" }}>
        {timeLabel}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgba(239,68,68,0.7)" }}
          />
          <span
            className="text-ov-text-secondary tabular-nums"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            ${otherCost}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-ov-accent" />
          <span
            className="text-ov-accent tabular-nums"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            $0
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cost Visualization ---------- */
function CostVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useShouldReduceMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isInView && !revealed) {
      const t = setTimeout(() => setRevealed(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView, revealed]);

  const displayData =
    revealed || reduce
      ? chartData
      : chartData.map((d) => ({ ...d, others: 0 }));

  return (
    <div ref={ref} className="w-full">
      {/* Chart */}
      <div
        className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-ov-border-subtle flex items-center justify-between">
          <span
            className="text-ov-text-primary"
            style={{ fontSize: "17px", fontWeight: 600 }}
          >
            Total cost over time
          </span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-[3px] rounded-full"
                style={{ backgroundColor: "rgba(239,68,68,0.6)" }}
              />
              <span className="text-ov-text-muted" style={{ fontSize: "13px" }}>
                Typical app
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-[3px] rounded-full bg-ov-accent" />
              <span className="text-ov-text-muted" style={{ fontSize: "13px" }}>
                <BrandLogo />
              </span>
            </div>
          </div>
        </div>

        {/* Area chart */}
        <div className="px-2 pt-6 pb-2">
          <ResponsiveContainer width="100%" height={300} minWidth={0}>
            <AreaChart
              data={displayData}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="rgba(239,68,68,0.25)"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(239,68,68,0.02)"
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                ticks={[0, 12, 24, 36, 48, 60]}
                tickFormatter={(v) =>
                  v === 0
                    ? "Now"
                    : `Year ${v / 12}`
                }
                tick={{ fill: "var(--ov-text-muted)", fontSize: 12 }}
                axisLine={{ stroke: "var(--ov-border-subtle)" }}
                tickLine={false}
                dy={8}
              />
              <YAxis
                tick={{ fill: "var(--ov-text-muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
                width={55}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "var(--ov-border-subtle)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                type="monotone"
                dataKey="others"
                stroke="rgba(239,68,68,0.7)"
                strokeWidth={2}
                fill="url(#costFill)"
                animationDuration={reduce ? 0 : 1800}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="ownvoice"
                stroke="var(--ov-accent)"
                strokeWidth={2}
                fill="transparent"
                animationDuration={reduce ? 0 : 800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom stats */}
        <div className="px-6 py-4 border-t border-ov-border-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ov-text-muted" style={{ fontSize: "13px" }}>
                5 years with a typical AI dictation app
              </p>
              <p
                className="tabular-nums mt-0.5"
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "rgba(239,68,68,0.8)",
                  letterSpacing: "-0.02em",
                }}
              >
                {revealed || reduce ? (
                  <CountUp end={720} duration={1.2} prefix="$" useEasing />
                ) : (
                  "$0"
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-ov-text-muted" style={{ fontSize: "13px" }}>
                5 years with OwnVoice
              </p>
              <p
                className="text-ov-accent tabular-nums mt-0.5"
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                $0
              </p>
            </div>
          </div>

          {/* Savings callout */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 4 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduce ? 0 : 0.5,
              delay: reduce ? 0 : 1.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 rounded-[10px] px-5 py-3 flex items-center justify-between"
            style={{ backgroundColor: "var(--ov-accent-soft)" }}
          >
            <span className="text-ov-text-secondary" style={{ fontSize: "14px" }}>
              You save
            </span>
            <span
              className="text-ov-accent tabular-nums"
              style={{ fontSize: "17px", fontWeight: 600 }}
            >
              {revealed || reduce ? (
                <CountUp end={720} duration={1} prefix="$" delay={1.5} useEasing />
              ) : (
                "$0"
              )}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function StatCards() {
  const reduce = useShouldReduceMotion();

  return (
    <section
      id="cost"
      className="py-[72px] md:py-[120px] px-6"
      aria-labelledby="cost-title"
    >
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.08 }}
        className="max-w-[780px] mx-auto"
      >
        <motion.h2
          id="cost-title"
          initial={reduce ? {} : blurReveal.hidden}
          whileInView={blurReveal.visible}
          transition={reduce ? { duration: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          className="text-ov-text-primary mb-4 text-center"
          style={{
            fontSize: "clamp(28px, 4.5vw, 44px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Subscription After Subscription.
        </motion.h2>

        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduce ? 0 : 0.6,
            delay: reduce ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-ov-text-muted text-center mb-14 mx-auto"
          style={{ fontSize: "17px", lineHeight: 1.55, maxWidth: "520px" }}
        >
          The average AI dictation app costs ~$12/month. Here's what that adds up
          to — and what OwnVoice costs.
        </motion.p>

        <CostVisualization />
      </motion.div>
    </section>
  );
}
