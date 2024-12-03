import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";

export default function CategoriesPage() {
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <Header />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">All Categories</h1>
        <CategoryGrid showAll />
      </div>
    </div>
  );
}
