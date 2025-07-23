// src/app/layout.tsx
import { ReactNode } from 'react'
import Navbar from '@/components/navBar'
import ThemeRegistry from '@/components/ThemeRegistry'
import '@/app/globals.css'

export const metadata = {
  title: 'My PokeApp',
  description: 'Explore Pokemon data from PokeAPI',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          <main className="p-4">{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
