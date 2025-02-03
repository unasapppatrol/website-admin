import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import FullLayout from "./layouts/MainLayout";
import Loader from "./layouts/loader/Loader";
import RootLayout from "./layouts/RootLayout";

const Login = lazy(() => import("./auth/login"));
const Starter = lazy(() => import("./views/Starter"));
const DataAbsensi = lazy(() => import("./views/DataAbsensi"));
const DataUsers = lazy(() => import("./views/Datausers"));
const DataPatroli = lazy(() => import("./views/DataPatroli"));
const DataPos = lazy(() => import("./views/Datapos"));
const DataAktivitas = lazy(() => import("./views/DataAktivitas"));
const ProfilAdmin = lazy(() => import("./views/profil"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<FullLayout />}>
          <Route path="" element={<Starter />} />
          <Route path="data_absensi" element={<DataAbsensi />} />
          <Route path="data_users" element={<DataUsers />} />
          <Route path="data_patroli" element={<DataPatroli />} />
          <Route path="data_pos" element={<DataPos />} />
          <Route path="data_aktivitas" element={<DataAktivitas />} />
          <Route path="profil" element={<ProfilAdmin />} />
        </Route>
        <Route path="/auth" element={<RootLayout />}>
          <Route path="" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
