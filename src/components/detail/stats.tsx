"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import { Box, Container, Grid, Typography, Stack } from "@mui/material"
import type { Pokemon } from "@/types/pokemon"
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress"
import { colors, EvolveColors } from "@/types/pokemon-info"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"

interface Props {
  data: Pokemon
  evolutionChain: [number, string, string][]
}

const OVERFLOW_COLOR = "#FFD700" 
// convert stat name to hex color
const getStatColor = (types: string[]) => {
  const typeColors = types.map((type) => colors[type] || "#777")
  return typeColors
}

export default function Stats({ data, evolutionChain }: Props) {
  const [progressValues, setProgressValues] = useState<number[]>(data.stats.map(() => 0))

  useEffect(() => {
    const intervals = data.stats.map((st, index) => {
      return setInterval(() => {
        setProgressValues((prev) => {
          const newValues = [...prev]
          if (newValues[index] < st.base_stat) {
            newValues[index] += 1
          } else {
            clearInterval(intervals[index])
          }
          return newValues
        })
      }, 15)
    })
    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [data.stats])

  // capital first word and replace hyphens
  function capitalizeFirstLetter(str: string): string {
    if (str.length === 0) {
      return ""
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const statNames = data.stats.map((s) => s.stat.name)
  const statColors = getStatColor(statNames.map((str) => str.replace("-", ""))) // remove '-' for color mapping

  return (
    <Box sx={{ backgroundColor: "white", width: "100%", mb: 10 }}>
      {/* Stats */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, sm: 2 },
          px: { xs: 0, sm: 0, md: "70px", lg: "80px" },
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems={{ xs: "center", md: "start" }}
          justifyContent={{ xs: "center", md: "start" }}
          direction={"column"}
          marginY={{ xs: 0, md: 0 }}
        >
          <Stack direction={{ xs: "row", md: "column" }} spacing={4}>
            <Typography
              color="primary.main"
              fontWeight={700}
              fontSize={{
                xs: "1rem",
                sm: "1.2rem",
                md: "1rem",
                lg: "1.1rem",
                xl: "1.4rem",
              }}
            >
              Stats:
            </Typography>
          </Stack>
          {/* Stat Circles */}
          <Box width={{ xs: "300px", sm: "500px", md: "auto" }} marginX={"auto"}>
            <Grid
              container
              rowSpacing={{ xs: 1 }}
              columnSpacing={{ xs: 2 }}
              columns={{ xs: 1, sm: 2, md: 10 }}
              sx={{ justifyContent: "center", px: "10px" }}
            >
              {data.stats.map((st, index) => (
                <Grid key={index}>
                  <Box sx={{ position: "relative" }}>
                    {/* Background Circle (Grey) */}
                    <CircularProgress
                      variant="determinate"
                      sx={(theme) => ({
                        color: theme.palette.grey[200],
                        ...theme.applyStyles?.("dark", {
                          color: theme.palette.grey[800],
                        }),
                      })}
                      size={"120px"}
                      thickness={4}
                      value={100}
                    />
                    {/* Primary Animated Progress (up to 100) */}
                    <CircularProgress
                      variant="determinate"
                      disableShrink
                      sx={(theme) => ({
                        color: statColors[index],
                        animationDuration: "550ms",
                        position: "absolute",
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: "round",
                        },
                        ...theme.applyStyles?.("dark", {
                          color: statColors[index],
                        }),
                      })}
                      size={"120px"}
                      thickness={4}
                      value={Math.min(progressValues[index], 100)} 
                    />
                
                    {st.base_stat > 100 && (
                      <CircularProgress
                        variant="determinate"
                        disableShrink
                        sx={{
                          color: OVERFLOW_COLOR, 
                          animationDuration: "550ms",
                          position: "absolute",
                          left: 0,
                          
                          bottom:7.5,
                          [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: "round",
                          },
                        }}
                        size={"120px"}
                        thickness={5}
                        value={Math.max(0, progressValues[index] - 100)} 
                      />
                    )}
                    {/* Text inside circle */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: st.stat.name.length > 10 ? "20%" : "27%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: "1.3rem" }, m: 0 }}>
                        {progressValues[index]} {/* Display actual animated value */}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: "0.8rem" }, m: 0 }}>
                        {capitalizeFirstLetter(st.stat.name.replace("-", " "))} {/* Format stat name */}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
      {/* Evolution */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 0, sm: 2 },
          px: { xs: 0, sm: 0, md: "70px", lg: "80px" },
          pb: 10,
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems={{ xs: "center", md: "start" }}
          justifyContent={{ xs: "center", md: "start" }}
          direction={"column"}
          marginY={{ xs: 0, md: 0 }}
        >
          <Stack direction={{ xs: "row", md: "column" }} spacing={4}>
            <Typography
              color="primary.main"
              fontWeight={700}
              fontSize={{
                xs: "1rem",
                sm: "1.2rem",
                md: "1rem",
                lg: "1.1rem",
                xl: "1.4rem",
              }}
            >
              Evolution:
            </Typography>
          </Stack>
          {/* Images */}
          <Box width={{ xs: "300px", sm: "500px", md: "auto" }} marginX={"auto"}>
            <Grid
              container
              rowSpacing={{ xs: 1 }}
              columnSpacing={{ xs: 3, sm: 1, md: 2 }}
              columns={{ xs: 1, sm: 2, md: 10 }}
              sx={{
                justifyContent: "center",
                px: "10px",
                alignItems: "center",
              }}
            >
              {evolutionChain.map(([id, name, imgUrl], index) => (
                <React.Fragment key={id}>
                  <Box sx={{ textAlign: "center", justifyContent: "center" }}>
                    <Box
                      component="img"
                      src={imgUrl}
                      alt={name}
                      onClick={() => (window.location.href = `/detail/${id}`)}
                      sx={{
                        width: { xs: 130, sm: 120, md: 140 },
                        cursor: "pointer",
                        border: 8,
                        borderRadius: "50%",
                        borderColor: EvolveColors[index] || "#DE2C2C",
                        p: 1,
                        backgroundColor: "white",
                        "&:hover": { transform: "scale(1.05)" },
                        transition: "transform 0.2s ease",
                      }}
                    />
                    <Typography sx={{ fontWeight: 700, color: EvolveColors[index] }}>
                      {capitalizeFirstLetter(name)}
                    </Typography>
                    {index < evolutionChain.length - 1 && (
                      <DoubleArrowIcon
                        sx={{
                          color: EvolveColors[index + 1],
                          fontSize: { xs: "60px" },
                          display: { xs: "flex", sm: "none" },
                          transform: "rotate(90deg)",
                          mx: "auto",
                        }}
                      />
                    )}
                  </Box>
                  {index < evolutionChain.length - 1 && (
                    <DoubleArrowIcon
                      sx={{
                        color: EvolveColors[index + 1],
                        fontSize: { sm: "40px", md: "80px" },
                        mb: "20px",
                        display: { xs: "none", sm: "flex" },
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
