import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import AboutPage from "./pages/About.jsx";
import FAQPage from "./pages/FAQ.jsx";
import HelpPage from "./pages/Help.jsx";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import MenuPage from "./pages/Menu.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicy.jsx";
import RegisterPage from "./pages/Register.jsx";
import SellerAddProductPage from "./pages/StoreAddProduct.jsx";
import SellerEditProductPage from "./pages/StoreEditProduct.jsx";
import SellerStoreProfilePage from "./pages/StoreProfile.jsx";
import SellerProductsPage from "./pages/StoreProducts.jsx";
import ProductDetailPage from "./pages/ProductDetail.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/menu" element={<MenuPage />}></Route>
        <Route path="/help" element={<HelpPage />}></Route>
        <Route path="/about-us" element={<AboutPage />}></Route>
        <Route path="/faq" element={<FAQPage />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />}></Route>
        <Route
          path="/product/:productID"
          element={<ProductDetailPage />}
        ></Route>
        <Route
          path="/seller/store-profile"
          element={<SellerStoreProfilePage />}
        />
        <Route path="/seller/products" element={<SellerProductsPage />} />
        <Route path="/seller/product/add" element={<SellerAddProductPage />} />
        <Route path="/seller/product/:id" element={<SellerEditProductPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
