import { Link } from 'react-router';

type ReviewCardProps = {
    //props 타입 설정, ERD와 맞춤
    id: number;
    memberId: string;
    eventId: string;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
};

const ReviewCard = ({
    id,
    memberId,
    eventId,
    rating,
    content,
    createdAt,
    updatedAt
}: ReviewCardProps) => {
    return(
        <Link to={`/review/${id}`} className="block">
        <div className="rounded-xl border bg-card h-28">
            {content}
        </div>
        </Link>
    );
};

export default ReviewCard;
