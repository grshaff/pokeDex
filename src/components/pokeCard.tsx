"use client";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import SkeletonCard from "@/components/skeletonCard";
import dynamic from "next/dynamic";

interface Props {
  data: Pokemon;
  variant?: "card" | "table";
}

// Capital first letter for pokie name
export default function MediaCard({ data, variant = "card" }: Props) {
  function capitalizeFirstLetter(str: string): string {
    if (str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const pokemonName: string = capitalizeFirstLetter(data.name);

  const PokeCard = dynamic(() => import("@/components/pokeCard"), {
    loading: () => <SkeletonCard />,
    ssr: false,
  });

  return (
    <Box>
      {/* Card style */}
      {variant === "card" && (
        <Card
          sx={{
            width: { xs: "250px", sm: "250px", md: "240px", lg: "300px" },
            maxheight: "550px",
            boxShadow: 8,
            borderRadius: "15px",
          }}
        >
          {/* Pokiee image */}
          <CardMedia
            sx={{
              width: { xs: "200px", sm: "170px", md: "200px", lg: "280px" },
              height: { xs: "170px", sm: "170px", md: "200px", lg: "280px" },
              margin: "auto",
              mt: "30px",
            }}
            image={
              data.sprites.front_default
                ? data.sprites.front_default
                : "/not-available.webp"
            }
            title={pokemonName}
          />
          {/* Pokiee name */}
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ color: "primary.light", fontWeight: "700" }}
            >
              #{String(data.id).padStart(3, "0")}
            </Typography>
            <Typography
              variant="h4"
              noWrap
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: { xs: "20px", sm: "22px", md: "25px", lg: "34px" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                textAlign: "start",
              }}
            >
              {pokemonName}
            </Typography>
          </CardContent>

          {/* Types */}
          <Box sx={{ margin: "auto", display: "flex" }}>
            <CardActions sx={{ margin: "auto", display: "flex" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ justifyContent: "center", marginBottom: "20px" }}
              >
                {data.types.map((typeData, index) => (
                  <Grid key={index}>
                    <Link
                      href={typeData.type.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`/pokemon-types/type_${typeData.type.name}.webp`}
                        alt={typeData.type.name}
                        style={{
                          width: "100%",
                          maxWidth: "100px",
                          cursor: "pointer",
                          borderRadius: "6px",
                          transition: "transform 0.2s ease-in-out",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </CardActions>
          </Box>
        </Card>
      )}

      {variant === "table" && (
        <Card
          sx={{
            width: "100%",
            mb: 1,
            boxShadow: 2,
            borderRadius: "8px",
            "&:hover": {
              boxShadow: 4,
              transform: "translateY(-2px)",
              transition: "all 0.2s ease-in-out",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              gap: { xs: 2, sm: 4 },
              width: "100%", // Ensure flex container respects full width
            }}
          >
            {/* Image Column */}
            <Box
              sx={{
                flexShrink: 0,

                minWidth: { xs: 30, sm: 80 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={data.sprites.front_default || "/not-available.webp"}
                alt={pokemonName}
                sx={{
                  minWidth: { xs: 30, sm: 80 },
                  minHeight: { xs: 30, sm: 80 },
                  bgcolor: "grey.100",
                }}
              />
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* ID Column */}
            <Box
              sx={{
                flexShrink: 0,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "primary.light",
                  fontWeight: 700,
                  fontSize: { xs: "8px", sm: "14px" },
                }}
              >
                #{String(data.id).padStart(3, "0")}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Pokemon Name Column */}
            <Box sx={{ flexShrink: 1, flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: { xs: "12px", sm: "18px", md: "20px" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {pokemonName}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Type Column */}
            <Box
              sx={{
                display: { xs: "block" },
                gap: 1,
                flexShrink: 0,
                justifyContent: "flex-end",
              }}
            >
              {data.types.map((typeData, index) => (
                <Link
                  key={index}
                  href={typeData.type.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box
                    component="img"
                    src={`/pokemon-types/type_${typeData.type.name}.webp`}
                    alt={typeData.type.name}
                    sx={{
                      width: { xs: "60px", sm: "80px" },
                      cursor: "pointer",
                      borderRadius: "4px",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </Link>
              ))}
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
}
