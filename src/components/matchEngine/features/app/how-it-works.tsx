"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "1. Define Your Focus",
    desc: "Choose the type of solution that aligns with your business objectives. Your selection helps us personalize the experience and deliver relevant results.",
    img: "/matchengine/images/apps/first.webp",
  },
  {
    title: "2. Prioritize Key Features",
    desc: "Select the features that matter most—such as automation, compliance, integration, or performance. These inputs shape your recommended matches.",
    img: "/matchengine/images/apps/second.webp",
  },
  {
    title: "3. Evaluate and Compare",
    desc: "Review your tailored matches, compare solutions side-by-side, and shortlist the options that best fit your specific needs.",
    img: "/matchengine/images/apps/third.webp",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-32 max-w-7xl mx-auto px-4 py-24 text-center"
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-16">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:scale-[1.02] transition duration-300"
          >
            <Image
              src={step.img}
              alt={step.title}
              width={160}
              height={160}
              className="mb-6 rounded-lg object-contain"
            />
            <h3 className="text-xl font-semibold text-[#003E78] mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-gray-600 text-center max-w-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <Link
          href="#systems"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-[#003E78] rounded-xl shadow-lg hover:bg-[#002b57] transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003E78]"
        >
          Start Your Search <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
