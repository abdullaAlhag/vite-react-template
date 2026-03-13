import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// ÌÃ»  €·Ì› «· ÿ»Ìﬁ »‹ BrowserRouter · „ﬂÌ‰ «· ‰ﬁ·:

import { BrowserRouter } from "react-router-dom";
// ... »«ﬁÌ «·≈÷«›« 
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
