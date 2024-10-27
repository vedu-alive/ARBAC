import { removeToken } from "@/utils";
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
        resetToken: (state) => {
            state.token = null;
            state.refreshToken = null;
            removeToken();
        },
    },
});

export const { setToken, setRefreshToken,resetToken } = auth.actions;
export default auth.reducer;