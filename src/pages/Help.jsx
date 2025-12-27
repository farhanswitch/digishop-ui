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
      <Layout pageTitle="Help">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">Help</h1>
              </div>
              <p className="text-gray-700 text-base mb-6">
                Welcome to our help page. We are here to help with your confusion
                regarding the use of our website.
              </p>

              <h2 className="text-lg font-bold text-[#734B29] mb-2">
                How to Shop on Our Website
              </h2>
              <hr className="border border-[#ddd] mb-4" />

              <ol className="list-decimal list-inside text-gray-800 leading-relaxed space-y-1">
                <li>
                  Browse various product catalogs on our website homepage.
                </li>
                <li>
                  To search for specific items, use the category feature.
                </li>
                <li>
                  Click on the product to see the description, materials, and
                  product care instructions.
                </li>
                <li>Add the product you want to the cart.</li>
                <li>
                  To see the list of products in your cart, click the cart icon
                  at the bottom.
                </li>
                <li>
                  Open the cart and click checkout to proceed to payment.
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
