import React from "react";

const Faq = () => {
  return (
    <div>
      <section className="max-w-4xl mx-auto text-left px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Is this tool free to use?",
              a: "Yes. The comparison tool is 100% free and open to the public.",
            },
            {
              q: "Do you favor any vendors?",
              a: "No. We do not accept payments to bias the rankings or suggestions.",
            },
            {
              q: "What makes the results accurate?",
              a: "Our engine is driven by structured feature data and updated regularly.",
            },
          ].map((faq, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Faq;
