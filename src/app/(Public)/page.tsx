import { GoogleLoginSuccess } from "@/components/shared/GoogleLoginSuccess";
import { CivicMetrics } from "./_components/Home/civic-metrics";
import { FeaturedServices } from "./_components/Home/featured-services";
import { Hero } from "./_components/Home/Hero";
import { HowItWorks } from "./_components/Home/how-it-works";
import { LiveTracking } from "./_components/Home/live-tracking";
import { ReportIssueCta } from "./_components/Home/report-issue-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CivicMetrics />
      <HowItWorks />
      <FeaturedServices />
      <LiveTracking />
      <ReportIssueCta />
      <GoogleLoginSuccess />
    </>
  );
}
