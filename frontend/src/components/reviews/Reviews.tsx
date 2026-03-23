import { useState } from 'react';
import { reviews } from './constants';
import ReviewList from './ReviewList';

const Reviews = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="bg-gray-50 px-5 py-16 md:px-30">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-headings mb-12 text-center text-2xl font-bold md:mb-16 md:text-4xl">
          What our users telling about us
        </h2>

        <ReviewList reviews={reviews} showAll={showAll} />

        {!showAll && (
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => setShowAll(true)}
              className="font-headings text-text-secondary font-medium hover:text-gray-800"
            >
              See more reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
