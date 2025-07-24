// src/app/layout.tsx
import { ReactNode } from 'react'
import Navbar from '@/components/navbar/navBarEffect'
import ThemeRegistry from '@/components/ThemeRegistry'
import '@/app/globals.css'
import { Box } from '@mui/material'

export const metadata = {
  title: 'My PokeApp',
  description: 'Explore Pokemon data from PokeAPI',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'background.paper' }}>
          <Navbar />
        </Box>
          <main className=".main-wrapper" style={{ paddingTop: '64px' }}>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
