/**
 * Builds the scene list for RetirementFull from config.ts.
 * Every scene length is derived from the config (number of photos, milestones and wishes),
 * so adding or removing items changes the video length automatically.
 */
import { config, type Milestone, type Photo, type Wish } from "./config";
import { FPS } from "./theme";

export type Scene =
  | { kind: "opening"; frames: number }
  | { kind: "chapter"; frames: number; number: number; title: string; titleEn: string }
  | { kind: "photo"; frames: number; photo: Photo; index: number }
  | { kind: "collage"; frames: number; photos: Photo[]; index: number }
  | { kind: "timeline"; frames: number; milestones: Milestone[] }
  | { kind: "wish"; frames: number; wish: Wish; index: number }
  | { kind: "closing"; frames: number };

const sec = (s: number) => Math.round(s * FPS);

export const TRANSITION_FRAMES = sec(config.timing.transition);

export const timelineFrames = (n: number) => sec(config.timing.timelineIntro + n * config.timing.perMilestone + 1.5);

export const wishFrames = (w: Wish) => sec(w.video && w.videoSeconds ? Math.max(w.videoSeconds, config.timing.wish) : config.timing.wish);

export const buildScenes = (): Scene[] => {
  const t = config.timing;
  const scenes: Scene[] = [{ kind: "opening", frames: sec(t.opening) }];
  let photoIndex = 0;

  for (const ch of config.chapters) {
    if (config.showChapterCards) {
      scenes.push({ kind: "chapter", frames: sec(t.chapterCard), number: ch.number, title: ch.title, titleEn: ch.titleEn });
    }
    if (ch.showTimeline && config.milestones.length > 0) {
      scenes.push({ kind: "timeline", frames: timelineFrames(config.milestones.length), milestones: config.milestones });
    }
    const mine = config.photos.filter((p) => p.chapter === ch.number);
    const singles = mine.filter((p) => p.style === "single");
    const collage = mine.filter((p) => p.style === "collage");
    // interleave: a single, then a collage group, so the pace varies
    // split into evenly sized groups of at most collageSize (e.g. 9 photos → 3+3+3, never 4+4+1)
    const groups: Photo[][] = [];
    const g = Math.ceil(collage.length / t.collageSize);
    for (let k = 0, i = 0; k < g; k++) {
      const size = Math.ceil((collage.length - i) / (g - k));
      groups.push(collage.slice(i, i + size));
      i += size;
    }
    const n = Math.max(singles.length, groups.length);
    for (let i = 0; i < n; i++) {
      if (singles[i]) scenes.push({ kind: "photo", frames: sec(t.photoFrame), photo: singles[i], index: photoIndex++ });
      if (groups[i]) scenes.push({ kind: "collage", frames: sec(t.collage), photos: groups[i], index: photoIndex++ });
    }
  }

  if (config.wishes.length > 0) {
    const n = config.chapters.length + 1;
    if (config.showChapterCards) scenes.push({ kind: "chapter", frames: sec(t.chapterCard), number: n, title: config.wishesChapter.title, titleEn: config.wishesChapter.titleEn });
    config.wishes.forEach((wish, index) => scenes.push({ kind: "wish", frames: wishFrames(wish), wish, index }));
  }
  scenes.push({ kind: "closing", frames: sec(t.closing) });
  return fitToTarget(scenes);
};

/**
 * When timing.targetSeconds is set, stretch or shrink the photo scenes (single + collage) by one
 * common factor so the whole video lands on the target length. Other scenes keep their length.
 */
const fitToTarget = (scenes: Scene[]): Scene[] => {
  const target = config.timing.targetSeconds;
  if (!target) return scenes;
  const isPhoto = (s: Scene) => s.kind === "photo" || s.kind === "collage";
  const photo = scenes.filter(isPhoto).reduce((a, s) => a + s.frames, 0);
  if (photo === 0) return scenes;
  const rest = totalFrames(scenes) - photo;
  const k = Math.max(0.4, (sec(target) - rest) / photo);
  const out = scenes.map((s) => (isPhoto(s) ? { ...s, frames: Math.max(TRANSITION_FRAMES + 30, Math.round(s.frames * k)) } : s));
  // absorb the rounding error in the closing scene so the total is exact
  const diff = sec(target) - totalFrames(out);
  const last = out[out.length - 1];
  out[out.length - 1] = { ...last, frames: last.frames + diff };
  return out;
};

export const totalFrames = (scenes: Scene[]) =>
  scenes.reduce((s, x) => s + x.frames, 0) - TRANSITION_FRAMES * (scenes.length - 1);
