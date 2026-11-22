import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Divider } from "../components/Ornament";
import { enter, rise } from "../components/motion";
import type { Wish } from "../config";
import { colors, fonts } from "../theme";

export type WishCardProps = { wish: Wish; index: number; transparent?: boolean };

/** A colleague's message on a paper card; a video clip, if given, sits beside the card. */
export const WishCard: React.FC<WishCardProps> = ({ wish, index, transparent = false }) => {
  const frame = useCurrentFrame();
  const hasVideo = Boolean(wish.video);
  const p = rise(frame, 0);
  const cardW = hasVideo ? 760 : 1160;
  const msgSize = wish.message.length > 90 ? 40 : wish.message.length > 50 ? 46 : 52;
  const card = (
    <div
      style={{
        width: cardW,
        padding: "64px 76px 56px",
        backgroundColor: colors.paper,
        border: `1.5px solid ${colors.gold}`,
        outline: `1px solid ${colors.goldSoft}`,
        outlineOffset: -14,
        boxShadow: "0 22px 50px rgba(58,42,30,0.18)",
        color: colors.ink,
        textAlign: "center",
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px) rotate(${(index % 2 === 0 ? -1 : 1) * 0.6}deg)`,
      }}
    >
      <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontSize: 110, color: colors.gold, lineHeight: 0.6, height: 50 }}>“</div>
      <div style={{ ...enter(frame, 10, 16), fontFamily: fonts.thaiBody, fontSize: msgSize, lineHeight: 1.55, marginTop: 10 }}>{wish.message}</div>
      {wish.name || wish.department || wish.photo ? (
        <>
      <div style={{ marginTop: 30 }}>
        <Divider width={260} delay={24} />
      </div>
      <div style={{ ...enter(frame, 30, 12), display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginTop: 22 }}>
        {wish.photo ? (
          <Img
            src={staticFile(wish.photo)}
            style={{ width: 96, height: 96, borderRadius: 48, objectFit: "cover", border: `2px solid ${colors.gold}` }}
          />
        ) : null}
        <div style={{ textAlign: wish.photo ? "left" : "center" }}>
          {wish.name ? <div style={{ fontFamily: fonts.thaiHeading, fontWeight: 600, fontSize: 40 }}>{wish.name}</div> : null}
          {wish.department ? <div style={{ fontFamily: fonts.thaiBody, fontSize: 30, color: colors.inkSoft }}>{wish.department}</div> : null}
        </div>
      </div>
        </>
      ) : null}
    </div>
  );
  return (
    <AbsoluteFill>
      {transparent ? null : (
        <>
          <Backdrop />
          <GoldFrame />
        </>
      )}
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 70 }}>
        {hasVideo ? (
          <div
            style={{
              ...enter(frame, 4, 24),
              width: 820,
              height: 615,
              padding: 14,
              backgroundColor: colors.paper,
              border: `1.5px solid ${colors.gold}`,
              boxShadow: "0 22px 50px rgba(58,42,30,0.18)",
            }}
          >
            <OffthreadVideo src={staticFile(wish.video!)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : null}
        {card}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
