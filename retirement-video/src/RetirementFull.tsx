import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { config } from "./config";
import { buildScenes, TRANSITION_FRAMES, type Scene } from "./timing";
import { FPS } from "./theme";
import { OpeningTitle } from "./scenes/OpeningTitle";
import { ChapterCard } from "./scenes/ChapterCard";
import { PhotoFrame } from "./scenes/PhotoFrame";
import { PhotoCollage } from "./scenes/PhotoCollage";
import { CareerTimeline } from "./scenes/CareerTimeline";
import { WishCard } from "./scenes/WishCard";
import { Closing } from "./scenes/Closing";

const renderScene = (s: Scene) => {
  switch (s.kind) {
    case "opening":
      return <OpeningTitle />;
    case "chapter":
      return <ChapterCard number={s.number} title={s.title} titleEn={s.titleEn} />;
    case "photo":
      return <PhotoFrame photo={s.photo} index={s.index} />;
    case "collage":
      return <PhotoCollage photos={s.photos} index={s.index} />;
    case "timeline":
      return <CareerTimeline milestones={s.milestones} />;
    case "wish":
      return <WishCard wish={s.wish} index={s.index} />;
    case "closing":
      return <Closing />;
  }
};

/** Every scene in order, cross-faded, with the music fading in and out. */
export const RetirementFull: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const scenes = buildScenes();
  const m = config.music;
  const fadeIn = m.fadeInSeconds * FPS;
  const fadeOut = m.fadeOutSeconds * FPS;
  return (
    <AbsoluteFill style={{ backgroundColor: "#F6EFE3" }}>
      <TransitionSeries>
        {scenes.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 ? (
              <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />
            ) : null}
            <TransitionSeries.Sequence durationInFrames={s.frames}>{renderScene(s)}</TransitionSeries.Sequence>
          </React.Fragment>
        ))}
      </TransitionSeries>
      {m.src ? (
        <Audio
          src={staticFile(m.src)}
          loop
          volume={(f) =>
            interpolate(f, [0, fadeIn, durationInFrames - fadeOut, durationInFrames], [0, m.volume, m.volume, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
