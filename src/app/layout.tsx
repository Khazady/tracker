import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Tracker Dashboard',
    default: 'Tracker Dashboard',
  },
  description: 'This is a portfolio tracker web applications.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
