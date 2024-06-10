import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  const location = useLocation();

  // Cek apakah path saat ini adalah '/login'
  if (location.pathname === "/") {
    // Jika ya, render hanya content tanpa sidebar
    return (
      <main>
        <div className="pageWrapper">
          <div className="contentArea">
            {/********Middle Content**********/}
            <Container className="p-4 wrapper" fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </main>
    );
  }

  // Jika bukan halaman login, render layout lengkap dengan sidebar
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
