"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import PokeCard from '@/components/pokeCard'

export default function PokeDex() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight:'100vh',
        backgroundColor: "#FFCB3B",
        overflow: "hidden",
        pb:20,
      }}
    >
      {/* Background images */}
      <Box
        component="img"
        src="/bg-component/top-left-bg.webp"
        alt="Top Left Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: {xs:"2000px", lg: "1440px" },
          pointerEvents: "none", // ensure it doesn’t block content
        }}
      />
      <Box
        component="img"
        src="/bg-component/bot-right-bg.webp"
        alt="Bottom Right Background"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: {xs:"2000px", lg: "1440px"},
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1, 
        }}
      >
        <Container sx={{ py: "80px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "40px", fontWeight: 700, color: "primary.main" }}
              >
                PokèDex
              </Typography>
              <Typography sx={{ color: "primary.main" }}>
                All Generation totaling <br />
                999999 Pokemon
              </Typography>
            </Box>
          </Box>
        </Container>
        <Box sx={{marginX:{xs: '100px', sm: '100px', md: '100px', lg:'140px', xl:'500px'}, justifyContent:'center'}}>
          
        <Grid container rowSpacing={{xs:3, md:5 }} columnSpacing={{ xs: 1, sm: 2, md: 4, lg:10, xl:10 }} columns={{ xs: 2, sm: 8, md: 15 }} sx={{justifyContent:'center', marginx:'10px'}}>
            {Array.from(Array(9)).map((_, index) => (
            <Grid key={index} size={{ xs: 'auto', sm: 3, md: 4.8, lg:5, xl:3.75 }}>
                <PokeCard/>
            </Grid>
            ))}
      </Grid>

          
        </Box>
        
      </Box>
    </Box>
  );
}
