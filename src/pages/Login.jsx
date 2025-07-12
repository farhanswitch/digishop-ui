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
      console.log({ errors });
      setResponse({
        statusMsg: "Error",
        errors,
      });
      setShowModal(true);
      return false;
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
        console.log(response.data);
      })
      .catch((err) => {
        const arrErrors = [];
        if (err?.response?.data?.errors) {
          for (const [key, val] of Object.entries(err.response.data.errors)) {
            arrErrors.push({ msg: `${key}: ${val}` });
          }
        } else if (err?.response?.data?.message) {
          arrErrors.push({ msg: err.response.data.message });
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
            nextPath={"/dashboard"}
          />
        )}
        <div className="w-full h-screen flex items-center justify-center bg-neutral-100">
          <div className="w-full max-w-5xl px-4">
            <button onClick={() => navigate(-1)}>
              <div className="flex mb-10 -mt-60 items-center">
                <ArrowLeftIcon width={40} color="brown" />
                <p className="text-amber-900 font-medium text-2xl">Back</p>
              </div>
            </button>
            <div className="bg-white px-10 pb-6 rounded-2xl shadow-xl min-h-[600px] w-full max-w-2xl mx-auto flex flex-col justify-between -mt-40">
              <div className="flex flex-col justify-center flex-1">
                <h2 className="text-2xl -mt-20 mb-16 font-semibold text-blue-600 text-center">
                  Login
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(username, password);
                  }}
                  className="w-full"
                >
                  <div className="mb-4">
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
                  <div className="mb-6">
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
              </div>
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
