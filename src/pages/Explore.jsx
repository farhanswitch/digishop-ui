// pages/ExplorePage.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import axios from "axios";
import Layout from "../components/Layout";

const ExplorePage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  // Ambil query param 'search' dari URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery =
    searchParams.get("search") == null ? "" : searchParams.get("search");

  useEffect(() => {
    axios
      .get(
        `http://localhost:4777/market/explore-products?search=${encodeURIComponent(
          searchQuery
        )}`
      )
      .then((res) => {
        setProducts(res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, [searchQuery]);

  return (
    <Layout pageTitle={`Hasil Pencarian: ${searchQuery}`}>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">
          Menampilkan hasil untuk:{" "}
          <span className="text-[#8B5E3C]">"{searchQuery}"</span>
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">Produk tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={`http://localhost:4777/file/${product.imagePath}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {product.storeName}
                  </p>
                  <p className="text-green-600 font-bold">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExplorePage;
