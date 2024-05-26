import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const LinkSwitch = ({ isLoginPage }: { isLoginPage?: boolean }) => (
  <Link
    href={isLoginPage ? '/registration' : '/login'}
    className={cn(
      buttonVariants({ variant: 'ghost' }),
      'absolute right-4 top-4 md:right-8 md:top-8',
    )}
  >
    {isLoginPage ? 'Register' : 'Login'}
  </Link>
);

export default LinkSwitch;
