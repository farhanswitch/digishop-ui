import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";
import { getNotifications } from "../services/notification.service";

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
        statusMsg: "warning",
        msgDetails: "Invalid session. Please login first.",
      });
      setShowModal(true);
      setNextPath("/login");
      return;
    }

    getNotifications()
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setResponse({
          statusMsg: "error",
          msgDetails: "Failed to load notifications.",
        });
        setShowModal(true);
      });
  }, []);

  return (
    <Layout pageTitle="Notifications">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications yet.</p>
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
