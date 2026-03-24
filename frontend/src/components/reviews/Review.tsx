import type { ReviewType } from './constants';

interface ReviewProps {
  review: ReviewType;
  index: number;
  showAll: boolean;
}

const Review = ({ review, index, showAll }: ReviewProps) => {
  const displayClass = index >= 2 && !showAll ? 'hidden md:flex' : 'flex';

  return (
    <div
      className={`h-[200px] w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${displayClass}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-text-secondary font-semibold">{review.name}</span>
      </div>

      <div className="mb-4 flex h-3 gap-1">
        {[...Array(5)].map((_, i) => (
          <img key={i} src="icons/star.svg" alt="star" className="h-3 w-3" />
        ))}
      </div>

      <p className="text-text-neutral line-clamp-3 text-sm">{review.text}</p>
    </div>
  );
};

export default Review;
