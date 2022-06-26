import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseClient from "firebase/client";

const initialState = {
  data: [],
  products: [],
  loadingStatus: "idle",
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        const loadedProducts = action.payload.data;
        state.products = state.products.push(loadedProducts);
        console.log(
          "loadedproducts in fetchproducts.fulfilled",
          loadedProducts,
          "loadedProducts:",
          loadedProducts,
          "State.products:",
          state.products
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
        console.log("State in fetchProducts.addcase", state.products);
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        console.log("addNewProduct.fulfilled Payload:", action.payload);
        state.products = [...state.products, action.payload];
        console.log("Product State:", state.products);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        (state.loadingStatus = "failed"), (state.error = action.error.message);
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_) => {
    try {
      const response = await _fetchAllProductsFromDb();
      debugger;
      console.log("response.data in fetchproducts:", response.data);
      console.log("Response var in fetchProducts:", response);
      return response.data;
    } catch (error) {
      error.message;
    }
  }
);

async function _fetchAllProductsFromDb() {
  const productSnapshot = await firebaseClient
    .firestore()
    .collection("products")
    .get();
  const data = productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, ...data };
  });
  debugger;
  console.log("Data var in _fetch", data);
  return data;
}

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (payload) => {
    try {
      await _addNewProduct(
        payload.productName,
        payload.productPrice,
        payload.productPhoto
      );
      return payload;
    } catch (error) {
      console.error("error", error);
    }
  }
);
async function _addNewProduct(productName, productPrice, productPhoto) {
  const doc = await firebaseClient
    .firestore()
    .collection("products")
    .doc(productName)
    .set({ Name: productName, Price: productPrice, Photo: productPhoto });

  return doc;
}

export const savePhoto = createAsyncThunk(
  "products/savePhoto",
  async (payload) => {
    const file = payload.file;

    try {
      const fileName = _appendToFilename(file.name, "_");
      const uploadTask = _updloadFile(fileName, file);

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("progress:", progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => resolve(downloadURL))
              .catch(reject);
          }
        );
      });

      const downloadURL = await uploadPromise;
      console.log("downloadURL: ", downloadURL);
      return downloadURL;
    } catch (error) {
      alert("Error saving photo: " + JSON.stringify(error));
    }
  }
);
function _appendToFilename(filename, string) {
  var dotIndex = filename.lastIndexOf(".");
  if (dotIndex == -1) return filename + string;
  else
    return (
      filename.substring(0, dotIndex) + string + filename.substring(dotIndex)
    );
}

function _updloadFile(fileName, file) {
  const uploadTask = firebaseClient
    .storage()
    .ref(`product-photos/${fileName}`)
    .put(file);

  return uploadTask;
}

export const selectAllProducts = (state) => {
  return state.products;
};
export const selectProductsLoadingStatus = (state) => {
  debugger;
  return state.products.loadingStatus;
};
export const getProductsError = (state) => state.error;
export const {} = productsSlice.actions;
export default productsSlice.reducer;
