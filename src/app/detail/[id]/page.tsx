import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { Pokemon } from "@/types/pokemon";
import {
  fetchPokemonById,
  fetchPokemonEvolutionChain,
} from "@/services/pokeAPI";
import MainInfo from "@/components/detail/mainInfo";
import OtherImages from "@/components/detail/otherImages";
import Stats from "@/components/detail/stats";
import LoadingBar from "@/components/loadingBar";
import axios from "axios";

export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [evolutionChain, setEvolutionChain] = useState<
    [number, string, string][]
  >([]);

  // parse species name
  const parseEvolutionChain = (chain: any): string[] => {
    const evoNames: string[] = [];

    let current = chain;
    while (current) {
      evoNames.push(current.species.name);
      current = current.evolves_to?.[0];
    }

    return evoNames;
  };

  // fetch pokemon evolution chain
  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const response = await fetchPokemonById(`${id}`);
        setData(response);

        const speciesRes = await axios.get(response.species.url);
        const evolutionChainUrl = speciesRes.data.evolution_chain.url;
        const evolutionId = evolutionChainUrl.split("/").filter(Boolean).pop();
        console.log(evolutionId);
        const evoData = await fetchPokemonEvolutionChain(evolutionId);
        console.log(evoData.chain);
        const evoNames = parseEvolutionChain(evoData.chain);

        const evoWithImages = await Promise.all(
          evoNames.map(async (name): Promise<[number, string, string]> => {
            const pokemon = await fetchPokemonById(name);
            return [pokemon.id, name, pokemon.sprites.front_default];
          })
        );

        setEvolutionChain(evoWithImages);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load Pokémon data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) getPokemonDetail();
  }, [id]);

  // loading screen
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <LoadingBar />
      </Box>
    );
  }

  // error handling
  if (error) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h5" color="error" textAlign="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!data) return null;

  const handleClose = () => {
    return;
  };

  return (
    <Container>
      <MainInfo data={data} variant="page" onClick={handleClose} />
      <OtherImages data={data} />
      <Stats data={data} evolutionChain={evolutionChain} />
    </Container>
  );
}
