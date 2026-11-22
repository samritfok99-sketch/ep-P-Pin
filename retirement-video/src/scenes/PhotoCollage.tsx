import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GoldFrame } from "../components/GoldFrame";
import { Polaroid } from "../components/Polaroid";
import { rise } from "../components/motion";
import type { Photo } from "../config";

export type PhotoCollageProps = { photos: Photo[]; index: number };

/** Card centres (x, y) and tilt for 1–4 overlapping photos. */
const LAYOUTS: Record<number, Array<[number, number, number]>> = {
  1: [[960, 540, -2]],
  2: [[700, 520, -4], [1220, 560, 3]],
  3: [[600, 470, -5], [1010, 600, 2], [1350, 470, 5]],
  4: [[620, 410, -5], [1290, 400, 4], [700, 700, 3], [1240, 710, -3]],
};

/** 3–4 instant photos dropping in one after another and settling into a loose pile. */
export const PhotoCollage: React.FC<PhotoCollageProps> = ({ photos, index }) => {
  const frame = useCurrentFrame();
  const n = Math.min(4, photos.length);
  const layout = LAYOUTS[n] ?? LAYOUTS[4];
  return (
    <AbsoluteFill>
      <Backdrop />
      <GoldFrame />
      {photos.slice(0, n).map((photo, i) => {
        const [cx, cy, tilt] = layout[i];
        const p = rise(frame, 6 + i * 18);
        const portrait = photo.orientation === "portrait";
        const width = n >= 3 ? (portrait ? 330 : 520) : portrait ? 420 : 640;
        const flip = (index + i) % 2 === 0 ? -1 : 1;
        return (
          <div
            key={photo.src}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              opacity: p,
              transform: `translate(-50%, -50%) translateY(${(1 - p) * -260}px) rotate(${tilt + (1 - p) * 8 * flip}deg)`,
            }}
          >
            <Polaroid
              src={photo.src}
              orientation={photo.orientation}
              width={width}
              year={photo.year}
              caption={photo.caption}
              kenBurns={index + i}
              captionSize={30}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
