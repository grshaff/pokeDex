"use client";
import { useEffect, useState } from "react";
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
import { PokeTypes, colors } from "@/types/pokemon-info";
import { useRouter, useSearchParams } from "next/navigation";

interface PokeType {
  name: string;
}

const getTypeGradient = (type: string) => {
  return colors[type] || "#777";
};

export default function Layout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTypes, setSelectedTypes] = useState<PokeType[]>([]);

  const PokeTypesFiltered = PokeTypes
        .slice(0,18)
  
  useEffect(() => {
    const query = searchParams.get("type");
    if (query) {
      // handle URL encoded and regular plus signs
      const typeNames = decodeURIComponent(query)
        .split(/[+\s]+/) //
        .map((name) => name.trim().toLowerCase())
        .filter((name) => name.length > 0);

      const initialSelected = PokeTypes
      .filter((type) => typeNames.includes(type.name.toLowerCase()))
      .slice(0,18)

      if (JSON.stringify(initialSelected) !== JSON.stringify(selectedTypes)) {
        setSelectedTypes(initialSelected);
      }
    } else {
      if (selectedTypes.length > 0) {
        setSelectedTypes([]);
      }
    }
  }, [searchParams]);

  const handleTypeChange = (event: any, newValue: PokeType[]) => {
    setSelectedTypes(newValue);

    if (newValue.length === 0) {
      // clear the URL parameter when no types are selected
      router.replace(window.location.pathname, { scroll: false });
    } else {
      const typeNames = newValue.map((t) => t.name.toLowerCase());
      const query = typeNames.join("+");
      // use encodeURIComponent to properly encode the query
      router.replace(`?type=${encodeURIComponent(query)}`, { scroll: false });
    }
  };

  const types = selectedTypes.map((t) => t.name);
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
      {/* Background circles */}
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
            transition: "border-color 1s ease-in-out",
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
            transition: "border-color 1s ease-in-out",
            backgroundColor: "white",
            border: types[1]
              ? `180px solid ${gradientBorder2}`
              : `180px solid ${gradientBorder1}`,
            borderRadius: "50%",
          }}
        />
      </Box>

      <Box sx={{ zIndex: 10, position: "relative" }}>
        <Container>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {/* Type Selector */}
            <Box width={"250px"}>
              <Typography variant="h6" color="primary.main" my={2}>
                Pokemon Type
              </Typography>
              <Autocomplete
                multiple
                size="small"
                id="pokemon-type-filter"
                limitTags={2}
                options={PokeTypesFiltered}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                value={selectedTypes}
                onChange={handleTypeChange}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
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
            {/* Type Table */}
            <Box sx={{ flex: 1 }}>
              <TypeTable selectedTypes={selectedTypes} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
