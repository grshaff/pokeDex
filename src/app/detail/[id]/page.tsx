'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import MainInfo from '@/components/detail/mainInfo';
import { Pokemon } from '@/types/pokemon';

export default function DetailPage() {
  const { id } = useParams(); // get the ID from the route
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setData(response.data);
      } catch (err: any) {
        setError('Pokémon not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemon();
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

  return (
    <Container>
      <MainInfo data={data} variant='page' />
    </Container>
  );
}
