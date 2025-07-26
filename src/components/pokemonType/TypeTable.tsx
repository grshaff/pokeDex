"use client"
import { Box, Container, Typography } from "@mui/material"
import PokeCard from "@/components/pokeCard"
import { useEffect, useState } from "react"
import { fetchPokemonList, fetchPokemonDetail } from "@/services/pokeAPI"
import type { Pokemon } from "@/types/pokemon"
import PaginationControl from "@/components/paginationControl"
import SkeletonCard from "@/components/skeletonCard"
import PokemonModal from "@/components/ModalPopup"

export default function PokeDex() {
  // Load pokemon list
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(9)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const offset = (page - 1) * limit
      const listData = await fetchPokemonList(limit, offset)
      setTotal(Math.ceil(listData.count / limit))

      const detailPromises = listData.results.map((poke) => fetchPokemonDetail(poke.url))
      const detailedPokemon = await Promise.all(detailPromises)
      setPokemonList(detailedPokemon)
      setLoading(false)
    }

    getData()
  }, [page, limit])

  // Searchbar to search pokemon by name or id
  const [searchQuery, setSearchQuery] = useState("")
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [allPokemon, setAllPokemon] = useState<{ name: string; url: string }[]>([])
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Pokemon[]>([])

  useEffect(() => {
    const getAllPokemonNames = async () => {
      const listData = await fetchPokemonList(1035, 0)
      setAllPokemon(listData.results)
    }
    getAllPokemonNames()
  }, [])

  useEffect(() => {
    const search = async () => {
      if (searchQuery === "") {
        setSearching(false)
        setSearchResults([])
        return
      }

      setSearching(true)
      setSearchLoading(true)

      const matchedByName = allPokemon.filter((poke) => poke.name.toLowerCase().includes(searchQuery.toLowerCase()))

      let matchedById: Pokemon[] = []
      if (!isNaN(Number(searchQuery))) {
        try {
          const pokeById = await fetchPokemonDetail(`${searchQuery}`)
          matchedById = [pokeById]
        } catch (error) {
          // Handle error
        }
      }

      const urls = new Set(matchedByName.map((p) => p.url))
      const detailPromises = matchedByName.map((p) => fetchPokemonDetail(p.url))
      const resultsByName = await Promise.all(detailPromises)

      const combinedResults = [
        ...matchedById,
        ...resultsByName.filter((p) => !matchedById.find((mp) => mp.id === p.id)),
      ]

      setSearchResults(combinedResults)
      setSearchLoading(false)
    }

    search()
  }, [searchQuery, allPokemon])

  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)

  // Modal popup
  const [openModal, setOpenModal] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  const handleOpen = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    setOpenModal(true)
  }

  const handleClose = () => {
    setSelectedPokemon(null)
    setOpenModal(false)
  }

  return (
    <Box
      sx={{
        width: "800px",
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
        <Container sx={{ py: "80px" }}>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box sx={{ textAlign: "start" }}>
              <Typography sx={{ fontSize: "40px", fontWeight: 700, color: "primary.main" }}>
                Pokèmon with Type
              </Typography>
            </Box>
          </Box>
        </Container>

        {/* Table Header */}

        {/* PokeCards */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          {searching ? (
            searchLoading ? (
              Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
            ) : searchResults.length > 0 ? (
              searchResults.map((pokemon) => (
                <Box key={pokemon.id} onClick={() => handleOpen(pokemon)} sx={{ cursor: "pointer" }}>
                  <PokeCard data={pokemon} variant="table" />
                </Box>
              ))
            ) : (
              <Typography sx={{ textAlign: "center", width: "100%", mt: 4, fontWeight: 600 }}>
                No Pokémon match your search.
              </Typography>
            )
          ) : loading ? (
            Array.from({ length: 9 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : (
            pokemonList.map((pokemon) => (
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
                <PokeCard data={pokemon} variant="table" />
              </Box>
            ))
          )}
        </Box>

        {/* Modal for details */}
        <PokemonModal open={openModal} onClose={handleClose} data={selectedPokemon} />

        {/* Pagination */}
        {!searching && (
          <PaginationControl
            count={total}
            page={page}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={(val) => {
              setLimit(val)
              setPage(1)
            }}
            variant="black"
          />
        )}
      </Box>
    </Box>
  )
}
