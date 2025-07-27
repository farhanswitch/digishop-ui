import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Layout from "../components/Layout";
import SellerNav from "../components/SellerNav";
import ModalNotif from "../components/ModalNotif";
import ModalConfirm from "../components/ModalConfirm";
import RefreshTokenUtility from "../utilities/auth/xrf";

export default function SellerProductsPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("digishopToken");

  const [products, setProducts] = useState([]);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationRows, setPaginationRows] = useState(10);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState("/login");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [sortField, setSortField] = useState("amount");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (!token) {
      setResponse({
        statusMsg: "warning",
        msgDetails: "You’re not logged in yet! Please log in first.",
      });
      setShowModal(true);
      return;
    }

    fetchProducts();
  }, [paginationPage, paginationRows, sortField, sortOrder]);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:4777/store/products?paginationPage=${paginationPage}&paginationRows=${paginationRows}&sortOrder=${sortOrder}&sortField=${sortField}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        RefreshTokenUtility(res);
        if (res.status === 200 && res.data?.data) {
          setProducts(res.data.data);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Your session is not valid! Please log in again.",
          });
          setShowModal(true);
        } else {
          const arrErrors = [];
          if (error.response?.data?.errors) {
            for (const [key, val] of Object.entries(
              error.response.data.errors
            )) {
              arrErrors.push({ msg: `${key}: ${val}` });
            }
          } else if (error?.response?.data?.message) {
            arrErrors.push({ msg: error.response.data.message });
          }
          setNextPath("/");
          setResponse({
            statusMsg: "Error",
            errors: arrErrors,
          });
          setShowModal(true);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (productId) => {
    setLoading(true);
    axios
      .delete(`http://localhost:4777/store/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        RefreshTokenUtility(res);
        setResponse({
          statusMsg: "success",
          msgDetails: "Produk berhasil dihapus.",
        });
        setNextPath("/seller/products");
        setShowModal(true);
        fetchProducts(); // refresh data
      })
      .catch((error) => {
        const arrErrors = [];
        if (error.response?.status === 401) {
          setResponse({
            statusMsg: "warning",
            msgDetails: "Session expired. Silakan login ulang.",
          });
          setShowModal(true);
          return;
        }

        if (error.response?.data?.errors) {
          for (const [key, val] of Object.entries(error.response.data.errors)) {
            arrErrors.push({ msg: `${key}: ${val}` });
          }
        } else if (error?.response?.data?.message) {
          arrErrors.push({ msg: error.response.data.message });
        }
        setNextPath("/");
        setResponse({
          statusMsg: "Error",
          errors: arrErrors,
        });
        setShowModal(true);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <Layout pageTitle="Seller Products">
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
          <h2 className="text-2xl font-semibold mb-4">Your Products</h2>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div>
              <label className="font-medium mr-2">Sort by:</label>
              <select
                className="border px-2 py-1 rounded"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="ca-name">Category</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="name">Product Name</option>
                <option value="price">Product Price</option>
                <option value="amount">Product Stock</option>
              </select>
            </div>
            <div>
              <label className="font-medium mr-2">Order:</label>
              <select
                className="border px-2 py-1 rounded"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Products</h2>
            <button
              onClick={() => navigate("/seller/product/add")}
              className="bg-[#34C759] hover:bg-[#28a745] text-white font-medium py-2 px-4 rounded"
            >
              + Add Product
            </button>
          </div>
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.categoryName}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">
                    Rp {product.price.toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{product.amount}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-1 px-3 rounded"
                      onClick={() => navigate(`/seller/product/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-6">
            <div>
              <label className="mr-2 font-medium">Rows per page:</label>
              <select
                value={paginationRows}
                onChange={(e) => setPaginationRows(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  paginationPage > 1 && setPaginationPage(paginationPage - 1)
                }
                disabled={paginationPage === 1}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                ◀
              </button>
              <span className="font-medium">Page {paginationPage}</span>
              <button
                onClick={() => setPaginationPage(paginationPage + 1)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        show={showDeleteConfirm}
        setShow={setShowDeleteConfirm}
        message={`Yakin ingin menghapus produk "${selectedProduct?.name}"?`}
        onConfirm={() => handleDelete(selectedProduct?.id)}
      />
    </Layout>
  );
}
