import { steps } from './constants';
import StepsList from './StepsList';

const Steps = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] content-center bg-white px-5 py-16 md:px-30 lg:py-0">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-headings text-headings text-2xl font-bold md:text-4xl">
            Plan Your Trip in 4 Steps
          </h2>
          <p className="text-text-secondary mt-4 text-lg font-light md:text-xl">
            A clear breakdown of the user flow from creation to planning.
          </p>
        </div>

        <StepsList steps={steps} />
      </div>
    </section>
  );
};

export default Steps;
