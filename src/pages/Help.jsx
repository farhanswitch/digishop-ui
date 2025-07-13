import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import ArrowLeftIcon from "../icons/ArrowLeft";

const HelpPage = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="Bantuan">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">Bantuan</h1>
              </div>
              <p className="text-gray-700 text-base mb-6">
                Selamat datang di halaman bantuan kami. Kami hadir untuk
                membantu kebingungan anda terkait penggunaan website kami
              </p>

              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                Bagaimana Cara Berbelanja di Website Kami
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <ol className="list-decimal list-inside text-gray-800 leading-relaxed space-y-1">
                <li>
                  Jelajahi berbagai katalog produk yang ada pada beranda website
                  kami.
                </li>
                <li>
                  Untuk mencari berbagai barang spesifik, gunakan fitur
                  kategori.
                </li>
                <li>
                  Tekan produk untuk melihat deskripsi, bahan, dan petunjuk
                  perawatan produk.
                </li>
                <li>Tambahkan produk yang anda inginkan ke dalam keranjang.</li>
                <li>
                  Untuk melihat daftar produk di keranjang anda, tekan ikon
                  keranjang di bagian bawah.
                </li>
                <li>
                  Buka keranjang dan tekan checkout untuk melanjutkan ke
                  pembayaran.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HelpPage;
