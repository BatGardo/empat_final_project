import Card from './Card';
import type { FeatureType } from './constants';

interface FeatureListProps {
  features: FeatureType[];
}

const FeatureList = ({ features }: FeatureListProps) => {
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-5">
      {features.map((feature, index) => (
        <Card key={feature.id} feature={feature} isFirstCard={index === 0} />
      ))}
    </div>
  );
};

export default FeatureList;
