import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/Administration/users";

const store = configureStore({
    reducer: {
        users: users.reducer,
    },
});

export default store;