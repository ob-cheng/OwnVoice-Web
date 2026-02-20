import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo } from "react";
import { useShouldReduceMotion } from "../lib/motion-variants";

const lines = [
  ["Speech", "is", "a", "fundamental", "human", "right."],
  ["Your", "voice", "are", "yours", "first."],
  ["Privacy", "should", "not", "be", "optional."],
  ["You", "deserve", "a", "choice."],
];

function ScrollWord({
  word,
  progressIndex,
  totalWords,
  scrollProgress,
}: {
  word: string;
  progressIndex: number;
  totalWords: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduce = useShouldReduceMotion();

  const wordStart = progressIndex / totalWords;
  const wordEnd = Math.min((progressIndex + 2) / totalWords, 1);

  const opacity = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [0.02, 1]
  );
  const y = useTransform(scrollProgress, [wordStart, wordEnd], [4, 0]);

  const baseStyle = {
    fontSize: "clamp(28px, 5vw, 52px)",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.025em",
  } as const;

  if (reduce) {
    return (
      <span
        className="inline-block text-ov-text-primary mr-[0.3em]"
        style={baseStyle}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      className="inline-block text-ov-text-primary mr-[0.3em]"
      style={{ ...baseStyle, opacity, y }}
    >
      {word}
    </motion.span>
  );
}

export function Declaration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useShouldReduceMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalWords = useMemo(
    () => lines.reduce((sum, line) => sum + line.length, 0),
    []
  );

  let wordCounter = 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: reduce ? undefined : "300vh",
      }}
    >
      <section
        id="philosophy"
        className="px-6"
        style={{ minHeight: "inherit" }}
        aria-labelledby="philosophy-title"
      >
        {/* Sticky viewport — inside the tall section */}
        <div
          className={
            reduce
              ? "py-20"
              : "sticky top-0 min-h-screen flex items-center justify-center"
          }
        >
          <div className="max-w-[780px] mx-auto text-center">
            <h2 id="philosophy-title" className="sr-only">
              Our Philosophy
            </h2>
            <div className="space-y-3 md:space-y-5">
              {lines.map((line, lineIdx) => (
                <div key={lineIdx} className="flex flex-wrap justify-center">
                  {line.map((word, wordIdx) => {
                    const idx = wordCounter;
                    wordCounter++;
                    return (
                      <ScrollWord
                        key={`${lineIdx}-${wordIdx}`}
                        word={word}
                        progressIndex={idx}
                        totalWords={totalWords}
                        scrollProgress={scrollYProgress}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}