import { motion } from "motion/react";
import { SectionWrapper } from "./SectionWrapper";
import { Github, FileCode2, Folder, FileText, Eye } from "lucide-react";
import {
  useShouldReduceMotion,
  staggerContainer,
  staggerLine,
} from "../lib/motion-variants";

const codeLines = [
  '  import { transcribe } from "ownvoice";',
  "",
  "  const engine = await transcribe.init({",
  '    model: "ownvoice-large",',
  '    device: "local",',
  "    quantization: true,",
  "  });",
  "",
  "  const result = await engine.process(audioBuffer);",
  "  // Everything stays on your machine.",
];

const fileTree = [
  { depth: 0, name: "ownvoice/", isDir: true },
  { depth: 1, name: "src/", isDir: true },
  { depth: 2, name: "transcriber.ts", isDir: false },
  { depth: 2, name: "models/", isDir: true },
  { depth: 3, name: "ownvoice-large.bin", isDir: false },
  { depth: 1, name: "LICENSE (MIT)", isDir: false },
  { depth: 1, name: "README.md", isDir: false },
];

export function TransparencySection() {
  const reduce = useShouldReduceMotion();

  return (
    <SectionWrapper
      title="Don't Trust. Verify."
      id="transparency"
      icon={<Eye size={28} strokeWidth={1.5} />}
      accentColor="#BF5AF2"
    >
      <div className="mt-14 flex flex-col lg:flex-row items-stretch gap-6 max-w-[920px] mx-auto text-left">
        {/* Code snippet */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex-1 w-full flex flex-col"
          role="region"
          aria-label="Example code snippet"
        >
          <div className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] overflow-hidden flex flex-col flex-1">
            {/* Code header */}
            <div className="flex items-center gap-2.5 px-6 py-3.5 border-b border-ov-border-subtle">
              <FileCode2 size={15} className="text-ov-text-muted" />
              <span className="text-ov-text-muted" style={{ fontSize: "14px" }}>
                transcriber.ts
              </span>
            </div>
            {/* Code body */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reduce ? {} : staggerContainer(0.05)}
              className="p-6 overflow-x-auto flex-1"
            >
              <pre>
                <code>
                  {codeLines.map((line, i) => (
                    <motion.div key={i} variants={reduce ? {} : staggerLine}>
                      <span
                        className="text-ov-text-muted mr-5 select-none inline-block w-6 text-right tabular-nums"
                        style={{ fontSize: "14px" }}
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: line.includes("//")
                            ? "var(--ov-text-muted)"
                            : line.includes('"')
                            ? "#BF5AF2"
                            : "var(--ov-text-secondary)",
                        }}
                      >
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>

        {/* File tree + CTA */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="lg:w-[300px] w-full flex flex-col gap-5"
        >
          {/* File tree */}
          <div className="bg-ov-bg-surface border border-ov-border-subtle rounded-[16px] p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <Folder size={15} style={{ color: "#BF5AF2" }} />
              <span className="text-ov-text-muted" style={{ fontSize: "14px", fontWeight: 500 }}>
                Project structure
              </span>
            </div>
            {fileTree.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-[4px]"
                style={{ paddingLeft: `${item.depth * 16}px` }}
              >
                {item.isDir ? (
                  <Folder size={14} className="flex-shrink-0" style={{ color: "#BF5AF2" }} />
                ) : (
                  <FileText size={14} className="text-ov-text-muted flex-shrink-0" />
                )}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: item.isDir ? 500 : 400,
                    color: item.isDir ? "var(--ov-text-secondary)" : "var(--ov-text-muted)",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* GitHub CTA */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-[12px] border border-ov-border-subtle text-ov-text-secondary hover:text-ov-text-primary hover:border-ov-text-muted transition-all duration-200 cursor-pointer focus:outline-[3px] focus:outline-ov-focus focus:outline-offset-2"
            style={{ fontSize: "15px", fontWeight: 500 }}
            aria-label="View OwnVoice source code on GitHub"
            role="button"
          >
            <Github size={17} />
            View Source on GitHub
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}