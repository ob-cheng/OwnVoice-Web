import { BrandLogo } from "./BrandLogo";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-ov-border-subtle py-8 px-6" role="contentinfo">
      <div className="max-w-[980px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-ov-text-muted" style={{ fontSize: "13px" }}>
          &copy; 2026 <BrandLogo /> &middot; Open-source AI dictation by BitBridges
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            GitHub
          </a>
          <Link
            to="/license"
            className="text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            License
          </Link>
          <Link
            to="/privacy"
            className="text-ov-text-muted hover:text-ov-text-secondary transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}