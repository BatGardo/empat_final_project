import { faqs } from './constants';
import FaqList from './FaqList';

const Faq = () => {
  return (
    <section className="bg-white px-5 py-20 md:px-30">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-headings mb-10 text-2xl font-bold md:text-4xl">
          FAQ
        </h2>

        <FaqList faqs={faqs} />
      </div>
    </section>
  );
};

export default Faq;
