import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { config } from "../config";
import { colors, fonts } from "../theme";

type Kind = "heart" | "star" | "sparkle" | "emoji";
const EMOJI = ["🥰", "💖", "🎉", "✨", "🌸", "😊", "💕", "🎊"];

const Heart: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 86 C22 66 10 48 14 32 C18 16 38 12 50 28 C62 12 82 16 86 32 C90 48 78 66 50 86 Z" fill={color} />
    <ellipse cx="32" cy="34" rx="8" ry="5" fill="#fff" opacity="0.45" transform="rotate(-30 32 34)" />
  </svg>
);

const Star: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 8 L61 37 L92 38 L68 57 L76 88 L50 70 L24 88 L32 57 L8 38 L39 37 Z" fill={color} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

const Sparkle: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill={color} />
  </svg>
);

type Props = {
  /** how many items over the scene */
  count?: number;
  /** "edges" = side bands (photo scenes), "all" = whole frame, "ring" = everywhere except the centre text block */
  area?: "edges" | "all" | "ring";
  seed?: string;
  /** "float" drifts up slowly; "burst" pops out from the centre */
  mode?: "float" | "burst";
};

/** Hearts, stars, sparkles and emoji that drift up softly to add warmth and joy. */
export const LoveEffects: React.FC<Props> = ({ count = 10, area = "edges", seed = "love", mode = "float" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  if (!config.loveEffects) return null;
  const items = Array.from({ length: count }, (_, i) => {
    const r = (k: string) => random(`${seed}-${i}-${k}`);
    const kinds: Kind[] = ["heart", "heart", "star", "sparkle", "emoji"];
    const kind = kinds[Math.floor(r("k") * kinds.length)];
    const side = r("side") < 0.5;
    let x = area === "edges" ? (side ? 70 + r("x") * 260 : 1590 + r("x") * 260) : 100 + r("x") * 1720;
    let y0 = 760 + r("y") * 260;
    if (area === "ring") {
      // top band, bottom band or the side bands, never over the centre text
      const band = r("band");
      if (band < 0.3) { y0 = 130 + r("y") * 110; }
      else if (band < 0.6) { y0 = 960 + r("y") * 60; }
      else { x = side ? 90 + r("x") * 220 : 1610 + r("x") * 220; }
    }
    const size = kind === "emoji" ? 54 + r("s") * 34 : 34 + r("s") * 40;
    const delay = r("d") * Math.max(1, durationInFrames - 40);
    const life = 70 + r("l") * 60;
    const color = kind === "heart" ? [colors.rose, colors.blush, "#D9465F"][Math.floor(r("c") * 3)] : kind === "star" ? colors.sun : colors.gold;
    return { i, kind, x, size, delay, life, color, sway: (r("w") - 0.5) * 60, spin: (r("r") - 0.5) * 40, emoji: EMOJI[Math.floor(r("e") * EMOJI.length)], y0, angle: r("a") * Math.PI * 2 };
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {items.map((it) => {
        const t = (frame - it.delay) / it.life;
        if (t < 0 || t > 1) return null;
        const opacity = interpolate(t, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
        const pop = interpolate(t, [0, 0.12], [0.3, 1], { extrapolateRight: "clamp" });
        let x = it.x + Math.sin(t * Math.PI * 2) * it.sway;
        let y = it.y0 - t * (area === "ring" ? 90 : 520);
        if (mode === "burst") {
          const d = 120 + t * 520;
          x = 960 + Math.cos(it.angle) * d * 1.5;
          y = 540 + Math.sin(it.angle) * d * 0.85 - t * 60;
        }
        const node =
          it.kind === "heart" ? <Heart size={it.size} color={it.color} /> :
          it.kind === "star" ? <Star size={it.size} color={it.color} /> :
          it.kind === "sparkle" ? <Sparkle size={it.size} color={it.color} /> :
          <span style={{ fontFamily: fonts.emoji, fontSize: it.size, lineHeight: 1 }}>{it.emoji}</span>;
        return (
          <div
            key={it.i}
            style={{
              position: "absolute",
              left: x - it.size / 2,
              top: y - it.size / 2,
              opacity,
              transform: `scale(${pop}) rotate(${it.spin * t}deg)`,
              filter: "drop-shadow(0 4px 8px rgba(58,42,30,0.18))",
            }}
          >
            {node}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
