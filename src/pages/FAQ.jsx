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
                  FAQ (Frequently Asked Questions)
                </h1>
              </div>

              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                How to Checkout
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                You can checkout your chosen products by adding products to the
                cart and proceeding with the checkout process.
              </p>
              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                Available Payment Methods?
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Payment options available include Bank Transfer, Digital Wallet,
                and Cash On Delivery (COD).
              </p>
              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                How Long is the Delivery Time?
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Delivery time will be based on each buyer's location.
              </p>
              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                How Long is the Return Time?
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <p className="text-gray-700 text-base mb-6">
                Return deadline is 7 days since the product is received. Ensure
                the product you want to return is not included in the non-returnable
                products. List of non-returnable products: Beauty products,
                Food and Beverages.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FAQPage;
