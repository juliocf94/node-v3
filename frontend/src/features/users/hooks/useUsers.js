import { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "@features/users/services/userService";

export default function useUsers(filters) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Parámetros de consulta (estado local en el hook)
  const [params, setParams] = useState({
    page: 1,
    perPage: 20,
    sortBy: "created_at",
    sortOrder: "DESC",
    search: "",
  });

  /**
   * Adaptador: ejecuta el fetch y actualiza estados
   */
  const loadUsers = useCallback(
    async (queryParams = params) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchUsers({ ...queryParams, ...filters });

        // Adaptar formato de la API
        setUsers(res.data || []);
        setPagination(res.pagination || null);
        setParams(queryParams);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [params, filters]
  );

  // Cargar datos iniciales o cuando cambien los filtros
  useEffect(() => {
    loadUsers();
  }, [filters, loadUsers]);

  /**
   * Handlers expuestos
   */
  const handlePaginationChange = useCallback(
    (newPagination) => {
      loadUsers({
        ...params,
        page: newPagination.page,
        perPage: newPagination.perPage,
      });
    },
    [params, loadUsers]
  );

  const handleSortChange = useCallback(
    (sortData) => {
      loadUsers({
        ...params,
        sortBy: sortData.sortBy,
        sortOrder: sortData.sortOrder,
        page: 1, // reset página al ordenar
      });
    },
    [params, loadUsers]
  );

  const handleRowClick = useCallback((customer) => {
    console.log("Customer selected:", customer);
  }, []);

  const refetch = useCallback(() => {
    loadUsers(params);
  }, [params, loadUsers]);

  return {
    // Datos
    users,
    loading,
    error,
    pagination,

    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleRowClick,

    // Utilidades
    refetch,
    setParams, // si quieres exponerlo directamente
  };
}
