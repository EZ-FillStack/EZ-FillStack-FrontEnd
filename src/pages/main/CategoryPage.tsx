import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router';
import EventCard from '@/components/cards/EventCard';
import { categories } from '@/lib/categories';
import { useGetEvents } from '@/hooks/queries/events/useGetEvents';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const cid = Number(categoryId);

  const categoryName =
    categories.find((c) => c.id === cid)?.label ?? '카테고리';

  const { data: lists = [] } = useGetEvents({ categoryId: cid });

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
        {lists.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            thumbnailUrl={event.thumbnailUrl || ''}
            placeName={event.placeName || ''}
            eventStartDateTime={event.eventStartDateTime || ''}
            applyStartDateTime={event.applyStartDateTime || ''}
            applyEndDateTime={event.applyEndDateTime || '1990-01-01'}
            status={event.status}
            capacity={event.capacity || 0}
            currentParticipants={event.currentParticipants || 0}
            size="sm"
            badgeType="default"
            linkTo="events"
          />
        ))}
      </div>
    </section>
  );
}
