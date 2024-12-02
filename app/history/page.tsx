import { HistoryList } from "@/components/history/HistoryList";
import { HistoryFilters } from "@/components/history/HistoryFilters";

export default function HistoryPage() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">History</h1>
      <HistoryFilters />
      <HistoryList />
    </div>
  );
}