import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import ArrowLeftIcon from "../icons/ArrowLeft";

const FAQPage = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="FAQ">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">
                  FAQ ( Frequently Ask Question )
                </h1>
              </div>

              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                Bagaimana Cara Melakukan Checkout
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Anda dapat melakukan checkout produk pilihan anda dengan
                menambahkan produk ke dalam keranjang dan melanjutkan proses
                checkout.
              </p>
              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                Metode Pembayaran yang Dapat Dilakukan?
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Pilihan pembayaran yang ada melalui Transfer Bank, Dompet
                Digital, dan Cash On Delivery (COD)
              </p>
              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                Berapa Lama Waktu Pengiriman?
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Waktu pengiriman akan berdasarkan lokasi masing-masing pembeli
              </p>
              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                Berapa Lama Waktu Pengembalian?
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Batas waktu pengembalian 7 hari sejak produk diterima. Pastikan
                produk yang ingin dikembalikan tidak termasuk ke dalam produk
                yang tidak bisa dikembalikan Daftar produk yang tidak dapat
                dikembalikan: Produk kecantikan Makanan dan Minuman
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FAQPage;
