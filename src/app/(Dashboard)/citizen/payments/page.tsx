import CitizenPaymentHistoryTable from "../../_components/citizen/payments/citizen-payment-history-table";
import CitizenPaymentStats from "../../_components/citizen/payments/citizen-payments-stats-cards";

export default function Payments() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Payment History
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            View and manage your service request payments, download official
            receipts, and monitor processing settlements.
          </p>
        </div>
      </div>

      {/* Stats */}
      <CitizenPaymentStats />

      {/* Table data */}
      <CitizenPaymentHistoryTable />
    </div>
  );
}
