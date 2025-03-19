import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Modal from "./components/Modal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Modal>
      <App />
    </Modal>
  </StrictMode>,
);
