import { CivicMetrics } from "./_components/Home/civic-metrics";
import { Hero } from "./_components/Home/Hero";
import { HowItWorks } from "./_components/Home/how-it-works";
import { LiveTracking } from "./_components/Home/live-tracking";
import { PopularServices } from "./_components/Home/popular-services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CivicMetrics />
      <HowItWorks />
      <PopularServices />
      <LiveTracking />
    </>
  );
}
