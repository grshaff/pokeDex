'use client';

import theme from "@/lib/theme";
import { Pagination, Stack, Select, MenuItem, Typography, useMediaQuery } from "@mui/material";

interface Props {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export default function PaginationControl({ count, page, onPageChange, limit, onLimitChange }: Props) {
    const totalPokemon = (count*limit);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack direction={{sm:'column', md:"row"}} spacing={2} alignItems="center" justifyContent="center" mt={5} sx={{color:'white', }}>
        <Typography display={{xs:'none', md:'block'}}>Per page:</Typography>
        <Select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))} 
        sx={{
            height: '33px',
            width: '60px',
            color: 'white',
            borderColor: 'white',
            fontWeight: 'bold',
            '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            border:2
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            },
            '& svg': {
            color: 'white', // icon color
            },
            display:{xs:'none', md:'flex'}
        }}
        >
        {[3, 9, 12].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
        </Select>
      <Pagination size={isSmallScreen ? "small" : "medium"} variant="outlined" shape="rounded"  count={count} page={page} onChange={(_, val) => onPageChange(val)} sx={{
            '& .MuiPaginationItem-root': {
            color: 'white',
            borderColor: 'white',
            border:2
            
            },
            '& .Mui-selected': {
            backgroundColor: 'white',
            color: '#FFCB3B',
            fontWeight: 'bold',
            borderColor: 'white',
            
            },
            '& .MuiPaginationItem-root:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'white !important',
            },
        }}/>
      <Typography>Total data: {totalPokemon}</Typography>
    </Stack>
  );
}
