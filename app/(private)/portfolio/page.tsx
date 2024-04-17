import { columns } from '@/components/portfolio/position-columns';
import PositionTable from '@/components/portfolio/position-table';
import TransactionTable from '@/components/portfolio/transaction-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio page with your positions',
};

export default async function PortfolioPage() {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <section className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
      </section>
      <section className="container mx-auto py-10">
        <Suspense fallback={<TableSkeleton columns={columns} />}>
          <PositionTable />
        </Suspense>
      </section>
      <section className="container mx-auto py-10">
        <Suspense fallback={<TableSkeleton columns={columns} />}>
          <TransactionTable />
        </Suspense>
      </section>
    </main>
  );
}
