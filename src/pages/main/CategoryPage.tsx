import { ArrowLeft } from 'lucide-react';
import EventStatusBadge from '@/components/events/EventStatusBadge';
import { useParams } from 'react-router';
import { categories } from '@/lib/categories';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const cid = Number(categoryId);

  const categoryName =
    categories.find((c) => c.id === cid)?.label ?? '카테고리';
    // item은 우선 예시입니다
  const items = [
    {
      id: 1,
      title: '체험 1',
      status: 'OPEN',
      applyEndDateTime: '2026-03-10T23:59:00',
    },
    {
      id: 2,
      title: '체험 2',
      status: 'OPEN',
      applyEndDateTime: '2026-03-06T10:00:00',
    },
    {
      id: 3,
      title: '체험 3',
      status: 'CLOSED',
      applyEndDateTime: '2026-03-01T23:59:00',
    },
    {
      id: 4,
      title: '체험 4',
      status: 'OPEN',
      applyEndDateTime: '2026-03-20T23:59:00',
    },
    {
      id: 5,
      title: '체험 5',
      status: 'OPEN',
      applyEndDateTime: '2026-03-30T23:59:00',
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="px-8 py-6">
      {/* 타이틀 */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold">{categoryName}</h1>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((event) => (
          <article
            key={event.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="aspect-[4/3] w-full bg-gray-200" />

            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium truncate">{event.title}</h2>

                <EventStatusBadge
                  status={event.status}
                  applyEndDateTime={event.applyEndDateTime}
                />
              </div>

              <div className="mt-3 space-y-2">
                <div className="h-2 w-24 bg-gray-200" />
                <div className="h-2 w-32 bg-gray-200" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
