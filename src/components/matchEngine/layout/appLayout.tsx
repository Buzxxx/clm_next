"use client";

import HowItWorks from "../features/app/how-it-works";
import HeroSection from "../features/app/hero";
import AppCardsSection from "../features/app/appCardsSection";
import WhyThisTool from "../features/app/whyThisTool";
import Faq from "../features/app/faq";

const Home = () => {
  return (
    <main className="flex flex-col items-center px-4 sm:px-8 lg:px-16 gap-24 py-16">
      {/* Hero Section */}
      <div>
        <HeroSection />
      </div>

      {/* How It Works */}
      <div>
        <HowItWorks />
      </div>

      {/* App Type Selection */}
      <div>
        <AppCardsSection />
      </div>

      <div>
        {/* Why This Tool? */}
        <WhyThisTool />
      </div>

      {/* FAQ Section */}
      <div>
        <Faq />
      </div>
    </main>
  );
};

export default Home;
