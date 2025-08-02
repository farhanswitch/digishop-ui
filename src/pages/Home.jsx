import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router";
import Layout from "../components/Layout";
import axios from "axios";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4777/market/categories")
      .then((res) => {
        setCategories(res.data.data);
        if (res.data.data.length > 0) {
          setSelectedCategoryID(res.data.data[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategoryID) {
      axios
        .get(
          `http://localhost:4777/market/products-by-category?categoryID=${selectedCategoryID}`
        )
        .then((res) => setProducts(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [selectedCategoryID]);

  return (
    <Layout pageTitle="Beranda - EcoLestari">
      <main className="w-full bg-white" role="main">
        <section
          aria-label="Hero"
          className="rounded-xl mx-auto max-w-5xl overflow-hidden mb-8 mt-6"
          style={{
            backgroundImage: `url('http://localhost:4777/file/1753673010--01984f0e-8c79-7816-8db8-5f1c44815daf.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="bg-black/20 text-white text-center px-8 py-6 rounded-lg max-w-5xl">
            <h1 className="text-3xl font-bold mb-2">
              Temukan Produk dengan Gaya Anda
            </h1>
            <p className="mb-4">
              Berbagai koleksi terbaru ramah lingkungan. Dukung produk lokal dan
              tetap peduli dengan bumi
            </p>
            <Link
              to="/explore"
              className="bg-yellow-700 hover:bg-yellow-800 text-white py-2 px-4 rounded"
              aria-label="Jelajahi koleksi produk"
            >
              Jelajahi Koleksi
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="produk-heading"
          className="max-w-5xl mx-auto px-4 pb-8"
        >
          <h2
            id="produk-heading"
            className="text-xl font-bold text-center mb-4"
          >
            Kategori Populer
          </h2>
          <div
            className="flex flex-wrap justify-center gap-3 mb-8"
            role="tablist"
            aria-label="Kategori Produk"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`tab-${cat.id}`}
                role="tab"
                aria-selected={selectedCategoryID === cat.id}
                aria-controls={`tabpanel-${cat.id}`}
                onClick={() => setSelectedCategoryID(cat.id)}
                className={`px-5 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selectedCategoryID === cat.id
                    ? "bg-[#8B5E3C] text-white font-semibold"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <section
            id={`tabpanel-${selectedCategoryID}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedCategoryID}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white shadow rounded-lg overflow-hidden"
                aria-label={`Lihat detail produk ${product.name}`}
              >
                <img
                  src={`http://localhost:4777/file/${product.imagePath}`}
                  alt={`Gambar produk ${product.name}`}
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
          </section>
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
