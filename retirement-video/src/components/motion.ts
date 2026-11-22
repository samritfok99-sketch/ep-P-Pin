import { interpolate, spring } from "remotion";
import { FPS, softSpring } from "../theme";

/** 0→1 soft spring starting at `delay` frames. */
export const rise = (frame: number, delay = 0) =>
  spring({ frame: frame - delay, fps: FPS, config: softSpring });

/** Fade + slow upward slide for text blocks. */
export const enter = (frame: number, delay = 0, distance = 30) => {
  const p = rise(frame, delay);
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` };
};

/** Fade out over the last `length` frames of a scene of `duration` frames. */
export const exitOpacity = (frame: number, duration: number, length = 15) =>
  interpolate(frame, [duration - length, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
