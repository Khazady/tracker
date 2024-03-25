import Header from '@/components/header';
import '@/styles/globals.css';
import { auth } from 'auth';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      {session && <Header />}
      {children}
    </>
  );
}
