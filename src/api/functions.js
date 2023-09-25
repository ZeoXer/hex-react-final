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

export const checkToken = () => {
  return service({
    url: "/v2/api/user/check",
    method: "post",
  });
};

export const getAdminProducts = () => {
  return service({
    url: `/v2/api/${API_PATH}/admin/products`,
    method: "get",
  });
};

export const getAdminAllProducts = () => {
  return service({
    url: `/v2/api/${API_PATH}/admin/products/all`,
    method: "get",
  });
};

export const addNewProduct = (product) => {
  return service({
    url: `/v2/api/${API_PATH}/admin/product`,
    method: "post",
    data: {
      data: product,
    },
  });
};

export const editProductById = (id, product) => {
  return service({
    url: `/v2/api/${API_PATH}/admin/product/${id}`,
    method: "put",
    data: {
      data: product,
    },
  });
};
