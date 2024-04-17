import { columns as positionColumns } from '@/components/portfolio/position-columns';
import PositionTable from '@/components/portfolio/position-table';
import { columns as transactionColumns } from '@/components/portfolio/transaction-columns';
import TransactionTable from '@/components/portfolio/transaction-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={positionColumns} />}>
            <PositionTable />
          </Suspense>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={transactionColumns} />}>
            <TransactionTable />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
