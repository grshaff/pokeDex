'use client';

import { Pagination, Stack, Select, MenuItem } from "@mui/material";

interface Props {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export default function PaginationControl({ count, page, onPageChange, limit, onLimitChange }: Props) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mt={5}>
      <Pagination count={count} page={page} onChange={(_, val) => onPageChange(val)} />
      <Select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
        {[3, 9, 12].map((num) => (
          <MenuItem key={num} value={num}>
            {num} / page
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}
