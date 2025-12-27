import api from "./api";

export const loginUser = (data) => {
  return api.post("/user/login", data);
};

export const registerUser = (data) => {
  return api.post("/user/register", data);
};
