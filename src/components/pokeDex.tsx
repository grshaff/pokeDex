"use client";
import { Box, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import PokeCard from '@/components/pokeCard'
import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonDetail } from "@/services/pokeAPI";
import { Pokemon } from "@/types/pokemon";
import PaginationControl from "@/components/paginationControl";

export default function PokeDex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const offset = (page - 1) * limit;
      const listData = await fetchPokemonList(limit, offset);
      setTotal(Math.ceil(listData.count / limit));

      const detailPromises = listData.results.map((poke) => fetchPokemonDetail(poke.url));
      const detailedPokemon = await Promise.all(detailPromises);
      setPokemonList(detailedPokemon);
    };

    getData();
  }, [page, limit]);

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
          pointerEvents: "none", // ensure it doesn’t block content
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
      <Box
        sx={{
          position: "relative",
          zIndex: 1, 
        }}
      >
        <Container sx={{ py: "80px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "40px", fontWeight: 700, color: "primary.main" }}
              >
                PokèDex
              </Typography>
              <Typography sx={{ color: "primary.main" }}>
                All Generation totaling <br />
                999999 Pokemon
              </Typography>
            </Box>
          </Box>
        </Container>
        {/* PokeCards */}
        <Box sx={{marginX:{xs: '100px', sm: '100px', md: '100px', lg:'140px', xl:'500px'}, justifyContent:'center'}}>
        <Grid container rowSpacing={{xs:3, md:5 }} columnSpacing={{ xs: 1, sm: 2, md: 4, lg:10, xl:10 }} columns={{ xs: 2, sm: 8, md: 15 }} sx={{justifyContent:'center', marginx:'10px'}}>
            {pokemonList.map((pokemon) => (
            <Grid key={pokemon.id} size={{ xs: 'auto', sm: 3, md: 4.8, lg:5, xl:3.75 }}>
                <PokeCard data={pokemon}/>
            </Grid>
            ))}
        </Grid>
        </Box>
        {/* Pagination */}
        <PaginationControl
          count={total}
          page={page}
          onPageChange={setPage}
          limit={limit}
          onLimitChange={(val) => {
            setLimit(val);
            setPage(1); // Reset to first page on limit change
          }}
        />
        
        
      </Box>
    </Box>
  );
}
