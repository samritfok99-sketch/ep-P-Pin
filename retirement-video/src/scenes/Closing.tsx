import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { LoveEffects } from "../components/LoveEffects";
import { enter, rise } from "../components/motion";
import { config } from "../config";
import { colors, fonts } from "../theme";

/** Cute heart drawn in the brand rose, with a soft heartbeat. */
const BigHeart: React.FC<{ frame: number }> = ({ frame }) => {
  const p = rise(frame, 50);
  const beat = 1 + 0.06 * Math.max(0, Math.sin((frame - 50) / 6)) * (frame > 60 ? 1 : 0);
  return (
    <svg width="150" height="150" viewBox="0 0 100 100" style={{ transform: `scale(${p * beat})`, opacity: p }}>
      <path d="M50 88 C20 66 8 48 12 31 C16 14 38 10 50 27 C62 10 84 14 88 31 C92 48 80 66 50 88 Z" fill={colors.rose} />
      <ellipse cx="31" cy="33" rx="9" ry="5.5" fill="#fff" opacity="0.5" transform="rotate(-30 31 33)" />
      <circle cx="38" cy="50" r="4" fill={colors.ink} />
      <circle cx="62" cy="50" r="4" fill={colors.ink} />
      <path d="M42 60 Q50 68 58 60" fill="none" stroke={colors.ink} strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="30" cy="60" rx="6" ry="3.5" fill="#fff" opacity="0.35" />
      <ellipse cx="70" cy="60" rx="6" ry="3.5" fill="#fff" opacity="0.35" />
    </svg>
  );
};

/** Final thank-you from the team, playful lettering, a cute heart and a burst of love effects. */
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { team, person } = config;
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      <LoveEffects count={40} area="ring" seed="closing" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", color: colors.ink, padding: 160 }}>
        <div style={{ ...enter(frame, 0), fontFamily: fonts.english, fontStyle: "italic", fontWeight: 600, fontSize: 64, color: colors.gold }}>
          Thank you for everything
        </div>
        <div style={{ ...enter(frame, 12), fontFamily: fonts.playful, fontWeight: 700, fontSize: 92, lineHeight: 1.3, marginTop: 18 }}>
          ขอบคุณที่เป็นพี่ที่ดีของพวกเรา
        </div>
        <div style={{ ...enter(frame, 24), fontFamily: fonts.playful, fontWeight: 700, fontSize: 70, color: colors.rose, marginTop: 4 }}>
          {person.nickname}
        </div>
        <div style={{ marginTop: 18 }}>
          <BigHeart frame={frame} />
        </div>
        <div style={{ ...enter(frame, 40), fontFamily: fonts.playful, fontWeight: 700, fontSize: 54, marginTop: 6 }}>
          ด้วยรักจาก{team.name}
        </div>
        {team.logo ? (
          <div style={{ ...enter(frame, 60), marginTop: 30 }}>
            <Img src={staticFile(team.logo)} style={{ maxHeight: 120, maxWidth: 380, objectFit: "contain" }} />
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
