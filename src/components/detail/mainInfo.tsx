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

    const handleDetailClick = () => {
      router.push(`/detail/${data.id}`);
    };

  return (
    
    <Box sx={{ backgroundColor: 'white', width: '100%' }}>

        {/* Main info for detail page */}
        {variant === 'page' && (
      <Container
        maxWidth="xl"
        sx={{
            py: { xs: 4, sm: 6, md: 15 },
            px: { xs: 2, sm: 4, md: 10 },
        }}
    >
        <Grid
          container
          spacing={4}
          alignItems="start"
          justifyContent="s"
        >
          {/* Pokemon Image */}
          <Grid>
            <Box
              component="img"
              src={data.sprites.front_default ?? "/not-available.webp"}
              alt={data.name}
              sx={{
                width: '100%',
                minWidth: { xs: 220, sm: 280, md: 380 },
                border: 2,
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Info Section */}
          <Grid>
            <Stack spacing={0}>
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
                  color: 'primary.main',
                }}
              >
                {data.name}
              </Typography>

              {/* Weight & Height */}
              <Stack direction="row" spacing={4}>
                <Typography color="primary.light" fontWeight={700}>Weight:</Typography>
                <Typography color="primary.light">{data.weight}</Typography>
                <Typography color="primary.light" fontWeight={700}>Height:</Typography>
                <Typography color="primary.light">{data.height}</Typography>
              </Stack>

              {/* Abilities */}
              <Stack direction="row" spacing={1} paddingY={2}>
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
                {data.name}
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
