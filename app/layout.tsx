import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Tracker',
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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="flex-col md:flex">{children}</div>
      </body>
    </html>
  );
}
