import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {PlayerProvider} from "./context/PlayerContext";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PlayerProvider>
    <App />

    <Toaster
      position="bottom-right"
      reverseOrder={true}
      toastOptions={{duration: 5000}}
    />
  </PlayerProvider>
);
