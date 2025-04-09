import React from "react";

const WhyThisTool = () => {
  return (
    <div>
      <section className="max-w-6xl text-center px-4">
        <h2 className="text-3xl font-semibold mb-8">
          Why Use Our Comparison Tool?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {[
            {
              title: "100% Unbiased",
              desc: "We don't accept payments or sponsorships from vendors. Our data is objective and transparent.",
            },
            {
              title: "Deep Feature Coverage",
              desc: "Compare vendors based on real product capabilities — not just marketing promises.",
            },
            {
              title: "Built with Experts",
              desc: "Created with input from legal, procurement, and compliance professionals worldwide.",
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyThisTool;
