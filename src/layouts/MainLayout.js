import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useAuth } from "../context/userContext";
import { useEffect } from "react";
import Loader from "./loader/Loader";

const FullLayout = () => {
  const { id, loadingStorage } = useAuth();

  if (loadingStorage) {
    return <Loader />;
  }
  if (!id) {
    return <Navigate to={"/auth"} />;
  }
  return (
    <main>
      <div className="pageWrapper d-lg-flex ">
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>

        <div className="contentArea">
          <Header />
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
