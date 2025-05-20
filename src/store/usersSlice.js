import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RepositoryFactory } from "@/repositories/repository-factory";

const usersApi = RepositoryFactory.get("users");

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        const response = await usersApi.getListUser();
        return response.data;
    }
);

const usersSlice = createSlice({
    name: 'users',

    initialState: {
        listUser: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.listUser = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default usersSlice.reducer;