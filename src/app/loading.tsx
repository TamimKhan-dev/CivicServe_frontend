import { cn } from "cn";
import { LoaderIcon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export default function SpinnerCustom() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Spinner />
    </div>
  );
}
