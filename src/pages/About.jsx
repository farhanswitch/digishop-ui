import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import ArrowLeftIcon from "../icons/ArrowLeft";

const AboutPage = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="Tentang Kami">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">
                  Tentang Digishop
                </h1>
              </div>

              <div className="text-gray-700 space-y-6 text-justify leading-relaxed">
                <p>
                  Digishop hadir dengan tujuan mengenalkan gaya hidup ramah
                  lingkungan. kami hadir dengan berbagai produk lokal
                  berkualitas.
                </p>
                <p>
                  Dengan kolaborasi yang kami lakukan bersama para pelaku usaha
                  lokal, kami hadir menawarkan berbagai produk berkualitas
                  dengan pengalaman belanja yang mudah dan menarik.
                </p>
                <p>
                  Kami percaya, keindahan dan kualitas suatu produk dapat
                  tercapai dengan tetap peduli terhadap kesejahteraan bumi ini.
                </p>
                <p>
                  Berkolaborasi dengan lebih 100 pelaku usaha lokal, Digishop
                  hadir dengan tetap memastikan kualitas produk yang ada, serta
                  memastikan berbagai produk yang kami komersilkan ramah dengan
                  lingkungan.
                </p>
                <p>
                  Temui berbagai produk lokal berkualitas dan dapatkan
                  pengalaman berbelanja yang menarik dan mudah
                </p>
                <p>Terimakasih telah memilih kami. Selamat berbelanja.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AboutPage;
