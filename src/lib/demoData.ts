// Demo datasets (front-only)
export type EventItem = {
  id: string;
  title: string;
  cover: string;
  about: string;
  tags: string[];
  location?: string;
  date?: string;
  popularity?: number;
};

export type GroupItem = {
  id: string;
  eventId: string;
  name: string;
  members: number;
  max?: number;
  description?: string;
};

export type ReviewItem = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  at: string; 
};

export const ALL_TAGS = [
  '#คอนเสิร์ต', '#ติวสอบ', '#บอร์ดเกม', '#ฟิตเนส', '#วิ่ง', '#ปีนเขา', '#ถ่ายรูป', '#กาแฟ', '#เที่ยว',
];

export const DEMO_EVENTS: EventItem[] = [
  {
    id: 'ev-concert-a',
    title: 'Concert Night – A Artist',
    about: 'ไปดูคอนเสิร์ตด้วยกัน สนุก ปลอดภัย มีเพื่อนคอยช่วยเหลือ',
    cover: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=1600&auto=format&fit=crop',
    tags: ['#คอนเสิร์ต', '#เที่ยว'],
    location: 'Impact Arena',
    date: '2025-10-01T19:00:00Z',
    popularity: 98,
  },
  {
    id: 'ev-boardgame',
    title: 'Boardgame Meetup – Chill & Play',
    about: 'สายบอร์ดเกมมารวมกัน แจกไอเดียเกมใหม่ๆ เพียบ',
    cover: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?q=80&w=1600&auto=format&fit=crop',
    tags: ['#บอร์ดเกม', '#กาแฟ'],
    location: 'WeGo Space',
    date: '2025-09-25T12:00:00Z',
    popularity: 86,
  },
  {
    id: 'ev-toeic',
    title: 'TOEIC Study Group – 700+',
    about: 'ติวสอบ TOEIC กันแบบเข้มข้น แชร์เทคนิค + ข้อสอบจริง',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop',
    tags: ['#ติวสอบ'],
    location: 'BKK Library',
    date: '2025-09-28T03:00:00Z',
    popularity: 92,
  },
  {
    id: 'ev-run',
    title: 'Sunday Run – Lumpini Park',
    about: 'นัดวิ่งเช้า ๆ สุขภาพดี มีเพื่อนไปด้วยไม่เหงา',
    cover: 'https://images.unsplash.com/photo-1546489959-f6d8e94bfae3?q=80&w=1600&auto=format&fit=crop',
    tags: ['#วิ่ง', '#ฟิตเนส'],
    location: 'Lumpini Park',
    date: '2025-09-21T23:00:00Z',
    popularity: 74,
  },
];

export const DEMO_GROUPS: GroupItem[] = [
  { id: 'g-con-1', eventId: 'ev-concert-a', name: 'โซนหน้าสุดสายมันส์', members: 18, max: 24 },
  { id: 'g-con-2', eventId: 'ev-concert-a', name: 'โซนไวบ์ชิล', members: 12, max: 18 },
  { id: 'g-bd-1', eventId: 'ev-boardgame', name: 'เริ่มต้น / เกมง่าย', members: 8, max: 10 },
  { id: 'g-bd-2', eventId: 'ev-boardgame', name: 'เกมยาว / กลยุทธ์หนัก', members: 7, max: 8 },
  { id: 'g-toeic-1', eventId: 'ev-toeic', name: '700+ intensive', members: 15, max: 20 },
  { id: 'g-run-1', eventId: 'ev-run', name: '5K easy pace', members: 9, max: 12 },
];

export const DEMO_REVIEWS: Record<string, ReviewItem[]> = {
  'ev-boardgame': [
    { id: 'r1', user: 'Ploy', rating: 5, comment: 'บรรยากาศดี เพื่อนใหม่เยอะ', at: '2025-08-01' },
    { id: 'r2', user: 'Mek',  rating: 4, comment: 'พิธีกรชวนคุยเก่ง สนุก', at: '2025-08-02' },
  ],
  'ev-concert-a': [
    { id: 'r3', user: 'Beam', rating: 5, comment: 'ไปด้วยแล้วอุ่นใจ เทคแคร์ดี', at: '2025-08-03' },
  ],
};
