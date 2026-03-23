import avatar from '../../assets/images/avatar.webp';

export interface ReviewType {
  id: number;
  name: string;
  text: string;
  avatar: string;
}

export const reviews: ReviewType[] = [
  {
    id: 1,
    name: 'Sarah T.',
    text: 'Splitting the cost used to take hours. Now we just enter the amount and the app calculates everything automatically. LOVE IT.',
    avatar: avatar,
  },
  {
    id: 2,
    name: 'Mark P.',
    text: 'We completely dropped our messy shared spreadsheet. Having this app saved us a lot of time.',
    avatar: avatar,
  },
  {
    id: 3,
    name: 'Jessica L.',
    text: 'It is a highly practical tool for keeping a large group on schedule.',
    avatar: avatar,
  },
  {
    id: 4,
    name: 'Elena R.',
    text: "It completely stopped the endless 'who is doing what' questions in our group chat.",
    avatar: avatar,
  },
  {
    id: 5,
    name: 'Elena R.',
    text: "It completely stopped the endless 'who is doing what' questions in our group chat.",
    avatar: avatar,
  },
  {
    id: 6,
    name: 'Alex M.',
    text: 'Really easy to use. Recommend it!',
    avatar: avatar,
  },
  {
    id: 7,
    name: 'Sarah T.',
    text: 'We already have started planning our ski trip. Awesome tool.',
    avatar: avatar,
  },
  {
    id: 8,
    name: 'Elena R.',
    text: "It completely stopped the endless 'who is doing what' questions in our group chat.",
    avatar: avatar,
  },
];
