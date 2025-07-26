"use client";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function LoadingCard() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack gap={3} sx={{ direction: "row", justifyContent: "center" }}>
      <Box
        component="img"
        src="/pikachu-running.gif"
        alt="Full Pokémon view"
        sx={{
          height: "auto",
          width: "200px",
          m: "auto",
        }}
      />
      <Typography variant="h6" color="initial" textAlign={"center"}>
        Getting data{dots}
      </Typography>
    </Stack>
  );
}
