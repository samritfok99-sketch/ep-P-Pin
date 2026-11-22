import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Divider } from "../components/Ornament";
import { enter } from "../components/motion";
import { config } from "../config";
import { colors, fonts } from "../theme";

/** Final thank-you, signed by the team, with a logo slot. */
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { team, person } = config;
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", color: colors.ink, padding: 160 }}>
        <div style={{ ...enter(frame, 0), fontFamily: fonts.english, fontStyle: "italic", fontSize: 64, color: colors.gold }}>
          Thank you for everything
        </div>
        <div style={{ ...enter(frame, 14), fontFamily: fonts.thaiHeading, fontWeight: 700, fontSize: 80, lineHeight: 1.35, marginTop: 24 }}>
          ขอบคุณที่เป็นพี่ที่ดีของพวกเรา
        </div>
        <div style={{ ...enter(frame, 26), fontFamily: fonts.thaiHeading, fontSize: 52, color: colors.inkSoft, marginTop: 6 }}>
          {person.nickname}
        </div>
        <div style={{ marginTop: 34 }}>
          <Divider width={520} delay={34} />
        </div>
        <div style={{ ...enter(frame, 46), fontFamily: fonts.thaiBody, fontSize: 42, marginTop: 30 }}>ด้วยรักจาก {team.name}</div>
        <div style={{ ...enter(frame, 60), marginTop: 46, height: 150, display: "flex", alignItems: "center" }}>
          {team.logo ? (
            <Img src={staticFile(team.logo)} style={{ maxHeight: 150, maxWidth: 420, objectFit: "contain" }} />
          ) : team.showLogoPlaceholder ? (
            <div
              style={{
                width: 300,
                height: 130,
                border: `1.5px dashed ${colors.goldSoft}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.thaiBody,
                fontSize: 26,
                color: colors.goldSoft,
              }}
            >
              โลโก้
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
