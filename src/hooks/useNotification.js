import { useContext } from "react";
import { NotificationContext } from './../contexts/notificationContext';

const useNotification = () => {
    const showNotification = useContext(NotificationContext)
    if (!showNotification) {
        throw new Error("No notification");
    }
    return showNotification;
}

export default useNotification;
