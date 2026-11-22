import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** Line — diamond — line divider that draws outward from the centre. */
export const Divider: React.FC<{ width?: number; delay?: number; duration?: number }> = ({
  width = 520,
  delay = 0,
  duration = 30,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const half = (width / 2 - 18) * p;
  return (
    <svg width={width} height="24" viewBox={`0 0 ${width} 24`} style={{ display: "block", margin: "0 auto" }}>
      <line x1={width / 2 - 14} y1="12" x2={width / 2 - 14 - half} y2="12" stroke={colors.gold} strokeWidth="1.5" />
      <line x1={width / 2 + 14} y1="12" x2={width / 2 + 14 + half} y2="12" stroke={colors.gold} strokeWidth="1.5" />
      <rect
        x={width / 2 - 6}
        y="6"
        width="12"
        height="12"
        transform={`rotate(45 ${width / 2} 12)`}
        fill="none"
        stroke={colors.gold}
        strokeWidth="1.5"
        opacity={p}
      />
    </svg>
  );
};
