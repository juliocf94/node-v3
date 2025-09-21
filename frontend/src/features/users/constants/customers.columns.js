// src/features/customers/api/customers.columns.js
export const customerColumns = [
  {
    header: "Name",
    accessorKey: "first_name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) =>
      getValue() === "active" ? "Active" : "Inactive",
  },
];
