export enum Values {
    createType = "create",
    inviteType = "invite",
}

export enum AppPermissions {
    view = "view",
    edit = "edit",
    approve = "approve",
    manage = "manage",
    delete = "delete",
}

export enum AppStatus {
    active = "Active",
    inactive = "Inactive",
    all = "All",
}

export enum Apps {
    slack = "slack",
    figma = "figma",
    confluence = "confluence",
    msOffice = "msOffice",
    hubspot = "hubspot",
    adobe = "azure",
    github = "github",

}

export enum globalConstants {
    token = "RBAC_access_token",
}

export enum paths {
    home = "/",
    dashboard = "/dashboard",
    settings = "/settings",
    login = "/login",
    signup = "/signup",
    appManagement = "/app-management",
    policyManagement = "/policy-management",
    identityProviders = "/identity-providers",
    credentialsReports = "/credentials-reports",
    identityGovernance = "/identity-governance",
    roleAdministration = "/role-administration",
    newUser = "new-user",
}