"use client";
import { Box, Container, Typography } from "@mui/material";
import LandingPage from '@/components/landingPage';
import PokeDex from '@/components/pokeDex';
export default function Home() {
  return (
    <Box sx={{}}>
      <LandingPage/>
      <PokeDex/>
    </Box>
    
  );
}
