"use client";

import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";

interface Props {
  data: Pokemon;
  variant?: 'modal' | 'page';
}



export default function MainInfo({ data, variant = 'page' }: Props) {
    const router = useRouter();

    // link modal button to detail
    const handleDetailClick = () => {
      router.push(`/detail/${data.id}`);
    };

    // Capitalize nameee
    function capitalizeFirstLetter(str: string): string {
      if (str.length === 0) {
        return ""; 
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const pokemonName: string = capitalizeFirstLetter(data.name);

  return (
    
    <Box sx={{ backgroundColor: 'white', width: '100%' }}>

        {/* Main info for detail page */}
        {variant === 'page' && (
      <Container
        maxWidth="xl"
        sx={{
            py: { xs: 4, sm: 6, md: 15, lg:15 },
            px: { xs:0, sm: 0, md: '70px', lg:'14px' },
        }}
    >
        <Grid
          container
          spacing={4}
          alignItems={{xs:'center', md:'start'}}
          justifyContent={{xs:'center', md:'start'}}
          direction={{xs:'column', md:'row'}}
          marginY={{xs:10, md:0}}
        >
          {/* Pokemon Image */}
          <Grid>
            <Box
              component="img"
              src={data.sprites.front_default ?? "/not-available.webp"}
              alt={data.name}
              sx={{
                width: {xs: 220, sm:350, md:'100%'},
                minWidth: { xs: 120, sm: 250, md: 280, lg:450 },
                border: 2,
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Info Section */}
          <Grid>
            <Stack spacing={0} >
              <Typography variant="body2" color="primary.light" fontWeight={700} fontSize={'24px'}>
                #{data.id}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: '1.8rem',
                    sm: '2.2rem',
                    md: '2.8rem',
                    lg: '3.4rem',
                    xl: '4rem',
                  },
                  marginBottom:'40px',
                  color: 'primary.main',
                }}
              >
                {pokemonName}
              </Typography>

              {/* Weight & Height */}
              <Stack direction="row" spacing={4}>
                <Typography color="primary.main" fontWeight={700} fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.4rem',
                   }}>Weight:</Typography>
                <Typography color="primary.main" fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.3rem',
                   }}>{data.weight}</Typography>
                <Typography color="primary.main" fontWeight={700} paddingLeft={{xs:2, sm:15}} fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.3rem',
                   }}>Height:</Typography>
                <Typography color="primary.main"fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.3rem',
                   }}>{data.height}</Typography>
              </Stack>

              {/* Abilities */}
              <Stack direction="row" spacing={3} paddingY={5}>
                <Typography color="primary.main" fontWeight={700} fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.3rem',
                   }}>Abilities:</Typography>
                <Stack spacing={0.5}>
                  {data.abilities.map((ab, i) => (
                    <Typography key={i} color="primary.main" fontSize= {{
                      xs: '1rem',
                      sm: '1.2rem',
                      md: '1rem',
                      lg: '1.1rem',
                      xl: '1.3rem',
                     }}>
                      • {ab.ability.name}
                    </Typography>
                  ))}
                </Stack>
              </Stack>

              {/* Types */}
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography color="primary.main" fontWeight={700}fontSize= {{
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1rem',
                    lg: '1.1rem',
                    xl: '1.3rem',
                   }}>Types:</Typography>
                <Stack direction="row" spacing={2}>
                  {data.types.map((t, i) => (
                    <Link href={`/types/${t.type.name}`} key={i}>
                      <Box
                        component="img"
                        src={`/pokemon-types/type_${t.type.name}.webp`}
                        alt={t.type.name}
                        sx={{
                            width: '100%',
                            maxWidth: 100,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': { transform: 'scale(1.05)' },
                        }}
                      />
                    </Link>
                  ))}
                </Stack>
              </Stack>
              
             
                
            </Stack>
          </Grid>
        </Grid>
      </Container>)}

      {/* Main info for modal */}
        {variant === 'modal' && (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}
      >
        <Grid container spacing={4} alignItems="flex-start">
          {/* Pokemon Image */}
          <Grid>
            <Box
              component="img"
              src={data.sprites.front_default ?? "/not-available.webp"}
              alt={data.name}
              sx={{
                width: '100%',
                minWidth: { xs: 220, sm: 280, md: 250 },
                border: 2,
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Info Section */}
          <Grid>
            <Stack spacing={2}>
              <Typography variant="body2" color="primary.light" fontWeight={400}>
                #{data.id}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                  color: 'primary.main',
                  textTransform: 'capitalize',
                }}
              >
                {pokemonName}
              </Typography>

              {/* Weight & Height */}
              <Stack direction="row" spacing={4}>
                <Typography color="primary.light" fontWeight={700}>Weight:</Typography>
                <Typography color="primary.light">{data.weight}</Typography>
                <Typography color="primary.light" fontWeight={700}>Height:</Typography>
                <Typography color="primary.light">{data.height}</Typography>
              </Stack>

              {/* Abilities */}
              <Stack direction="row" spacing={1}>
                <Typography color="primary.light" fontWeight={700}>Abilities:</Typography>
                <Stack spacing={0.5}>
                  {data.abilities.map((ab, i) => (
                    <Typography key={i} color="primary.light">
                      • {ab.ability.name}
                    </Typography>
                  ))}
                </Stack>
              </Stack>

              {/* Types */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography color="primary.light" fontWeight={700}>Types:</Typography>
                <Stack direction="row" spacing={2}>
                  {data.types.map((t, i) => (
                    <Link href={`/types/${t.type.name}`} key={i}>
                      <Box
                        component="img"
                        src={`/pokemon-types/type_${t.type.name}.webp`}
                        alt={t.type.name}
                        sx={{
                          width: 80,
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': { transform: 'scale(1.05)' },
                        }}
                      />
                    </Link>
                  ))}
                </Stack>
              </Stack>
              
                <Button
                    onClick={handleDetailClick}
                    variant="contained"
                    sx={{
                    fontSize: '12px',
                    fontWeight: '700',
                    backgroundColor: "secondary.main",
                    borderRadius: '14px',
                    }}
                >
                    More detail
                </Button>
                
            </Stack>
          </Grid>
        </Grid>
      </Container>)}
    </Box>
  );
}
