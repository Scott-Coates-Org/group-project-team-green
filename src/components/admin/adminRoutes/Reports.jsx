import React from "react"
import { useTable, usePagination } from "react-table"
import { format as formatDate } from "date-fns"
import { Table } from "reactstrap"
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
  pageCount: controlledPageCount,
}) => {
  // Listen for changes in pagination and use the state to fetch our new data

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  React.useEffect(() => {
    getData({ pageIndex, pageSize })
  }, [getData, pageIndex, pageSize])

  return (
    <div>
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: "100px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
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

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      const endRow = startRow + pageSize
      console.log(pageSize, pageIndex)
      setData(storeData.slice(startRow, endRow))

      // total page
      setPageCount(Math.ceil(storeData.length / pageSize))
    }
  }, [])

  return (
    <ReportsTable
      columns={columns}
      data={data}
      getData={getData}
      pageCount={pageCount}
    />
  )
}

export default Reports
