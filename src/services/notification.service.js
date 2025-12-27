import api from "./api";

export const getNotifications = () => {
  return api.get("/market/notifications");
};
