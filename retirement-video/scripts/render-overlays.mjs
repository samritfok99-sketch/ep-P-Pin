// Renders every "Overlay-*" composition as ProRes 4444 with an alpha channel into out/overlays/.
// usage: npm run overlays            (all overlays)
//        npm run overlays -- Heart   (only ids containing "Heart")
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const filter = process.argv[2] ?? "";
const list = execSync("npx remotion compositions src/index.ts --quiet", { encoding: "utf8" })
  .split(/\s+/)
  .filter((id) => id.startsWith("Overlay-") && id.includes(filter));

mkdirSync("out/overlays", { recursive: true });
for (const id of list) {
  console.log(`\n▶ ${id}`);
  execSync(
    `npx remotion render src/index.ts ${id} out/overlays/${id}.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`,
    { stdio: "inherit" },
  );
}
console.log(`\nเสร็จแล้ว ${list.length} ไฟล์ อยู่ในโฟลเดอร์ out/overlays/`);
