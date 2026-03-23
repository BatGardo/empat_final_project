import Review from './Review';
import type { ReviewType } from './constants';

interface ReviewListProps {
  reviews: ReviewType[];
  showAll: boolean;
}

const ReviewList = ({ reviews, showAll }: ReviewListProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {reviews.map((review, index) => (
        <Review
          key={review.id}
          review={review}
          index={index}
          showAll={showAll}
        />
      ))}
    </div>
  );
};

export default ReviewList;
