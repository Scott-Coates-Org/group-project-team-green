import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseClient from "firebase/client";

const initialState = {
  data: [],
  addOns: [],
  loadingStatus: "idle",
  error: null,
};
const addOnsSlice = createSlice({
  name: "addOns",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchaddOns.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchaddOns.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        const loadedaddOns = action.payload.data;
        state.addOns = state.addOns.push(loadedaddOns);
        console.log(
          "loadedaddOns in fetchaddOns.fulfilled",
          loadedaddOns,
          "loadedaddOns:",
          loadedaddOns,
          "State.addOns:",
          state.addOns
        );
      })
      .addCase(fetchaddOns.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.error.message;
        console.log("State in fetchaddOns.addcase", state.addOns);
      })
      .addCase(addNewAddOn.fulfilled, (state, action) => {
        state.addOns = [...state.addOns, action.payload];
      })
      .addCase(addNewAddOn.rejected, (state, action) => {
        (state.loadingStatus = "failed"), (state.error = action.error.message);
      });
  },
});

export const fetchaddOns = createAsyncThunk("addOns/fetchaddOns", async (_) => {
  try {
    const response = await _fetchAlladdOnsFromDb();
    debugger;
    console.log("response.data in fetchaddOns:", response.data);
    console.log("Response var in fetchaddOns:", response);
    return response.data;
  } catch (error) {
    error.message;
  }
});

async function _fetchAlladdOnsFromDb() {
  constaddOntSnapshot = await firebaseClient
    .firestore()
    .collection("addOns")
    .get();
  const data = addOnSnapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, ...data };
  });
  debugger;
  console.log("Data var in _fetch", data);
  return data;
}

export const addNewAddOn = createAsyncThunk(
  "addOns/addNewAddOn",
  async (payload) => {
    try {
      await _addNewAddOn(
        payload.addOnName,
        payload.addOnPrice,
        payload.addOnPhoto
      );
      return payload;
    } catch (error) {
      console.error("error", error);
    }
  }
);
async function _addNewAddOn(addOnName, addOnPrice, addOnPhoto) {
  const doc = await firebaseClient
    .firestore()
    .collection("addOns")
    .doc(addOnName)
    .set({ Name: addOnName, Price: addOnPrice, Photo: addOnPhoto });

  return doc;
}

export const savePhoto = createAsyncThunk(
  "addOns/savePhoto",
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
    .ref(`addOn-photos/${fileName}`)
    .put(file);

  return uploadTask;
}

export const selectAlladdOns = (state) => {
  return state.addOns;
};
export const selectaddOnsLoadingStatus = (state) => {
  debugger;
  return state.addOns.loadingStatus;
};
export const getaddOnsError = (state) => state.error;
export const {} = addOnsSlice.actions;
export default addOnsSlice.reducer;
