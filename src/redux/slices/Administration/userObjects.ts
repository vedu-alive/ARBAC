import { PayloadAction } from "@reduxjs/toolkit"
import { roleAndPermission, Users } from "../../../types"

const userDetails: Users = {
    createType: null,
    department: "",
    name: "",
    jobTitle: "",
    password: "",
    confirmPassword: ""
}
const permission: roleAndPermission = {
    group: null,
    role: "",
    application: [],
}

export const initialState = {
    userDetails: userDetails,
    permission: permission,

}
export const reducers = {
    setUserDetails: (state: typeof initialState, action: PayloadAction<Users>) => {
        state.userDetails = action.payload; return state;
    },
    setPermissions: (state: typeof initialState, action: PayloadAction<roleAndPermission>) => {
        state.permission = action.payload; return state;
    },
    reset: ((state: typeof initialState) => {
        state = { userDetails, permission }; return state;
    })
}