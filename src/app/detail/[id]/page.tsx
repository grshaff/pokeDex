'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import MainInfo from '@/components/detail/mainInfo';
import OtherImages from '@/components/detail/otherImages';
import { Pokemon } from '@/types/pokemon';
import { fetchPokemon } from "@/services/pokeAPI";

export default function DetailPage() {
  const { id } = useParams(); // get the ID from the route
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const response = await fetchPokemon(`${id}`);
        setData(response);
      } catch (err: any) {
        setError('Pokémon not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPokemonDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

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
    return
  }

  return (
    <Container>
      <MainInfo data={data} variant='page' onClick={handleClose}/>
      <OtherImages data={data}/>
    </Container>
  );
}
