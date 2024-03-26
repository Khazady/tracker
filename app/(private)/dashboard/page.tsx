import { columns } from '@/components/dashboard/full-asset-columns';
import TrendingTable from '@/components/dashboard/trending-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page with main widgets',
};

export default async function DashboardPage() {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <section className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </section>
      <section className="container mx-auto py-10">
        <Suspense fallback={<TableSkeleton columns={columns} />}>
          <TrendingTable />
        </Suspense>
      </section>
    </main>
  );
}
