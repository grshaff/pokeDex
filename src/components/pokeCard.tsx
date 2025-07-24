import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material';
import Link from 'next/link';
import { Pokemon } from "@/types/pokemon";
import SkeletonCard from "@/components/skeletonCard";
import dynamic from 'next/dynamic';

interface Props {
  data: Pokemon;
}

// Capital first letter for pokie name
export default function MediaCard({ data }: Props) {
    function capitalizeFirstLetter(str: string): string {
        if (str.length === 0) {
          return ""; 
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
const pokemonName: string = capitalizeFirstLetter(data.name);

const PokeCard = dynamic(() => import('@/components/pokeCard'), {
    loading: () => <SkeletonCard />,
    ssr: false,
  });


  return (
    <Card sx={{ width:{xs:'250px',sm:'250px',md:'240px',lg:'300px'} , maxheight: '550px', boxShadow:3, borderRadius:'15px' }}>
        {/* Pokiee image */}
      <CardMedia
        sx={{ width:{xs:'200px',sm:'170px',md:'200px',lg:'280px'}, height: {xs:'170px',sm:'170px',md:'200px',lg:'280px'}, margin:'auto', mt:'30px' }}
        image={data.sprites.front_default}
        title={pokemonName}
      />
      {/* Pokiee name */}
      <CardContent>
        <Typography gutterBottom variant="body2" component="div" sx={{ color: 'primary.light', fontWeight:'700' }}>
          #{String(data.id).padStart(3, '0')}
        </Typography>
        <Typography
            variant="h4"
            noWrap
            sx={{
                color: 'primary.main',
                fontWeight: 700,
                fontSize: { xs: '20px', sm: '22px', md: '25px', lg: '34px' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                textAlign: 'start',
            }}
            >
            {pokemonName}
        </Typography>
      </CardContent>

      {/* Types */}
      <Box sx={{margin:'auto', display:'flex'}}>
        <CardActions sx={{margin:'auto', display:'flex'}}>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center', marginBottom: '20px' }}>
                {data.types.map((typeData, index) => (
                    <Grid item key={index} size={{xs:'2', sm:'4', md:'5'}}>
                        <Link href={typeData.type.url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={`/pokemon-types/type_${typeData.type.name}.webp`}
                            alt={typeData.type.name}
                            style={{
                                width: '100%',
                                maxWidth: '100px',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                        </Link>
                    </Grid>
                ))}
            </Grid>

        </CardActions>
      </Box>
      
    </Card>
  );

}

