import type { FaqType } from './constants';

interface FaqItemProps {
  faq: FaqType;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ faq, isOpen, onClick }: FaqItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-200 ${
        isOpen ? 'border-second-bg bg-white' : 'bg-second-bg border-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-headings text-headings font-semibold md:text-lg">
          {faq.question}
        </h3>

        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <img src="/icons/chevron.svg" alt="Open question" />
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <p className="text-text-secondary">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
