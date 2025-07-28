import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import ArrowLeftIcon from "../icons/ArrowLeft";
import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";

export default function DetailProductPage() {
  const { productID } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState("/");

  const token = localStorage.getItem("digishopToken");

  useEffect(() => {
    axios
      .get(`http://localhost:4777/market/product-detail/${productID}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => {
        setResponse({
          statusMsg: "error",
          msgDetails: "Failed to fetch product detail.",
        });
        setShowModal(true);
      });
  }, [productID]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const updated = prev + delta;
      if (updated < 1) return 1;
      if (product && updated > product.amount) return product.amount;
      return updated;
    });
  };

  const handleAddToCart = () => {
    if (!token) {
      setResponse({
        statusMsg: "warning",
        msgDetails: "Session invalid. Please login first.",
      });
      setNextPath("/login");
      setShowModal(true);
      return;
    }

    const payload = {
      productID,
      quantity: quantity,
    };

    axios
      .post("http://localhost:4777/market/cart/submit", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setResponse({
          statusMsg: "success",
          msgDetails: "Product successfully added to cart.",
        });
        setShowModal(true);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Session expired. Please log in again.",
          });
          setNextPath("/login");
        } else {
          setResponse({
            statusMsg: "error",
            msgDetails:
              err.response?.data?.msgDetails ||
              "Failed to add product to cart.",
          });
        }
        setShowModal(true);
      });
  };

  if (!product) return null;

  return (
    <Layout pageTitle="Product Detail">
      {response && (
        <ModalNotif
          showModal={showModal}
          setShowModal={setShowModal}
          response={response}
          nextPath={nextPath}
        />
      )}

      <div className="max-w-5xl mx-auto py-8 px-4 bg-white shadow-lg rounded-lg mt-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeftIcon width={28} color="#734B29" />
          </button>
          <h1 className="text-xl font-bold text-[#422D23]">Detail Product</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={`http://localhost:4777/file/${product.imagePath}`}
            alt={product.name}
            className="w-full h-auto object-cover rounded"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-1">By {product.storeName}</p>
            <p className="text-xl text-green-600 font-semibold mb-4">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <div className="mb-4">
              {product.description.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="text-md  text-blue-800 mb-1">
              Stok tersedia: {product.amount}
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Category: {product.categoryName}
            </p>
            <div className="flex items-center space-x-3 mt-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-lg font-bold border rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-lg font-bold border rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
