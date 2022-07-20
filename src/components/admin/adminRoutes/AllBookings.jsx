import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRooms } from "redux/rooms"

import { Table } from "reactstrap"
import styles from "./allBookings.module.css"

const workingHours = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]

const customersPerHour = [
  [25, 30, 5, 10, 15, 25, 28, 38],
  [15, 20, 9, 7, 22, 47, 52, 65],
  [12, 13, 2, 3, 10, 19, 28, 35],
  [49, 91, 7, 12, 55, 78, 88, 95],
]

const Bookings = (props) => {
  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.room)

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Photo</th>
            {workingHours.map((hour) => {
              return <th key={hour}>{hour}</th>
            })}
          </tr>
        </thead>
        {data?.map((room, index) => {
          const { name, capacity, image } = room
          return (
            <tbody key={name + index}>
              <tr>
                <td>
                  <h5>{name}</h5>
                  <p>Holds {capacity}</p>
                </td>
                <td>
                  <img src={image} alt="Room image" className={styles.roomImage} />
                </td>
                {customersPerHour[index].map((numOfCustomers, index) => {
                  return (
                    <td
                      key={room + capacity + numOfCustomers + index}
                      className="m-1"
                      style={
                        numOfCustomers > capacity * 0.9
                          ? { backgroundColor: "#ffa6a6" }
                          : numOfCustomers > capacity * 0.5
                          ? { backgroundColor: "#fed383" }
                          : { backgroundColor: "#96ff96" }
                      }
                    >
                      {numOfCustomers}
                      <div className="mt-1">{capacity - numOfCustomers} avail.</div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          )
        })}
      </Table>
    </div>
  )
}

export default Bookings
