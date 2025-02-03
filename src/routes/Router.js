import { lazy } from "react";
import RootLayout from "../layouts/RootLayout.js";

/****Layouts*****/
const MainLayout = lazy(() => import("../layouts/MainLayout.js"));
// You can import another layout if you have one, or simply use a fragment for no layout

/***** Pages ****/

const Login = lazy(() => import("../auth/login.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const DataAbsensi = lazy(() => import("../views/DataAbsensi.js"));
const DataUsers = lazy(() => import("../views/Datausers.js"));
const DataPatroli = lazy(() => import("../views/DataPatroli.js"));
const DataPos = lazy(() => import("../views/Datapos.js"));
const DataAktivitas = lazy(() => import("../views/DataAktivitas.js"));
const ProfilAdmin = lazy(() => import("../views/profil.js"));

/*****Routes******/

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", exact: true, element: <Starter /> },
      { path: "data_absensi", exact: true, element: <DataAbsensi /> },
      { path: "data_users", exact: true, element: <DataUsers /> },
      { path: "data_patroli", exact: true, element: <DataPatroli /> },
      { path: "data_pos", exact: true, element: <DataPos /> },
      { path: "data_aktivitas", exact: true, element: <DataAktivitas /> },
      { path: "profil", exact: true, element: <ProfilAdmin /> },
    ],
  },
  {
    path: "/auth",
    element: <RootLayout />,
    children: [{ path: "", element: <Login /> }],
  },
];

export default routes;
