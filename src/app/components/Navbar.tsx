import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Github, Menu, X } from "lucide-react";
import { useShouldReduceMotion } from "../lib/motion-variants";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Compare", href: "#comparison" },
  { label: "Source", href: "#transparency" },
];

export function Navbar() {
  const reduce = useShouldReduceMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={reduce ? {} : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-ov-border-subtle"
        style={{
          backgroundColor: "rgba(15, 17, 19, 0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[980px] mx-auto px-6 h-[48px] flex items-center justify-between">
          <Link
            to="/"
            className="text-ov-text-primary tracking-tight"
            style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.01em" }}
            aria-label="OwnVoice home"
          >
            <BrandLogo />
          </Link>
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-ov-text-secondary hover:text-ov-text-primary transition-colors duration-200"
                style={{ fontSize: "14px", fontWeight: 400 }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ov-text-secondary hover:text-ov-text-primary transition-colors duration-200"
              aria-label="View OwnVoice on GitHub"
            >
              <Github size={17} />
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-ov-text-secondary hover:text-ov-text-primary transition-colors duration-200 -mr-1 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 sm:hidden"
            style={{ backgroundColor: "rgba(15, 17, 19, 0.96)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-ov-text-primary transition-colors duration-200"
                  style={{ fontSize: "24px", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-ov-text-secondary hover:text-ov-text-primary transition-colors duration-200 flex items-center gap-2"
                style={{ fontSize: "24px", fontWeight: 500 }}
              >
                <Github size={22} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
