import axios from 'axios';
import { PokemonListResponse, Pokemon } from '@/types/pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit: number, offset: number) => {
  const { data } = await axios.get<PokemonListResponse>(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  return data;
};

export const fetchPokemonDetail = async (url: string) => {
  const { data } = await axios.get<Pokemon>(url);
  return data;
};
