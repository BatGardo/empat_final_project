import type { StepType } from './constants';

interface StepProps {
  step: StepType;
}

const OneStep = ({ step }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-headings mb-6 text-xl font-bold">{step.label}</span>

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full md:h-24 md:w-24">
        <img
          src={step.icon}
          alt={step.title.replace('\n', ' ')}
          className="h-16 w-16 md:h-full md:w-full"
        />
      </div>

      <h3 className="text-headings mb-3 text-lg font-bold whitespace-pre-line md:text-xl">
        {step.title}
      </h3>

      <p className="text-text-secondary max-w-[250px] text-base md:text-xl">
        {step.description}
      </p>
    </div>
  );
};

export default OneStep;
