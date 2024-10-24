import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name: "auth",
    initialState: {
        token: null,
        refreshToken: null,

    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        reset: (state) => {
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { setToken, setRefreshToken, reset } = auth.actions;
export default auth.reducer;