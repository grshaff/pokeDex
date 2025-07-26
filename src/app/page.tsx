"use client";
import { useRef } from "react";
import { Box } from "@mui/material";
import LandingPage from "@/components/landingpage/landingPage";
import PokeDex from "@/components/landingpage/pokeDex";

export default function Home() {
  const pokedexRef = useRef<HTMLDivElement>(null);

  const scrollToPokedex = () => {
    pokedexRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Box sx={{}}>
      <LandingPage onScrollToPokedex={scrollToPokedex} />
      <div ref={pokedexRef}>
        <PokeDex />
      </div>
    </Box>
  );
}
