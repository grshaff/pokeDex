"use client";
import { useRef } from 'react';
import { Autocomplete, Box, Container, Divider, Stack, TextField, Typography} from "@mui/material";
import TypeTable from '@/components/pokemonType/TypeTable';
import { PokeTypes } from '@/types/pokemon-info';


export default function Home() {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 }, ]
  console.log(PokeTypes)
  console.log(top100Films)

  return (
    <Box
      sx={{
        position: "relative",
        minHeight:'100vh',
        backgroundColor: "white",
        overflow: "hidden",
        pb:20,
      }}
    >

      {/* Background images */}
      <Box sx={{zIndex:'1'}}>
      <Box
        sx={{
          width: '700px',
          height: '700px',
          position: 'absolute',
          top: 150,
          right: -380,
          pointerEvents: 'none',
          backgroundColor: 'white',
          border: '180px solid blue', 
          borderRadius: '50%',
        }}
      />

      <Box
        sx={{
          width: '700px',
          height: '700px',
          position: 'absolute',
          top: 650,
          left: -380,
          pointerEvents: 'none',
          backgroundColor: 'white',
          border: '180px solid blue', 
          borderRadius: '50%',
        }}
      />
      </Box>
      

      {/* Main content */}
      <Box sx={{zIndex:'10', position:'relative'}}>
        <Container>
        <Stack direction={'row'} spacing={3}>
            <Box width={'250px' }> 
                <Typography variant="h4" color="initial" my={2}>Pokemon Type</Typography>
                <Autocomplete
                    multiple
                    size='small'
                    id="tags-outlined"
                    limitTags={2}
                    options={PokeTypes}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="filterSelectedOptions"
                        placeholder="Types"
                    />
                    )}
                />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
                <TypeTable/>
            </Box>
        </Stack>
        </Container>
      </Box>
      
       
      </Box>
    
  );
}
