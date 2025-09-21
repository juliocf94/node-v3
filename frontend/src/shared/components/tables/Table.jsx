// src/shared/components/table/Table.jsx
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TablePagination from "./TablePagination";

const Table = ({ data = [], columns = [], options = {}, onRowClick }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: options.state || {},
    onSortingChange: options.onSortingChange,
    onPaginationChange: options.onPaginationChange,
    manualPagination: options.manualPagination || false,
    manualSorting: options.manualSorting || false,
    pageCount: options.pageCount || undefined,
  });

  return (
    <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <MuiTable size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => onRowClick && onRowClick(row.original)}
                sx={{ cursor: onRowClick ? "pointer" : "default" }}
              >
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

      <TablePagination table={table} />
    </Paper>
  );
};

export default Table;
