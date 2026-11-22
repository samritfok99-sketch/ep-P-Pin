# Happy Early Retirement — วิดีโออำลา

วิดีโออำลาการเกษียณก่อนกำหนด ทำด้วย [Remotion](https://www.remotion.dev) (React + TypeScript)
ขนาด 1920×1080, 30fps ความยาวตั้งไว้ 2 นาที (`timing.targetSeconds`) ฉากรูปจะยืด/หดให้พอดีเอง

---

## 1. ติดตั้ง (ทำครั้งแรกครั้งเดียว)

1. ติดตั้ง **Node.js** เวอร์ชัน 20 ขึ้นไป จาก https://nodejs.org (เลือก LTS)
2. เปิด Terminal (Mac) หรือ Command Prompt / PowerShell (Windows) แล้วเข้าโฟลเดอร์นี้
   ```bash
   cd retirement-video
   ```
3. ติดตั้งแพ็กเกจ
   ```bash
   npm install
   ```

## 2. เปิดดูตัวอย่าง (Preview)

```bash
npx remotion studio
```

เบราว์เซอร์จะเปิดหน้า Remotion Studio ขึ้นมาเอง (ถ้าไม่เปิด ให้เข้า http://localhost:3000)

- **RetirementFull** = วิดีโอเต็มเรื่อง
- โฟลเดอร์ **Scenes** = ดูทีละฉาก
- โฟลเดอร์ **Overlays** = สติกเกอร์และการ์ดอวยพรพื้นหลังโปร่งใส

แก้ไฟล์ `src/config.ts` แล้วกดบันทึก หน้า Studio จะอัปเดตเองทันที

> ต้องต่ออินเทอร์เน็ตตอนเปิด Studio และตอน render เพราะฟอนต์โหลดจาก Google Fonts

---

## 3. แก้ข้อมูล — แก้ไฟล์ `src/config.ts` ไฟล์เดียว

เปิดไฟล์ด้วยโปรแกรมแก้ข้อความ (แนะนำ VS Code) แก้เฉพาะข้อความใน `" "`
**ห้ามลบ** เครื่องหมาย `"` `,` `{ }` `[ ]` ไม่อย่างนั้นวิดีโอจะเปิดไม่ขึ้น

### ข้อมูลพี่
```ts
person: {
  nickname: "พี่ปิ่น",            // ชื่อเล่น
  fullName: "ชื่อ นามสกุล",
  position: "ผู้จัดการฝ่าย...",
  department: "ฝ่าย...",
  startYear: 2006,                // ปีที่เริ่มงาน (ตัวเลข ไม่ต้องมี " ")
  retireYear: 2026,
  yearsOfService: "20",           // จำนวนปีที่ทำงาน
  portrait: "photos/photo-60.jpg" // รูปหน้าแรก ("" = ไม่ใช้รูป)
},
```

### ทีม / โลโก้
```ts
team: { name: "ทีม QA", logo: "logo/logo.png", showLogoPlaceholder: true },
```
- ใส่ไฟล์โลโก้ไว้ใน `public/logo/` แล้วใส่ชื่อไฟล์ใน `logo`
- ถ้าไม่มีโลโก้และไม่อยากให้มีกรอบว่าง ให้ตั้ง `showLogoPlaceholder: false`

### เรื่อง (กลุ่มรูป) และการ์ดคั่นบท
```ts
showChapterCards: false,   // false = ไม่มีการ์ดคั่น รูปเล่าต่อกันเลย · true = มีการ์ด "Chapter 01 …"
```
รูปถูกจัดเป็นเรื่อง เช่น "ช่วงแรกที่ออฟฟิศ", "ทริปเที่ยวด้วยกัน 2024" รูปในเรื่องเดียวกันจะอยู่ติดกัน
รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือรวมเป็นคอลลาจ

### บท (Chapter)
```ts
chapters: [
  { number: 1, title: "วันแรกที่เราได้พบกัน", titleEn: "The Day We First Met", showTimeline: false },
  { number: 2, title: "ช่วงเวลาที่ภูมิใจ",    titleEn: "Moments of Pride",     showTimeline: true },
  ...
],
```
- `showTimeline: true` = แสดงฉากเส้นทางการทำงานต่อจากการ์ดบทนี้
- บทคำอวยพร (`wishesChapter`) ต่อท้ายให้อัตโนมัติ

### รูปภาพ
```ts
{ src: "photos/photo-01.jpg", chapter: 1, style: "single", year: "2006", caption: "วันแรกที่เข้าทีม", orientation: "landscape" },
```
| ช่อง | ความหมาย |
|---|---|
| `src` | ไฟล์ในโฟลเดอร์ `public/` |
| `chapter` | อยู่ในบทที่เท่าไร |
| `style` | `"single"` = รูปเดี่ยวในกรอบโพลารอยด์ · `"collage"` = รวมกลุ่มละ 4 รูป ทยอยตกลงมา |
| `year` | ปี (ว่าง `""` ได้) |
| `caption` | คำบรรยายใต้รูป (ว่าง `""` ได้) |
| `orientation` | `"landscape"` รูปแนวนอน · `"portrait"` รูปแนวตั้ง |

- รูปจะเรียงตามลำดับในไฟล์ ภายในบทจะสลับ รูปเดี่ยว → คอลลาจ → รูปเดี่ยว ...
- ลบบรรทัดรูปที่ไม่ต้องการได้เลย ความยาววิดีโอจะลดลงเอง

### เส้นทางการทำงาน (Timeline)
```ts
milestones: [
  { year: "2006", event: "วันแรกที่เข้าทำงาน" },
  { year: "2012", event: "เลื่อนเป็นหัวหน้าแผนก" },
],
```
แนะนำ 4–7 รายการ

### คำอวยพร
```ts
{ message: "ขอบคุณที่ดูแลพวกเรา...", name: "น้องเอ", department: "ฝ่ายบัญชี" },
{ message: "...", name: "", department: "" },                                                   // ไม่แสดงชื่อ/แผนก
{ message: "...", name: "...", department: "...", photo: "wishes/a.jpg" },                       // มีรูปผู้อวยพร
{ message: "...", name: "...", department: "...", video: "wishes/b.mp4", videoSeconds: 15 },    // มีคลิป
```
- ใส่รูป/คลิปไว้ใน `public/wishes/`
- ถ้ามีคลิป ให้ใส่ `videoSeconds` เป็นความยาวคลิป (วินาที) ฉากจะยาวเท่าคลิป และคลิปจะวางข้างการ์ด

### ความยาว
- `timing.targetSeconds: 120` = ทั้งเรื่องยาว 2 นาทีพอดี (ฉากรูปจะยืด/หดให้เอง) ใส่ `0` ถ้าไม่ต้องการบังคับ
- ความยาวฉากอื่นแก้ได้ในส่วน `timing` (วินาที) เช่น `wish: 4.5`, `closing: 6`
- ถ้าเปลี่ยน `targetSeconds` ควรเปลี่ยนเพลงให้ยาวเท่ากันด้วย

---

## 4. ใส่รูปและเพลง

| สิ่งที่ใส่ | โฟลเดอร์ | ใส่ใน config |
|---|---|---|
| รูปภาพ | `public/photos/` | `photos` → `src: "photos/ชื่อไฟล์.jpg"` |
| โลโก้ | `public/logo/` | `team.logo` |
| รูป/คลิปคำอวยพร | `public/wishes/` | `wishes` → `photo` / `video` |
| เพลง | `public/music/` | `music.src` |

- ชื่อไฟล์ควรเป็นภาษาอังกฤษ ไม่มีเว้นวรรค เช่น `team-trip-2018.jpg`
- รูปขนาดด้านยาว 1500–2000 px ก็พอ (ใหญ่กว่านี้ทำให้ render ช้า)
- **เพลง:** ตอนนี้ใช้ `music/upbeat-120s.mp3` เพลงสนุกจังหวะ 120 BPM ยาว 2 นาทีพอดี แต่งขึ้นใหม่ ไม่ติดลิขสิทธิ์
  (ยังมี `music/placeholder-piano.mp3` เพลงเปียโนช้าๆ ไว้ให้เลือก)
  ถ้าจะเปลี่ยน ให้วางไฟล์ `.mp3` ใน `public/music/` แล้วแก้ `music.src`
  เพลงจะวนซ้ำถ้าสั้นกว่าวิดีโอ และ fade in/out ให้เอง (ปรับได้ที่ `fadeInSeconds`, `fadeOutSeconds`, `volume`)
- ถ้าจะใช้เพลงที่มีลิขสิทธิ์เปิดในงานภายในบริษัท ควรตรวจสอบสิทธิ์การใช้งานก่อน

---

## 5. Render

### วิดีโอเต็มเรื่อง MP4 (H.264) สำหรับเปิดบนโปรเจกเตอร์
```bash
npm run build
```
หรือ
```bash
npx remotion render RetirementFull out/RetirementFull.mp4 --codec=h264 --crf=18
```
ไฟล์จะอยู่ที่ `out/RetirementFull.mp4`

### Render เฉพาะฉาก
```bash
npx remotion render Scene-5-CareerTimeline out/timeline.mp4
```

### Overlay พื้นหลังโปร่งใส (ProRes 4444 .mov มี alpha)
สำหรับลากไปวางบนฟุตเทจใน Premiere Pro / Final Cut Pro / CapCut

ทุกตัวในครั้งเดียว:
```bash
npm run overlays
```
เลือกเฉพาะบางตัว (เช่นชื่อที่มีคำว่า Heart):
```bash
npm run overlays -- Heart
```
หรือสั่งทีละตัว:
```bash
npx remotion render Overlay-ThankYou out/overlays/ThankYou.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png
```

Overlay ที่มีให้:
| Composition | เนื้อหา |
|---|---|
| `Overlay-ThankYou` | "Thank you พี่[ชื่อเล่น]" |
| `Overlay-Years` | ตรา "[xx] Years" |
| `Overlay-Heart` | หัวใจเส้นทอง วาดเส้นเอง |
| `Overlay-Star` | ดาวเส้นทอง |
| `Overlay-Health` | "สุขภาพแข็งแรงนะ" |
| `Overlay-WishCard-1, 2, …` | การ์ดคำอวยพรแต่ละใบ (1 ใบต่อ 1 คำอวยพรใน config) |

> **CapCut:** บางเวอร์ชันอ่าน ProRes 4444 ไม่ได้ ถ้าลากไฟล์เข้าไปแล้วพื้นหลังเป็นสีดำ ให้ render เป็น WebM แทน:
> ```bash
> npx remotion render Overlay-Heart out/overlays/Heart.webm --codec=vp9 --pixel-format=yuva420p --image-format=png
> ```

---

## 6. โครงสร้างไฟล์

```
retirement-video/
├── src/
│   ├── config.ts            ← แก้ไฟล์นี้ไฟล์เดียว
│   ├── theme.ts             สี ฟอนต์
│   ├── timing.ts            คำนวณลำดับและความยาวฉากจาก config
│   ├── Root.tsx             รายการ composition ทั้งหมด
│   ├── RetirementFull.tsx   ร้อยทุกฉาก + เพลง
│   ├── components/          กรอบทอง, ลายเส้น, โพลารอยด์ + Ken Burns
│   ├── scenes/              1 ไฟล์ต่อ 1 ฉาก
│   └── overlays/            สติกเกอร์พื้นโปร่งใส
├── public/
│   ├── photos/  music/  logo/  wishes/
└── scripts/render-overlays.mjs
```

## 7. ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| Studio เปิดไม่ขึ้น / ขึ้น error สีแดง | ตรวจ `config.ts` ว่าไม่ได้ลบ `"` `,` `{` `}` ไปโดยไม่ตั้งใจ |
| รูปไม่ขึ้น | ชื่อไฟล์ใน config ต้องตรงกับไฟล์ใน `public/` ทุกตัวอักษร (ตัวพิมพ์เล็ก/ใหญ่ด้วย) |
| ฟอนต์ไทยเป็นตัวธรรมดา | ต่ออินเทอร์เน็ตก่อนเปิด Studio / render |
| หน้าคนในรูปถูกตัด | เปลี่ยน `orientation` ให้ตรงกับรูป (แนวตั้ง = `"portrait"`) |
