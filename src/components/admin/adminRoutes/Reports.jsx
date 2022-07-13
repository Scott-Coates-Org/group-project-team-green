import React from "react"
import { useTable } from "react-table"
//import { useDispatch } from "react-redux"

const Reports = () => {
  // const dispatch = useDispatch()

  // const { data } = useSelector((state) => state.bookings)

  // useEffect(() => {
  //   dispatch()
  // }, [dispatch])

  const data = React.useMemo(
    () =>
      [...new Array(50)].map((e) => ({
        bookingDate: "World",
        sessionTime: "World",
        bookingId: "World",
        headcount: "World",
        amount: "World",
        balance: "World",
        status: "World",
        bookingName: "World",
        transactionDate: "World",
      })),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Booking Date",
        accessor: "bookingDate",
      },
      {
        Header: "Session Time",
        accessor: "sessionTime",
      },
      {
        Header: "Booking ID",
        accessor: "bookingId",
      },
      {
        Header: "Headcount",
        accessor: "headcount",
      },
      {
        Header: "Amount ($)",
        accessor: "amount",
      },
      {
        Header: "Balance ($)",
        accessor: "balance",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Booking Name",
        accessor: "bookingName",
      },
      {
        Header: "Transaction Date",
        accessor: "transactionDate",
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Reports
