'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import { Pokemon } from '@/types/pokemon';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { colors } from '@/types/pokemon-color'; 

interface Props {
  data: Pokemon;
}

const getStatColor = (types: string[]) => {
    const typeColors = types.map(type => colors[type] || '#777')
    return typeColors;}

export default function Stats({ data }: Props) {
  const [progressValues, setProgressValues] = useState<number[]>(
    data.stats.map(() => 0) // initialize all progress to 0
  );

  useEffect(() => {
    const intervals = data.stats.map((st, index) => {
      return setInterval(() => {
        setProgressValues((prev) => {
          const newValues = [...prev];
          if (newValues[index] < st.base_stat) {
            newValues[index] += 1;
          } else {
            clearInterval(intervals[index]);
          }
          return newValues;
        });
      }, 15); // control speed
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [data.stats]);

  const types = data.stats.map(s => s.stat.name); // e.g., ['fire', 'flying']
  const typesfiltered = types.map(str => str.replace('-',''));
  const statColor = getStatColor(typesfiltered);
  console.log(statColor)

  return (
    <Box sx={{ backgroundColor: 'white', width: '100%' }}>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, sm: 2 },
          px: { xs: 0, sm: 0, md: '70px', lg: '80px' },
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems={{ xs: 'center', md: 'start' }}
          justifyContent={{ xs: 'center', md: 'start' }}
          direction={'column'}
          marginY={{ xs: 0, md: 0 }}
        >
          <Stack direction={{ xs: 'row', md: 'column' }} spacing={4}>
            <Typography
              color="primary.main"
              fontWeight={700}
              fontSize={{
                xs: '1rem',
                sm: '1.2rem',
                md: '1rem',
                lg: '1.1rem',
                xl: '1.4rem',
              }}
            >
              Stats:
            </Typography>
          </Stack>

          {/* Stat Circles */}
          <Box
            width={{ xs: '300px', sm: '500px', md: 'auto' }}
            marginX={'auto'}
          >
            <Grid
              container
              rowSpacing={{ xs: 1 }}
              columnSpacing={{ xs: 2 }}
              columns={{ xs: 1, sm: 2, md: 10 }}
              sx={{ justifyContent: 'center', px: '10px' }}
            >
              {data.stats.map((st, index) => (
                <Grid key={index}>
                  <Box sx={{ position: 'relative' }}>
                    {/* Background Circle */}
                    <CircularProgress
                      variant="determinate"
                      sx={(theme) => ({
                        color: theme.palette.grey[200],
                        ...theme.applyStyles?.('dark', {
                          color: theme.palette.grey[800],
                        }),
                      })}
                      size={'120px'}
                      thickness={4}
                      value={100}
                    />
                    {/* Animated Progress */}
                    <CircularProgress
                      variant="determinate"
                      disableShrink
                      sx={(theme) => ({
                        color: statColor[index],
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: 'round',
                        },
                        ...theme.applyStyles?.('dark', {
                          color: statColor,
                        }),
                      })}
                      size={'120px'}
                      thickness={4}
                      value={progressValues[index]}
                    />
                    {/* Text inside circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: st.stat.name.length > 10 ? '20%':'27%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: '1.3rem' }, m: 0 }}>
                        {progressValues[index]}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '0.8rem' }, m: 0 }}>{st.stat.name}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
