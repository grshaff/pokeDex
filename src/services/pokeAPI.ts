import axios from 'axios';
import { PokemonListResponse, Pokemon } from '@/types/pokemon';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const fetchPokemonList = async (limit: number, offset: number) => {
  const { data } = await axios.get<PokemonListResponse>(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  return data;
};

export const fetchPokemonDetail = async (search: string) => {
  const { data } = await axios.get<Pokemon>(`${search}`);
  return data;
};

export const fetchPokemon = async (id: string) => {
  const url = `${id}`;
  console.log('Fetching URL:', url);
  const { data } = await axios.get<Pokemon>(`${API_BASE}/pokemon/${id}`);
  return data;
};
