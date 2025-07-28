"use client";

import { useEffect, useState } from "react";
import { Box, Fade } from "@mui/material";
import "@/app/globals.css"; // CSS for animations

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateLogo(true);
    }, 1500); // start logo transition

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // completely hide splash

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <Fade in={showSplash} timeout={500}>
      <Box
        className="splashContainer"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: "100vw",
          height: "100dvh",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
            component="img"
            src='/pokemon-logo.webp'
            alt="Logo"
            sx={{
                width: {xs:'130px', sm:'150px', md:'400px', lg:'500px'},
                justifyContent: 'center'
            }}
            className={`logo ${animateLogo ? 'animateToNavbar' : ""}`}
            />
      </Box>
    </Fade>
  );
}
