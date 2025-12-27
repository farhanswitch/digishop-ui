import api from "./api";

export const getCategories = () => {
  return api.get("/market/categories");
};

export const getProductsByCategory = (categoryID) => {
  return api.get(`/market/products-by-category?categoryID=${categoryID}`);
};

export const searchProducts = (searchQuery) => {
  return api.get(
    `/market/explore-products?search=${encodeURIComponent(searchQuery)}`
  );
};

export const getProductDetail = (productID) => {
  return api.get(`/market/product-detail/${productID}`);
};
