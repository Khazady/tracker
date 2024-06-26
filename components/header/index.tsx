import { MainNav } from '@/components/header/main-nav';
import { Search } from '@/components/header/search';
import { UserButton } from '@/components/header/user-button';

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
