import service from "./axios";

const API_PATH = import.meta.env.VITE_API_PATH;

export const getAllProducts = () => {
  return service({
    url: `/v2/api/${API_PATH}/products/all`,
    method: "get",
  });
};