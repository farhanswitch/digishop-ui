import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";
import ArrowLeftIcon from "../icons/ArrowLeft";
import { encryptRSA } from "../utilities/cryptographies/rsa";
import { validatingRegister } from "../utilities/validations/register";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    confirmPassword: "",
  });
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errors = validatingRegister(form);
    if (errors.length > 0) {
      setResponse({ statusMsg: "Error", errors });
      setShowModal(true);
      return;
    }
    axios
      .post("http://localhost:4777/user/register", {
        ...form,
        password: encryptRSA(form.password),
        userType: "Buyer",
      })
      .then((res) => {
        setResponse({ statusMsg: res.data.message });
        setShowModal(true);
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
        setResponse({ statusMsg: "Error", errors: arrErrors });
        setShowModal(true);
      });
  };

  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <Layout pageTitle="Register">
        {response && (
          <ModalNotif
            showModal={showModal}
            setShowModal={setShowModal}
            response={response}
            nextPath="/login"
          />
        )}
        <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100 ">
          <div className="w-full max-w-5xl px-4 ">
            <div className="flex mb-10 -mt-20 items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center"
              >
                <ArrowLeftIcon width={40} color="brown" />
                <p className="text-amber-900 font-medium text-2xl">Back</p>
              </button>
            </div>
            <div className="bg-white px-10 py-6 rounded-2xl shadow-xl min-h-[600px] w-full max-w-2xl mx-auto flex flex-col justify-between">
              <div className="flex flex-col justify-center flex-1">
                <h2 className="text-2xl  mb-10 font-semibold text-blue-600 text-center">
                  Register
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="w-full grid grid-cols-1 gap-4"
                >
                  {[
                    { label: "Username", name: "username" },
                    { label: "First Name", name: "firstName" },
                    { label: "Last Name", name: "lastName" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Phone Number", name: "phoneNumber" },
                    { label: "Password", name: "password", type: "password" },
                    {
                      label: "Confirm Password",
                      name: "confirmPassword",
                      type: "password",
                    },
                  ].map(({ label, name, type = "text" }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block text-gray-700 mb-1"
                      >
                        {label}
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type={type}
                        name={name}
                        id={name}
                        value={form[name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors mt-4"
                  >
                    Register
                  </button>
                </form>
              </div>
              <p className="text-sm mt-6 text-center text-slate-500">
                Already have an account?
                <Link className="text-blue-700 ml-2" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default RegisterPage;
