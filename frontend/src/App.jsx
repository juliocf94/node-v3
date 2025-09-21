import "./App.css";
import Table from "@shared/components/tables/Table";
import { customerColumns } from "@features/users/constants/customers.columns";
import useUsers from "@features/users/hooks/useUsers";

function App() {
  const { users, loading } = useUsers();  

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <>
      <Table data={users} columns={customerColumns} />
    </>
  );
}

export default App;
