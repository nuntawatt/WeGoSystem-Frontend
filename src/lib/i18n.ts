// apps/frontend/src/lib/i18n.ts
export const t = (key: string, locale: 'en' | 'th' = 'en') => {
  const dict: Record<string, Record<string, string>> = {
    en: {
      explore_title: 'Explore Activities',
      join: 'Join',
      create: 'Create',
      availability: 'Availability'
    },
    th: {
      explore_title: 'สำรวจกิจกรรม',
      join: 'เข้าร่วม',
      create: 'สร้าง',
      availability: 'ช่วงเวลาว่าง'
    }
  };
  return (dict[locale] && dict[locale][key]) || key;
};
