import api from "./api";

export const getCartItems = () => {
  return api.get("/market/cart");
};

export const updateCartItem = (productID, quantity) => {
  return api.post("/market/cart/submit", {
    productID,
    quantity,
  });
};
