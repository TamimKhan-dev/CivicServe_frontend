import { Building2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function AboutHero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8 lg:py-20">
        {/* Text */}
        <div>
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700"
          >
            <Building2 className="size-3.5" aria-hidden />
            About CivicServe
          </Badge>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Making Public Services More Accessible
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            CivicServe bridges the gap between residents and city operations. We
            provide everyday citizens with a direct, verified line to frontline
            teams responsible for road repairs, sanitation, and regulatory
            permits, ensuring public services are transparent and responsive.
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={
              "/images/modern_sustainable_smart_city_street_with_clean_urban_architecture_community.png"
            }
            alt="A city street with a bus, bike lane, and pedestrians"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
