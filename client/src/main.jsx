import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProfileProvider } from "./context/ProfileContext";
import { EventProvider } from "./context/EventContext";
import "./index.css";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfileProvider>
      <EventProvider>
        <App />
         <Toaster position="top-center" reverseOrder={false} />
      </EventProvider>
    </ProfileProvider>
  </React.StrictMode>
);
