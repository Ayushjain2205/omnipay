import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DynamicProviders } from "./providers/DynamicProviders";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DynamicProviders>
      <App />
    </DynamicProviders>
  </StrictMode>
);
