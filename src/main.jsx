import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import "./assets/pico.blue.min.css";
import "./assets/styles.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
