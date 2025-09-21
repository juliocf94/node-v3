import { useEffect, useState } from "react";
import { fetchUsers } from "@features/users/services/userService";

export default function useUsers(filters) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchUsers(filters).then(data => {
      if (mounted) setUsers(data);
    }).finally(() => setLoading(false));
    return () => { mounted = false };
  }, [filters]);

  return { users, loading };
}
