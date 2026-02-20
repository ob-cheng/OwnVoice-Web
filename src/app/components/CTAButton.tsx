import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  size?: "default" | "large";
}

export function CTAButton({
  children,
  variant = "primary",
  onClick,
  href,
  ariaLabel,
  size = "default",
}: CTAButtonProps) {
  const sizeClasses = size === "large" ? "px-7 py-3.5" : "px-5 py-2.5";

  const baseClasses = `inline-flex items-center justify-center gap-2 ${sizeClasses} rounded-[10px] transition-all duration-200 cursor-pointer`;

  const variantClasses =
    variant === "primary"
      ? "bg-ov-accent text-white hover:bg-ov-accent-hover"
      : "bg-transparent border border-ov-border-subtle text-ov-text-secondary hover:text-ov-text-primary hover:border-ov-text-muted";

  const focusClasses =
    "focus:outline-[3px] focus:outline-ov-focus focus:outline-offset-2";

  const fontSize = size === "large" ? "16px" : "15px";

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses} ${focusClasses}`}
        style={{ fontSize, fontWeight: 500, letterSpacing: "-0.01em" }}
        aria-label={ariaLabel}
        role="button"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${focusClasses}`}
      style={{ fontSize, fontWeight: 500, letterSpacing: "-0.01em" }}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
