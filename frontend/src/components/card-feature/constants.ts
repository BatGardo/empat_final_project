import planPreview from '../../assets/images/plan.webp';
import dashboardPreview from '../../assets/images/dashboard.webp';
import kanbanPreview from '../../assets/images/kanban.webp';

export interface FeatureType {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const features: FeatureType[] = [
  {
    id: 1,
    title: 'Your Group',
    description:
      'Create a group and immediately share the link with your friends, and they can join the workspace instantly by simply entering their names. Planning can be easy.',
    image: dashboardPreview,
  },
  {
    id: 2,
    title: 'Visual Task Management',
    description:
      'Track every detail of your trip. Create tasks, set deadlines, and move them through "In Progress" and "Done" statuses. Group members can claim tasks so everyone knows who is responsible for each item.',
    image: kanbanPreview,
  },
  {
    id: 3,
    title: 'The Plan',
    description:
      'Manage every expense of your trip. Add new costs, set categories, and split them between "Paid" and "Pending" statuses. Group members can track budgets so everyone knows exactly who owes what for each item.',
    image: planPreview,
  },
];
