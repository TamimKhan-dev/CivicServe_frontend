import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Logo } from "../../ui/logo";
import { FOOTER_COLUMNS } from "./footer-data";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/" },
  { label: "Terms of Service", href: "/" },
  { label: "Accessibility", href: "/" },
  { label: "Cookie Preferences", href: "/" },
];

const linkClass =
  "text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex max-w-sm flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed">
              CivicServe is the unified digital public service portal connecting
              residents with municipal operations for transparent, timely issue
              resolution.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-slate-700 bg-slate-900 font-normal text-slate-300"
              >
                Official Municipal Partner
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-700 bg-slate-900 font-normal text-slate-300"
              >
                SOC2 Certified
              </Badge>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col gap-4 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} CivicServe Smart City Platform. All
            rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
