import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (updatedUserData) => {
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUserData.id}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (delid) => {
  try{
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${delid}`)
    return delid;
  }catch(error){
    throw error;
  }
} )

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending,(state,action) => {
        state.loading= false
      })
      .addCase(deleteUser.fulfilled, (state,action) => {
        state.loading = false;
        const userid = action.payload;
        state.users = state.users.filter((user) => user.id !== userid)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
