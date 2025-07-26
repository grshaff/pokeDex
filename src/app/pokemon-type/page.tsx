"use client";
import { Box, CircularProgress } from "@mui/material";
import Layout from "@/components/pokemonType/layout";
import { Suspense } from "react";

// main page for pokemon type
export default function PokeType() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <CircularProgress />
        </Box>
      }
    >
    <Box sx={{ pt: 10 }}>
      <Layout />
    </Box>
    </Suspense>
  );
}
