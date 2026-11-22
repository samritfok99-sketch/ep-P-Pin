import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Polaroid } from "../components/Polaroid";
import { rise } from "../components/motion";
import type { Photo } from "../config";

export type PhotoFrameProps = { photo: Photo; index: number };

/** One photo in a tilted instant-photo card, with year and caption underneath. */
export const PhotoFrame: React.FC<PhotoFrameProps> = ({ photo, index }) => {
  const frame = useCurrentFrame();
  const p = rise(frame, 0);
  const tilt = (index % 2 === 0 ? -1 : 1) * 2.2;
  const portrait = photo.orientation === "portrait";
  const width = portrait ? 520 : 940;
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity: p,
            transform: `translateY(${(1 - p) * 40}px) rotate(${(1 - p) * tilt * 0.6}deg)`,
          }}
        >
          <Polaroid
            src={photo.src}
            orientation={photo.orientation}
            width={width}
            year={photo.year}
            caption={photo.caption}
            rotate={tilt}
            kenBurns={index}
            captionSize={42}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
