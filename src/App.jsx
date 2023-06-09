import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import { StreamClient } from "getstream";
import { StreamApp } from "react-activity-feed";
import users from "./users";
import { getFromStorage } from "./utils/storage";
import StartPage from "./pages/StartPage";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Thread from "./pages/Thread";
import LoadingIndicator from "./components/LoadingIndicator";

const APP_ID = "1241168";
const API_KEY = "ys3pbu6x7zee";

export default function App() {
  const userId = getFromStorage("user");

  const user = users.find((u) => u.id === userId) || users[0];

  const [client, setClient] = useState(null);

  useEffect(() => {
    async function init() {
      const client = new StreamClient(API_KEY, user.token, APP_ID);

      await client.user(user.id).getOrCreate({ ...user, token: "" });

      setClient(client);
    }

    init();
  }, []);

  if (!client)
    return (
      <>
        <LoadingIndicator size={50} paddingTop={200} />
      </>
    );

  return (
    <StreamApp token={user.token} appId={APP_ID} apiKey={API_KEY}>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route element={<HomePage />} path="/home" />
          <Route element={<Profile />} path="/:user_id" />
          <Route element={<Thread />} path="/:user_id/status/:id" />
        </Routes>
      </Router>
    </StreamApp>
  );
}
