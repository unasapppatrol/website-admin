import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserProvider } from "./context/userContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  </UserProvider>

  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
