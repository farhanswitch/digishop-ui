// pages/CheckoutPage.jsx
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState({ status: "", message: "" });
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  // const navigate = useNavigate();

  const shippingCost = 15000;

  useEffect(() => {
    const storedToken = localStorage.getItem("digishopToken");
    if (!storedToken) {
      setResponse({
        statusMsg: "warning",
        msgDetails: "Sesi tidak valid. Silakan login terlebih dahulu.",
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
          statusMsg: "error",
          msgDetails: "Gagal memuat data keranjang.",
        });
        setShowModal(true);
      });
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.cartQuantity * item.productPrice,
    0
  );

  const handleCheckout = () => {
    const data = {
      totalHargaProduk: totalPrice,
      ongkosKirim: shippingCost,
      totalPembayaran: totalPrice + shippingCost,
      alamat: selectedAddress,
      metodePembayaran: paymentMethod,
    };
    console.log("Data Checkout:", data);
  };

  return (
    <Layout pageTitle="Checkout">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Keranjang kamu kosong.</p>
        ) : (
          <>
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
                    <h2 className="font-semibold text-lg">
                      {item.productName}
                    </h2>
                    <p className="text-gray-500">{item.storeName}</p>
                    <p className="text-green-600 font-bold">
                      Rp {item.productPrice.toLocaleString("id-ID")}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Jumlah: {item.cartQuantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Alamat Pengiriman */}
            <div>
              <h2 className="font-semibold mb-2">Alamat Pengiriman</h2>
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">Pilih Alamat</option>
                <option value="Jl. Lodan Timur No. 7, Ancol, Jakarta Utara (Home)">
                  Jl. Lodan Timur No. 7, Ancol (Home)
                </option>
                <option value="Jl. Pantai Indah, Ancol, Jakarta Utara (Office)">
                  Jl. Pantai Indah, Ancol (Office)
                </option>
                <option value="Jl. Marina Raya, Ancol, Jakarta Utara">
                  Jl. Marina Raya, Ancol
                </option>
              </select>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <h2 className="font-semibold mb-2">Metode Pembayaran</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Transfer Bank"
                    checked={paymentMethod === "Transfer Bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Transfer Bank
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Digital Wallet"
                    checked={paymentMethod === "Digital Wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  e-Wallet
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Rangkuman Biaya */}
            <div className="bg-gray-100 p-4 rounded space-y-2 text-left">
              <p className="text-lg">
                Total Harga Produk:{" "}
                <span className="font-semibold">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </p>
              <p className="text-lg">
                Biaya Pengiriman:{" "}
                <span className="font-semibold">
                  Rp {shippingCost.toLocaleString("id-ID")}
                </span>
              </p>
              <hr />
              <p className="text-xl font-bold">
                Total Bayar: Rp{" "}
                {(totalPrice + shippingCost).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="text-right">
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Bayar
              </button>
            </div>
          </>
        )}
      </div>

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

export default CheckoutPage;
