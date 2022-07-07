import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import firebaseClient from "firebase/client"

const initialState = {
  data: [],
  isLoaded: false,
  hasErrors: false,
}

const room = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getData: (state) => {},

    getDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },

    getDataFailure: (state) => {
      state.isLoaded = true
      state.hasErrors = true
    },
  },
})

export const uploadImage = createAsyncThunk("rooms/uploadImage", async (payload) => {
  const file = payload.roomImage
  const roomName = payload.roomName
  const roomCapacity = payload.roomCapacity

  try {
    const fileName = file.name + Date.now()

    firebaseClient
      .storage()
      .ref(`roomImages/${fileName}`)
      .put(file)
      .then(() => {
        firebaseClient.storage().ref(`roomImages/${fileName}`).getDownloadURL()
  .then((url) => {
    try {
      _addNewRoom(roomName, roomCapacity, url)
    } catch (error) {
      console.log(error)
    }
  })
      })
  } catch (error) {
    console.log(error)
  }
})

// export const addNewRoom = createAsyncThunk("rooms/createRoom", async (payload) => {
//   try {
//     await _addNewRoom(payload.roomName, payload.roomCapacity, payload.roomImage)
//   } catch (error) {
//     console.log(error)
//   }
// })

async function _addNewRoom(roomName, roomCapacity, roomImage) {
  const doc = await firebaseClient
    .firestore()
    .collection("rooms")
    .doc(roomName)
    .set({ name: roomName, capacity: roomCapacity, image: roomImage })

  return doc
}

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(getData())

    try {
      const data = await _fetchRooms()
      thunkAPI.dispatch(getDataSuccess(data))
    } catch (error) {
      console.log(error)
    }
  }
)

async function _fetchRooms() {
  const snapshot = await firebaseClient.firestore().collection("rooms").get()

  const allRooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return allRooms
}

export const reducer = room.reducer

export const { getData, getDataSuccess, getDataFailure } = room.actions
