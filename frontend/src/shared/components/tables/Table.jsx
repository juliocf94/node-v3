// src/shared/components/table/Table.jsx
import React from "react";
import BaseTable from "./core/BaseTable";
import MuiTableAdapter from "./adapters/MuiTableAdapter";

/**
 * Main Table Component with UI Framework Detection/Selection
 */
const Table = ({
  uiFramework = "mui", // "mui" | "tailwind" | "bootstrap" | custom function
  ...props
}) => {
  // UI Framework adapters
  const adapters = {
    mui: MuiTableAdapter,
  };

  const renderAdapter =
    typeof uiFramework === "function"
      ? uiFramework
      : adapters[uiFramework] || adapters.mui;

  return <BaseTable {...props} renderAdapter={renderAdapter} />;
};

export default Table;
