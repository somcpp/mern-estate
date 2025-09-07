import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createListing, getUserlistings,deleteUserlisting, updateUserListings,getListing } from "./listApi";

export const initialState = {
  status: "idle",
  userListings: null,
  selectedListing: null,
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

export const getListingAsync = createAsyncThunk(
  "list/getListing",
  async (id , {rejectWithValue}) => {
    try{
      const response = await getListing(id);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
    
  }
);

export const deleteListingAsync = createAsyncThunk(
  "list/deletelisting",
  async (listData , {rejectWithValue}) => {
    try{
      const response = await deleteUserlisting(listData);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
    
  }
);

export const updateUserListingsAsync = createAsyncThunk(
  "list/updateUserListing",
  async (listData , {rejectWithValue}) => {
    try{
      const response = await updateUserListings(listData);
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
      .addCase(deleteListingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteListingAsync.fulfilled, (state, action) => {
        state.status = "idle";
        
      })
      .addCase(deleteListingAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(updateUserListingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserListingsAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateUserListingsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(getListingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getListingAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedListing = action.payload;
      })
      .addCase(getListingAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
  }
})

export const selectUserListings = (state) => state.list.userListings;
export const selectListing = (state) => state.list.selectedListing

export default listSlice.reducer;