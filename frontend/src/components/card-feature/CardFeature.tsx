import { features } from './constants';
import FeatureList from './FeatureList';

const CardFeature = () => {
  return (
    <section className="bg-purple-50 px-5 py-16 md:px-30">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-headings font-headings mb-6 text-2xl font-bold md:text-4xl">
          Features in Action
        </h2>

        <FeatureList features={features} />
      </div>
    </section>
  );
};

export default CardFeature;
