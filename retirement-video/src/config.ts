/**
 * ====================================================================
 *  ไฟล์ตั้งค่าวิดีโอ "Happy Early Retirement"
 *  แก้เฉพาะไฟล์นี้ไฟล์เดียวก็พอ — ข้อความในเครื่องหมาย " " แก้ได้ทั้งหมด
 *  (ห้ามลบเครื่องหมาย " , { } [ ] ออก) บันทึกไฟล์แล้ว Remotion Studio จะอัปเดตเอง
 * ====================================================================
 */

export type PhotoStyle = "single" | "collage";

export type Photo = {
  /** ที่อยู่ไฟล์ในโฟลเดอร์ public/ เช่น "photos/photo-01.jpg" */
  src: string;
  /** อยู่ในบทที่เท่าไร (ตรงกับ number ใน chapters ด้านล่าง) */
  chapter: number;
  /** "single" = รูปเดี่ยวเต็มจอ, "collage" = รวมเป็นกลุ่มละ 4 รูป */
  style: PhotoStyle;
  /** ปีของรูป เช่น "2010" (เว้นว่าง "" ได้ถ้าไม่รู้) */
  year: string;
  /** คำบรรยายใต้รูป (เว้นว่าง "" ได้) */
  caption: string;
  /** "landscape" = รูปแนวนอน, "portrait" = รูปแนวตั้ง */
  orientation: "landscape" | "portrait";
};

export type Milestone = { year: string; event: string };

export type Wish = {
  message: string;
  name: string;
  department: string;
  /** รูปผู้อวยพร (ไม่บังคับ) เช่น "wishes/somchai.jpg" */
  photo?: string;
  /** คลิปวิดีโออวยพร (ไม่บังคับ) เช่น "wishes/somchai.mp4" */
  video?: string;
  /** ความยาวคลิปเป็นวินาที — ใส่เมื่อมี video เพื่อให้ฉากยาวเท่าคลิป */
  videoSeconds?: number;
};

