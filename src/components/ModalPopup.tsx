// components/PokemonModal.tsx
import { Modal, Box, Typography } from "@mui/material";
import { Pokemon } from "@/types/pokemon";

interface Props {
  open: boolean;
  onClose: () => void;
  data: Pokemon | null;
}

export default function PokemonModal({ open, onClose, data }: Props) {
  if (!data) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 300, sm: 400 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          #{String(data.id).padStart(3, "0")} {data.name.toUpperCase()}
        </Typography>
        <img src={data.sprites.front_default ?? '/not-available.webp'} alt={data.name} width={120} />
        <Typography sx={{ mt: 2 }}>Height: {data.height}</Typography>
        <Typography>Weight: {data.weight}</Typography>
      </Box>
    </Modal>
  );
}
