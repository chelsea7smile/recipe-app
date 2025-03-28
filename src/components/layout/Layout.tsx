import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto py-8 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
