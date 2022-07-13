import React from "react"
import { useTable } from "react-table"
import { format as formatDate } from "date-fns"
//import { useDispatch } from "react-redux"

const Reports = () => {
  // const dispatch = useDispatch()

  // const { data } = useSelector((state) => state.bookings)

  // useEffect(() => {
  //   dispatch()
  // }, [dispatch])

  const data = React.useMemo(() => {
    const date = new Date()

    return [...new Array(50)].map((e) => ({
      bookingDate: formatDate(date, "dd MMMM yyyy"),
      sessionTime: formatDate(date, "p"),
      bookingId: <a href="#">{Math.round(Math.random() * 1000000)}</a>,
      headcount: 1,
      amount: Math.round(Math.random() * 100),
      balance: Math.round(Math.random() * 1000),
      status: Math.random() > 0.5 ? "Fully Paid" : "Pending",
      bookingName: "James Cross",
      transactionDate: formatDate(date, "dd MMMM yyyy p"),
    }))
  }, [])

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
