import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Modal from "./components/Modal.jsx";
import ClickMenu from "./components/ClickMenu.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Modal>
      <ClickMenu>
        <App />
      </ClickMenu>
    </Modal>
  </StrictMode>,
);
