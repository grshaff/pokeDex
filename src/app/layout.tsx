// src/app/layout.tsx
import { ReactNode } from "react";
import LayoutWrapper from "@/components/layoutwrapper"; 
import "@/app/globals.css";

export const metadata = {
  title: "My PokeApp",
  description: "Explore Pokemon data from PokeAPI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
