// src/shared/components/table/TablePagination.jsx
import React from "react";
import { TablePagination as MuiPagination } from "@mui/material";

const TablePagination = ({ table }) => {
  const { pagination } = table.getState();

  return (
    <MuiPagination
      component="div"
      count={table.getPageCount() || 0}
      page={pagination.pageIndex}
      onPageChange={(_, newPage) => table.setPageIndex(newPage)}
      rowsPerPage={pagination.pageSize}
      onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      rowsPerPageOptions={[5, 10, 25, 50]}
    />
  );
};

export default TablePagination;
