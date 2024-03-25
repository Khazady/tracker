import { cn } from '@/lib/utils';
import Link from 'next/link';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/watchlist"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Watchlist
      </Link>
      <Link
        href="/portfolio"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Portfolio
      </Link>
    </nav>
  );
}
