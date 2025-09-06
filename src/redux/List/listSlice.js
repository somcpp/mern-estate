import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createListing, getUserlistings } from "./listApi";

const initialState = {
  status: "idle",
  userListings: null,
  error: null
};

export const createListingAsync = createAsyncThunk(
  "list/createlist",
  async (userData , {rejectWithValue}) => {
    try{
      const response = await createListing(userData);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
    
  }
);

export const getUserListingsAsync = createAsyncThunk(
  "list/getlistings",
  async (id , {rejectWithValue}) => {
    try{
      const response = await getUserlistings(id);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
    
  }
);


export const listSlice = createSlice({
  name: "list",
  initialState,   // ✅ fixed spelling
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createListingAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createListingAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(getUserListingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserListingsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userListings = action.payload;
      })
      .addCase(getUserListingsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
  }
})

export const selectUserListings = (state) => state.list.userListings;

export default listSlice.reducer;