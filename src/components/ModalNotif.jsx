import React from "react";
import { useNavigate } from "react-router";
const ModalNotif = ({
  showModal,
  setShowModal,
  response,
  msg,
  nextPath,
  reset,
}) => {
  const navigate = useNavigate();
  const colors = {
    Success: "text-green-500",
    Error: "text-red-500",
    "Nothing changed": "text-yellow-500",
  };
  console.log(response);
  return (
    <div
      className={`layer ${
        showModal ? "fixed" : "hidden"
      } w-screen h-screen top-0 left-0 bg-transparent flex justify-center items-center z-[10]`}
    >
      <div className="modal border flex flex-col min-w-[420px] min-h-[450px] bg-white/30 backdrop-blur-xl rounded">
        <div className="msg flex-1 flex flex-col gap-2 justify-start px-6 pt-6">
          <p
            className={`${
              colors[response.statusMsg]
            } text-xl font-semibold text-center`}
          >
            {response.statusMsg}
          </p>
          <div className="text-slate-700 mt-2">
            {response.statusMsg === "Success" ? (
              <p>{msg ? msg : response?.msg}</p>
            ) : (
              <span>
                <p className="mt-10">Details :</p>
                {response.errors ? (
                  response.errors?.map((res, index) => {
                    return <p key={index}>{res.msg}</p>;
                  })
                ) : (
                  <span>{response?.msg}</span>
                )}
              </span>
            )}
          </div>
        </div>

        <button
          className="border py-1"
          onClick={() => {
            setShowModal(false);
            if (reset) reset();
            if (response.statusMsg === "Success") {
              if (nextPath) navigate(nextPath);
            }
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalNotif;
