import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, deleteUser, google, updateUser } from "./authApi";

const initialState = {
  status: "idle",
  value: 0,
  loggedInUser: null,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (userData, {rejectWithValue}) => {
    try{
      const response = await checkUser(userData);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const googleAsync = createAsyncThunk(
  "user/google",
  async (userData, {rejectWithValue}) => {
    try{
      const response = await google(userData);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/update",
  async ({userData,id}, {rejectWithValue}) => {
    try{
      const response = await updateUser(userData,id);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/delete",
  async (id, {rejectWithValue}) => {
    try{
      const response = await deleteUser(id);
      return response.data;
    }catch(error){
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,   // ✅ fixed spelling
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    signout: (state) => {
      state.loggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(googleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(googleAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
  },
});

export const selectLoggedInUser = (state) => state.user; // ✅ fixed
export const selectUserInfo = (state) => state.user.loggedInUser; // ✅ fixed
export const {signout} = userSlice.actions;
export default userSlice.reducer;
