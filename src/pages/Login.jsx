import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";
import ArrowLeftIcon from "../icons/ArrowLeft";
import { validatingLogin } from "../utilities/validations/login";
import { encryptRSA } from "../utilities/cryptographies/rsa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleSubmit = (username, password) => {
    const errors = validatingLogin(username, password);
    if (errors.length !== 0) {
      setResponse({
        statusMsg: "Error",
        errors,
      });
      setShowModal(true);
      return;
    }
    axios
      .post("http://localhost:4777/user/login", {
        username,
        password: encryptRSA(password),
        userType: "Buyer",
      })
      .then((response) => {
        localStorage.setItem("digishopToken", response.data.data.token);
        localStorage.setItem("digishopUsername", response.data.data.username);
        localStorage.setItem("digishopUserID", response.data.data.id);
        setShowModal(true);
        setResponse({
          statusMsg: "Success",
        });
      })
      .catch((err) => {
        const arrErrors = [];
        if (
          err?.response?.data?.errors &&
          typeof err.response.data.errors === "object"
        ) {
          for (const [key, val] of Object.entries(err.response.data.errors)) {
            arrErrors.push({ msg: `${key}: ${val}` });
          }
        } else if (
          err?.response?.data?.errors &&
          typeof err.response.data.errors === "string"
        ) {
          arrErrors.push({ msg: err.response.data.errors });
        }
        setResponse({
          statusMsg: "Error",
          errors: arrErrors,
        });
        setShowModal(true);
      });
  };

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="Login">
        {response && (
          <ModalNotif
            showModal={showModal}
            setShowModal={setShowModal}
            response={response}
            msg={"Login success"}
            nextPath={"/menu"}
          />
        )}
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3">
                  <ArrowLeftIcon width={28} color="#734B29" />
                </button>
                <h1 className="text-xl font-bold text-[#422D23]">Login</h1>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(username, password);
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
                  type="submit"
                >
                  Sign In
                </button>
              </form>

              <p className="text-sm mt-6 text-center text-slate-500">
                Do not have an account yet?
                <Link className="text-blue-700 ml-2" to={"/register"}>
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;
