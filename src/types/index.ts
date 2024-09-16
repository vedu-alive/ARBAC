import { Key } from "react";
import { Values } from "../constants/enums";
import store from "../redux/store";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Users={
    createType: Values.createType | Values.inviteType | null;
    department: string;
    name: string;
    jobTitle: string;
    password: string;
    confirmPassword: string;
}

export type roleAndPermission = {
    group: string[] | null,
    role: string,
    application: string[] | null,
}

export type accountType = {
    avatar: string;
    name: string;
    email: string;
}
export type userTableType = {
    key: Key,
    account: accountType,
    role: string,
    designation: string,
    permissions: string[],
    groups: string[],
    created: string,
}

export type CardOptionsTypes = {
    id: Values.createType | Values.inviteType,
    name: string,
    description: string,
    label: string,
    icon: JSX.Element,
}