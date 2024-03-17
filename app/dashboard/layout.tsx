import Header from '@/components/header';
import '@/styles/globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col md:flex">
      <Header />
      {children}
    </div>
  );
}
