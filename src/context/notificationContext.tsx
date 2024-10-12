// NotificationContext.tsx
import React, { createContext, useContext } from "react";
import { NotificationType } from "@/types";
import { ArgsProps } from "antd/es/notification";
import { notification } from "antd";

type NotificationContextType = {
  openNotificationWithIcon: (type: NotificationType, props: ArgsProps) => void;
  contextHolder: React.ReactNode;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    props: ArgsProps
  ) => {
    api[type](props);
  };

  return (
    <NotificationContext.Provider
      value={{ openNotificationWithIcon, contextHolder }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
