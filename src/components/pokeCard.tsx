import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack } from '@mui/material';
import { Pokemon } from "@/types/pokemon";

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

  return (
    <Card sx={{ width:{xs:'200px',sm:'200px',md:'240px',lg:'325px'} , maxheight: '550px', boxShadow:3, borderRadius:'15px' }}>
      <CardMedia
        sx={{ width:{xs:'170px',sm:'170px',md:'200px',lg:'280px'}, height: {xs:'170px',sm:'170px',md:'200px',lg:'280px'}, margin:'auto', mt:'30px' }}
        image={data.sprites.front_default}
        title={pokemonName}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div" sx={{ color: 'primary.light', fontWeight:'700' }}>
          #{data.id}
        </Typography>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight:'700', fontSize:{xs:'',sm:'',md:'25px',lg:'34px'} }}>
            {pokemonName}
        </Typography>
      </CardContent>
      <Box sx={{margin:'auto', display:'flex'}}>
        <CardActions sx={{margin:'auto', display:'flex'}}>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12}} sx={{justifyContent:'center', marginBottom:'20px'}}>
            {Array.from(Array(4)).map((_, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 5 }}>
                <Button variant='contained' size="small" sx={{width:'100%'}}>Type {index + 1}</Button>
            </Grid>
            ))}
      </Grid>
        </CardActions>
      </Box>
      
    </Card>
  );
}
