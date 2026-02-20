/**
 * BrandLogo — renders "OwnVoice." with an accent-colored period.
 * Use this wherever the brand name appears as a standalone logo (not inline in a sentence).
 */
export function BrandLogo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      OwnVoice
      <span style={{ color: "#30D158" }}>.</span>
    </span>
  );
}
