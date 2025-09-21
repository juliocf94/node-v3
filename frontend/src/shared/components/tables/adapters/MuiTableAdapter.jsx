// src/shared/components/table/adapters/MuiTableAdapter.jsx
import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Search,
  FilterList,
} from "@mui/icons-material";
import { flexRender } from "@tanstack/react-table";
import MuiTablePagination from "./MuiTablePagination";

/**
 * Material-UI Table Adapter
 */
const MuiTableAdapter = ({ table, loading, error, pagination }) => {
  const { getHeaderGroups, getRowModel, getState } = table;
  const { globalFilter } = getState();

  if (error) {
    return (
      <Paper elevation={0} sx={{ p: 3 }}>
        <Alert severity="error">{error.message || "Error loading data"}</Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
      {/* Global Search */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={globalFilter || ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <MuiTable size="small" sx={{ position: "relative" }}>
          {/* Loading Overlay */}
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}>
              <CircularProgress />
            </Box>
          )}

          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                      userSelect: "none",
                    }}
                    onClick={header.column.getToggleSortingHandler()}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Sort Indicator */}
                      {header.column.getCanSort() && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <KeyboardArrowUp
                            sx={{
                              fontSize: 16,
                              opacity:
                                header.column.getIsSorted() === "asc" ? 1 : 0.3,
                            }}
                          />
                          <KeyboardArrowDown
                            sx={{
                              fontSize: 16,
                              opacity:
                                header.column.getIsSorted() === "desc"
                                  ? 1
                                  : 0.3,
                              mt: -0.5,
                            }}
                          />
                        </Box>
                      )}

                      {/* Filter Indicator */}
                      {header.column.getCanFilter() && (
                        <FilterList
                          sx={{
                            fontSize: 16,
                            opacity: header.column.getIsFiltered() ? 1 : 0.3,
                          }}
                        />
                      )}
                    </Box>

                    {/* Column Filter */}
                    {header.column.getCanFilter() && (
                      <Box sx={{ mt: 1 }}>
                        <TextField
                          size="small"
                          placeholder={`Filter ${header.column.columnDef.header}...`}
                          value={header.column.getFilterValue() || ""}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          sx={{ width: "100%" }}
                        />
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => table.options.meta?.onRowClick?.(row.original)}
                sx={{
                  cursor: table.options.meta?.onRowClick
                    ? "pointer"
                    : "default",
                  opacity: loading ? 0.6 : 1,
                }}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {/* Pagination */}
      {pagination && (
        <MuiTablePagination table={table} pagination={pagination} />
      )}
    </Paper>
  );
};

export default MuiTableAdapter;
