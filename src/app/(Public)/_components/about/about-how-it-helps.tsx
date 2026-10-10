import { Building, FileText, type LucideIcon, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const FEATURES: Feature[] = [
  {
    title: "Easy Request Submission",
    description:
      "Submit neighborhood issues and permit requests in minutes with guided address selection and photo verification.",
    icon: FileText,
  },
  {
    title: "Transparent Status Tracking",
    description:
      "Follow verified milestones in real time as your request moves from department dispatch to on-site resolution.",
    icon: TrendingUp,
  },
  {
    title: "Organized Municipal Services",
    description:
      "Access a central, unified directory for waste management, street lighting, road infrastructure, and park maintenance.",
    icon: Building,
  },
];

export function AboutHowItHelps() {
  return (
    <section className="bg-slate-50 px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          How It Helps
        </h2>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Designed to simplify every stage of community support and municipal
          care.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <li key={title}>
              <Card className="h-full gap-0 rounded-2xl bg-white py-0 shadow-sm">
                <CardContent className="p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
