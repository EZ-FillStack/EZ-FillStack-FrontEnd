export const banners = [
  {
    id: 1,
    title: '이번 주 인기 체험',
    subtitle: '지금 가장 핫한 체험을 만나보세요',
    className: 'bg-violet-200',
  },
  {
    id: 2,
    title: '신규 오픈 체험',
    subtitle: '막 열린 체험, 먼저 신청해보세요',
    className: 'bg-emerald-200',
  },
  {
    id: 3,
    title: '주말 추천 코스',
    subtitle: '주말에 딱 맞는 체험 모음',
    className: 'bg-sky-200',
  },
  {
    id: 4,
    title: '가족·친구와 함께',
    subtitle: '함께하면 더 즐거운 체험',
    className: 'bg-orange-200',
  },
  {
    id: 5,
    title: '마감 임박',
    subtitle: '신청 마감이 가까운 체험이에요',
    className: 'bg-rose-200',
  },
] as const;

export type Banner = (typeof banners)[number];
