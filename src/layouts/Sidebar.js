import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import logo_unas from "../assets/images/logos/logo_unas.png";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Master Pos",
    href: "/data_pos",
    icon: "bi bi-geo",
  },
  {
    title: "Data Users",
    href: "/data_users",
    icon: "bi bi-people",
  },
  {
    title: "Data Absensi",
    href: "/data_absensi",
    icon: "bi bi-person-bounding-box",
  },
  {
    title: "Data Patroli",
    href: "/data_patroli",
    icon: "bi bi-person-gear",
  },
  {
    title: "Data Aktivitas",
    href: "/data_aktivitas",
    icon: "bi bi-person-lines-fill",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3" style={{ height: "100%" }}>
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={[
                  location.pathname === navi.href
                    ? "nav-link link-active active-icon"
                    : "nav-link text-secondary ",
                ]}
                style={{ borderRadius: 10, marginBottom: 10, marginTop: 10 }}
              >
                <i className={navi.icon}></i>
                <span
                  className={
                    location.pathname === navi.href
                      ? "link-active active-text"
                      : "text-secondary"
                  }
                  style={{ marginLeft: 7 }}
                >
                  {navi.title}
                </span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>

      <div className="mt-5">
        <p className="text-center text-muted low-text">
          © {new Date().getFullYear()} Administrasi Umum UNAS
          <img
            src={logo_unas}
            width={30}
            height={30}
            alt="logo_unas"
            className="mx-2"
          />
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
