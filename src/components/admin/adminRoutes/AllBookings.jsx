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
              </tr>
            </tbody>
          )
        })}
      </Table>
    </div>
  )
}

export default Bookings
