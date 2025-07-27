import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import ArrowLeftIcon from "../icons/ArrowLeft";
import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";
import SellerNav from "../components/SellerNav";
import RefreshTokenUtility from "../utilities/auth/xrf";

export default function SellerAddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    amount: "",
    categoryID: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageID, setImageID] = useState(null);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState("/login");

  const token = localStorage.getItem("digishopToken");

  useEffect(() => {
    if (!token) {
      setResponse({
        statusMsg: "warning",
        msgDetails: "You're not logged in yet! Please log in first.",
      });
      setShowModal(true);
      setNextPath("/login");
      return;
    }

    axios
      .get("http://localhost:4777/market/categories")
      .then((res) => setCategories(res.data.data))
      .catch(() => {
        setResponse({
          statusMsg: "error",
          msgDetails: "Failed to fetch categories",
        });
        setShowModal(true);
      });
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Invalid file type.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB.");
      return;
    }

    setUploading(true);
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:4777/file/product-photo/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setImageID(res.data.id);
      })
      .catch(() => {
        setResponse({
          statusMsg: "error",
          msgDetails: "Failed to upload image.",
        });
        setShowModal(true);
      })
      .finally(() => setUploading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageID) {
      setResponse({
        statusMsg: "warning",
        msgDetails: "Please upload an image before submitting.",
      });
      setShowModal(true);
      return;
    }

    setSubmitting(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      amount: parseInt(form.amount),
      imageID,
    };

    axios
      .post("http://localhost:4777/store/product", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        RefreshTokenUtility(res);
        if (res.status === 201) {
          setResponse({
            statusMsg: "success",
            msgDetails: "Product added successfully.",
          });
          setNextPath("/seller/products");
        } else {
          setResponse({
            statusMsg: "error",
            msgDetails: "Unexpected error occurred.",
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Your session is not valid! Please log in again.",
          });
          setNextPath("/login");
        } else {
          setResponse({
            statusMsg: "error",
            msgDetails:
              err.response?.data?.msgDetails || "Failed to add product.",
          });
        }
      })
      .finally(() => {
        setShowModal(true);
        setSubmitting(false);
      });
  };

  return (
    <Layout pageTitle="Add Product">
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
          <div className="flex items-center mb-6">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeftIcon width={28} color="#734B29" />
            </button>
            <h1 className="text-xl font-bold text-[#422D23]">Add Product</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Stock</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="categoryID"
                value={form.categoryID}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Product Image</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageUpload}
                className="mb-2"
              />
              {uploading && <p>Uploading...</p>}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 rounded shadow"
                />
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[rgb(76,217,100)] hover:bg-[rgb(67,134,78)] text-white px-6 py-2 rounded-md"
            >
              {submitting ? "Submitting..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
