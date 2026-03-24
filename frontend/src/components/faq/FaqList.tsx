import { useState } from 'react';
import FaqItem from './FaqItem';
import type { FaqType } from './constants';

interface FaqListProps {
  faqs: FaqType[];
}

const FaqList = ({ faqs }: FaqListProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onClick={() => toggleFaq(index)}
        />
      ))}
    </div>
  );
};

export default FaqList;
