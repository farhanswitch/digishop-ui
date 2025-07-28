// pages/Cart.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState({ status: "", message: "" });
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("digishopToken");
    if (!storedToken) {
      setResponse({
        status: "warning",
        message: "Sesi tidak valid. Silakan login terlebih dahulu.",
      });
      setShowModal(true);
      setNextPath("/login");
      return;
    }

    setToken(storedToken);

    axios
      .get("http://localhost:4777/market/cart", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        setCartItems(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setResponse({
          status: "error",
          message: "Gagal memuat data keranjang.",
        });
        setShowModal(true);
      });
  }, []);

  const updateQuantity = (productID, quantityChange) => {
    axios
      .post(
        "http://localhost:4777/market/cart/submit",
        {
          productID,
          quantity: quantityChange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Refresh cart
        return axios.get("http://localhost:4777/market/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => {
        setCartItems(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setResponse({
          status: "error",
          message: "Gagal memperbarui keranjang.",
        });
        setShowModal(true);
      });
  };

  return (
    <Layout pageTitle="Keranjang Belanja">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Keranjang Kamu</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Keranjang kamu masih kosong.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productID}
                className="flex gap-4 items-center bg-white p-4 shadow rounded"
              >
                <img
                  src={`http://localhost:4777/file/${item.productImagePath}`}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.productName}</h2>
                  <p className="text-gray-500">{item.storeName}</p>
                  <p className="text-green-600 font-bold">
                    Rp {item.productPrice.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        item.cartQuantity > 0 &&
                        updateQuantity(item.productID, -1)
                      }
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4">{item.cartQuantity}</span>
                    <button
                      onClick={() =>
                        item.cartQuantity < item.productAmount &&
                        updateQuantity(item.productID, 1)
                      }
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <span className="ml-4 text-sm text-gray-500">
                      Stok: {item.productAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length !== 0 && (
        <div className="max-w-4xl mx-auto px-4 mt-6 text-right">
          <Link
            to="/checkout"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Checkout
          </Link>
        </div>
      )}

      <ModalNotif
        showModal={showModal}
        setShowModal={setShowModal}
        response={response}
        setResponse={setResponse}
        nextPath={nextPath}
      />
    </Layout>
  );
};

export default CartPage;
