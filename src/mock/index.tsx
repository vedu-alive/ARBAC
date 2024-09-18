import SlackIcon from "../assets/slackLogo.svg";
import FigmaIcon from "../assets/figmaLogo.svg";
import ConfluenceIcon from "../assets/conflenceLogo.svg";
import MSOfficeIcon from "../assets/MSOfficeLogo.svg";
import CreateUserIcon from "../assets/createUser.svg";
import InviteUser from "../assets/inviteUser.svg";
import { AppPermissions, Apps, AppStatus, Values } from "../constants/enums";
import { SelectProps } from "antd";
import { appsListType, CardOptionsTypes, SelectedAppTableData } from "../types";

export const appsList: appsListType[] = [
  {
    id: Apps.slack,
    name: "Slack",
    icon: <SlackIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: AppStatus.active,
  },
  {
    id: Apps.figma,
    name: "Figma",
    icon: <FigmaIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: AppStatus.active,
  },
  {
    id: Apps.confluence,
    name: "Confluence",
    icon: <ConfluenceIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: AppStatus.inactive,
  },
  {
    id: Apps.msOffice,
    name: "Microsoft Office 365",
    icon: <MSOfficeIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: AppStatus.inactive,
  },
];

export const manuelPermissions = [
  {
    id: AppPermissions.view,
    name: "View-Only",
  },
  {
    id: AppPermissions.edit,
    name: "Edit",
  },
  {
    id: AppPermissions.approve,
    name: "Approve",
  },
  {
    id: AppPermissions.manage,
    name: "Manage",
  },
  {
    id: AppPermissions.delete,
    name: "Delete",
  },
];

export const cardOptions:CardOptionsTypes[] = [
  {
    id: Values.createType,
    name: "Create user",
    description:
      "Create a new user in your organization.\n This user will have a user name like alice@acme.com.",
    label: "I want to create users in bulk",
    icon: <CreateUserIcon />,
  },
  {
    id: Values.inviteType,
    name: "Invite user",
    description:
      "Invite a guest to collaborate!\nSend an email and they can accept to join.",
    label: "I want to invite users in bulk",
    icon: <InviteUser />,
  },
];

export const departmentOptions: SelectProps["options"] = [
  { label: "UI/UX", value: "UI/UX" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "DevOps", value: "DevOps" },
  { label: "Testing", value: "Testing" },
  { label: "HR Executive", value: "HR Executive" },
  { label: "Finance", value: "Finance" },
  { label: "Management", value: "Management" },
  { label: "Others", value: "Others" },
];

export const inviteGroup: SelectProps["options"] = [
  {label: 'Voyage',value: "voyage"},
  {label: "Platform Nx",value: 'platformNx'},
  {label: "Error Nx",value: 'errorNx'},
  {label: "Engage",value: 'engage'}
];

export const rolesOptions:SelectProps["options"] = [
  { label: "Product Analyst", value: "Product Analyst" },
  { label: "Sr Software Engineer", value: "Sr Software Engineer" },
  { label: "Jr Software Engineer", value: "Jr Software Engineer" },
  { label: "Tech Lead", value: 'techLead' },
  { label: "QA", value: "QA"},
  { label: 'Product Manager', value: "Product Manager" },
  { label: "Product Owner", value: 'Product Owner' },
  { label: 'Content Writer', value: 'Content Writer'},
  { label: "IT-Vendor", value: "IT-Vendor" },
  { label: "Intern", value: "Intern" },
];

export const Icons = {
  slack: <SlackIcon />,
  figma: <FigmaIcon />,
  confluence: <ConfluenceIcon />,
  msOffice: <MSOfficeIcon />,
};

export const selectedApplsTableData:SelectedAppTableData[] = [
      {
        key: Apps.slack,
        application: { name: "Slack", icon: <SlackIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
      {
        key: Apps.figma,
        application: { name: "Figma", icon: <FigmaIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
      {
        key: Apps.confluence,
        application: { name: "Confluence", icon: <ConfluenceIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
      {
        key: Apps.msOffice,
        application: { name: "Microsoft Office 365", icon: <MSOfficeIcon /> },
        attachedPolicy: "Default",
        permissions: ["View-Only", "Edit"],
      },
];