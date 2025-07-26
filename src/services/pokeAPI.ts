import axios from 'axios';
import { PokemonListResponse, Pokemon } from '@/types/pokemon';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Fetch list of Pokémon with pagination
export const fetchPokemonList = async (
  limit: number,
  offset: number
): Promise<PokemonListResponse> => {
  const { data } = await axios.get<PokemonListResponse>(
    `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
};

// Fetch Pokémon detail by name or full URL
export const fetchPokemonDetail = async (urlOrName: string): Promise<Pokemon> => {
  const isFullUrl = urlOrName.startsWith('http');
  const url = isFullUrl ? urlOrName : `${API_BASE}/pokemon/${urlOrName}`;
  const { data } = await axios.get<Pokemon>(url);
  return data;
};

// Fetch Pokémon by ID
export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(`${API_BASE}/pokemon/${id}`);
  return data;
};

// Fetch evolution chain by ID
export const fetchPokemonEvolutionChain = async (id: string): Promise<any> => {
  const { data } = await axios.get(`${API_BASE}/evolution-chain/${id}`);
  return data;
};

// Fetch Pokémon by type 
export const fetchPokemonByType = async (type: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${API_BASE}/type/${type.toLowerCase()}`);
    return data;
  } catch (error) {
    console.error(`Error fetching Pokémon of type '${type}':`, error);
    throw error;
  }
};
