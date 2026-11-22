import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { rise } from "../components/motion";
import { config } from "../config";
import { colors, fonts } from "../theme";

/**
 * Transparent stickers for editing over footage in Premiere / CapCut / Final Cut.
 * No background is drawn, so a ProRes 4444 render keeps the alpha channel.
 */

/** Soft pop in, gentle float, fade out at the end. */
const useStickerMotion = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = rise(frame, 0);
  const out = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const float = Math.sin(frame / 22) * 6;
  return { opacity: p * out, transform: `translateY(${(1 - p) * 30 + float}px) scale(${0.92 + 0.08 * p})` };
};

const Plate: React.FC<{ children: React.ReactNode; padding?: string }> = ({ children, padding = "34px 70px" }) => (
  <div
    style={{
      padding,
      backgroundColor: colors.paper,
      border: `2px solid ${colors.gold}`,
      outline: `1px solid ${colors.goldSoft}`,
      outlineOffset: -12,
      boxShadow: "0 16px 40px rgba(58,42,30,0.25)",
      textAlign: "center",
      color: colors.ink,
    }}
  >
    {children}
  </div>
);

export const StickerThankYou: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <div style={useStickerMotion()}>
      <Plate>
        <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontSize: 110, color: colors.gold, lineHeight: 1 }}>Thank you</div>
        <div style={{ fontFamily: fonts.thaiHeading, fontWeight: 700, fontSize: 76, marginTop: 6 }}>พี่{config.person.nickname}</div>
      </Plate>
    </div>
  </AbsoluteFill>
);

export const StickerYears: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <div style={useStickerMotion()}>
      <div
        style={{
          width: 420,
          height: 420,
          borderRadius: 210,
          backgroundColor: colors.paper,
          border: `3px solid ${colors.gold}`,
          outline: `1.5px solid ${colors.goldSoft}`,
          outlineOffset: -16,
          boxShadow: "0 16px 40px rgba(58,42,30,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: colors.gold,
        }}
      >
        <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontWeight: 600, fontSize: 150, lineHeight: 0.9 }}>{config.person.yearsOfService}</div>
        <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontSize: 64, color: colors.ink }}>Years</div>
      </div>
    </div>
  </AbsoluteFill>
);

const DrawnIcon: React.FC<{ d: string; size?: number }> = ({ d, size = 360 }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 40], [1, 0], { extrapolateRight: "clamp" });
  const fill = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={useStickerMotion()}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path d={d} fill={colors.gold} fillOpacity={fill * 0.18} stroke={colors.gold} strokeWidth="2.2" strokeLinejoin="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={draw} />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

export const StickerHeart: React.FC = () => (
  <DrawnIcon d="M50 84 C20 64 10 46 14 32 C18 18 36 14 50 30 C64 14 82 18 86 32 C90 46 80 64 50 84 Z" />
);

export const StickerStar: React.FC = () => (
  <DrawnIcon d="M50 10 L61 38 L90 39 L67 57 L75 86 L50 69 L25 86 L33 57 L10 39 L39 38 Z" />
);

export const StickerHealth: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <div style={useStickerMotion()}>
      <Plate padding="30px 64px">
        <div style={{ fontFamily: fonts.thaiHeading, fontWeight: 700, fontSize: 80 }}>สุขภาพแข็งแรงนะ</div>
        <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontSize: 50, color: colors.gold }}>Stay healthy & happy</div>
      </Plate>
    </div>
  </AbsoluteFill>
);
