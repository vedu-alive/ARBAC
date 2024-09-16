import SlackIcon from "../assets/slackLogo.svg";
import FigmaIcon from "../assets/figmaLogo.svg";
import ConfluenceIcon from "../assets/conflenceLogo.svg";
import MSOfficeIcon from "../assets/MSOfficeLogo.svg";
import CreateUserIcon from "../assets/createUser.svg";
import InviteUser from "../assets/inviteUser.svg";
import { Values } from "../constants/enums";
import { SelectProps } from "antd";
import { CardOptionsTypes } from "../types";

export const apps = [
  {
    id: "app1",
    name: "Slack",
    icon: <SlackIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Active",
  },
  {
    id: "app2",
    name: "Figma",
    icon: <FigmaIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Active",
  },
  {
    id: "app3",
    name: "Confluence",
    icon: <ConfluenceIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Inactive",
  },
  {
    id: "app4",
    name: "Microsoft Office 365",
    icon: <MSOfficeIcon />,
    description:
      "Collaborate seamlessly with Slack. Share files, make calls, and stay organized with threaded conversations and custom notifications - anywhere.",
    status: "Inactive",
  },
];

export const manuelPermissions = [
  {
    id: "view",
    name: "View-Only",
  },
  {
    id: "edit",
    name: "Edit",
  },
  {
    id: "approve",
    name: "Approve",
  },
  {
    id: "manage",
    name: "Manage",
  },
  {
    id: "delete",
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