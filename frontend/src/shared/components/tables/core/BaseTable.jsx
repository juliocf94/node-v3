// src/shared/components/table/core/BaseTable.jsx
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

/**
 * Core Table Logic - UI Agnostic
 * Maneja toda la lógica de TanStack Table y estado
 */
const BaseTable = ({
  data = [],
  columns = [],
  pagination = null,
  loading = false,
  error = null,
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
  onGlobalFilterChange,
  onRowClick,
  initialState = {},
  features = {},
  renderAdapter,
}) => {
  // Estados internos de TanStack Table
  const [sorting, setSorting] = useState(initialState.sorting || []);
  const [columnFilters, setColumnFilters] = useState(
    initialState.columnFilters || []
  );
  const [globalFilter, setGlobalFilter] = useState(
    initialState.globalFilter || ""
  );
  const [rowSelection, setRowSelection] = useState(
    initialState.rowSelection || {}
  );

  // Configuración de la tabla
  const table = useReactTable({
    data,
    columns,
    // Core features
    getCoreRowModel: getCoreRowModel(),

    // Paginación - siempre manual cuando hay paginación del servidor
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages || -1,

    // Sorting
    getSortedRowModel:
      features.sorting !== false ? getSortedRowModel() : undefined,
    manualSorting: !!onSortingChange,

    // Filtrado
    getFilteredRowModel:
      features.filtering !== false ? getFilteredRowModel() : undefined,
    manualFiltering: !!onColumnFiltersChange,

    // Estado
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination: pagination
        ? {
            pageIndex: pagination.page - 1, // TanStack usa 0-based
            pageSize: pagination.perPage,
          }
        : undefined,
    },

    // Callbacks
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },

    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);
      onColumnFiltersChange?.(newFilters);
    },

    onGlobalFilterChange: (updater) => {
      const newFilter =
        typeof updater === "function" ? updater(globalFilter) : updater;
      setGlobalFilter(newFilter);
      onGlobalFilterChange?.(newFilter);
    },

    onPaginationChange: (updater) => {
      if (pagination && onPaginationChange) {
        const currentPagination = {
          pageIndex: pagination.page - 1,
          pageSize: pagination.perPage,
        };
        const newPagination =
          typeof updater === "function" ? updater(currentPagination) : updater;

        // Convertir de vuelta a 1-based para el servidor
        onPaginationChange({
          page: newPagination.pageIndex + 1,
          perPage: newPagination.pageSize,
        });
      }
    },

    onRowSelectionChange: setRowSelection,

    // Metadatos adicionales
    meta: {
      loading,
      error,
      pagination,
      onRowClick,
    },
  });

  // Render usando el adapter proporcionado
  return renderAdapter({ table, loading, error, pagination });
};

export default BaseTable;
