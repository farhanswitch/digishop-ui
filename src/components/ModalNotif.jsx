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
    "Nothing changed": "text-yellow-500",
  };
  console.log(response);

  return (
    <div
      className={`layer ${
        showModal ? "fixed" : "hidden"
      } w-screen h-screen top-0 left-0 bg-transparent flex justify-center items-center z-[10]`}
    >
      <div className="modal border flex flex-col w-[420px] min-h-[450px] bg-white/30 backdrop-blur-xl rounded">
        <div className="msg flex-1 flex flex-col gap-2 justify-start px-6 pt-6">
          <p
            className={`${
              colors[response.statusMsg.toLowerCase()]
            } text-xl font-semibold text-center`}
          >
            {response.statusMsg}
          </p>
          <div className="text-slate-700 mt-2">
            <p className="mt-10">Details :</p>
            {response.statusMsg === "Success" ? (
              <>
                <p>{msg ? msg : response?.msg}</p>
                {response.msgDetails && (
                  <p className="mt-2">{response.msgDetails}</p>
                )}
              </>
            ) : (
              <span>
                {response.errors ? (
                  response.errors?.map((res, index) => {
                    return <p key={index}>{res.msg}</p>;
                  })
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
