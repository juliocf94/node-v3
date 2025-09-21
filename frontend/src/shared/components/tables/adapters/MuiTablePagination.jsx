// src/shared/components/table/adapters/MuiTablePagination.jsx
import React from "react";
import {
  TablePagination,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

const MuiTablePagination = ({ table, pagination }) => {
  const { total, page, perPage, totalPages, hasNext, hasPrev } = pagination;

  const handleChangePage = (newPage) => {
    table.setPageIndex(newPage - 1); // Convert to 0-based for TanStack
  };

  const handleChangeRowsPerPage = (newPerPage) => {
    table.setPageSize(newPerPage);
    table.setPageIndex(0); // Reset to first page
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderTop: 1,
        borderColor: "divider",
      }}>
      {/* Info */}
      <Typography variant="body2" color="text.secondary">
        Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)}{" "}
        of {total.toLocaleString()} results
      </Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Rows per page */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Rows per page:</Typography>
          <FormControl size="small">
            <Select
              value={perPage}
              onChange={(e) => handleChangeRowsPerPage(e.target.value)}
              sx={{ minWidth: 60 }}>
              {[10, 20, 50, 100].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Page navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            size="small"
            onClick={() => handleChangePage(1)}
            disabled={!hasPrev}
            startIcon={<FirstPage />}>
            First
          </Button>

          <Button
            size="small"
            onClick={() => handleChangePage(page - 1)}
            disabled={!hasPrev}
            startIcon={<NavigateBefore />}>
            Previous
          </Button>

          <Typography variant="body2" sx={{ mx: 2 }}>
            Page {page} of {totalPages.toLocaleString()}
          </Typography>

          <Button
            size="small"
            onClick={() => handleChangePage(page + 1)}
            disabled={!hasNext}
            endIcon={<NavigateNext />}>
            Next
          </Button>

          <Button
            size="small"
            onClick={() => handleChangePage(totalPages)}
            disabled={!hasNext}
            endIcon={<LastPage />}>
            Last
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MuiTablePagination;
