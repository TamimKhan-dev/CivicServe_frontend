import { CivicMetrics } from "./_components/Home/civic-metrics";
import { Hero } from "./_components/Home/Hero";
import { HowItWorks } from "./_components/Home/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CivicMetrics />
      <HowItWorks />
    </>
  );
}
