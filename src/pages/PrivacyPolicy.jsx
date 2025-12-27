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
      <Layout pageTitle="Privacy Policy">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">
                  User Privacy Policy
                </h1>
              </div>

              <div className="text-gray-700 space-y-6 text-left leading-relaxed">
                <p>
                  Your privacy is important to us. We are committed to maintaining
                  the security and confidentiality of all personal information you
                  provide when using our services.
                </p>
                <p>
                  The personal information we collect is only used for order
                  processing, service improvement, and communication regarding
                  relevant transactions or promotions.
                </p>
                <p>
                  We will not share, sell, or distribute your data to third parties
                  without your permission, unless required by law.
                </p>
                <p>
                  We use security technologies such as encryption and secure
                  servers to protect your data from unauthorized access.
                </p>
                <p>
                  You have the right to access, update, or delete your personal
                  information at any time by contacting our support team.
                </p>
                <p>
                  By using our services, you agree to the collection and use of
                  data in accordance with this policy. Privacy policy may be
                  updated from time to time, and we will inform of significant
                  changes.
                </p>
                <p>
                  If you have further questions regarding privacy, please do not
                  hesitate to contact us. We are ready to help.
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
