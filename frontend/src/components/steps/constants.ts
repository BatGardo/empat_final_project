export interface StepType {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: string;
}

export const steps: StepType[] = [
  {
    id: 1,
    label: 'Step 1',
    title: 'Initialize\nThe Group',
    description:
      'Enter your name and the name of your trip. You are the leader of a trip now!',
    icon: 'icons/step1.svg',
  },
  {
    id: 2,
    label: 'Step 2',
    title: 'Invite\nParticipants',
    description: 'Invite people you want in your group.',
    icon: 'icons/step2.svg',
  },
  {
    id: 3,
    label: 'Step 3',
    title: 'Manage Tasks\nand Costs',
    description: 'Start adding tasks to the shared board and set the expenses.',
    icon: 'icons/step3.svg',
  },
  {
    id: 4,
    label: 'Step 4',
    title: 'Go To The\nBest Trip Ever',
    description: 'With all tasks assigned, enjoy your vacation.',
    icon: 'icons/step4.svg',
  },
];
