import OneStep from './OneStep';
import type { StepType } from './constants';

interface StepsListProps {
  steps: StepType[];
}

const StepsList = ({ steps }: StepsListProps) => {
  return (
    <div className="flex flex-col gap-12 md:grid md:grid-cols-4 md:gap-6">
      {steps.map((step) => (
        <OneStep key={step.id} step={step} />
      ))}
    </div>
  );
};

export default StepsList;
