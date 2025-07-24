"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function landingPage() {
  return (  
            <Box
            sx={{
                height: { xs: '100vh', sm:'110vh',md: '800px' },
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'start',
            }}
            >
            <Container
                sx={{
                paddingY: { xs: '20px', md: '50px' },
                paddingX: { xs: '50px', md: '110px', lg: '40px' },
                }}
            >
            <Stack direction={{xs:"column-reverse", md:"row"}} spacing={3}
            sx={{ justifyContent: "space-between",
                alignItems: "center", 
                paddingY:{xs:'20px', md:'50px'}}}>
            
            <Box >
            <Typography component='h1' sx={{ fontWeight:'700', color:'primary.main', fontSize:{xs:'1.4rem',sm:'2rem',md:'2.5rem',lg:'3.25rem'} }}> All the Pokémon<br></br> data you'll  ever <br></br> need in one place!</Typography>
            <Typography component='p' sx={{ fontWeight:'400', color:'primary.light', fontSize:{xs:'',sm:'',md:'1rem',lg:'1.25rem'}, marginY:'25px' }}> Thousands of data compiled into one place</Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                    variant="contained"
                    sx={{
                    fontSize: '20px',
                    fontWeight: '700',
                    backgroundColor: "secondary.main",
                    padding: { lg: '12px 56px', md: '10px 40px' },
                    borderRadius: '14px',
                    }}
                >
                    Check PokèDex
                </Button>
            </Box>
            
            </Box>
            
            <Box
            component="img"
            src='/pokemon-landing.webp'
            alt="Pokemon Character"
            sx={{
                  width: {xs:'220px',sm:'280px', md:'404px',lg:'534px'},
                    
            }}
            />
            </Stack>    
        </Container>
        
      </Box>
    
  );
}
