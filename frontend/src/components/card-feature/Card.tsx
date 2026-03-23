import type { FeatureType } from './constants';

interface FeatureItemProps {
  feature: FeatureType;
  isFirstCard: boolean;
}

const Card = ({ feature, isFirstCard }: FeatureItemProps) => {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ${
        isFirstCard ? 'gap-6 p-8 md:col-span-2 md:p-12' : 'gap-6 p-8 md:p-12'
      }`}
    >
      <div className="w-full space-y-4">
        <h3 className="font-headings text-headings text-xl font-bold">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-600 md:text-base">
          {feature.description}
        </p>
      </div>

      <div className={'flex w-full justify-center'}>
        <img
          src={feature.image}
          alt={feature.title}
          className={`object-contain ${isFirstCard ? 'max-h-100 object-top' : ''} h-auto w-full rounded-xl`}
        />
      </div>
    </div>
  );
};

export default Card;
