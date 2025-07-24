'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '@/components/navbar/navBar'; // import your Navbar component

export default function HideOnScrollNavbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setShow(true);
      } else {
        setShow(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
        bgcolor: 'background.paper',
      }}
    >
      <Navbar />
    </Box>
  );
}
