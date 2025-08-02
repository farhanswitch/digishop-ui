import React from "react";

const ModalConfirm = ({ show, setShow, message, onConfirm }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 ${
        show ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={() => {
              setShow(false);
              onConfirm();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
