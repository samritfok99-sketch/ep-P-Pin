import { loadFont as loadSerifThai } from "@remotion/google-fonts/NotoSerifThai";
import { loadFont as loadPlexThai } from "@remotion/google-fonts/IBMPlexSansThai";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";

const serifThai = loadSerifThai("normal", { weights: ["400", "600", "700"], subsets: ["thai", "latin"] });
const plexThai = loadPlexThai("normal", { weights: ["400", "500", "600"], subsets: ["thai", "latin"] });
const cormorant = loadCormorant("italic", { weights: ["400", "500", "600"], subsets: ["latin"] });

export const colors = {
  cream: "#F6EFE3",
  paper: "#FFFDF8",
  ink: "#3A2A1E",
  inkSoft: "#6B5646",
  gold: "#A87A30",
  goldSoft: "#C9A66B",
};

export const fonts = {
  thaiHeading: serifThai.fontFamily,
  thaiBody: plexThai.fontFamily,
  english: cormorant.fontFamily,
};

/** Text must stay at least this far from the frame edge (projector overscan). */
export const SAFE = 120;

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;

/** Gentle spring used everywhere: high damping, no overshoot. */
export const softSpring = { damping: 200, stiffness: 60, mass: 1 };
