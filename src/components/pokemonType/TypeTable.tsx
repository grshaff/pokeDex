"use client";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import PokeCard from "@/components/pokeCard";
import { useEffect, useState } from "react";
import { fetchPokemonByType, fetchPokemonDetail } from "@/services/pokeAPI";
import type { Pokemon } from "@/types/pokemon";
import PaginationControl from "@/components/paginationControl";
import PokemonModal from "@/components/ModalPopup";
import LoadingBar from "@/components/loadingBar";
import { Reveal } from "../revealAnimation";

interface PokeType {
  name: string;
}

interface TypeTableProps {
  selectedTypes: PokeType[];
}

export default function TypeTable({ selectedTypes }: TypeTableProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

  useEffect(() => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const fetchPokemonByTypes = async () => {
      if (selectedTypes.length === 0) {
        setPokemonList([]);
        return;
      }

      setLoading(true);
      try {
        const typePromises = selectedTypes.map((type) =>
          fetchPokemonByType(type.name)
        );
        const typeResults = await Promise.all(typePromises);

        let allPokemonUrls: string[] = [];
        typeResults.forEach((typeData) => {
          const pokemonUrls = typeData.pokemon.map((p: any) => p.pokemon.url);
          allPokemonUrls = [...allPokemonUrls, ...pokemonUrls];
        });

        if (selectedTypes.length > 1) {
          const urlCounts: { [key: string]: number } = {};
          allPokemonUrls.forEach((url) => {
            urlCounts[url] = (urlCounts[url] || 0) + 1;
          });

          allPokemonUrls = Object.keys(urlCounts).filter(
            (url) => urlCounts[url] === selectedTypes.length
          );
        } else {
          allPokemonUrls = [...new Set(allPokemonUrls)];
        }

        // ⚠️ Simulate network delay per Pokémon fetch (e.g., 200ms each)
        const pokemonPromises = allPokemonUrls.map(async (url) => {
          await delay(200); // Simulated delay
          return fetchPokemonDetail(url);
        });

        const detailedPokemon = await Promise.all(pokemonPromises);

        const sortedPokemon = detailedPokemon.sort((a, b) => a.id - b.id);
        setPokemonList(sortedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon by types:", error);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonByTypes();
    setPage(1);
  }, [selectedTypes]);

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPokemon = pokemonList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(pokemonList.length / limit);

  if (selectedTypes.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Select Pokemon Types
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose one or more types from the filter to see Pokemon of those types
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 8,
        width: "100%",
        position: "relative",
        backgroundColor: "hsla(0, 0%, 100%, 0.8)",
        minHeight: "100vh",
        overflow: "hidden",
        pb: 20,
      }}
    >
      {/* Main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box sx={{ textAlign: "start" }}>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Pokemon with{" "}
                {selectedTypes.map((type) => type.name).join(" + ")} Type
                {selectedTypes.length > 1 ? "s" : ""}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Found {pokemonList.length} Pokemon
                {selectedTypes.length > 1
                  ? " with all selected types"
                  : ` of ${selectedTypes[0]?.name} type`}
              </Typography>
            </Box>
          </Box>
        </Container>

        {loading ? (
          <LoadingBar />
        ) : (
          <>
            {/* Pokemon Cards */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 1,
                mx: { xs: 1, sm: 4 },
              }}
            >
              {paginatedPokemon.length > 0 ? (
                paginatedPokemon.map((pokemon) => (
                  <Box
                    key={pokemon.id}
                    onClick={() => handleOpen(pokemon)}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <Reveal width="100%">
                    <PokeCard data={pokemon} variant="table" />
                    </Reveal>
                  </Box>
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
                  No Pokemon found with the selected type combination.
                </Typography>
              )}
            </Box>

            {/* Pagination */}
            {pokemonList.length > limit && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <PaginationControl
                  count={totalPages}
                  page={page}
                  onPageChange={setPage}
                  limit={limit}
                  onLimitChange={(val) => {
                    setLimit(val);
                    setPage(1);
                  }}
                  variant="black"
                />
              </Box>
            )}
          </>
        )}

        {/* Modal for details */}
        <PokemonModal
          open={openModal}
          onClose={handleClose}
          data={selectedPokemon}
        />
      </Box>
    </Box>
  );
}
