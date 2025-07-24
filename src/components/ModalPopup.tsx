import { Modal, Box, Button } from "@mui/material";
import { Pokemon } from "@/types/pokemon";
import MainInfo from "@/components/detail/mainInfo";

interface Props {
  open: boolean;
  onClose: () => void;
  data: Pokemon | null;
}

export default function PokemonModal({ open, onClose, data }: Props) {
  if (!data) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: '70%', lg: '60%' },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <MainInfo data={data} variant='modal'  />
        
      </Box>
    </Modal>
  );
}
