"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation"; 
import Navbar from "@/components/navbar/navBarEffect";
import ThemeRegistry from "@/components/ThemeRegistry";
import SplashScreen from "@/components/introScreen";
import { Box, Fade } from "@mui/material";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    // show splash on "/" and only if not shown before
    if (pathname === "/" && !hasSeenSplash) {
      setShowSplash(true);

      const splashTimer = setTimeout(() => {
        setShowContent(true);
        setShowSplash(false);
        
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 2500);

      return () => clearTimeout(splashTimer);
    } else {
      // show content for all other routes or after splash has been shown
      setShowContent(true);
    }
  }, [pathname]);

  return (
    <ThemeRegistry>
      {showSplash && <SplashScreen />}
      {showContent && (
          <Box>
            <Box
              sx={{
                top: 0,
                zIndex: 1000,
                bgcolor: "background.paper",
                paddingBottom: { xs: "64px", sm: "80px" },
              }}
            >
              <Navbar />
            </Box>
            <main className=".main-wrapper">{children}</main>
          </Box>
      )}
    </ThemeRegistry>
  );
}
