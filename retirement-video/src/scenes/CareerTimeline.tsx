import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Divider } from "../components/Ornament";
import { enter, rise } from "../components/motion";
import { config, type Milestone } from "../config";
import { colors, fonts, FPS } from "../theme";

export type CareerTimelineProps = { milestones: Milestone[] };

/** Horizontal line that draws across, then milestones appear one by one (alternating above/below). */
export const CareerTimeline: React.FC<CareerTimelineProps> = ({ milestones }) => {
  const frame = useCurrentFrame();
  const left = 340;
  const right = 1580;
  const y = 600;
  const draw = interpolate(frame, [12, 12 + FPS * 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const n = milestones.length;
  const step = n > 1 ? (right - left) / (n - 1) : 0;
  const per = config.timing.perMilestone * FPS;
  const start = config.timing.timelineIntro * FPS * 0.6;
  const textW = Math.min(340, step * 1.7 || 420);
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      <div style={{ position: "absolute", top: 150, width: "100%", textAlign: "center", color: colors.ink }}>
        <div style={{ ...enter(frame, 0), fontFamily: fonts.thaiHeading, fontWeight: 700, fontSize: 70 }}>เส้นทางการทำงาน</div>
        <div style={{ ...enter(frame, 8), fontFamily: fonts.english, fontStyle: "italic", fontSize: 42, color: colors.gold }}>Career Journey</div>
        <div style={{ marginTop: 12 }}>
          <Divider width={360} delay={10} />
        </div>
      </div>
      <svg width="1920" height="1080" style={{ position: "absolute", inset: 0 }}>
        <line x1={left} y1={y} x2={left + (right - left) * draw} y2={y} stroke={colors.gold} strokeWidth="2" />
      </svg>
      {milestones.map((m, i) => {
        const x = left + step * i;
        const p = rise(frame, start + i * per);
        const above = i % 2 === 0;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: x - 13,
                top: y - 13,
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: colors.cream,
                border: `2px solid ${colors.gold}`,
                transform: `scale(${p})`,
              }}
            >
              <div style={{ position: "absolute", inset: 6, borderRadius: 7, backgroundColor: colors.gold }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: x - textW / 2,
                width: textW,
                top: above ? y - 230 : y + 44,
                height: 190,
                display: "flex",
                flexDirection: "column",
                justifyContent: above ? "flex-end" : "flex-start",
                alignItems: "center",
                textAlign: "center",
                opacity: p,
                transform: `translateY(${(1 - p) * (above ? 20 : -20)}px)`,
                color: colors.ink,
              }}
            >
              <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontWeight: 600, fontSize: 58, color: colors.gold, lineHeight: 1.1 }}>
                {m.year}
              </div>
              <div style={{ fontFamily: fonts.thaiBody, fontSize: 34, lineHeight: 1.35, marginTop: 6 }}>{m.event}</div>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
