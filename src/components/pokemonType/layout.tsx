import { useState } from "react";
import {
  Autocomplete,
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TypeTable from "@/components/pokemonType/TypeTable";
import { PokeTypes } from "@/types/pokemon-info";
import { colors } from "@/types/pokemon-info";

interface PokeType {
  name: string;
}

const getTypeGradient = (type: string) => {
  return colors[type] || "#777";
};

export default function Layout() {
  const [selectedTypes, setSelectedTypes] = useState<PokeType[]>([]);

  const handleTypeChange = (event: any, newValue: PokeType[]) => {
    setSelectedTypes(newValue);
  };

  // to change the backround image component based on selected type filter
  const types: any = selectedTypes.map((t) => t.name);
  const gradientBorder1 = getTypeGradient(types[0]);
  const gradientBorder2 = getTypeGradient(types[1]);
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
        pb: 20,
      }}
    >
      {/* Background images */}
      <Box sx={{ zIndex: 1 }}>
        <Box
          sx={{
            width: "700px",
            height: "700px",
            position: "absolute",
            top: 150,
            right: -380,
            pointerEvents: "none",
            backgroundColor: "white",
            border: `180px solid ${gradientBorder1}`,
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            width: "700px",
            height: "700px",
            position: "absolute",
            top: 650,
            left: -380,
            pointerEvents: "none",
            backgroundColor: "white",
            border: types[1]
              ? `180px solid ${gradientBorder2}`
              : `180px solid ${gradientBorder1}`,
            borderRadius: "50%",
          }}
        />
      </Box>

      {/* Main content */}
      <Box sx={{ zIndex: 10, position: "relative" }}>
        <Container>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {/* Category select */}
            <Box width={"250px"}>
              <Typography variant="h6" color="primary.main" my={2}>
                Pokemon Type
              </Typography>
              <Autocomplete
                multiple
                size="small"
                id="pokemon-type-filter"
                limitTags={2}
                options={PokeTypes}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                value={selectedTypes}
                onChange={handleTypeChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Types"
                    placeholder="Select types..."
                  />
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                }}
              />
            </Box>
            <Divider orientation="vertical" flexItem />

            {/* Pokemon list */}
            <Box sx={{ flex: 1 }}>
              <TypeTable selectedTypes={selectedTypes} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
