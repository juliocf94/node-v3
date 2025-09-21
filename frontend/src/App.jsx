import "./App.css";
import Table from "@shared/components/tables/Table";
import { customerColumns } from "@features/users/constants/customers.columns";
import useUsers from "@features/users/hooks/useUsers";

function App() {
  const { users, pagination, loading } = useUsers();

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <>
      <Table
        uiFramework="mui"
        data={users}
        pagination={pagination}
        columns={customerColumns}
        loading={loading}
      />
    </>
  );
}

export default App;
