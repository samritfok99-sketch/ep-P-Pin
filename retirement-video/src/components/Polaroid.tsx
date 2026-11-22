import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

type Props = {
  src: string;
  orientation: "landscape" | "portrait";
  /** Width of the photo window in px; the card adds its white border around it. */
  width: number;
  year?: string;
  caption?: string;
  rotate?: number;
  /** Ken Burns direction: alternates zoom-in/zoom-out and pan side per photo. */
  kenBurns?: number;
  captionSize?: number;
};

/** White instant-photo card: photo with a slow Ken Burns move, year and caption underneath. */
export const Polaroid: React.FC<Props> = ({
  src,
  orientation,
  width,
  year,
  caption,
  rotate = 0,
  kenBurns = 0,
  captionSize = 34,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const aspect = orientation === "portrait" ? 4 / 3 : 3 / 4;
  const height = Math.round(width * aspect);
  const pad = Math.round(width * 0.045);
  const hasText = Boolean(year || caption);
  const bottom = hasText ? Math.round(captionSize * (caption && year ? 3.4 : 2.4)) : pad * 2.2;

  const t = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: "clamp" });
  const zoomIn = kenBurns % 2 === 0;
  const scale = zoomIn ? 1.04 + 0.08 * t : 1.12 - 0.08 * t;
  const panX = (kenBurns % 4 < 2 ? -1 : 1) * 2.2 * (t - 0.5);
  const panY = (kenBurns % 3 === 0 ? -1 : 1) * 1.4 * (t - 0.5);

  return (
    <div
      style={{
        width: width + pad * 2,
        padding: `${pad}px ${pad}px 0 ${pad}px`,
        backgroundColor: colors.paper,
        boxShadow: "0 18px 40px rgba(58,42,30,0.22), 0 2px 6px rgba(58,42,30,0.12)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div style={{ width, height, overflow: "hidden", backgroundColor: "#e9e1d3" }}>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translate(${panX}%, ${panY}%)`,
          }}
        />
      </div>
      <div
        style={{
          height: bottom,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          color: colors.ink,
        }}
      >
        {year ? (
          <div style={{ fontFamily: fonts.english, fontStyle: "italic", fontSize: captionSize * 1.05, color: colors.gold, lineHeight: 1 }}>
            {year}
          </div>
        ) : null}
        {caption ? (
          <div
            style={{
              fontFamily: fonts.thaiBody,
              fontSize: captionSize,
              lineHeight: 1.3,
              textAlign: "center",
              maxWidth: width,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {caption}
          </div>
        ) : null}
      </div>
    </div>
  );
};
