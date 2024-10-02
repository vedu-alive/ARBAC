import { createSlice } from "@reduxjs/toolkit";
import { initialState, reducers } from "./userObjects";
import { RootState } from "@/types";


const users = createSlice({
  name: "users",
  initialState: initialState,
  reducers: reducers,
});

export const { setUserDetails,setPermissions,reset } = users.actions;
export const usersData = (state: RootState) => state.users;
export default users;