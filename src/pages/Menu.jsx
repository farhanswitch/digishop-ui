import React, { useState, useEffect } from "react";
import { Link } from "react-router";

import AboutIcon from "../icons/About";
import FAQIcon from "../icons/FAQ";
import HelpIcon from "../icons/Help";
import Layout from "../components/Layout";
import LoginIcon from "../icons/Login";
import PeopleIcon from "../icons/People";
import PrivacyPolicyIcon from "../icons/PrivacyPolicy";
import StoreIcon from "../icons/Store";

const MenuPage = () => {
  const [isReady, setIsReady] = useState(false);
  const username = localStorage.getItem("digishopUsername") || "";

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="Menu">
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100 ">
          <div className="w-full max-w-5xl px-4 ">
            <div className="bg-white px-10 py-6 rounded-2xl shadow-xl min-h-[600px] w-full max-w-2xl mx-auto flex flex-col items-center">
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto border-5 rounded-full flex items-center justify-center">
                  <PeopleIcon width={53} color={"black"} />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-800 mt-3">
                  Akun Saya {username ? `- ${username}` : ""}
                </h2>
              </div>
              <div className="w-full flex flex-col gap-4">
                <Link
                  to={"/login"}
                  className="w-full flex items-center gap-4 border border-[#A67956] text-[#4B3429] bg-[#EFE5DD] px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <div className="w-6 h-6">
                    <LoginIcon width={30} color="black" />
                  </div>
                  <span>Sign Up/Login</span>
                </Link>
                <Link
                  to={"/help"}
                  className="w-full flex items-center gap-4 border border-[#A67956] text-[#4B3429] bg-[#EFE5DD] px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <div className="w-6 h-6">
                    <HelpIcon width={30} color="black" />
                  </div>
                  <span>Bantuan</span>
                </Link>
                <Link
                  to={"/about-us"}
                  className="w-full flex items-center gap-4 border border-[#A67956] text-[#4B3429] bg-[#EFE5DD] px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <div className="w-6 h-6">
                    <AboutIcon width={30} color="black" />
                  </div>
                  <span>Tentang Kami</span>
                </Link>
                <Link
                  to={"/faq"}
                  className="w-full flex items-center gap-4 border border-[#A67956] text-[#4B3429] bg-[#EFE5DD] px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <div className="w-6 h-6">
                    <FAQIcon width={30} color="black" />
                  </div>
                  <span>FAQ</span>
                </Link>
                <Link
                  to={"/privacy-policy"}
                  className="w-full flex items-center gap-4 border border-[#A67956] text-[#4B3429] bg-[#EFE5DD] px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <div className="w-6 h-6">
                    <PrivacyPolicyIcon width={30} color="black" />
                  </div>
                  <span>Kebijakan Privasi Pengguna</span>
                </Link>
                <Link
                  to={"/seller/store-profile"}
                  className="w-full flex items-center gap-4 border border-[#A67956] text-[#4B3429] bg-[#EFE5DD] px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <div className="w-6 h-6">
                    <StoreIcon width={30} color="black" />
                  </div>
                  <span>Seller Page</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MenuPage;
