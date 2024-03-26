import Search from '@/components/search';
import SearchAssetTable from '@/components/search-asset/search-asset-table';
import { columns } from '@/components/search-asset/short-asset-columns';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search Page',
  description: 'Page where you can search for assets',
};

export default async function SearchAssetPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <section className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          All results for {query}
        </h2>
      </section>
      <section className="container mx-auto space-y-10 py-10">
        <Search placeholder="Search assets..." />
        <Suspense
          key={query}
          fallback={<TableSkeleton columns={columns} iconCellIndex={0} />}
        >
          <SearchAssetTable query={query} />
        </Suspense>
      </section>
    </main>
  );
}
