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
      <Layout pageTitle="About Us">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">
                  About EcoLestari
                </h1>
              </div>

              <div className="text-gray-700 space-y-6 text-justify leading-relaxed">
                <p>
                  EcoLestari is here with the goal of introducing an eco-friendly
                  lifestyle. We present various quality local products.
                </p>
                <p>
                  With the collaboration we do with local business actors, we
                  present various quality products with an easy and attractive
                  shopping experience.
                </p>
                <p>
                  We believe that the beauty and quality of a product can be
                  achieved while still caring for the welfare of this earth.
                </p>
                <p>
                  Collaborating with over 100 local business actors, EcoLestari
                  is present by ensuring the quality of existing products, as well
                  as ensuring various products that we commercialize are friendly
                  to the environment.
                </p>
                <p>
                  Meet various quality local products and get an attractive and
                  easy shopping experience.
                </p>
                <p>Thank you for choosing us. Happy shopping.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AboutPage;
