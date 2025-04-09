import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative isolate bg-gradient-to-b from-white via-sky-50 to-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-snug mb-6">
          Find the Best Platform to <br />
          <span className="text-[#003E78]">
            Streamline Your Contract Lifecycle
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Our unbiased, data-driven tool helps you evaluate features,
          integrations, and pricing across industry-leading platforms.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#systems"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-[#003E78] rounded-xl shadow-lg hover:bg-[#002b57] transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003E78]"
          >
            Start Your Search <ArrowRight size={18} />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#003E78] bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003E78]"
          >
            See How It Works
          </Link>
        </div>
      </div>

      {/* Subtle decorative blurred background element */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#003E78] opacity-10 rounded-full blur-3xl z-0" />
    </section>
  );
};

export default HeroSection;
