import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** A small line flourish for one corner; rotated for the other three. */
const Corner: React.FC<{ rotate: number; x: number; y: number }> = ({ rotate, x, y }) => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)` }}
  >
    <path d="M4 60 L4 4 L60 4" fill="none" stroke={colors.gold} strokeWidth="1.5" />
    <path d="M14 46 L14 14 L46 14" fill="none" stroke={colors.gold} strokeWidth="1" />
    <circle cx="14" cy="14" r="3" fill={colors.gold} />
    <path d="M24 4 Q24 24 4 24" fill="none" stroke={colors.goldSoft} strokeWidth="1" />
  </svg>
);

/** Thin double gold border with corner ornaments; fades in over the first 20 frames. */
export const GoldFrame: React.FC<{ inset?: number }> = ({ inset = 44 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const b = (pad: number, w: number, o: number) => (
    <div
      style={{
        position: "absolute",
        inset: pad,
        border: `${w}px solid ${colors.gold}`,
        opacity: o,
      }}
    />
  );
  const c = inset - 12;
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      {b(inset, 1.5, 0.9)}
      {b(inset + 10, 1, 0.5)}
      <Corner rotate={0} x={c} y={c} />
      <Corner rotate={90} x={1920 - c - 90} y={c} />
      <Corner rotate={180} x={1920 - c - 90} y={1080 - c - 90} />
      <Corner rotate={270} x={c} y={1080 - c - 90} />
    </AbsoluteFill>
  );
};
