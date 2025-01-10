import  { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I rent a car?",
      answer:
        "Simply browse our listings, choose your preferred car, and click 'Book Now' to reserve your rental.",
    },
    {
      question: "What are the payment options?",
      answer:
        "We accept credit/debit cards, online payments, and other secure payment methods.",
    },
    {
      question: "Do you provide insurance?",
      answer:
        "Yes, all rentals include basic insurance. Additional coverage is also available at an extra cost.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can modify or cancel your booking up to 24 hours before your rental date.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-6 transition-colors duration-300 dark:bg-[#000903] bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-black dark:text-white text-center mb-12 relative">
          Frequently Asked Questions
          <span className="block mt-2 w-16 h-1 bg-[#F04646] mx-auto"></span>
        </h2>
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden transition-all duration-300 
              border-gray-300 dark:border-gray-600"
            >
              <button
                className="w-full text-left p-4 font-semibold text-black dark:text-white flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="ml-2 text-[#F04646]">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#101214]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
