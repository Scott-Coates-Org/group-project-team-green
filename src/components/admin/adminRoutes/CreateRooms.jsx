import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { addNewRoom, uploadImage } from "redux/rooms"

const CreateRooms = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [image, setImage] = useState(null)

  const submitFormHandler = (e) => {
    e.preventDefault()

    if (!name || !capacity || !image) {
      alert("please fill in all the forms")
      return
    }

    dispatch(uploadImage({roomImage:image, roomName: name, roomCapacity:capacity}))

    alert("Room created successfully")
    setName("")
    setCapacity("")
    setImage(null)
  }

  return (
    <div>
      <Form className="p-3 m-3 border border-primary" onSubmit={submitFormHandler}>
        <FormGroup>
          <Label for="name">Room Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="capacity">Room Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Room Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Save Room
        </Button>
      </Form>
    </div>
  )
}

export default CreateRooms
