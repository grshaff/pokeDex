"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import PokeCard from '@/components/pokeCard'
import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonDetail } from "@/services/pokeAPI";
import { Pokemon } from "@/types/pokemon";
import PaginationControl from "@/components/paginationControl";
import SearchBar from "@/components/searchBar"
import SkeletonCard from "@/components/skeletonCard";
import PokemonModal from "@/components/ModalPopup";


export default function TypeTable() {

  return (
    <Box
      sx={{
        position: "relative",
        minHeight:'100vh',
        backgroundColor: "#FFCB3B",
        overflow: "hidden",
        pb:20,
      }}
    >
      {/* Background images */}
      <Box
        component="img"
        src="/bg-component/top-left-bg.webp"
        alt="Top Left Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: {xs:"2000px", lg: "1440px" },
          pointerEvents: "none", 
        }}
      />
      <Box
        component="img"
        src="/bg-component/bot-right-bg.webp"
        alt="Bottom Right Background"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: {xs:"2000px", lg: "1440px"},
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <Box></Box>
       
      </Box>
      )
}
