import { PayloadAction } from "@reduxjs/toolkit"
import { roleAndPermission, SelectedAppTableData, Users } from "@/types"

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
const savedApplications: SelectedAppTableData[] = []

export const initialState = {
    userDetails: userDetails,
    permission: permission,
    savedApplications,

}
export const reducers = {
    setUserDetails: (state: typeof initialState, action: PayloadAction<Users>) => {
        state.userDetails = action.payload; return state;
    },
    setPermissions: (state: typeof initialState, action: PayloadAction<roleAndPermission>) => {
        state.permission = action.payload; return state;
    },
    setSavedApplications: (state: typeof initialState, action: PayloadAction<SelectedAppTableData[]>) => {
        state.savedApplications = action.payload; return state;
    },
    reset: ((state: typeof initialState) => {
        state = { ...state, userDetails, permission, };
        return state;
    }),
}