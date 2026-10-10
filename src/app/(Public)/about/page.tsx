import { AboutHero } from "../_components/about/about-hero";
import { AboutHowItHelps } from "../_components/about/about-how-it-helps";
import { AboutMission } from "../_components/about/about-mission";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutHowItHelps />
    </>
  );
}
