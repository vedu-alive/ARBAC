import { Key } from "react";
import { AppPermissions, AppStatus, Values } from "../constants/enums";
import store from "@/redux/store";


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
  id: Key;
  account: accountType;
  role: string;
  designation: string;
  applications: string[];
  groups: string[];
  createdOn: string;
};

export type CardOptionsTypes = {
    id: Values.createType | Values.inviteType,
    name: string,
    description: string,
    label: string,
    icon: JSX.Element,
}

export type SelectedAppTableData = {
    key: Key,
    application: { icon: JSX.Element, name: string },
    attachedPolicy: string,
    permissions: AppPermissions[],
}

export type appsListType = {
    id: Key,
    name: string,
    icon: JSX.Element,
    description: string,
    status: AppStatus.active | AppStatus.inactive | AppStatus.all,
}