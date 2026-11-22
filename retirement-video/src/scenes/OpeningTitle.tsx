import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Divider } from "../components/Ornament";
import { Polaroid } from "../components/Polaroid";
import { enter } from "../components/motion";
import { config } from "../config";
import { colors, fonts } from "../theme";

/** "Happy Retirement" + name + thank-you line + years, with an optional portrait on the left. */
export const OpeningTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const p = config.person;
  const hasPortrait = Boolean(p.portrait);
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 110,
          padding: 150,
        }}
      >
        {hasPortrait ? (
          <div style={{ ...enter(frame, 10, 40) }}>
            <Polaroid src={p.portrait} orientation="portrait" width={430} rotate={-3} kenBurns={0} />
          </div>
        ) : null}
        <div style={{ textAlign: "center", color: colors.ink, maxWidth: hasPortrait ? 980 : 1500 }}>
          <div style={{ ...enter(frame, 0), fontFamily: fonts.english, fontStyle: "italic", fontSize: 128, color: colors.gold, lineHeight: 1.05 }}>
            Happy Retirement
          </div>
          <div style={{ ...enter(frame, 18), marginTop: 18 }}>
            <Divider width={560} delay={18} />
          </div>
          <div style={{ ...enter(frame, 30), fontFamily: fonts.thaiHeading, fontWeight: 700, fontSize: 92, marginTop: 30, lineHeight: 1.25 }}>
            {p.nickname}
          </div>
          <div style={{ ...enter(frame, 40), fontFamily: fonts.thaiBody, fontSize: 38, color: colors.inkSoft, marginTop: 6 }}>
            {p.fullName}
          </div>
          <div style={{ ...enter(frame, 62), fontFamily: fonts.thaiHeading, fontSize: 46, marginTop: 44, lineHeight: 1.4 }}>
            ขอบคุณสำหรับ {p.yearsOfService} ปีแห่งความทุ่มเท
          </div>
          <div
            style={{
              ...enter(frame, 80),
              fontFamily: fonts.english,
              fontStyle: "italic",
              fontSize: 56,
              color: colors.gold,
              marginTop: 22,
              letterSpacing: 2,
            }}
          >
            {p.startYear} — {p.retireYear}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
