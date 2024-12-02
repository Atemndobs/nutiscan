import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";
import { RecentScans } from "@/components/RecentScans";

export default function Home() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <Header />
      <CategoryGrid />
      <RecentScans />
    </div>
  );
}