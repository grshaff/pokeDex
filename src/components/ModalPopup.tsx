import { Modal, Box, Button } from "@mui/material";
import { Pokemon } from "@/types/pokemon";
import MainInfo from "@/components/detail/mainInfo";
import { colors } from "@/types/pokemon-info"; // adjust path to your `colours` file
import { gradientMove } from "@/lib/animation";

const getTypeGradient = (types: string[]) => {
  const typeColors = types.map((type) => colors[type] || "#777");
  if (typeColors.length < 2) {
    return `linear-gradient(135deg, ${typeColors.join(", ")}, #ffffff)`;
  } else {
    return `linear-gradient(135deg, ${typeColors.join(", ")})`;
  }
};

interface Props {
  open: boolean;
  onClose: () => void;
  data: Pokemon | null;
}

export default function PokemonModal({ open, onClose, data }: Props) {
  if (!data) return null;

  const types = data.types.map((t) => t.type.name); // e.g., ['fire', 'flying']
  const gradientBorder = getTypeGradient(types);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: "4px", // thickness of border
            borderRadius: 2,
            background: gradientBorder,
            backgroundSize: "400% 400%",
            animation: `${gradientMove} 3s ease infinite`,
          }}
        >
          <Box
            sx={{
              width: { xs: "80vw", sm: "60vw", md: "70vw", lg: "60vw" },
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <MainInfo data={data} variant="modal" onClick={onClose} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
