import { Box, Container, Stack, Typography } from "@mui/material";
import { Reveal } from "@/components/revealAnimation";
import Link from "next/link";

export default function NotFound() {
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
            paddingY: { xs: "20px", md: "50px" },
          }}
        >
          <Box>
            <Reveal>
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
                404 | Page not Found
              </Typography>
            </Reveal>
            <Reveal>
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
                It looks like the page you were trying to reach doesn't exist or
                has moved.
              </Typography>
            </Reveal>
            <Box>
              <Reveal>
                <Link href="/">
                  <Typography borderBottom={1} color="primary.light">
                    Click here to go home
                  </Typography>
                </Link>
              </Reveal>
            </Box>
          </Box>
          {/* Pokemon image ^-^ */}
          <Reveal>
            <Box
              component="img"
              src="/pokemon-notfound.webp"
              alt="404 Page Not Found"
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
