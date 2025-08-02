import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import ModalNotif from "../components/ModalNotif";
import Layout from "../components/Layout";
import RefreshTokenUtility from "../utilities/auth/xrf";
import SellerNav from "../components/SellerNav";

export default function SellerStoreProfilePage() {
  const navigate = useNavigate();
  const [store, setStore] = useState({ name: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [nextPath, setNextPath] = useState("/login");
  const [hasExistingData, setHasExistingData] = useState(false);

  const token = localStorage.getItem("digishopToken");

  useEffect(() => {
    console.log({ token });

    if (!token) {
      setLoading(false);

      setResponse({
        statusMsg: "warning",
        msgDetails: "Sesi tidak valid! Silakan login terlebih dahulu.",
      });
      setNextPath("/login");
      setShowModal(true);
      return;
    }

    axios
      .get("http://localhost:4777/store", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        RefreshTokenUtility(res);
        if (res.status === 200 && res.data?.data) {
          const { name, address } = res.data.data;
          if (name || address) {
            setHasExistingData(true);
            setStore({ name, address });
          }
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Sesi tidak valid! Silakan login ulang.",
          });
          setShowModal(true);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate, token]);

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    const url = "http://localhost:4777/store";
    const method = hasExistingData ? axios.put : axios.post;

    method(
      url,
      { ...store },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setResponse({
            statusMsg: "Success",
            msgDetails: hasExistingData
              ? "Profil toko berhasil diperbarui."
              : "Profil toko berhasil disimpan.",
          });
          setNextPath("/seller/store-profile");
        } else {
          setResponse({
            statusMsg: "Error",
            msgDetails: "Terjadi kesalahan. Silakan coba lagi.",
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Sesi tidak valid! Silakan login ulang.",
          });
          setNextPath("/login");
        } else {
          setResponse({
            statusMsg: "Error",
            msgDetails:
              err.response?.data?.msgDetails ||
              "Gagal menyimpan data profil toko.",
          });
        }
      })
      .finally(() => {
        setShowModal(true);
        setUpdating(false);
      });
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <Layout pageTitle="Store Profile">
      <div className="min-h-screen bg-gray-50">
        {response && (
          <ModalNotif
            showModal={showModal}
            setShowModal={setShowModal}
            response={response}
            nextPath={nextPath}
          />
        )}
        <SellerNav />
        <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Store Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Store Name</label>
              <input
                type="text"
                name="name"
                value={store.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={store.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={updating}
              className="bg-[rgb(76,217,100)] hover:bg-[rgb(67,134,78)] text-white px-6 py-2 rounded-md"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
