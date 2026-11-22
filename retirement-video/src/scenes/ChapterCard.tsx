import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Divider } from "../components/Ornament";
import { enter } from "../components/motion";
import { colors, fonts } from "../theme";

export type ChapterCardProps = { number: number; title: string; titleEn: string };

/** Section break: large chapter numeral, Thai title, English subtitle. Reusable. */
export const ChapterCard: React.FC<ChapterCardProps> = ({ number, title, titleEn }) => {
  const frame = useCurrentFrame();
  const numScale = interpolate(frame, [0, 120], [1.04, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", color: colors.ink }}>
        <div style={{ ...enter(frame, 0), fontFamily: fonts.english, fontStyle: "italic", fontSize: 40, color: colors.gold, letterSpacing: 6 }}>
          Chapter
        </div>
        <div
          style={{
            ...enter(frame, 6, 20),
            fontFamily: fonts.english,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 230,
            lineHeight: 1,
            color: colors.gold,
            transform: `scale(${numScale})`,
          }}
        >
          {String(number).padStart(2, "0")}
        </div>
        <div style={{ marginTop: 10 }}>
          <Divider width={420} delay={16} />
        </div>
        <div style={{ ...enter(frame, 24), fontFamily: fonts.thaiHeading, fontWeight: 700, fontSize: 84, marginTop: 30, lineHeight: 1.3 }}>
          {title}
        </div>
        <div style={{ ...enter(frame, 36), fontFamily: fonts.english, fontStyle: "italic", fontSize: 46, color: colors.inkSoft, marginTop: 8 }}>
          {titleEn}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
