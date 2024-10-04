import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/Administration/users";
import administrationService from "./services/Administration/index";

const store = configureStore({
    reducer: {
        users: users.reducer,
        [administrationService.reducerPath]: administrationService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        administrationService.middleware
    ),
});

export default store;