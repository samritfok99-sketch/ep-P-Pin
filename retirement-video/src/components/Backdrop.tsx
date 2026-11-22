import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

/** Cream paper with a very faint line pattern. */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.cream }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
      <defs>
        <pattern id="lines" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="36" stroke={colors.ink} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lines)" />
    </svg>
  </AbsoluteFill>
);
