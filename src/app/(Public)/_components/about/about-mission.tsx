import Image from "next/image";

export function AboutMission() {
  return (
    <section className="bg-slate-50 px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8 md:grid-cols-2 md:gap-12 lg:p-12">
        {/* Text */}
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-blue-600">
            <span className="h-1 w-5 rounded-full bg-blue-600" aria-hidden />
            Core Purpose
          </p>

          <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Our Mission
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            CivicServe empowers citizens to effortlessly report community
            problems, request essential municipal services, and track the
            real-time progress of their submissions from triage to verified
            closeout without bureaucratic delays.
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
          <Image
            src="/images/a_modern_municipal_field_worker_in_high_visibility_vest_collaborating_with_a.png"
            alt="A city worker and a resident reviewing a service request in a park"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
