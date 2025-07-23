// src/app/layout.tsx
import { ReactNode } from 'react';
import Navbar from '@/components/navBar'
import '@/app/globals.css'; // Import your global styles


export const metadata = {
  title: 'My PokeApp',
  description: 'Explore Pokemon data from PokeAPI',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body >
        <Navbar/>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
