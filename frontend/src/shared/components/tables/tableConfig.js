// src/shared/components/table/tableConfig.js
export const defaultTableOptions = {
    state: {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [],
        globalFilter: "",
    },
    manualPagination: false,
    manualSorting: false,
    pageCount: undefined,
};
