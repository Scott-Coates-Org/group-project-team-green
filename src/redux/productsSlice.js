import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import firebaseClient from "firebase/client"

const initialState = {
  data: [],
  products: [],
  loadingStatus: "idle",
  error: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder){
    builder.addCase(createNewProduct.fulfilled, (state, action)=>{
      state.products=[...state.products, action.payload];
    })
    .addCase(createNewProduct.rejected, (state, action)=> {(state.loadingStatus='failed');
    (state.error= action.error.message)})
  }
})

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (payload) => {
    try {
      await _createNewProduct(
        payload.productName,
        payload.productPrice,
        payload.productPhoto,
        payload.productRoom,
        payload.productDuration
      )
      return payload
    } catch (error) {
      console.error("error", error)
    }
  }
)
async function _createNewProduct(
  productName,
  productPrice,
  productPhoto,
  productRoom,
  productDuration
) {
  const doc = await firebaseClient
    .firestore()
    .collection("products")
    .doc(productName)
    .set({
      Name: productName,
      Price: productPrice,
      Photo: productPhoto,
      Room: productRoom,
      Duration: productDuration,
    })

  return doc
}

export const savePhoto = createAsyncThunk("products/savePhoto", async (payload) => {
  const file = payload.file

  try {
    const fileName = _appendToFilename(file.name, "_")
    const uploadTask = _updloadFile(fileName, file)

    const uploadPromise = new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("progress:", progress)
        },
        (error) => {
          reject(error)
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => resolve(downloadURL))
            .catch(reject)
        }
      )
    })

    const downloadURL = await uploadPromise
    console.log("downloadURL: ", downloadURL)
    return downloadURL
  } catch (error) {
    alert("Error saving photo: " + JSON.stringify(error))
  }
})
function _appendToFilename(filename, string) {
  var dotIndex = filename.lastIndexOf(".")
  if (dotIndex == -1) return filename + string
  else return (filename.substring(0, dotIndex) + string + filename.substring(dotIndex))
}

function _updloadFile(fileName, file) {
  const uploadTask = firebaseClient
    .storage()
    .ref(`product-photos/${fileName}`)
    .put(file)

  return uploadTask
}

export const selectAllProducts = (state) => {
  return state.products
}
export const selectProductsLoadingStatus = (state) => {
  debugger
  return state.products.loadingStatus
}
export const getProductsError = (state) => state.error
export const {} = productsSlice.actions
export default productsSlice.reducer
