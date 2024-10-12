import { NotificationType } from "@/types";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (
      type: NotificationType,
      props: ArgsProps
    ) => {
      api[type]({...props});
    };
    return { openNotificationWithIcon, contextHolder };
}
export { useNotification };