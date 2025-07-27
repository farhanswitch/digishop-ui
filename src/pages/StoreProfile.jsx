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

  const token = localStorage.getItem("digishopToken");

  useEffect(() => {
    if (!token) {
      setResponse({
        statusMsg: "warning",
        msgDetails: "You’re not logged in yet! Please log in first.",
      });
      setNextPath("/login");
      setShowModal(true);
      return;
    } else {
      axios
        .get("http://localhost:4777/store", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          RefreshTokenUtility(res);

          if (res.status === 200 && res.data?.data) {
            setStore({
              name: res.data.data.name,
              address: res.data.data.address,
            });
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setResponse({
              statusMsg: "warning",
              msgDetails: "Your session is not valid! Please log in again.",
            });
            setShowModal(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [navigate, token]);

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    axios
      .put(
        "http://localhost:4777/store",
        { ...store },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setResponse({
            statusMsg: "Success",
            msgDetails: "Store profile updated successfully.",
          });
          setNextPath("/seller/store-profile");
        } else {
          setResponse({
            statusMsg: "Error",
            msgDetails: "Unexpected error. Please try again.",
          });
          setNextPath("/seller/store-profile");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Your session is not valid! Please log in again.",
          });
          setShowModal(true);
          return;
        }
        setResponse({
          statusMsg: "Error",
          msgDetails:
            err.response?.data?.msgDetails || "Failed to update store profile.",
        });
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
