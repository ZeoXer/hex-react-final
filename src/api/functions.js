import service from "./axios";

const API_PATH = import.meta.env.VITE_API_PATH;

export const signIn = (data) => {
  return service({
    url: "/v2/admin/signin",
    method: "post",
    data,
  });
};

export const setAuthToken = (token) => {
  service.defaults.headers.common["Authorization"] = token;
};

export const getAllProducts = () => {
  return service({
    url: `/v2/api/${API_PATH}/products/all`,
    method: "get",
  });
};
