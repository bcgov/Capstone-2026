//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@bcgov/bc-sans/css/BC_Sans.css";
import { FeedbackProvider } from "./feedback/FeedbackProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <FeedbackProvider apiBaseUrl="http://localhost:3000">
    <App />
  </FeedbackProvider>,
);
