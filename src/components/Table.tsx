import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 70,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
  {
    field: "nick",
    headerName: "NAME",
    minWidth: 130,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
  {
    field: "auth",
    headerName: "AUTH",
    minWidth: 130,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
  {
    field: "math",
    headerName: "MATH",
    type: "number",
    minWidth: 90,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
  {
    field: "traffic",
    headerName: "TRAFFIC",
    type: "number",
    minWidth: 90,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
  {
    field: "geography",
    headerName: "GEOGRAPHY",
    type: "number",
    minWidth: 130,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
  {
    field: "successRate",
    headerName: "SUCCESS",

    minWidth: 90,
    headerAlign: "center",
    align: "center",
    width: 230,
  },
]

function Table({ data }: any) {
  const [table, setTable] = useState(null)
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      let arrays = await data()
      arrays = arrays.slice(1)
      await setTable(arrays)
    })()
  }, [])

  return (
    <div style={{ height: `630px`, width: "100%" }}>
      {table != null ? (
        <DataGrid
          rows={table.map((item: any) => ({
            id: item.id,
            nick: item.nick,
            auth: item.auth,
            math: item.lessons.math,
            traffic: item.lessons.traffic,
            geography: item.lessons.geography,
            successRate: item.successRate,
          }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      ) : (
        <div />
      )}
    </div>
  )
}

export default Table
