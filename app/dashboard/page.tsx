import { columns } from '@/components/dashboard/trendingTable/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getTrending } from '@/lib/data/market-data/market-api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page with main widgets',
};

export default async function DashboardPage() {
  const data = await getTrending();
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data || []} />
      </div>
    </main>
  );
}
