import type { Metadata } from "next";
import CreateRequestForm from "../../_components/citizen/create-request/create-request-form";

export const metadata: Metadata = {
  title: "Create Request | CivicServe",
};

export default function CreateRequestPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Create Request
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            Manage, search, and track the progress of your submitted municipal
            service requests in real-time.
          </p>
        </div>
      </div>
      <CreateRequestForm />
    </div>
  );
}
