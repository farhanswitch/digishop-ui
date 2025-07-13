import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import ArrowLeftIcon from "../icons/ArrowLeft";

const PrivacyPolicyPage = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="Kebijakan Privasi">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">
                  Kebijakan Privasi Pengguna
                </h1>
              </div>

              <div className="text-gray-700 space-y-6 text-left leading-relaxed">
                <p>
                  Privasi anda adalah hal yang penting bagi kami. Kami
                  berkomitmen untuk menjaga keamanan dan kerahasiaan semua
                  informasi pribadi yang anda berikan saat menggunakan layanan
                  kami.
                </p>
                <p>
                  Informasi pribadi yang kami kumpulkan hanya digunakan untuk
                  keperluan pemrosesan pesanan, peningkatan layanan, serta
                  komunikasi terkait transaksi atau promosi yang relevan.
                </p>
                <p>
                  Kami tidak akan membagikan, menjual, atau menyebarluaskan data
                  anda kepada pihak ketiga tanpa izin anda, kecuali diwajibkan
                  oleh hukum.
                </p>
                <p>
                  Kami menggunakan teknologi keamanan seperti enkripsi dan
                  server yang aman untuk melindungi data anda dari akses yang
                  tidak sah.
                </p>
                <p>
                  Anda berhak mengakses, memperbarui, atau menghapus informasi
                  pribadi anda kapan saja dengan menghubungi tim dukungan kami.
                </p>
                <p>
                  Dengan menggunakan layanan kami, anda menyetujui pengumpulan
                  dan penggunaan data sesuai dengan kebijakan ini. Kebijakan
                  privasi dapat diperbarui sewaktu-waktu, dan kami akan
                  menginformasikan perubahan yang signifikan.
                </p>
                <p>
                  Jika anda memiliki pertanyaan lebih lanjut mengenai privasi,
                  jangan ragu untuk menghubungi kami. Kami siap membantu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PrivacyPolicyPage;
