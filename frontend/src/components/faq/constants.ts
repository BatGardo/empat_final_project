export interface FaqType {
  question: string;
  answer: string;
}

export const faqs: FaqType[] = [
  {
    question: 'Is Baza Grunt Osnova free to use?',
    answer:
      'Yes, the core features for organizing trips, managing tasks, and splitting expenses are completely free for all group members.',
  },
  {
    question: 'Do my friends need an account to join the trip?',
    answer:
      'Yes, they need to create a quick account using their email. This ensures their tasks, claimed items, and expense records are securely saved and synced across the group.',
  },
  {
    question: 'How exactly does the budget calculator split expenses?',
    answer:
      'You simply enter the total cost of an item and select who paid for it. The app automatically divides the amount equally among the selected members and calculates the final balances to settle debts easily.',
  },
  {
    question: 'Can I use the app offline during my trip?',
    answer:
      'Currently, an active internet connection is required to sync updates with your group in real-time. We recommend taking screenshots of important itinerary details if you expect to be without network coverage.',
  },
  {
    question: 'What happens if I accidentally delete a shared task?',
    answer:
      'Right now, deleted tasks and expenses cannot be restored. We strongly recommend double-checking with your team before removing any shared financial records or itinerary items.',
  },
];
