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
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
  };

  const type = response.statusMsg?.toLowerCase();

  return (
    <div
      className={`layer ${
        showModal ? "fixed" : "hidden"
      } w-screen h-screen top-0 left-0 bg-transparent flex justify-center items-center z-[10]`}
    >
      <div className="modal border flex flex-col w-[420px] min-h-[450px] bg-white/30 backdrop-blur-xl rounded">
        <div className="msg flex-1 flex flex-col gap-2 justify-start px-6 pt-6">
          <p
            className={`${colors[type]} text-xl font-semibold text-center capitalize`}
          >
            {response.statusMsg}
          </p>
          <div className="text-slate-700 mt-2">
            <p className="mt-10">Details :</p>

            {type === "success" ? (
              <>
                <p>{msg ? msg : response?.msg}</p>
                {response.msgDetails && (
                  <p className="mt-2">{response.msgDetails.toString()}</p>
                )}
              </>
            ) : type === "warning" ? (
              <p className="mt-2">
                {response?.msgDetails || "Warning occurred."}
              </p>
            ) : (
              <span>
                {response.errors ? (
                  response.errors?.map((res, index) => (
                    <p key={index}>{res.msg}</p>
                  ))
                ) : (
                  <span>{response?.msgDetails}</span>
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
            if (type === "success" || type === "warning") {
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
