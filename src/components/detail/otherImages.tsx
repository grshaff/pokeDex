"use client";

import { useState } from "react";
import {Box, Container, Grid, Typography, Stack, Dialog, DialogContent} from "@mui/material";
import { Pokemon } from "@/types/pokemon";

interface Props {
  data: Pokemon;
}

export default function OtherImages({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const spriteEntries = Object.entries(data.sprites)
    .filter(
      ([key, url]) => typeof url === "string" && url && !key.includes("_female") // filter out the female image bcoz its just a duplicate
    )
    .slice(0, 10);
  console.log(spriteEntries);

  return (
    <Box sx={{ backgroundColor: "white", width: "100%" }}>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 0, sm: 2 },
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
              Other Images:
            </Typography>
          </Stack>

          {/* Pokemon Image Grid */}
          <Box
            width={{ xs: "300px", sm: "500px", md: "auto" }}
            marginX={"auto"}
          >
            <Grid
              container
              rowSpacing={{ xs: 1 }}
              columnSpacing={{ xs: 1 }}
              columns={{ xs: 1, sm: 2, md: 10 }}
              sx={{ justifyContent: "center", px: "10px" }}
            >
              {spriteEntries.map(([key, url], index) => (
                <Grid>
                  <Box
                    component="img"
                    src={url}
                    alt={`${data.name}-${key}`}
                    onClick={() =>
                      handleImageClick(url ?? "/not-available.webp")
                    }
                    sx={{
                      display: "block",
                      border: 2,
                      borderRadius: 4,
                      cursor: "pointer",
                      width: {
                        xs: "120px",
                        sm: "180px",
                        md: "clamp(100px,12vw, 130px)",
                        lg: "150px",
                      },
                      backgroundColor: "white",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>

      {/* Image Pop-up fullscreen */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent
          sx={{
            p: 0,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Full Pokémon view"
              sx={{
                height: "auto",
                width: "300px",
                backgroundColor: "white",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
