import React from "react";
import { Composition, Folder } from "remotion";
import { config } from "./config";
import { buildScenes, timelineFrames, totalFrames, wishFrames } from "./timing";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { RetirementFull } from "./RetirementFull";
import { OpeningTitle } from "./scenes/OpeningTitle";
import { ChapterCard } from "./scenes/ChapterCard";
import { PhotoFrame } from "./scenes/PhotoFrame";
import { PhotoCollage } from "./scenes/PhotoCollage";
import { CareerTimeline } from "./scenes/CareerTimeline";
import { WishCard } from "./scenes/WishCard";
import { Closing } from "./scenes/Closing";
import { StickerHealth, StickerHeart, StickerStar, StickerThankYou, StickerYears } from "./overlays/Stickers";

const sec = (s: number) => Math.round(s * FPS);
const base = { fps: FPS, width: WIDTH, height: HEIGHT };

export const RemotionRoot: React.FC = () => {
  const t = config.timing;
  const firstSingle = config.photos.find((p) => p.style === "single") ?? config.photos[0];
  const firstCollage = config.photos.filter((p) => p.style === "collage").slice(0, t.collageSize);
  const ch = config.chapters[0];
  return (
    <>
      <Composition id="RetirementFull" component={RetirementFull} durationInFrames={totalFrames(buildScenes())} {...base} />

      <Folder name="Scenes">
        <Composition id="Scene-1-OpeningTitle" component={OpeningTitle} durationInFrames={sec(t.opening)} {...base} />
        <Composition
          id="Scene-2-ChapterCard"
          component={ChapterCard}
          durationInFrames={sec(t.chapterCard)}
          defaultProps={{ number: ch.number, title: ch.title, titleEn: ch.titleEn }}
          {...base}
        />
        <Composition
          id="Scene-3-PhotoFrame"
          component={PhotoFrame}
          durationInFrames={sec(t.photoFrame)}
          defaultProps={{ photo: firstSingle, index: 0 }}
          {...base}
        />
        <Composition
          id="Scene-4-PhotoCollage"
          component={PhotoCollage}
          durationInFrames={sec(t.collage)}
          defaultProps={{ photos: firstCollage, index: 0 }}
          {...base}
        />
        <Composition
          id="Scene-5-CareerTimeline"
          component={CareerTimeline}
          durationInFrames={timelineFrames(config.milestones.length)}
          defaultProps={{ milestones: config.milestones }}
          {...base}
        />
        <Composition
          id="Scene-6-WishCard"
          component={WishCard}
          durationInFrames={wishFrames(config.wishes[0])}
          defaultProps={{ wish: config.wishes[0], index: 0, transparent: false }}
          {...base}
        />
        <Composition id="Scene-7-Closing" component={Closing} durationInFrames={sec(t.closing)} {...base} />
      </Folder>

      <Folder name="Overlays">
        <Composition id="Overlay-ThankYou" component={StickerThankYou} durationInFrames={sec(5)} {...base} />
        <Composition id="Overlay-Years" component={StickerYears} durationInFrames={sec(5)} {...base} />
        <Composition id="Overlay-Heart" component={StickerHeart} durationInFrames={sec(4)} {...base} />
        <Composition id="Overlay-Star" component={StickerStar} durationInFrames={sec(4)} {...base} />
        <Composition id="Overlay-Health" component={StickerHealth} durationInFrames={sec(5)} {...base} />
        {config.wishes.map((w, i) => (
          <Composition
            key={i}
            id={`Overlay-WishCard-${i + 1}`}
            component={WishCard}
            durationInFrames={wishFrames(w)}
            defaultProps={{ wish: w, index: i, transparent: true }}
            {...base}
          />
        ))}
      </Folder>
    </>
  );
};
