import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "S.NO",
    cell: (row, index) => index + 1, // Dynamically calculate serial number
    sortable: false,
  },
  {
    name: "User Name",
    selector: (row) => row.citizenName, // Map to the key in your data object
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
  },
  {
    name: "Plan Name",
    selector: (row) => row.planName,
    sortable: true,
  },
  {
    name: "Plan Status",
    selector: (row) => row.planStatus,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.planStartDate,
    sortable: true,
  },
  {
    name: "End Date",
    selector: (row) => row.planEndDate,
    sortable: true,
  },
  {
    name: "Benefit Amt",
    selector: (row) => row.benefitsAmount,
    sortable: true,
  },
];

const TableData = ({ data }) => {
  console.log("Fetched Data:", data);

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination // Enables pagination
      paginationPerPage={5} // Show only 5 records per page
      paginationRowsPerPageOptions={[5, 10, 15, 20]} 
      highlightOnHover // Adds hover effect on rows
      striped // Alternating row colors for better readability
    />
  );
};

export default TableData;
