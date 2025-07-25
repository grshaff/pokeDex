"use client";

import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '@/types/pokemon-color'; // adjust path to your `colours` file

const getTypeGradient = (types: string[]) => {
  const typeColors = types.map(type => colors[type] || '#777');
  return `linear-gradient(135deg, ${typeColors.join(', ')})`;
};

interface Props {
  data: Pokemon;
}


export default function OtherImages({data} :Props) {
  return (
    
    <Box sx={{ backgroundColor: 'white', width: '100%' }}>

        {/* Main info for detail page */}
      <Container
        maxWidth="xl"
        sx={{
            py: { xs: 0, sm: 2 },
            px: { xs:0, sm: 0, md: '70px', lg:'80px' },
        }}
    >
        <Grid
          container
          spacing={4}
          alignItems={{xs:'center', md:'start'}}
          justifyContent={{xs:'center', md:'start'}}
          direction={'column'}
          marginY={{xs:0, md:0}}
        >
        <Stack direction={{xs:"row", md:'column'}} spacing={4}>
                <Typography color="primary.main" fontWeight={700} fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.4rem',
                   }}>Other Images:</Typography>
            </Stack>
          {/* Pokemon Image */}
          <Box width={{xs:'300px', sm:'500px', md:'auto'}} marginX={'auto'}>
          <Grid container size={'auto'} rowSpacing={{xs:1 }} columnSpacing={{ xs: 1}} columns={{ xs: 1, sm: 2, md: 10 }} sx={{justifyContent:'center', px:'10px'}}>
            {Array.from(Array(6)).map((_, index) => (
            <Grid key={index} size={'auto'}>
                <Box
                component="img"
                src={data.sprites.front_default ?? "/not-available.webp"}
                alt={data.name}
                sx={{
                  display: 'block',
                  border:1,
                  borderRadius: 2,
                  width: { xs: '120px', sm: '180px', md:'clamp(100px, 30vw, 130px)', lg:'150px' },
                  
                  backgroundColor: 'white',
                }}
              />
            </Grid>))}
              
          </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
