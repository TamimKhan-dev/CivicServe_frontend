import { Footer } from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { SystemStatusBar } from "@/components/shared/SystemStatusBar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <SystemStatusBar />
      <Navbar />
      <div className="flex-1 w-full">{children}</div>
      <Footer />
    </div>
  );
}
