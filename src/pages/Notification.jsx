import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [response, setResponse] = useState({ status: "", message: "" });
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("digishopToken");

    if (!token) {
      setResponse({
        status: "warning",
        message: "Sesi tidak valid. Silakan login terlebih dahulu.",
      });
      setShowModal(true);
      setNextPath("/login");
      return;
    }

    axios
      .get("http://localhost:4777/market/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setResponse({
          status: "error",
          message: "Gagal memuat notifikasi.",
        });
        setShowModal(true);
      });
  }, []);

  return (
    <Layout pageTitle="Notifikasi">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Notifikasi</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-600">Belum ada notifikasi.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
              >
                <h2 className="font-semibold text-lg">{notif.title}</h2>
                <p className="text-gray-700">{notif.body}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(notif.createdAt).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalNotif
        showModal={showModal}
        setShowModal={setShowModal}
        response={response}
        setResponse={setResponse}
        nextPath={nextPath}
      />
    </Layout>
  );
};

export default NotificationPage;
