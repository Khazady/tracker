import { columns } from '@/components/dashboard/trendingTable/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getAllCoins } from '@/lib/data/market-data/coins-api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Assets',
  description: 'Page with list of all assets',
};

export default async function AssetsPage() {
  const data = await getAllCoins();
  const defaultSorting = [{ id: 'cap', desc: true }];
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <section className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Search</h2>
      </section>
      <section className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data || []}
          defaultSorting={defaultSorting}
        />
      </section>
    </main>
  );
}
