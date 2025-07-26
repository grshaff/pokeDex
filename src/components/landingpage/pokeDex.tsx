"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import PokeCard from "@/components/pokeCard";
import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonDetail } from "@/services/pokeAPI";
import { Pokemon } from "@/types/pokemon";
import PaginationControl from "@/components/paginationControl";
import SearchBar from "@/components/searchBar";
import SkeletonCard from "@/components/skeletonCard";
import PokemonModal from "@/components/ModalPopup";
import LoadingBar from "@/components/loadingBar";
import { Reveal } from "../revealAnimation";

export default function PokeDex() {
  // Load pokemon list
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const offset = (page - 1) * limit;
      const listData = await fetchPokemonList(limit, offset);
      setTotal(Math.ceil(listData.count / limit));

      const detailPromises = listData.results.map((poke) =>
        fetchPokemonDetail(poke.url)
      );
      const detailedPokemon = await Promise.all(detailPromises);
      setPokemonList(detailedPokemon);
      setLoading(false);
    };

    getData();
  }, [page, limit]);

  // Searchbar to search pokemon by name or id
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [allPokemon, setAllPokemon] = useState<{ name: string; url: string }[]>(
    []
  );
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getAllPokemonNames = async () => {
      const listData = await fetchPokemonList(1035, 0);
      setAllPokemon(listData.results);
    };
    getAllPokemonNames();
  }, []);

  useEffect(() => {
    const search = async () => {
      if (searchQuery === "") {
        setSearching(false);
        setSearchResults([]);
        return;
      }

      setSearching(true);
      setSearchLoading(true);

      const matchedByName = allPokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      let matchedById: Pokemon[] = [];
      if (!isNaN(Number(searchQuery))) {
        try {
          const pokeById = await fetchPokemonDetail(`${searchQuery}`);
          matchedById = [pokeById];
        } catch (error) {}
      }

      const urls = new Set(matchedByName.map((p) => p.url));
      const detailPromises = matchedByName.map((p) =>
        fetchPokemonDetail(p.url)
      );
      const resultsByName = await Promise.all(detailPromises);

      const combinedResults = [
        ...matchedById,
        ...resultsByName.filter(
          (p) => !matchedById.find((mp) => mp.id === p.id)
        ),
      ];

      setSearchResults(combinedResults);
      setSearchLoading(false); 
    };

    search();
  }, [searchQuery, allPokemon]);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const totalPokemon = total * limit;

  // Modal popup
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const handleOpen = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  const handleClose = () => {
    setSelectedPokemon(null);
    setOpenModal(false);
  };
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#FFCB3B",
        overflow: "hidden",
        pb: 20,
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
          width: { xs: "2000px", lg: "1440px" },
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
          width: { xs: "2000px", lg: "1440px" },
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
              <Reveal>
              <Typography
                sx={{
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                PokèDex
              </Typography>
              <Typography sx={{ color: "primary.main" }}>
                All Generation totaling <br />
                {totalPokemon} Pokemon
              </Typography>
              <SearchBar
                onSearchChange={(value: string) => setSearchQuery(value)}
              />
              </Reveal>
            </Box>
          </Box>
        </Container>

        {/* PokeCards */}
        <Box
          sx={{
            marginX: {
              xs: "100px",
              sm: "20px",
              md: "40px",
              lg: "10px",
              xl: "20px",
            },
            justifyContent: "center",
          }}
        >
          <Grid
            container
            rowSpacing={{ xs: 3, md: 5 }}
            columnSpacing={{ xs: 1, sm: 5, md: 5, lg: 10, xl: 10 }}
            columns={{ xs: 2, sm: 8, md: 15 }}
            sx={{ justifyContent: "center", marginx: "10px" }}
          >
            {searching ? (
              searchLoading ? (
                <LoadingBar />
              ) : searchResults.length > 0 ? (
                searchResults.map((pokemon) => (
                  <Grid key={pokemon.id} size="auto">
                    <Box
                      onClick={() => handleOpen(pokemon)}
                      sx={{ cursor: "pointer" ,transition: "transform 0.2s ease-in-out",
                      }}
                      
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <PokeCard data={pokemon} />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    mt: 4,
                    fontWeight: 600,
                  }}
                >
                  No Pokémon match your search.
                </Typography>
              )
            ) : loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <Grid key={idx} size="auto">
                  <SkeletonCard />
                </Grid>
              ))
            ) : (
              pokemonList.map((pokemon) => (
                <Grid key={pokemon.id} size="auto">
                  <Box
                    onClick={() => handleOpen(pokemon)}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <Reveal>
                    <PokeCard data={pokemon} />
                    </Reveal>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        {/* Modal for details */}
        <PokemonModal
          open={openModal}
          onClose={handleClose}
          data={selectedPokemon}
        />

        {/* Pagination */}
        {!searching && (
          <PaginationControl
            count={total}
            page={page}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
