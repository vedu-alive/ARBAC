import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/Administration/users";
import administrationService from "./services/Administration";
import authenticationService from './services/authentication';
import auth from './slices/authentication'

const store = configureStore({
    reducer: {
        users: users,
        auth: auth,
        [administrationService.reducerPath]: administrationService.reducer,
        [authenticationService.reducerPath]: authenticationService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        administrationService.middleware,
        authenticationService.middleware
    ),
});

export default store;