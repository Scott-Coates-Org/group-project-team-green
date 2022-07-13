import React from "react"
import { useTable, usePagination } from "react-table"
import { format as formatDate } from "date-fns"
import { Button, Table } from "reactstrap"
import s from "./reports.module.css"
//import { useDispatch } from "react-redux"

const date = new Date()

const storeData = [...new Array(100)].map((e) => ({
  bookingDate: formatDate(date, "dd MMMM yyyy"),
  sessionTime: formatDate(date, "p"),
  bookingId: <a href="#">{Math.round(Math.random() * 1000000)}</a>,
  headcount: Math.round(Math.random() * 15),
  amount: Math.round(Math.random() * 100),
  balance: Math.round(Math.random() * 1000),
  status: Math.random() > 0.5 ? "Fully Paid" : "Pending",
  bookingName: "James Cross",
  transactionDate: formatDate(date, "dd MMMM yyyy p"),
}))

const ReportsTable = ({
  columns,
  data,
  getData,
  totalDataCount,
  pageCount: controlledPageCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.

      pageCount: controlledPageCount,
    },
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    getData({ pageIndex, pageSize })
  }, [getData, pageIndex, pageSize])

  return (
    <div className="bg-white">
      <Table size="sm" hover={true} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} style={{ cursor: "pointer" }}>
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className={s["pagination-controls"]}>
        <div>
          {[...new Array(pageCount)].map((_, i) => (
            <Button
              onClick={() => gotoPage(i)}
              color={pageIndex === i ? "primary" : "secondary"}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <div>
          <span>
            {"Page "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            {` (${totalDataCount} items) `}
          </span>
          {[20, 50, 100, 200].map((num) => (
            <Button
              key={num}
              color={pageSize === num ? "primary" : "secondary"}
              onClick={() => {
                setPageSize(num)
              }}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

const Reports = () => {
  // const dispatch = useDispatch()

  // const { data } = useSelector((state) => state.bookings)
  const [data, setData] = React.useState([])
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

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

  const getData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data

    const fetchId = ++fetchIdRef.current

    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      const endRow = startRow + pageSize

      setData(storeData.slice(startRow, endRow))

      // total page
      setPageCount(Math.ceil(storeData.length / pageSize))
    }
  }, [])

  return (
    <div className="p-4 bg-light">
      <h2>Reports</h2>
      <h1>Bookings</h1>
      <ReportsTable
        columns={columns}
        data={data}
        getData={getData}
        totalDataCount={storeData.length}
        pageCount={pageCount}
      />
    </div>
  )
}

export default Reports
