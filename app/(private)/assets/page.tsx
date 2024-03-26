import AllAssetsTable from '@/components/all-assets/all-assets-table';
import { assetsTableColumns } from '@/components/assets-table/assets-table-columns';
import Search from '@/components/search';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'All Assets',
  description: 'Page with list of all assets',
};

export default async function AssetsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <section className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Search</h2>
      </section>
      <section className="container mx-auto py-10">
        <Search placeholder="Search assets..." />
        <Suspense
          key={query + currentPage}
          fallback={<TableSkeleton columns={assetsTableColumns} />}
        >
          <AllAssetsTable />
        </Suspense>
      </section>
    </main>
  );
}
