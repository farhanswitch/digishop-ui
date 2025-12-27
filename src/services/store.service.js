import api from "./api";

export const getSellerProducts = (page, rows, sortOrder, sortField) => {
  return api.get(
    `/store/products?paginationPage=${page}&paginationRows=${rows}&sortOrder=${sortOrder}&sortField=${sortField}`
  );
};

export const deleteProduct = (productID) => {
  return api.delete(`/store/product/${productID}`);
};

export const addProduct = (data) => {
  return api.post("/store/product", data);
};

export const updateProduct = (data) => {
  return api.put("/store/product", data);
};

export const getProductById = (id) => {
  return api.get(`/store/product/${id}`);
};

export const getStoreProfile = () => {
  return api.get("/store");
};

export const createStoreProfile = (data) => {
  return api.post("/store", data);
};

export const updateStoreProfile = (data) => {
  return api.put("/store", data);
};
