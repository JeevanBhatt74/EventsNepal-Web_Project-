import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Effect from "./effect.tsx";
import NavHeader from "./nav-header.tsx";
import { BrowserRouter } from "react-router-dom";
import { FooterDemo } from "./footer.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import NavWrapper from "./nav-wrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Effect>
        <NavWrapper>
          <div className="fixed z-[1000] left-1/2 -translate-x-1/2 translate-y-1/2">
            <NavHeader />
          </div>
        </NavWrapper>
        <App />

        <FooterDemo />
      </Effect>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