export const config = {
  // ---------------------------------------------------------------- เจ้าของวันนี้
  person: {
    nickname: "[ชื่อเล่นพี่]",
    fullName: "[ชื่อ-นามสกุล]",
    position: "[ตำแหน่ง]",
    department: "[แผนก]",
    startYear: 2006,
    retireYear: 2026,
    yearsOfService: "[xx]",
    /** รูปเปิดเรื่องและปิดเรื่อง (เว้นว่าง "" ถ้าไม่ต้องการ) */
    portrait: "photos/photo-60.jpg",
  },

  // ---------------------------------------------------------------- ทีมที่มอบวิดีโอนี้
  team: {
    name: "[ชื่อทีม/แผนก]",
    /** โลโก้ในโฟลเดอร์ public/logo เช่น "logo/logo.png" (เว้นว่าง "" = แสดงช่องว่างไว้ให้) */
    logo: "",
    /** true = แสดงกรอบช่องโลโก้แม้ยังไม่มีไฟล์, false = ซ่อน */
    showLogoPlaceholder: true,
  },

  // ---------------------------------------------------------------- บท (ลำดับตามนี้)
  chapters: [
    { number: 1, title: "วันแรกที่เราได้พบกัน", titleEn: "The Day We First Met", showTimeline: false },
    { number: 2, title: "ช่วงเวลาที่ภูมิใจ", titleEn: "Moments of Pride", showTimeline: true },
    { number: 3, title: "ความทรงจำกับทีม", titleEn: "Memories with the Team", showTimeline: false },
  ],
  /** บทสุดท้าย (คำอวยพร) ต่อท้ายบทด้านบนอัตโนมัติ */
  wishesChapter: { title: "คำอวยพรจากพวกเรา", titleEn: "Words from the Heart" },

  // ---------------------------------------------------------------- รูปภาพ
  photos: [
  // ---- บทที่ 1 · รูปเดี่ยว
  { src: "photos/photo-01.jpg", chapter: 1, style: "single", year: "2006", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  { src: "photos/photo-02.jpg", chapter: 1, style: "single", year: "2010", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  { src: "photos/photo-05.jpg", chapter: 1, style: "single", year: "2011", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  // ---- บทที่ 1 · คอลลาจ (จัดกลุ่มละ 4 รูปอัตโนมัติ)
  { src: "photos/photo-03.jpg", chapter: 1, style: "collage", year: "2010", caption: "", orientation: "landscape" },
  { src: "photos/photo-04.jpg", chapter: 1, style: "collage", year: "2010", caption: "", orientation: "landscape" },
  { src: "photos/photo-06.jpg", chapter: 1, style: "collage", year: "2011", caption: "", orientation: "landscape" },
  { src: "photos/photo-07.jpg", chapter: 1, style: "collage", year: "2011", caption: "", orientation: "landscape" },
  { src: "photos/photo-08.jpg", chapter: 1, style: "collage", year: "2012", caption: "", orientation: "landscape" },
  { src: "photos/photo-09.jpg", chapter: 1, style: "collage", year: "2014", caption: "", orientation: "portrait" },
  { src: "photos/photo-53.jpg", chapter: 1, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-54.jpg", chapter: 1, style: "collage", year: "", caption: "", orientation: "portrait" },
  // ---- บทที่ 2 · รูปเดี่ยว
  { src: "photos/photo-18.jpg", chapter: 2, style: "single", year: "2026", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  { src: "photos/photo-48.jpg", chapter: 2, style: "single", year: "", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  { src: "photos/photo-59.jpg", chapter: 2, style: "single", year: "", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  { src: "photos/photo-73.jpg", chapter: 2, style: "single", year: "", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  // ---- บทที่ 2 · คอลลาจ (จัดกลุ่มละ 4 รูปอัตโนมัติ)
  { src: "photos/photo-17.jpg", chapter: 2, style: "collage", year: "2025", caption: "", orientation: "landscape" },
  { src: "photos/photo-28.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-36.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-43.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-44.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-61.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-69.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-70.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-71.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-72.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-19.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-31.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  // ---- บทที่ 3 · รูปเดี่ยว
  { src: "photos/photo-75.jpg", chapter: 3, style: "single", year: "", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  { src: "photos/photo-50.jpg", chapter: 3, style: "single", year: "", caption: "[คำบรรยายรูป]", orientation: "landscape" },
  // ---- บทที่ 3 · คอลลาจ (จัดกลุ่มละ 4 รูปอัตโนมัติ)
  { src: "photos/photo-10.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-11.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "landscape" },
  { src: "photos/photo-12.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-13.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-14.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "landscape" },
  { src: "photos/photo-15.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-16.jpg", chapter: 3, style: "collage", year: "2024", caption: "", orientation: "landscape" },
  { src: "photos/photo-20.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-21.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-22.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-23.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-24.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-25.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-26.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-27.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-29.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-30.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-32.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-33.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-34.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-35.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-37.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-38.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-39.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-40.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-41.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-42.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-45.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-46.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-47.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-49.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-51.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-52.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-55.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-56.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-57.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-58.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-62.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-63.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-64.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-65.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-66.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-67.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-68.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-74.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  ] as Photo[],

  // ---------------------------------------------------------------- เส้นทางการทำงาน (timeline)
  milestones: [
    { year: "2006", event: "[วันแรกที่เข้าทำงาน]" },
    { year: "[ปี]", event: "[เลื่อนตำแหน่ง / ย้ายแผนก]" },
    { year: "[ปี]", event: "[โปรเจกต์ที่ภูมิใจ]" },
    { year: "[ปี]", event: "[รางวัล / ความสำเร็จ]" },
    { year: "[ปี]", event: "[ดูแลน้องๆ ในทีม]" },
    { year: "2026", event: "เกษียณก่อนกำหนด" },
  ] as Milestone[],

  // ---------------------------------------------------------------- คำอวยพร
  wishes: [
    { message: "[ขอบคุณที่คอยสอนงานและดูแลพวกเรามาตลอด ขอให้พี่มีความสุขกับชีวิตบทใหม่นะคะ]", name: "[ชื่อผู้อวยพร]", department: "[แผนก]" },
    { message: "[ขอให้พี่สุขภาพแข็งแรง ได้เที่ยวในที่ที่อยากไปทุกที่เลยครับ]", name: "[ชื่อผู้อวยพร]", department: "[แผนก]" },
    { message: "[ทุกความทรงจำกับพี่มีค่ามาก คิดถึงพี่เสมอนะคะ]", name: "[ชื่อผู้อวยพร]", department: "[แผนก]" },
    { message: "[ขอบคุณสำหรับรอยยิ้มและกำลังใจทุกวัน]", name: "[ชื่อผู้อวยพร]", department: "[แผนก]" },
    { message: "[ขอให้ทุกวันหลังจากนี้เป็นวันพักผ่อนที่มีความสุขที่สุด]", name: "[ชื่อผู้อวยพร]", department: "[แผนก]" },
  ] as Wish[],

  // ---------------------------------------------------------------- เพลง
  music: {
    /** ไฟล์เพลงในโฟลเดอร์ public/music (เว้นว่าง "" = ไม่มีเพลง) */
    src: "music/placeholder-piano.mp3",
    /** ความดัง 0–1 */
    volume: 0.6,
    fadeInSeconds: 2,
    fadeOutSeconds: 4,
  },

  // ---------------------------------------------------------------- ความยาวแต่ละฉาก (วินาที)
  timing: {
    opening: 7,
    chapterCard: 4,
    photoFrame: 5,
    collage: 7,
    collageSize: 4,
    timelineIntro: 3,
    perMilestone: 2.2,
    wish: 7,
    closing: 9,
    /** ช่วงซ้อนภาพตอนเปลี่ยนฉาก */
    transition: 0.6,
  },
};
