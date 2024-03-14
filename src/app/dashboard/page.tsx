import { MainNav } from '@/components/dashboard/main-nav';
import { Search } from '@/components/dashboard/search';
import { UserNav } from '@/components/dashboard/user-nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page with main widgets',
};

export default function DashboardPage() {
  return (
    <main className=" flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
      </div>
    </main>
  );
}
