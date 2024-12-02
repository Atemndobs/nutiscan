import { StatsOverview } from "@/components/stats/StatsOverview";
import { CaloriesChart } from "@/components/stats/CaloriesChart";
import { CategoryBreakdown } from "@/components/stats/CategoryBreakdown";

export default function StatsPage() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Statistics</h1>
      <StatsOverview />
      <CaloriesChart />
      <CategoryBreakdown />
    </div>
  );
}