import api from "./api";

export const uploadProductImage = (formData) => {
  return api.post("/file/product-photo/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
