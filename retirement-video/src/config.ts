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
    nickname: "พี่พิน",
    fullName: "อรพิน บุญโชคชัย",
    position: "[ตำแหน่ง]",
    department: "[แผนก]",
    startYear: 1991,
    retireYear: 2026,
    yearsOfService: "35",
    /** ข้อความใต้ชื่อในฉากเปิด */
    tagline: "35 ปีแห่งความทรงจำ",
    /** รูปเปิดเรื่องและปิดเรื่อง (เว้นว่าง "" ถ้าไม่ต้องการ) */
    portrait: "photos/photo-60.jpg",
  },

  // ---------------------------------------------------------------- ทีมที่มอบวิดีโอนี้
  team: {
    name: "น้องๆ",
    /** โลโก้ในโฟลเดอร์ public/logo เช่น "logo/logo.png" (เว้นว่าง "" = แสดงช่องว่างไว้ให้) */
    logo: "",
    /** true = แสดงกรอบช่องโลโก้แม้ยังไม่มีไฟล์, false = ซ่อน */
    showLogoPlaceholder: false,
  },

  // ---------------------------------------------------------------- เรื่อง (กลุ่มรูป เรียงตามลำดับนี้)
  /** false = ไม่แสดงการ์ดคั่นบท (รูปเล่าต่อกันเลย), true = แสดงการ์ด "Chapter 01 …" ก่อนแต่ละเรื่อง */
  showChapterCards: false,
  chapters: [
    { number: 1, title: "ช่วงแรกที่ออฟฟิศ 2006–2014", titleEn: "", showTimeline: false },
    { number: 2, title: "งานและกิจกรรมกับทีม", titleEn: "", showTimeline: false },
    { number: 3, title: "งานเลี้ยงและปาร์ตี้", titleEn: "", showTimeline: false },
    { number: 4, title: "วันพิเศษของคนในทีม", titleEn: "", showTimeline: false },
    { number: 5, title: "ทริปเที่ยวด้วยกัน 2024", titleEn: "", showTimeline: false },
    { number: 6, title: "งานช่วงหลัง 2025–2026", titleEn: "", showTimeline: false },
    { number: 7, title: "ทริปไหว้พระ", titleEn: "", showTimeline: false },
  ],
  /** การ์ดคั่นก่อนคำอวยพร (แสดงเมื่อ showChapterCards: true) */
  wishesChapter: { title: "คำอวยพรจากพวกเรา", titleEn: "Words from the Heart" },

  // ---------------------------------------------------------------- รูปภาพ
  photos: [
  // ---- เรื่องที่ 1: ช่วงแรกที่ออฟฟิศ 2006–2014  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-01.jpg", chapter: 1, style: "single", year: "2006", caption: "", orientation: "landscape" },
  { src: "photos/photo-03.jpg", chapter: 1, style: "collage", year: "2010", caption: "", orientation: "landscape" },
  { src: "photos/photo-04.jpg", chapter: 1, style: "collage", year: "2010", caption: "", orientation: "landscape" },
  { src: "photos/photo-05.jpg", chapter: 1, style: "collage", year: "2011", caption: "", orientation: "landscape" },
  { src: "photos/photo-07.jpg", chapter: 1, style: "collage", year: "2011", caption: "", orientation: "landscape" },
  { src: "photos/photo-02.jpg", chapter: 1, style: "collage", year: "2010", caption: "", orientation: "landscape" },
  { src: "photos/photo-06.jpg", chapter: 1, style: "collage", year: "2011", caption: "", orientation: "landscape" },
  { src: "photos/photo-08.jpg", chapter: 1, style: "collage", year: "2012", caption: "", orientation: "landscape" },
  { src: "photos/photo-09.jpg", chapter: 1, style: "collage", year: "2014", caption: "", orientation: "portrait" },
  { src: "photos/photo-37.jpg", chapter: 1, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-53.jpg", chapter: 1, style: "collage", year: "", caption: "", orientation: "portrait" },
  // ---- เรื่องที่ 2: งานและกิจกรรมกับทีม  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-27.jpg", chapter: 2, style: "single", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-36.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-42.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-28.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-26.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-39.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-19.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-40.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-41.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-35.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-31.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-43.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-44.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-49.jpg", chapter: 2, style: "collage", year: "", caption: "", orientation: "landscape" },
  // ---- เรื่องที่ 3: งานเลี้ยงและปาร์ตี้  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-33.jpg", chapter: 3, style: "single", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-34.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-29.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-54.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-55.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-45.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-46.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-47.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-48.jpg", chapter: 3, style: "collage", year: "", caption: "", orientation: "landscape" },
  // ---- เรื่องที่ 4: วันพิเศษของคนในทีม  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-50.jpg", chapter: 4, style: "single", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-52.jpg", chapter: 4, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-51.jpg", chapter: 4, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-56.jpg", chapter: 4, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-57.jpg", chapter: 4, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-58.jpg", chapter: 4, style: "collage", year: "", caption: "", orientation: "portrait" },
  // ---- เรื่องที่ 5: ทริปเที่ยวด้วยกัน 2024  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-14.jpg", chapter: 5, style: "single", year: "2024", caption: "", orientation: "landscape" },
  { src: "photos/photo-10.jpg", chapter: 5, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-11.jpg", chapter: 5, style: "collage", year: "2024", caption: "", orientation: "landscape" },
  { src: "photos/photo-12.jpg", chapter: 5, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-13.jpg", chapter: 5, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-15.jpg", chapter: 5, style: "collage", year: "2024", caption: "", orientation: "portrait" },
  { src: "photos/photo-16.jpg", chapter: 5, style: "collage", year: "2024", caption: "", orientation: "landscape" },
  { src: "photos/photo-20.jpg", chapter: 5, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-24.jpg", chapter: 5, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-21.jpg", chapter: 5, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-22.jpg", chapter: 5, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-30.jpg", chapter: 5, style: "collage", year: "", caption: "", orientation: "landscape" },
  // ---- เรื่องที่ 6: งานช่วงหลัง 2025–2026  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-18.jpg", chapter: 6, style: "single", year: "2026", caption: "", orientation: "landscape" },
  { src: "photos/photo-17.jpg", chapter: 6, style: "collage", year: "2025", caption: "", orientation: "landscape" },
  { src: "photos/photo-59.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-61.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-62.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-69.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-70.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-71.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-72.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  { src: "photos/photo-74.jpg", chapter: 6, style: "collage", year: "", caption: "", orientation: "landscape" },
  // ---- เรื่องที่ 7: ทริปไหว้พระ  (รูปแรกของแต่ละเรื่องแสดงเดี่ยว ที่เหลือเป็นคอลลาจ)
  { src: "photos/photo-63.jpg", chapter: 7, style: "single", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-65.jpg", chapter: 7, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-66.jpg", chapter: 7, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-67.jpg", chapter: 7, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-68.jpg", chapter: 7, style: "collage", year: "", caption: "", orientation: "portrait" },
  { src: "photos/photo-75.jpg", chapter: 7, style: "collage", year: "", caption: "", orientation: "landscape" },
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
    { message: "ขอบคุณที่คอยสอนงานและดูแลพวกเรามาตลอด ขอให้พี่มีความสุขกับชีวิตบทใหม่นะคะ", name: "", department: "" },
    { message: "ขอให้พี่สุขภาพแข็งแรง ได้เที่ยวในที่ที่อยากไปทุกที่เลยครับ", name: "", department: "" },
    { message: "ทุกความทรงจำกับพี่มีค่ามาก คิดถึงพี่เสมอนะคะ", name: "", department: "" },
    { message: "ขอบคุณสำหรับรอยยิ้มและกำลังใจทุกวัน", name: "", department: "" },
    { message: "ขอให้ทุกวันหลังจากนี้เป็นวันพักผ่อนที่มีความสุขที่สุด", name: "", department: "" },
  ] as Wish[],

  /** เอฟเฟกต์หัวใจ ดาว อิโมจิลอยในวิดีโอ: true = แสดง, false = ปิด */
  loveEffects: true,

  // ---------------------------------------------------------------- เพลง
  music: {
    /** ไฟล์เพลงในโฟลเดอร์ public/music (เว้นว่าง "" = ไม่มีเพลง) */
    src: "music/upbeat-120s.mp3",
    /** ความดัง 0–1 */
    volume: 0.8,
    fadeInSeconds: 0.5,
    fadeOutSeconds: 2,
  },

  // ---------------------------------------------------------------- ความยาวแต่ละฉาก (วินาที)
  timing: {
    /** ความยาวทั้งเรื่องที่ต้องการ (วินาที) — ฉากรูปจะยืด/หดให้พอดีเอง, ใส่ 0 = ไม่บังคับ */
    targetSeconds: 120,
    opening: 5,
    chapterCard: 3,
    photoFrame: 3,
    collage: 4,
    collageSize: 4,
    timelineIntro: 3,
    perMilestone: 2.2,
    wish: 4.5,
    closing: 6,
    /** ช่วงซ้อนภาพตอนเปลี่ยนฉาก */
    transition: 0.5,
  },
};
