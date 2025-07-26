import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Reveal } from "@/components/revealAnimation";

export default function LandingPage({
  onScrollToPokedex,
}: {
  onScrollToPokedex: () => void;
}) {
  return (
    <Box
      sx={{
        height: { xs: "100vh", sm: "110vh", md: "800px" },
        backgroundColor: "white",
        display: "flex",
        alignItems: "start",
      }}
    >
      <Container
        sx={{
          paddingY: { xs: "20px", md: "50px" },
          paddingX: { xs: "20px", sm: "50px", md: "110px", lg: "40px" },
        }}
      >
        {/* Text and img layout */}
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={3}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", md: "start" },
            paddingY: { xs: "20px", md: "50px" },
          }}
        >
          <Box>
            <Reveal width="100%">
              <Typography
                component="h1"
                sx={{
                  fontWeight: "700",
                  color: "primary.main",
                  fontSize: {
                    xs: "1.4rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3.25rem",
                  },
                }}
              >
                {" "}
                All the Pokémon<br></br> data you'll ever <br></br> need in one
                place!
              </Typography>
            </Reveal>
            <Reveal width="100%">
              <Typography
                component="p"
                sx={{
                  fontWeight: "400",
                  color: "primary.light",
                  fontSize: { xs: "", sm: "", md: "1rem", lg: "1.25rem" },
                  marginY: "25px",
                }}
              >
                {" "}
                Thousands of data compiled into one place
              </Typography>
            </Reveal>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Reveal width="100%">
                <Button
                  onClick={onScrollToPokedex}
                  variant="contained"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "700",
                    backgroundColor: "secondary.main",
                    padding: { lg: "12px 56px", md: "10px 40px" },
                    borderRadius: "14px",
                  }}
                >
                  Check PokèDex
                </Button>
              </Reveal>
            </Box>
          </Box>
          {/* Pokemon image ^-^ */}
          <Reveal>
            <Box
              component="img"
              src="/pokemon-landing.webp"
              alt="Pokemon Character"
              sx={{
                width: { xs: "220px", sm: "280px", md: "384px", lg: "534px" },
              }}
            />
          </Reveal>
        </Stack>
      </Container>
    </Box>
  );
}
